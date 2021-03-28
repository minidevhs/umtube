import React, { useEffect, useState } from "react";
import { Tooltip, Icon } from "antd";
import axios from "axios";

function LikeDislikes(props) {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DisLikeAction, setDisLikeAction] = useState(null);

  let variable = {};

  // 비디오 like 또는 코멘트 like로 오는 변수 분리
  if (props.video) {
    variable = { videoId: props.videoId, userId: props.userId };
  } else {
    variable = { commentId: props.commentId, userId: props.userId };
  }

  useEffect(() => {
    axios.post("/api/like/getLikes", variable).then((response) => {
      if (response.data.success) {
        // likes를 얼마나 받았는지
        setLikes(response.data.likes.length);

        // 내가 likes를 이미 눌렀는지
        response.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLikeAction("liked");
          }
        });
      } else {
        alert("Likes 정보를 가져오는데 실패했습니다.");
      }
    });

    axios.post("/api/like/getDisLikes", variable).then((response) => {
      if (response.data.success) {
        // dislikes를 얼마나 받았는지
        setDislikes(response.data.dislikes.length);

        // 내가 dislikes를 이미 눌렀는지
        response.data.dislikes.map((dislike) => {
          if (dislike.userId === props.userId) {
            setDisLikeAction("disliked");
          }
        });
      } else {
        alert("DisLikes 정보를 가져오는데 실패했습니다.");
      }
    });
  }, []);

  return (
    <div>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={LikeAction === "liked" ? "filled" : "outlined"}
            onClick
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}> {Likes} </span>
      </span>
      <span key="comment-basic-dislike">
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={DisLikeAction === "disliked" ? "filled" : "outlined"}
            onClick
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}> {Dislikes} </span>
      </span>
    </div>
  );
}

export default LikeDislikes;
