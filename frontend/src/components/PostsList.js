import {useEffect, useState} from 'react';

import Post from './Post';
import NewPost from './NewPost';
import classes from './PostsList.module.css';
import Modal from "./Modal";

function PostsList({isPosting, onStopPosting}) {
  const [posts, setPosts] = useState([]);
  const [isFetchingInitialData, setIsFetchingInitialData] = useState(true);

  useEffect(() => {
    fetchPosts().then(data => setPosts(data))
  }, []);

  async function fetchPosts() {
    setIsFetchingInitialData(true)
    const response = await fetch("/posts")
    setIsFetchingInitialData(false)

    return await response.json()
  }

  function addPostHandler(postData) {
    // async/await would be preferred way - .then old-school
    fetch("/posts", {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    // proper way to update state as react might schedule the update for later
    // and in multi-update case might mess up final state if not incrementing
    // bad e.g.: setPosts([postData, ...posts]);
    // setPosts((existingPosts) => [postData, ...existingPosts]);
    .then(data => setPosts((existingPosts) => [data, ...existingPosts]))
  }

  return (
      <>
        {isPosting && (
            <Modal onClose={onStopPosting}>
              <NewPost onCancel={onStopPosting} onAddPost={addPostHandler}/>
            </Modal>
        )}
        {!isFetchingInitialData && posts.length > 0 && (
            <ul className={classes.posts}>
              {posts.map((post) => (
                  <Post key={post.body} author={post.author} body={post.body}/>
              ))}
            </ul>
        )}
        {!isFetchingInitialData && posts.length === 0 && (
            <div style={{textAlign: 'center'}}>
              <h2>There are no posts yet.</h2>
            </div>
        )}
        {isFetchingInitialData && (
            <div style={{textAlign: 'center'}}>
              <p>Loading posts...</p>
            </div>
        )}
      </>
  );
}

export default PostsList;