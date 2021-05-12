import apiFacade from "../api/postFacade";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble"
import jwt_decode from "jwt-decode";
import { Modal } from "react-bootstrap";
import loginFacade from "../api/userFacade.js";
import UserProfile from "../components/UserProfile.js"

export default function Home({ loggedIn }) {
  const [showModal, setShowComment] = useState(false);
  const [showProfile, setShow] = useState(false)
  const [username, setUserName] = useState("unnamed")
  const [dataFromServer, setDataFromServer] = useState([]);
  const [commentsFromServer, setCommentsFromServer] = useState([]);
  const [userPost, setUserPost] = useState("");
  const [userComment, setUserComment] = useState("");
  const [user, setUser] = useState("");
  const [category, setCategory] = useState("sport");
  const [postID, setPostID] = useState("");

  const handleClose = () => setShowComment(false);

  const handleShow = (postid) => { 
  setShowComment(true)
  setPostID(postid)
  apiFacade.getComments(postid).then((data) => {
    setCommentsFromServer(data);
  })
  }

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

  function postComment(event) {
    event.preventDefault();
    apiFacade.addComment(user.username, userComment, postID).then(() => {
      apiFacade.getComments(postID).then((data) => {
        setCommentsFromServer(data);
      })
    });
    setUserComment("");
  }

  function handleCommentChange(event) {
    event.preventDefault();
    const value = event.target.value;
    setUserComment(value);
  }

  useEffect(() => {
    if (loggedIn) {
      const token = loginFacade.getToken();
      const decodedToken = jwt_decode(token);
      setUser(decodedToken);
    }
  }, [loggedIn]);

  function handleUsername(username) {
    setUserName(username)
    setShow(true)
  }

  const showComments = commentsFromServer ? ( 
    <div>
      {" "}
       {commentsFromServer.length > 0 
       ? commentsFromServer.map((c, index) => (
         <div key={index}>
           <div className="comments">
           <div className="commentsUsername">{c.username}</div>  
           <div className="commentsPost">{c.post}</div>
           <div className="commentsDate">{c.date}</div>
           <br/>
           </div>
         </div>
       )) : null}
    </div>
) : ("") 

  const toShow = dataFromServer ? (
    <div>
      {" "}
      {dataFromServer.length > 0
        ? dataFromServer.map((m, index) => (
          <div key={index} id={m.id}>
            <div className="post">

              <div className="postUsername"><p onClick={() => handleUsername(m.username)} className="userName">{m.username}</p></div>
              <div className="postText">{m.post}</div>
              <div style={{ float: "right" }}>{m.date}</div>
              {user.roles === "user" ? (
                <button
                  id={m.id}
                  type="submit"
                  onClick={() => handleShow(m.id)}
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
              <select
                className="btn btn-light rightBtn"
                name="Category"
                id="category"
                onClick={handleCategory}
              >
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
          <div className="col-3">
            <UserProfile username={username} showProfile={showProfile} />
          </div>
        </div>
      </div>
      <>
        <Modal className="full_modal" show={showModal} onHide={handleClose}>
          <Modal.Header closeButton={true} className="modal_header">
            <Modal.Title>Comments</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal_header">
            <div>
              <form onChange={handleCommentChange}>
                <input className="input" placeholder="Comment" id="comment"/>
              </form>
              <button color="primary" size="m" className="mr-auto btn btn-dark" onClick={postComment}> Comment </button>
            </div>
            <br/>
            {showComments}
          </Modal.Body>
          <Modal.Footer className="modal_footer">
            <button color="primary" size="m" className="modal_button btn btn-dark" onClick={handleClose}>Close</button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}