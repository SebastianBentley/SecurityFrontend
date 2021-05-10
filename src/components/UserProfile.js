import React, { useState, useEffect } from "react";
import { storage } from "../firebase";
import { Modal } from "react-bootstrap";
function UserProfile({ username, showProfile }) {
  const [showProf, setShow] = useState(showProfile);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (username !== "unnamed") {
      handleShow();
    }
    const storageRef = storage.ref();
    if (username !== undefined) {
      storageRef
        .child("images/" + username)
        .getDownloadURL()
        .then((url) => {
          setUrl(url);
        })
        .catch((error) => {
          setUrl(
            "https://firebasestorage.googleapis.com/v0/b/image-react-52fcf.appspot.com/o/images%2Funnamed.png?alt=media&token=766f2435-cf77-40bf-bdb0-22aad42d790e"
          );
        });
    }
  }, [username]);

  return (
    <>
      <div className="container-fluid padding">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6 text-center"></div>
        </div>
        <div className="col-3"></div>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6 text-center">{/* {toShow} */}</div>
          <div className="col-3"></div>
        </div>
      </div>
      <Modal className="full_modal" show={showProf} onHide={handleClose}>
        <Modal.Header closeButton={true} className="modal_header">
          <Modal.Title>Profilepage</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal_header">
          <h2 className="mt-2">{username}</h2>
          <img
            style={{ height: "150px", width: "150px" }}
            src={url}
            alt="firebase"
          />
        </Modal.Body>
        <Modal.Footer className="modal_footer">
          <button
            color="primary"
            size="m"
            className="modal_button btn btn-dark"
            onClick={handleClose}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default UserProfile;
