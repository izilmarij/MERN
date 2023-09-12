import React from "react";
import axios from "../api/axios";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import AddNewsForm from "./AddNewsForm";
import UpdateNewsForm from "./UpdateNewsForm";
import Layout from "./Layout";

export default function Reporter() {
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  // const navigate = useNavigate();
  // props.setLoggedIn(true);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addNewsButton, setAddNewsButton] = useState(false);
  const [updateNewsButton, setUpdateNews] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [viewComments, setViewComments] = useState(false);
  const [postComments, setPostComments] = useState(false);
  const [deleteComments, setDeleteComments] = useState(true);

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
      const res = await axios.get("http://localhost:5000/app/v1/news", {
        headers: {
          authorization: `Bearer ${token}`,
          name: `${decoded.name}`,
          role: `${decoded.role}`,
        },
      });

      //   console.log("Data received from server...", res.data.data);
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
  }, []); //eslint-disable-line

  const handleSubmit = async (e) => {
    //create-news function:

    e.preventDefault(); //prevents the page from reloading on form submit
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:5000/app/v1/news",
        {
          body: {
            headline: `${formState.headline}`,
            body: `${formState.body}`,
            poster: `${decoded.name}`,
            category: `${formState.category}`,
            comments: {
              comment: `${formState.comments}`,
              commentor: `${decoded.name}`,
            },
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
      setAddNewsButton(false);
      setFormState({
        headline: "",
        body: "",
        category: "",
        poster: `${decoded.user}`,
        comments: "",
      });
      getNews();
    } catch (err) {
      console.log("Error from server..", err);
    }
  };

  const deleteNews = async (item) => {
    try {
      setIsLoading(true);
      const res = await axios.delete(
        `http://localhost:5000/app/v1/news/${item._id}`,

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

      getNews();
    } catch (err) {
      console.log("Error from server..", err);
    }
  };

  const updateNews = async (event, item) => {
    event.preventDefault(); //prevents the page from reloading on form submit
    // console.log("in update news");
    const formData = new FormData(event.target);
    const headline = formData.get("headline") || item.headline;
    const body = formData.get("body") || item.body;
    const category = formData.get("category") || item.category;
    // console.log(headline, body, category);

    try {
      setIsLoading(true);
      const res = await axios.patch(
        `http://localhost:5000/app/v1/news/${item._id}`,
        {
          body: {
            headline,
            body,
            category,
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

      getNews();
    } catch (err) {
      console.log("Error from server..", err);
    }
    setUpdateNews(false);
  };

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
    //event.preventDefault(); //prevents the page from reloading on form submit
    // const formData = new FormData(event.target);
    // const comment = formData.get("comments");

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
      setDeleteComments(true);
      setViewComments(false);

      //   console.log("REached here...");
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
                <div className="news-flex">
                  <button onClick={() => deleteNews(item)}>Delete News</button>
                  <button
                    className="update-news"
                    onClick={() => {
                      setCurrentPost(item);
                      setUpdateNews(true);
                    }}
                  >
                    Update News
                  </button>
                </div>
                {currentPost._id === item._id && updateNewsButton && (
                  <UpdateNewsForm
                    updateNews={updateNews}
                    handleCancel={handleCancel}
                    item={item}
                  />
                )}

                <div className="comment-flex">
                  <button
                    onClick={() => {
                      setCurrentPost(item);
                      setViewComments((prev) => !prev);
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
                      <div key={index}>
                        {c.comment && (
                          <li>
                            {c.comment}
                            {deleteComments && (
                              <button
                                onClick={() => {
                                  //   setCurrentPost(item);
                                  deleteComment(item, c);
                                }}
                              >
                                Delete Comment
                              </button>
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

  function handleChange(e) {
    setFormState((old) => {
      return {
        ...old,
        [e.target.name]: e.target.value,
      };
    });
    //console.log("Form state set...", formState);
  }

  const handleCancel = () => {
    setAddNewsButton(false);
    setUpdateNews(false);
    setFormState({
      headline: "",
      body: "",
      category: "",
      poster: `${decoded.user}`,
      comments: "",
    });
  };

  return (
    <div className="admin">
      <Layout />
      <h1>
        Welcome, {decoded.name}, to {decoded.role}'s view!
      </h1>
      <DispNews2 />
      <button className="add-news" onClick={() => setAddNewsButton(true)}>
        Add News
      </button>
      {addNewsButton && (
        <AddNewsForm
          formState={formState}
          setFormState={setFormState}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleCancel={handleCancel}
        />
      )}
      {/* <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Logout
      </button> */}
    </div>
  );
}
