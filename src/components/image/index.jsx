import React, { memo } from 'react';
import "./image.css";

function Image({ updateMode = false, write = false, image, handleImageUpload = () => { } }) {
    return (<>
        {
            write && image &&
            <img
                className="write-image"
                src={URL.createObjectURL(image)}//to display selected file
                alt=""
            />
        }
        {updateMode && (< >
            <label htmlFor="file-input" className="add-image-div">
                <i className="write-icon fa-solid fa-plus" />
                {image ? "Update Image" : "Add Image"}
            </label>
            <input
                type="file"
                id="file-input"
                style={{ display: "none" }}
                onChange={handleImageUpload}
            />
        </>)}
    </>)
}

export default memo(Image);
