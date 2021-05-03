import apiFacade from "../api/postFacade";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble"
import jwt_decode from "jwt-decode";
import loginFacade from "../api/userFacade.js";


export default function Home({ loggedIn }) {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [userPost, setUserPost] = useState("");
  const [user, setUser] = useState("");
  const [category, setCategory] = useState("sport");

  useEffect(() => {
    apiFacade.getPosts().then((data) => {
      setDataFromServer(data);
    });
  }, []);

  function handlePostChange(event) {
    event.preventDefault();
    const value = event.target.value;
    setUserPost(value);
  }

  function handleDelete() {
    apiFacade.getPosts().then((data) => {
      setDataFromServer(data);
    });
  }

  function handleCategory(event) {
    event.preventDefault();
    setCategory(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    apiFacade.addPost(userPost, user.username, category).then(() => {
      apiFacade.getPosts().then((data) => {
        setDataFromServer(data);
      });
    });
    setUserPost("");
  }

  useEffect(() => {
    if (loggedIn) {
      const token = loginFacade.getToken();
      const decodedToken = jwt_decode(token);
      setUser(decodedToken);
    }
  }, [loggedIn]);

  const toShow = dataFromServer ? (
    <div>
      {" "}
      {dataFromServer.length > 0
        ? dataFromServer.map((m, index) => (
          <div key={index}>
            <div className="post">

              <div className="postUsername">{m.username}</div>
              <div className="postText">{m.post}</div>
              <div style={{ float: "right" }}>{m.date}</div>
              {user.roles === "user" ? (
                <button
                  type="submit"
                  onClick={() => console.log("lol")}
                  className="btn btn-success mr-2 deleteBtn"
                ><ChatBubbleIcon /></button>
              ) : ("")}

              {user.roles === "admin" ? (
                <button
                  type="submit"
                  onClick={() => apiFacade.deletePost(m.id).then(handleDelete)}
                  className="btn btn-danger deleteBtn"
                >
                  <DeleteIcon />
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        ))
        : null}
    </div>
  ) : (
    "loading..."
  );

  return (
    <div className="container-fluid padding">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 text-center">
          <h2 className="mt-5">Forum posts</h2>
          <hr></hr>

          {user.roles === "user" ? (
            <div className="postBox">
              <h4>A penny for your thots?</h4>
              <div className="form-group">
                <textarea
                  className="form-control txtArea"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  onChange={handlePostChange}
                  value={userPost}
                ></textarea>
                <p>{userPost.length}/280</p>
              </div>
              <select className="btn btn-light rightBtn" name="Category" id="category" onClick={handleCategory}>
                <option value="sport">Sport</option>
                <option value="news">News</option>
                <option value="social">Social</option>
                <option value="wealth">Wealth</option>
                <option value="gaming">Gaming</option>
              </select>
              <button
                type="button"
                className="text-center btn btn-dark ml-2 rightBtn"
                onClick={handleSubmit}
              >
                Post
              </button>
            </div>
          ) : (
            <h4 className="mt-5">Login to post</h4>
          )}

          {toShow}
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
}
