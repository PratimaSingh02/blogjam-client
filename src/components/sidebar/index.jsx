import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../../services/category';
import { Typography, Box } from '@mui/material';
import { Parent, Title, CategoryContainer, TrendContainer, Trending, LikeIcon } from "./style";
import millify from 'millify';
import { getTrendingPosts } from '../../services/post';

export default function Sidebar() {
    const [categories, setCategories] = useState([]);
    const [trending, setTrending] = useState([]);

    useEffect(() => {
        try {
            (async () => {
                const result = await getAllCategories();
                setCategories(result);
            })();
        } catch (error) {
            console.log(error);
        }
        try {
            (async () => {
                const result = await getTrendingPosts();
                setTrending(result);
            })();
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <Parent>
            <Title>
                Categories
            </Title>
            <CategoryContainer>
                {
                    categories.map((category, index) => (
                        <Link
                            to={`?category=${category}`}
                            className="link"
                            key={index}
                            style={{ margin: "1em" }}
                        >
                            <Typography variant="body2" color="#145DA0" fontStyle="italic">
                                {category}
                            </Typography>
                        </Link>
                    ))
                }
            </CategoryContainer>

            <Title>
                Top 10
            </Title>
            <TrendContainer>
                {
                    trending.map((post, index) =>
                    (<Link to={`/blog/${post._id}`} className="link" key={index}>
                        <Trending>
                            {
                                post.title.split(" ").length > 4 ?
                                    post.title.split(" ").slice(0, 4).join(" ") + "..." :
                                    post.title
                            }
                            <Box display="flex" alignItems="center" ml="1em">
                                <LikeIcon />
                                {millify(post?.likesCount)}
                            </Box>
                        </Trending>
                    </Link>))
                }
            </TrendContainer>
        </Parent>
    )
}
