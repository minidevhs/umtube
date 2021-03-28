import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

function Comment(props) {
  const videoId = props.postId;

  const user = useSelector((state) => state.user);
  const [commentValue, setcommentValue] = useState("");

  const handleClick = (e) => {
    setcommentValue(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: commentValue,
      writer: user.userData._id, // 리덕스 이용해서 id 가져오기
      postId: videoId,
    };

    axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        props.refreshFunction(response.data.result);
        setcommentValue("");
      } else {
        alert("댓글 저장 실패");
      }
    });
  };

  return (
    <div>
      <br />
      <p> Replies </p>
      <hr />

      {/* Comment Lists */}

      {props.commentLists &&
        props.commentLists.map(
          // map 함수에서 => ()이 아닌 {} 사용으로 인한 오류
          (comment, index) =>
            // root depth의 댓글들만
            !comment.responseTo && (
              <React.Fragment key={comment._id}>
                <SingleComment
                  refreshFunction={props.refreshFunction}
                  comment={comment}
                  postId={props.postId}
                />
                <ReplyComment
                  refreshFunction={props.refreshFunction}
                  parentCommentId={comment._id}
                  commentLists={props.commentLists}
                  postId={props.postId}
                />
              </React.Fragment>
            )
        )}

      {/* Root Comment Form */}

      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleClick}
          value={commentValue}
          placeholder="Write Comments"
        />
        <br />
        <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comment;
