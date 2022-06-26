import React, { memo, useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Context } from '../../context/Context';
import Error from '../../components/error';
import { uploadImage } from '../../services/image';
import { createPost } from '../../services/post';
import Categories from '../../components/categories';
import Description from '../../components/description';
import Image from '../../components/image';
import "./write.css";

export default function Write() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState([]);
    const [file, setFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        if (file && title.trim() !== "" && description.length > 0) {
            try {
                let filename = await uploadImage(file);//store just filename in db
                const result = await createPost(user.username, title, description, categories, filename);
                navigate("/blog/" + result._id);
            } catch (error) {
                setError(error);
            }
        }
        else
            setError("Please add an image, unique title and description.");
    }

    return (
        <div className="write">
            {error && <Error message={error} setError={setError} />}
            <Categories categories={categories} setCategories={setCategories} />
            <Image
                image={file}
                handleImageUpload={e => setFile(e.target.files[0])}
                updateMode={true}
                write={true}
            />
            <div className="submit-div">
                <textarea
                    type="text"
                    placeholder="Title..."
                    className="title"
                    autoFocus={true}
                    onChange={e => setTitle(e.target.value)}
                />
                <button className="write-submit" onClick={handleSubmit}>Publish</button>
            </div>
            <Description
                updateMode={true}
                description={description}
                setDescription={setDescription}
            />

        </div>
    )
}
