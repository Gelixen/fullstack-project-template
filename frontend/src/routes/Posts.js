import './Posts.css';
import PostsList from "../components/posts/PostsList";
import {Outlet} from "react-router-dom";

function Posts() {
  return (
      <>
        <Outlet/>
        <PostsList/>
      </>
  )
}

export default Posts;

export async function loader() {
  const response = await fetch("/posts");
  return await response.json();
}