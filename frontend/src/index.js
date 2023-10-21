import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Posts, {loader as postsLoader} from './routes/Posts';
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClientsList from "./components/ClientsList";
import NewPost, {action as newPostAction} from "./routes/NewPost";
import RootLayout from "./routes/RootLayout";
import PostDetails, {loader as postDetailsLoader} from "./routes/PostDetails";

const router = createBrowserRouter([
  {
    path: '/posts', element: <RootLayout/>, children: [
      {
        path: '/posts',
        element: <Posts/>,
        loader: postsLoader,
        children: [
          {path: '/posts/create', element: <NewPost/>, action: newPostAction},
          {
            path: '/posts/:postId',
            element: <PostDetails/>,
            loader: postDetailsLoader
          }
        ]
      }
    ]
  },
  {path: '/clients', element: <ClientsList/>}
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();