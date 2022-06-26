import React from 'react';
import BlogPost from '../../components/blogPost';
import Sidebar from "../../components/sidebar";
import "./blog.css";

export default function Blog() {
    return (
        <div className="blog">
            <BlogPost />
            <Sidebar />
        </div>
    )
}
