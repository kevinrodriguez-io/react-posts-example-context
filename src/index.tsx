import React from "react";
import ReactDOM from "react-dom";
import { PostsProvider } from "./hooks/Posts";

import App from "./components/App";

ReactDOM.render(
  <PostsProvider>
    <App />
  </PostsProvider>,
  document.querySelector("#root")
);
