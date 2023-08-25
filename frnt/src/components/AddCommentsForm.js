import React from "react";
// import { Link, useNavigate } from "react-router-dom";

export default function AddCommentsForm(props) {
  return (
    <section className="add-comment">
      {/* <h1>Add News Form</h1> */}
      <form className="add-comment-form" onSubmit={props.handleSubmit}>
        <label htmlFor="comments"></label>
        <input
          type="text"
          id="comments"
          name="comments"
          onChange={props.props.handleChange}
          value={props.props.formState.comments}
          required
        />

        <div>
          <button type="submit" className="news-submit">
            Add
          </button>
          <button
            className="news-submit-cancel"
            onClick={props.props.handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
