import apiFacade from "../api/postFacade";
import DeleteIcon from '@material-ui/icons/Delete';
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import loginFacade from "../api/userFacade.js";

export default function Categories({ loggedIn }) {
    const [dataFromServer, setDataFromServer] = useState([]);
    const [category, setCategory] = useState("sport");
    const [user, setUser] = useState("");

    function handleDelete() {
        apiFacade.getCategoryPosts(category).then((data) => {
            setDataFromServer(data);
        })
    }

    function handleCategory(event) {
        event.preventDefault();
        setCategory(event.target.value);
    }

    useEffect(() => {
        apiFacade.getCategoryPosts(category).then((data) => {
            setDataFromServer(data);
        })
    }, [category]);

    useEffect(() => {
        if (loggedIn) {
            const token = loginFacade.getToken();
            const decodedToken = jwt_decode(token);
            setUser(decodedToken);
        }
    }, [loggedIn]);

    const toShow = dataFromServer ? (
        <div> {
            dataFromServer.length > 0 ? dataFromServer.map((m, index) => (
                <div key={index}>
              <div className="post">
                
                <div className="postUsername">{m.username}</div>
                <div className="postText">{m.post}</div>
                <div style={{ float: "right"}}>{m.date}</div>
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
            </div>)) : null}
        </div>) : ("loading...")

    return (
        <div className="container-fluid padding">
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6 text-center">
                    <h2 className="mt-5">Forum posts</h2>
                    <select className="btn btn-light rightBtn" name="Category" id="category" onClick={handleCategory}>
                        <option value="sport">Sport</option>
                        <option value="news">News</option>
                        <option value="social">Social</option>
                        <option value="wealth">Wealth</option>
                        <option value="gaming">Gaming</option>
                    </select>
                    <hr></hr>
                    <h4 className="mt-5">{category} posts</h4>
                    {toShow}
                    <div className="col-3"></div>
                </div>
            </div>
        </div>
    );
}
