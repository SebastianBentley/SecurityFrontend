import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import facade from "../api/userFacade";
//import { button } from "mdbreact";
import "./registerstyles.css";

function CreatePasswordModal() {
    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [message, setMessage] = useState(null);
    const init = { username: "", password: "", newPassword1: "", newPassword2: ""};
    const [newCredentials, setNewCredentials] = useState(init);


    const changePassword = (evt) => {
        evt.preventDefault();
        facade.changePassword(newCredentials.username, newCredentials.password, newCredentials.newPassword1, newCredentials.newPassword2)
            .catch(err => err.fullError ? err.fullError.then(res => setMessage(res.message)) : "");
        message ? setMessage("Password Changed") : setMessage("")


        handleClose();
    };
    const onChange = (evt) => {
        setNewCredentials({
            ...newCredentials,
            [evt.target.id]: evt.target.value,
        });
    };



    return (
        <>
            <div>
                <button
                    color="primary"
                    size="m"
                    className="mr-auto btn btn-dark"
                    onClick={handleShow}
                >
                    Change Password
        </button>
            </div>
            <Modal className="full_modal" show={showModal} onHide={handleClose}>
                <Modal.Header closeButton={true} className="modal_header">
                    <Modal.Title>Change Password here</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal_header">
                    <div>
                        <form onChange={onChange}>
                            <input className="input" placeholder="User name" id="username" />
                            <input className="input" placeholder="Password" id="password" name="password" type="password" />
                            <input className="input" placeholder="New Password" id="newPassword1" name="newPassword1" type="password" />
                            <input className="input" placeholder="New Password Repeated" id="newPassword2" name="newPassword2" type="password" />
                        </form>
                    </div>
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
                    <button
                        color="primary"
                        size="m"
                        className="mr-auto btn btn-dark"
                        onClick={changePassword}
                    >
                        Save Changes
          </button>
                </Modal.Footer>
            </Modal>
            <p>{message}</p>
        </>
    );
}

export default CreatePasswordModal;