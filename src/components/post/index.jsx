import React from 'react';
import { Link } from "react-router-dom";
import millify from "millify";
import "./post.css";
import { Typography } from '@mui/material';
import { PostContainer, PostTopbar, PostImage, IconContainer, Username, LikeIcon, CommIcon, PostTitle, PostDate, PostBottombar, PostCategory } from './style';
import { Box } from '@mui/system';

export default function Post({ post }) {
    return (
        <PostContainer>
            <PostTopbar >
                <Username variant="h6">
                    @{post?.username}
                </Username>
                <IconContainer >
                    <LikeIcon />
                    <Typography variant="body1" color="white" mr="1em">
                        {millify(post?.likes?.length)}
                    </Typography>
                    <CommIcon />
                    <Typography variant="body1" color="white">
                        {millify(post?.comments?.length)}
                    </Typography>
                </IconContainer>

            </PostTopbar>
            {
                post.photo &&
                <PostImage
                    src={process.env.REACT_APP_PUBLIC_FOLDER_URL + post.photo}
                    alt="BlogJam"
                />
            }
            <Box textAlign="center" >
                <Link to={`/blog/${post._id}`} className="link">
                    <PostTitle variant="h5">
                        {
                            post.title.split(" ").length > 4 ?
                                post.title.split(" ").slice(0, 4).join(" ") + "..." :
                                post.title
                        }
                    </PostTitle>
                </Link>
                <PostDate variant="body1">
                    {new Date(post.createdAt).toDateString()}
                </PostDate>
            </Box>
            <PostBottombar>
                {
                    post.categories.length > 0 ?
                        post.categories.map((category, index) => (
                            <PostCategory variant="caption" key={index}>
                                {category?.toLocaleLowerCase()}
                            </PostCategory >
                        )) :
                        <PostCategory variant="caption">
                            {"Category not provided"}
                        </PostCategory>
                }
            </PostBottombar>
        </PostContainer>
    )
}
