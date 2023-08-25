import React from "react";
import { useState } from "react";
// import AddCommentsForm from "./AddCommentsForm";

export default function DispNews(props) {
  const [viewComments, setViewComments] = useState(false);
  const [addComments, setAddComments] = useState(false);
  const [currentPost, setCurrentPost] = useState({});

  console.log("in disp news ", props);

  const AddCommentsForm = () => {
    return (
      <section className="add-comment">
        <form className="add-comment-form" onSubmit={props.handleSubmit}>
          <label htmlFor="comments"></label>
          <input
            type="text"
            id="comments"
            name="comments"
            onChange={props.handleChange}
            value={props.formState.comments}
            required
          />

          <div>
            <button type="submit" className="news-submit">
              Add
            </button>
            <button className="news-submit-cancel" onClick={props.handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </section>
    );
  };

  return (
    <div key={props.index} className="news-div">
      <h3>{props.item.headline}</h3>
      <p>{props.item.body}</p>
      <div className="comment-buttons">
        <button
          onClick={() => {
            setViewComments((prev) => !prev);
          }}
        >
          {viewComments ? "Hide Comments" : "View Comments"}
        </button>

        <button
          onClick={() => {
            setCurrentPost(props.item);
            setAddComments((old) => !old);
          }}
        >
          {currentPost._id === props.item._id && addComments
            ? "Collapse "
            : "Add Comments"}
        </button>
      </div>
      {currentPost._id === props.item._id && addComments && <AddCommentsForm />}
    </div>
  );
}
