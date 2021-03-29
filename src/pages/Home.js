import apiFacade from "../api/postFacade";
import React, { useState, useEffect } from "react";

export default function Home() {

    const [dataFromServer, setDataFromServer] = useState([]);

    useEffect(() => {
        apiFacade.getPosts().then((data) => {
           setDataFromServer(data);
        })
      }, []);

    return (
      <div className="container-fluid padding">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6 text-center">
            <h2 className="mt-5">Forum posts</h2>
            <hr></hr>
            <h4 className="mt-5">Login to post</h4>
            <div class="form-group">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
            <button type="button" class="text-center btn btn-success">Post</button>
                {dataFromServer && dataFromServer.length > 0 ?
                dataFromServer.map((m) =>( 
                    <>
                    <p>{m.post} {m.userName}</p>
                    </>
                )): null}
            <div className="col-3"></div>
          </div>
        </div>
      </div>
    );
  }