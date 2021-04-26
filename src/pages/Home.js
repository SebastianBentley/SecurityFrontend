import apiFacade from "../api/postFacade";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
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
              <div style={{ border: "1px solid grey", padding: "10px", borderRadius: "20px", marginTop: "15px"}}>
                <div style={{ float: "right"}}>{m.date}</div>
                <div style={{ float: "left", marginBottom: "5px"}}>Post by: {m.username}</div>
                <div style={{ marginLeft: "30px"}}>{m.post}</div>
                </div>
              {user.roles === "admin" ? (
                <button
                  type="submit"
                  onClick={() => apiFacade.deletePost(m.id).then(handleDelete)}
                  className="btn btn-danger mt-2"                 
                >
                  <DeleteIcon />
                </button>
              ) : (
                ""
              )}
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
          <select name="Category" id="category" onClick={handleCategory}>
            <option value="sport">Sport</option>
            <option value="news">News</option>
            <option value="social">Social</option>
            <option value="wealth">Wealth</option>
            <option value="gaming">Gaming</option>
          </select>
          <button
            type="button"
            className="text-center btn btn-primary ml-2"
            onClick={handleSubmit}
          >
            Post
          </button>
          {toShow}
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
}
