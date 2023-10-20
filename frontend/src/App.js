import './App.css';
import ClientsList from "./components/ClientsList";
import PostsList from "./components/PostsList";
import MainHeader from "./components/MainHeader";
import {useState} from "react";

function App() {
  const [modalIsVisible, setModalIsVisible] = useState(true);

  function showModalHandler() {
    setModalIsVisible(true);
  }

  function hideModalHandler() {
    setModalIsVisible(false);
  }

  return (
      <>
        <MainHeader onCreatePost={showModalHandler}/>
        <PostsList isPosting={modalIsVisible} onStopPosting={hideModalHandler}/>
        <ClientsList/>
      </>
  )
}

export default App;