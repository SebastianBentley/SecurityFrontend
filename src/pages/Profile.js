import apiFacade from "../api/postFacade";
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { storage } from "../firebase";
import loginFacade from "../api/userFacade.js";

function Profile({ loggedIn }) {
  const [dataFromServer, setDataFromServer] = useState("Loading...");
  const [dataFromServerPost, setDataFromServerPost] = useState([]);
  const [user, setUser] = useState("");
  const [errormsg, setErrormsg] = useState("");

  //Firebase
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${user.username}`).put(image); 
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        setErrormsg("Image must be a png/jpg and size must be below 5 MB")
      },
      () => {
        storage
          .ref("images")
          .child(user.username)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    );
  };


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

    const storageRef = storage.ref();
    if (user.username !== undefined) {
      storageRef
        .child("images/" + user.username)
        .getDownloadURL()
        .then((url) => {
          setUrl(url);
        })
        .catch((error) => {         
            setUrl("https://firebasestorage.googleapis.com/v0/b/image-react-52fcf.appspot.com/o/images%2Funnamed.png?alt=media&token=766f2435-cf77-40bf-bdb0-22aad42d790e")
        });
    }
  }, [user]);

  const toShow = dataFromServerPost ? (
    <div>
      {" "}
      {dataFromServerPost.length > 0
        ? dataFromServerPost.map((m, index) => (
            <div key={index}>
              <p>
              <div style={{ border: "1px solid grey", padding: "10px", borderRadius: "20px", marginTop: "15px"}}>
                <div style={{ float: "right"}}>{m.date}</div>
                <div style={{ float: "left", marginBottom: "5px"}}>Post by: {m.username}</div>
                <div style={{ float: "center", marginLeft: "30px"}}>{m.post}</div>
                </div>
              </p>
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
          <h2 className="mt-2">Profile Page</h2>
          <h3 className="mt-2">My posts:</h3>
          {toShow}
          <h3>Profile name: {user.username}</h3>
          <div>
            <div className="col-3"></div>
            <div className="row">
              <div className="col-3"></div>
              <div className="col-6 text-center">
              <img style={{ height: "150px", width: "150px" }} src={url} alt="firebase"/>
                <h5 className="mt-2">Change profile picture</h5>
                <input className="text-center" type="file" onChange={handleChange} />
                <br/>
                <button className="mt-2" onClick={handleUpload}>Upload</button>
                <progress className="text-center" value={progress} max="100" />
                <p>{errormsg}</p>
              </div>
            </div>
            <div className="col-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
