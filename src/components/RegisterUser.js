import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import facade from "../api/userFacade";
//import { button } from "mdbreact";
import "./registerstyles.css";

function CreateModal() {
    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [message, setMessage] = useState(null);
    const init = { username: "", password: "" };
    const [newCredentials, setNewCredentials] = useState(init);


    const createUser = (evt) => {
        evt.preventDefault();
        facade.registerUser(newCredentials.username, newCredentials.password)
            .catch(err => err.fullError ? err.fullError.then(res => setMessage(res.message)) : "");
        message ? setMessage("User Created") : setMessage("")


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
                <p className="mt-2">Not a member yet? Register here:</p>
                <button
                    color="primary"
                    size="m"
                    className="mr-auto"
                    onClick={handleShow}
                >
                    Register
        </button>
            </div>
            <Modal className="full_modal" show={showModal} onHide={handleClose}>
                <Modal.Header closeButton={true} className="modal_header">
                    <Modal.Title>Register your account here</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal_header">
                    <div>
                        <form onChange={onChange}>
                            <input className="input" placeholder="User name" id="username" />
                            <input
                                className="input"
                                placeholder="Password"
                                id="password"
                                name="password"
                                type="password"
                            />
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal_footer">
                    <button
                        color="primary"
                        size="m"
                        className="modal_button"
                        onClick={handleClose}
                    >
                        Close
          </button>
                    <button
                        color="primary"
                        size="m"
                        className="mr-auto"
                        onClick={createUser}
                    >
                        Save Changes and register
          </button>
                </Modal.Footer>
            </Modal>
            <p>{message}</p>
        </>
    );
}

export default CreateModal;