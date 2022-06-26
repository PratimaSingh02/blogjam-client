import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import { LoadingContext } from '../../context/LoadingContext';
import Post from "../post";
import Error from '../../components/error';
import { getAllPosts } from '../../services/post';
import { PostsContainer } from './style';

export default function Posts({ user = false }) {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(false);
    const { search } = useLocation();//get search Params ie. ?
    const { loadingShow, loadingHide } = useContext(LoadingContext);

    useEffect(() => {
        (async () => {
            loadingShow();
            try {
                const result = await getAllPosts(user ? `?user=${user}` : search);
                setPosts(result);
            } catch (error) {
                setError("Unable to get posts! Try again.");
            }
            finally {
                loadingHide();
            }
        })();
    }, [search]);

    return (<>
        {error && <Error message={error} setError={setError} />}
        {
            user && posts.length === 0 && <Typography variant="body1" m="2em">
                No blogs posted
            </Typography>
        }
        <PostsContainer>
            {
                posts.map((post, index) => (
                    <Post post={post} key={index} />
                ))
            }
        </PostsContainer>
    </>)
}
