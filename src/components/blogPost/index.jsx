import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import millify from 'millify';
import { Box, Button, Chip, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ThumbUp from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import "./blogPost.css";
import { Context } from '../../context/Context';
import { LoadingContext } from '../../context/LoadingContext';
import Error from '../error';
import { updatePost, getPost, deletePost } from '../../services/post';
import { uploadImage } from '../../services/image';
import Categories from '../categories';
import Description from '../description';
import Image from '../image';

export default function BlogPost() {
    const location = useLocation();
    const blogId = location.pathname.split("/")[2];
    const [updateMode, setUpdateMode] = useState(false);
    const [post, setPost] = useState({});
    const [categories, setCategories] = useState([]);
    const [description, setDescription] = useState([]);
    const [error, setError] = useState(false);
    const comment = useRef();
    const { user } = useContext(Context);
    const { loadingShow, loadingHide } = useContext(LoadingContext);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            loadingShow();
            try {
                const result = await getPost(blogId);
                setCategories(result.categories);
                setDescription(result.description);
                delete result.categories;
                delete result.description;
                setPost(result);
            } catch (error) {
                setError(error);
            }
            finally {
                loadingHide();
            }
        })();
    }, [blogId]);

    const handleDelete = async (e) => {
        loadingShow();
        try {
            await deletePost(blogId, { username: user.username });
            navigate("/");
        } catch (error) {
            setError(error);
        }
        finally {
            loadingHide();
        }
    }

    const handleImageUpdate = async (e) => {
        if (e.target.files[0]) {
            loadingShow();
            try {
                let filename = await uploadImage(e.target.files[0]);
                console.log(filename);
                setPost({ ...post, photo: filename });
            } catch (error) {
                setError(error);
            }
            finally {
                loadingHide();
            }
        }
    }

    const handleUpdate = async (e) => {
        if (post.photo && post.title.trim() !== "" && description.length > 0) {
            const updatedPost = {
                username: user.username,
                title: post.title,
                description,
                categories,
                photo: post.photo
            }
            loadingShow();
            try {
                await updatePost(blogId, updatedPost);
                setUpdateMode(false);
            } catch (error) {
                setError("Unable to update the blog! Make sure the title is unique.");
            }
            finally {
                loadingHide();
            }
        }
        else
            setError("Please add an image, unique title and description.");
    }

    const handleLikeClick = async (like) => {
        let tempLikes = [...post.likes];
        if (like)
            tempLikes.push(user.username);
        else
            tempLikes = tempLikes.filter(username => username !== user.username);
        try {
            await updatePost(blogId, { username: post.username, likes: tempLikes });
            setPost({ ...post, likes: tempLikes });
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddComment = async () => {
        let tempComments = [
            ...post.comments, {
                comment: comment.current.value,
                username: user.username
            }];
        if (comment.current.value.trim() !== "") {
            try {
                await updatePost(blogId, { username: post.username, comments: tempComments });
                setPost({ ...post, comments: tempComments });
                comment.current.value = "";
            } catch (error) {
                setError("Unable to add comment! Try again.");
            }
        }
    }

    const handleCommentDelete = async (e, index) => {
        let tempComments = post.comments.filter((item, itemIndex) => itemIndex !== index);
        try {
            await updatePost(blogId, { username: post.username, comments: tempComments });
            setPost({ ...post, comments: tempComments });
        } catch (error) {
            setError("Unable to delete comment! Try again.");
        }
    }


    return (
        <Box width="95%" margin="auto">
            {error && <Error message={error} setError={setError} />}
            {
                updateMode ? (<>
                    <Categories categories={categories} setCategories={setCategories} />
                    <Image
                        image={post.photo}
                        handleImageUpload={handleImageUpdate}
                        updateMode={true}
                        write={false}
                    />
                </>) :
                    (<div className="categoryContainer">
                        <Typography variant="body1" mr="1em">
                            Categories
                        </Typography>
                        <div style={{ display: "flex", alignItems: "center", overflow: "auto" }}>
                            {
                                categories.map((category, index) => (
                                    <Chip
                                        key={index}
                                        label={category}
                                        sx={{ margin: "0 0.2em" }}
                                    />
                                ))

                            }
                        </div>
                    </div>)
            }

            <div className="blogPost-wrapper">
                {
                    post.photo &&
                    <img
                        src={process.env.REACT_APP_PUBLIC_FOLDER_URL + post.photo}
                        alt=""
                        className="blogPost-image"
                    />
                }
                {
                    updateMode ?
                        <textarea
                            type="text"
                            placeholder='Title...'
                            value={post.title}
                            onChange={e => setPost({ ...post, title: e.target.value })}
                            className="blogPost-title blogPost-title-input "
                            autoFocus
                        /> :
                        (<h1 className="blogPost-title">
                            {post.title}
                            {
                                post.username === user?.username &&
                                (<div className="blogPost-edit">
                                    <i
                                        className="blogPost-icon fa-solid fa-pen-to-square"
                                        onClick={e => setUpdateMode(true)}
                                    />
                                    <i
                                        className="blogPost-icon fa-solid fa-trash-can"
                                        onClick={handleDelete}
                                    />
                                </div>)
                            }
                        </h1>)
                }

                <div className="blogPost-info">
                    <span className="blogPost-author">
                        Author:
                        <Link to={`/?user=${post.username}`} className="link">
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="blogPost-date">
                        {new Date(post.createdAt).toDateString()}
                    </span>
                </div>

                <Description
                    updateMode={updateMode}
                    description={description}
                    setDescription={setDescription}
                />
                {
                    updateMode &&
                    <button className="blogPost-update-button" onClick={handleUpdate}>
                        Update
                    </button>
                }
                <Box display="flex" alignItems="center" mt="2em">
                    {
                        user.username !== post.username ? (<>
                            {
                                post.likes?.includes(user.username) ?
                                    <ThumbUp className="like-icon"
                                        onClick={e => handleLikeClick(false)}
                                    /> :
                                    <ThumbUpOffAltIcon className="like-icon"
                                        onClick={e => handleLikeClick(true)}
                                    />
                            }
                        </>) :
                            <ThumbUp className="like-icon" />
                    }
                    {millify(post.likes?.length || 0)}
                </Box>
                <Typography variant="body1" color="#68BBE3" mt="1.5em">
                    Comments
                </Typography>
                {
                    post?.comments?.map((commentObj, index) => (
                        <Box display="flex" justifyContent="space-between" mt="1em" key={index}>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="caption" sx={{ wordBreak: "break-word" }} >
                                    {commentObj.comment}
                                </Typography>
                                <Typography variant="caption" fontStyle="italic">
                                    @{commentObj.username}
                                </Typography>
                            </Box>
                            {
                                user.username === post.username &&
                                <DeleteOutlineIcon
                                    className="like-icon"
                                    sx={{ color: "red" }}
                                    onClick={e => handleCommentDelete(e, index)}
                                />
                            }
                        </Box>

                    ))
                }
                <Box display="flex" justifyContent="space-between" mt="0.7em">
                    {
                        user.username !== post.username &&
                        (<>
                            <textarea
                                ref={comment}
                                placeholder="Add Comment"
                                style={{ marginRight: "1em" }}
                                className="blogPost-comment-input"
                                rows={3}
                            />
                            <Button variant="contained" onClick={handleAddComment} sx={{ width: 150 }}>
                                Add
                            </Button>
                        </>)
                    }
                </Box>
            </div>
        </Box>
    )
}
