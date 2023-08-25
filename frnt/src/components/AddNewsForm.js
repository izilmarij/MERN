import React from "react";
// import { Link, useNavigate } from "react-router-dom";

export default function AddNewsForm(props) {
  return (
    <section className="add-news">
      <h1>Add News Form</h1>
      <form className="add-news-form" onSubmit={props.handleSubmit}>
        <label htmlFor="headline">Headline:</label>
        <input
          type="text"
          id="headline"
          name="headline"
          onChange={props.handleChange}
          value={props.formState.headline}
          required
        />

        <label htmlFor="body">News Body</label>
        <input
          type="text"
          id="body"
          name="body"
          onChange={props.handleChange}
          value={props.formState.body}
          required
        />

        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          onChange={props.handleChange}
          value={props.formState.category}
          required
        />

        <label htmlFor="comments">Comments</label>
        <input
          type="text"
          id="comments"
          name="comments"
          onChange={props.handleChange}
          value={props.formState.comments}
        />

        <button type="submit" className="news-submit">
          Add
        </button>
        <button className="news-submit-cancel" onClick={props.handleCancel}>
          Cancel
        </button>
      </form>
    </section>
  );
}
