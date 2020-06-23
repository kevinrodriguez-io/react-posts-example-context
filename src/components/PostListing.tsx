import React from "react";
import { usePosts } from "../hooks/Posts";
import { Post } from "../types/Post";

const PostListing: React.FC = () => {
  const { posts } = usePosts();
  return <PostList posts={posts} />;
};

const PostList: React.FC<{ posts: Post[] }> = React.memo(({ posts }) => {
  console.log("PostList was rendered");
  return (
    <div>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
});

export default PostListing;
