import React, { useContext } from "react";
import "./BucketList.scss";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { AuthContext } from "../../App";
import { gql, useMutation, useQuery } from "@apollo/client";

const GET_BUCKET_LIST = gql`
    query getBucketList($id: String) {
        getBucketList(id: $id) {
            bucketList
        }
    }
`;

const BucketList = ({ handleRender, bucketList }) => {
    const Auth = useContext(AuthContext);
    const { loading, data, err } = useQuery(GET_BUCKET_LIST, {
        variables: { id: Auth },
    });

    if (loading) return null;

    return (
        <>
            <AnimatePresence>
                {bucketList && (
                    <motion.div
                        initial={{ y: "-100vh" }}
                        animate={{ y: 0, transition: { delay: 0.7 } }}
                        className="bucketListContainer"
                        exit={{ opacity: 0, delay: 0 }}
                    >
                        <AiOutlineClose
                            className="bucketList-exit"
                            onClick={handleRender}
                        />
                        <div className="bucketListContainer__title">
                            Your Bucket List
                        </div>
                        <ul className="bucketListContainer__bucketList">
                            {data &&
                                data.getBucketList.bucketList.map((movie) => (
                                    <li
                                        key={movie.split("#")[1]}
                                        className="bucketListContainer__bucketList-movie"
                                    >
                                        <div className="bucketListContainer__bucketList-movie__title">
                                            {movie.split("#")[0]}
                                        </div>
                                        <div>
                                            <AiOutlineCheck
                                                className="bucketListContainer__bucketList-movie__buttons"
                                                style={{ color: "#118DF0" }}
                                            />
                                            <AiOutlineClose
                                                className="bucketListContainer__bucketList-movie__buttons"
                                                style={{ color: "#FF304F" }}
                                            />
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default BucketList;
