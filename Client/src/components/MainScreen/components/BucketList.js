//Essentials
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../App";
//Icons
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
//Apollo and Network
import { gql, useMutation, useQuery } from "@apollo/client";
import axios from "../../axios";
//Styling
import { motion, AnimatePresence } from "framer-motion";
import "./BucketList.scss";

//GQL Queries
const GET_BUCKET_LIST = gql`
    query getBucketList($id: String) {
        getBucketList(id: $id) {
            bucketList
        }
    }
`;

const SEND_SELECTED_MOVIES = gql`
    mutation addMovie($id: String, $movies: [String]) {
        addMovie(id: $id, movies: $movies) {
            name
        }
    }
`;

const REMOVE_FROM_BUCKET_LIST = gql`
    mutation removeToBucketList($id: String, $movie: String) {
        removeToBucketList(id: $id, movie: $movie) {
            name
        }
    }
`;

const BucketList = ({ handleRender, bucketList, showModal }) => {
    const Auth = useContext(AuthContext);
    const [sendSelectedMovies, { selectedData }] = useMutation(
        SEND_SELECTED_MOVIES
    );
    //Get BucketList
    const { loading, data, err, refetch } = useQuery(GET_BUCKET_LIST, {
        variables: { id: Auth },
    });

    const [removeFromBucket, { selectedDataBucket }] = useMutation(
        REMOVE_FROM_BUCKET_LIST
    );

    useEffect(() => {
        refetch();
    }, [showModal]);

    if (loading) return null;

    const handleAlreadyWatched = async (movie) => {
        console.log(movie);
        await removeFromBucket({
            variables: { id: Auth, movie: movie },
        });
        refetch();
        await sendSelectedMovies({
            variables: { id: Auth, movies: [movie] },
        });
        await axios.get(
            `/addMovieToRecommend?movie=${movie.split("#")[0]}&id=${Auth}`
        );
    };

    const handleRemoveFromBucket = async (movie) => {
        await removeFromBucket({
            variables: { id: Auth, movie: movie },
        });
        refetch();
    };
    console.log(data.getBucketList.bucketList.length);

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
                            data.getBucketList.bucketList.length != 0 ? (
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
                                                onClick={() =>
                                                    handleAlreadyWatched(movie)
                                                }
                                                className="bucketListContainer__bucketList-movie__buttons"
                                                style={{ color: "#118DF0" }}
                                            />
                                            <AiOutlineClose
                                                onClick={() =>
                                                    handleRemoveFromBucket(
                                                        movie
                                                    )
                                                }
                                                className="bucketListContainer__bucketList-movie__buttons"
                                                style={{ color: "#FF304F" }}
                                            />
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="bucketListContainer__bucketList-movie">
                                    <div id="no-movie">
                                        Nothing buzzing around here, try adding
                                        few movies to your bucket List!!
                                    </div>
                                </li>
                            )}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default BucketList;
