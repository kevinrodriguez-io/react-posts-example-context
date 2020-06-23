import React, { createContext, useReducer, Dispatch, useContext } from "react";
import { Post } from "../types/Post";

export type ExtendableError = Error & Record<string, any>;

type PostsState = {
  posts: Post[];
  isLoading: boolean;
  error?: ExtendableError;
};

const initialState: PostsState = {
  posts: [],
  isLoading: false,
};

type PostsAction = {
  type:
    | "FETCH_BLOGPOSTS"
    | "FETCHING_BLOGPOSTS"
    | "FETCH_BLOGPOSTS_ERROR"
    | "RESET";
  payload?: Post[] | ExtendableError;
};

const reducer = (
  state = initialState,
  { type, payload }: PostsAction
): PostsState => {
  switch (type) {
    case "FETCHING_BLOGPOSTS":
      return { ...state, isLoading: true };
    case "FETCH_BLOGPOSTS":
      return { ...state, isLoading: false, posts: payload as Post[] };
    case "FETCH_BLOGPOSTS_ERROR":
      return { ...state, isLoading: false, error: payload as ExtendableError };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const PostsContext = createContext(initialState);
const PostsDispatchContext = createContext<Dispatch<PostsAction> | null>(null);

export const PostsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <PostsDispatchContext.Provider value={dispatch}>
      <PostsContext.Provider value={state}>{children}</PostsContext.Provider>
    </PostsDispatchContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);

export const usePostsActions = () => {
  const dispatch = useContext(PostsDispatchContext);
  if (!dispatch) throw new Error("PostsProvider must be provided");
  const fetchPosts = async () => {
    try {
      dispatch({
        type: "FETCHING_BLOGPOSTS",
      });
      const result = (await (
        await fetch("https://jsonplaceholder.typicode.com/posts")
      ).json()) as Post[];
      dispatch({
        type: "FETCH_BLOGPOSTS",
        payload: result,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_BLOGPOSTS_ERROR",
        payload: error,
      });
    }
  };
  const reset = () => dispatch({ type: "RESET" });
  return {
    fetchPosts,
    reset,
  };
};
