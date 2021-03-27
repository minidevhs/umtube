import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

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
        console.log(response.data.result);
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

      {/* Root Comment Form */}

      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleClick}
          value={commentValue}
          placeholder="댓글을 작성해 주세요"
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
