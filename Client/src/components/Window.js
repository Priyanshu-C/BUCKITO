import React, { useState } from "react";
import Modal from "./Modal";

const Window = () => {
    const [showModal, setShowModal] = useState(true);
    const openModal = () => {
        setShowModal((prev) => !prev);
        console.log("open/close");
    };
    return (
        <>
            <div
                style={{
                    filter: showModal ? "blur(1px)" : "none",
                    width: "100px",
                    height: "100px",
                    position: "absolute",
                    display: "flex",
                }}
                onClick={openModal}
            >
                Hello
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}></Modal>
        </>
    );
};

export default Window;
