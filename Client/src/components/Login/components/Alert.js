import React, { useRef } from "react";
import "./Alert.scss";
import { motion, AnimatePresence } from "framer-motion";
const Alert = ({ toggleAlert, setToggleAlert, alertData }) => {
    const closeAlert = (e) => {
        if (ref.current === e.target) {
            console.log("hi");
            setToggleAlert(false);
        }
    };
    let data;
    if (alertData) data = JSON.parse(alertData).errors[0].msg;
    const ref = useRef();
    console.log(data);
    return (
        <AnimatePresence>
            {toggleAlert && (
                <div ref={ref} onClick={closeAlert} className="AlertContainer">
                    <motion.div
                        initial={{ y: "-100vh" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100vh" }}
                        className="alertContent"
                    >
                        <div className="alertContent__header">Alert</div>
                        <div className="alertContent__content">{data}</div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Alert;
