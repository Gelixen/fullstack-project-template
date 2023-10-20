import {useState} from 'react';

import Post from './Post';
import NewPost from './NewPost';
import classes from './PostsList.module.css';
import Modal from "./Modal";

function PostsList({isPosting, onStopPosting}) {
  const [posts, setPosts] = useState([]);

  function addPostHandler(postData) {
    // proper way to update state as react might schedule the update for later
    // and in multi-update case might mess up final state if not incrementing
    // bad e.g.: setPosts([postData, ...posts]);
    setPosts((existingPosts) => [postData, ...existingPosts]);
  }

  return (
      <>
        {isPosting && (
            <Modal onClose={onStopPosting}>
              <NewPost onCancel={onStopPosting} onAddPost={addPostHandler}/>
            </Modal>
        )}
        {posts.length > 0 && (
            <ul className={classes.posts}>
              {posts.map((post) => (
                  <Post key={post.body} author={post.author} body={post.body}/>
              ))}
            </ul>
        )}
        {posts.length === 0 && (
            <div style={{textAlign: 'center'}}>
              <h2>There are no posts yet.</h2>
            </div>
        )}
      </>
  );
}

export default PostsList;