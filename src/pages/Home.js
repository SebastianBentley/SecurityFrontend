import apiFacade from "../api/postFacade";
import React, { useState, useEffect } from "react";

export default function Home() {

  const [dataFromServer, setDataFromServer] = useState([]);
  const [userPost, setUserPost] = useState("");

  useEffect(() => {
    apiFacade.getPosts().then((data) => {
      setDataFromServer(data);
    })
  }, [handleSubmit]);

  function handlePostChange(event) {
    event.preventDefault();
    const value = event.target.value;
    setUserPost(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    apiFacade.addPost(userPost, localStorage.getItem("username"));
    setUserPost("");
  }

  const toShow = dataFromServer ? (
    <div>
      {dataFromServer.length > 0 ?
        dataFromServer.map((m, index) => (
          <div key={index}>
            <p>{m.post} {m.username}</p>
          </div>
        )) : null}
    </div>
  ) : ("loading...")


  return (
    <div className="container-fluid padding">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 text-center">
          <h2 className="mt-5">Forum posts</h2>
          <hr></hr>
          <h4 className="mt-5">Login to post</h4>
          <div className="form-group">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              onChange={handlePostChange}
              value={userPost}
            ></textarea>
          </div>
          <button type="button" className="text-center btn btn-success" onClick={handleSubmit}>Post</button>
          {toShow}
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
}