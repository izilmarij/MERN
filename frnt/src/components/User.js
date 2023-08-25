import React from "react";
import axios from "../api/axios";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import AddNewsForm from "./AddNewsForm";
import DispNews from "./DispNews";
import UpdateCommentForm from "./UpdateCommentForm";

export default function Reporter() {
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);

  const [data, setData] = useState(() => []);
  const [isLoading, setIsLoading] = useState(() => false);
  //const [addNewsButton, setAddNewsButton] = useState(() => false);
  const [currentPost, setCurrentPost] = useState({});
  const [viewComments, setViewComments] = useState(() => false);
  const [postComments, setPostComments] = useState(() => false);
  const [filter, setFilter] = useState("");
  //const [deleteComments, setDeleteComments] = useState(() => true);
  const [updateComments, setUpdateComments] = useState(() => false);
  const [updateCommentId, setUpdateCommentId] = useState();

  const [formState, setFormState] = React.useState({
    headline: "",
    body: "",
    category: "",
    poster: `${decoded.user}`,
    comments: "",
  });

  const getNews = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `http://localhost:5000/app/v1/fetch/?filter=${filter}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            name: `${decoded.name}`,
            role: `${decoded.role}`,
          },
        }
      );

      // console.log("Data received from server...", res.data.data);
      setData(res.data.data.data_);
      setIsLoading(false);
    } catch (err) {
      console.log("Error from server..", err);
      return err;
    }
  };
  //console.log("state data", !isLoading && data[0].body)

  useEffect(() => {
    getNews();
    //console.log(currentPost);
  }, [filter]); //eslint-disable-line

  const postComment = async (event, item) => {
    event.preventDefault(); //prevents the page from reloading on form submit
    const formData = new FormData(event.target);
    const comment = formData.get("comments");

    try {
      setIsLoading(true);
      const res = await axios.patch(
        `http://localhost:5000/app/v1/addcomment/${item._id}`,
        {
          body: {
            comment: `${comment}`,
            commentor: `${decoded.name}`,
          },
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            name: `${decoded.name}`,
            role: `${decoded.role}`,
          },
        }
      );

      //console.log("REsp received from server...");
      setIsLoading(false);
      setFormState({
        headline: "",
        body: "",
        category: "",
        poster: `${decoded.user}`,
        comments: "",
      });
      setPostComments(false);
      setViewComments(false);
      getNews();
    } catch (err) {
      console.log("Error from server..", err);
    }
  };

  const deleteComment = async (item, comment) => {
    try {
      setIsLoading(true);
      const res = await axios.patch(
        `http://localhost:5000/app/v1/deletecomment/${item._id}`,
        {
          body: {
            comment: `${comment.comment}`,
            commentor: `${comment.commentor}`,
          },
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            name: `${decoded.name}`,
            role: `${decoded.role}`,
          },
        }
      );

      //   console.log("REsp received from server...");
      setIsLoading(false);
      setViewComments(false);

      getNews();
    } catch (err) {
      console.log("Error from server..", err);
    }
  };

  const updateComment = async (event, item, c) => {
    // console.log(c._id);
    event.preventDefault(); //prevents the page from reloading on form submit
    const formData = new FormData(event.target);
    //console.log("in update comment ", formData.get("comment"));

    const comment = formData.get("comment");

    try {
      setIsLoading(true);
      const res = await axios.patch(
        `http://localhost:5000/app/v1/updatecomment/${item._id}/${c._id}`,
        {
          body: {
            comment,
          },
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            name: `${decoded.name}`,
            role: `${decoded.role}`,
          },
        }
      );

      //console.log("REsp received from server...");
      setIsLoading(false);

      setPostComments(false);
      setUpdateComments(false);
      setViewComments(false);

      getNews();
    } catch (err) {
      console.log("Error from server..", err);
    }
  };

  function DispNews2() {
    return (
      <section className="news-container">
        {isLoading && <h1> Loading....</h1>}
        {!isLoading &&
          data.map((item, index) => {
            return (
              <div key={index} className="news-div">
                <h3>{item.headline}</h3>
                <p>{item.body}</p>
                <div className="comment-flex">
                  <button
                    onClick={() => {
                      setCurrentPost(item);
                      setViewComments((prev) => !prev);
                      setUpdateComments(false);
                    }}
                  >
                    {currentPost._id === item._id && viewComments
                      ? "Hide Comments"
                      : "View Comments"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPost(item);
                      setPostComments((prevVal) => !prevVal);
                    }}
                  >
                    {currentPost._id === item._id && postComments ? (
                      <span onClick={() => handleCancel()}>Cancel</span>
                    ) : (
                      "Add Comments"
                    )}
                  </button>
                </div>
                {currentPost._id === item._id &&
                  viewComments &&
                  currentPost?.comments?.map((c, index) => {
                    return (
                      <div key={index} className="comment-container">
                        {c.comment && (
                          <li>
                            {c.comment}
                            {c.commentor === decoded.name && (
                              <button
                                onClick={() => {
                                  //   setCurrentPost(item);
                                  deleteComment(item, c);
                                }}
                              >
                                Delete Comment
                              </button>
                            )}
                            {c.commentor === decoded.name && (
                              <button
                                onClick={() => {
                                  setUpdateComments(true);
                                  setUpdateCommentId(c._id);
                                }}
                              >
                                Update Comment
                              </button>
                            )}
                            {updateCommentId === c._id &&
                              updateComments &&
                              c.commentor === decoded.name && (
                                <UpdateCommentForm
                                  c={c}
                                  item={item}
                                  updateComment={updateComment}
                                />
                              )}
                          </li>
                        )}
                      </div>
                    );
                  })}
                {currentPost._id === item._id && postComments && (
                  <form onSubmit={(event) => postComment(event, item)}>
                    <input
                      type="text"
                      placeholder="Type your comment"
                      name="comments"
                      //   onChange={handleChange}
                      //   value={formState.comments}
                    ></input>
                    <button type="submit">Post</button>
                  </form>
                )}
              </div>
            );
          })}
      </section>
    );
  }

  const handleCancel = () => {
    setFormState({
      headline: "",
      body: "",
      category: "",
      poster: `${decoded.user}`,
      comments: "",
    });
  };

  return (
    <div className="user">
      <h1>
        Welcome, {decoded.name}, to {decoded.role}'s view!
      </h1>
      <form className="filter-form">
        <label htmlFor="category">Choose a News category:</label>
        <select
          value={filter}
          name="category"
          id="cars"
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="">All</option>
          <option value="General">General</option>
          <option value="Science">Science</option>
          <option value="Technology">Technology</option>
        </select>
      </form>
      <DispNews2 />
    </div>
  );
}
