export default function UpdateCommentForm(props) {
  console.log(props.c.comment, props.c._id);
  return (
    <form onSubmit={(event) => props.updateComment(event, props.item, props.c)}>
      <input type="text" placeholder="update your comment" name="comment" />
      <button type="submit">Post Update</button>
    </form>
  );
}
