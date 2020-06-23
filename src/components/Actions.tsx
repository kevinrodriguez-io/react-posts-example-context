import React from "react";
import { usePostsActions } from "../hooks/Posts";

const Actions = () => {
  const { fetchPosts, reset } = usePostsActions();
  console.log("Actions was rendered");
  return (
    <div>
      <button onClick={fetchPosts}>Fetch</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Actions;
