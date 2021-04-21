import apiFacade from "../api/postFacade";
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import loginFacade from "../api/userFacade.js";

function Profile({ loggedIn }) {
  const [dataFromServer, setDataFromServer] = useState("Loading...");
  const [dataFromServerPost, setDataFromServerPost] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    if (loggedIn) {
      const token = loginFacade.getToken();
      const decodedToken = jwt_decode(token);
      setUser(decodedToken);
    }
  }, [loggedIn]);

  useEffect(() => {
    loginFacade.fetchData().then((data) => setDataFromServer(data.msg));
  }, []);

  useEffect(() => {
    apiFacade
      .getUserPosts(user.username)
      .then((data) => setDataFromServerPost(data));
  }, [user]);

  const toShow = dataFromServerPost ? (
    <div>
      {" "}
      {dataFromServerPost.length > 0
        ? dataFromServerPost.map((m, index) => (
            <div key={index}>
              <p>
                {m.post}
                {m.username}
                {m.date}
              </p>
            </div>
          ))
        : null}
    </div>
  ) : (
    "loading..."
  );

  return (
    <div>
      <h2> Profile Page</h2>
      {toShow}
      <h3>{dataFromServer}</h3>
    </div>
  );
}
export default Profile;
