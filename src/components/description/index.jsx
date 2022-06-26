import React from 'react';
import { Box, Button } from '@mui/material';
import "./description.css";

export default function Description({ updateMode = false, description, setDescription = () => { } }) {

    const handleDescriptionChange = (e, index) => {
        if (e.target.value.trim() === "") {
            //remove para
            setDescription(description.filter((item, itemIndex) => itemIndex !== index));
        }
        else {
            //update para
            let textarea = document.getElementById(`textarea-${index}`);
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
            let tempDescription = [...description];
            tempDescription[index] = {
                ...tempDescription[index],
                value: e.target.value
            }
            setDescription(tempDescription);
        }
    }

    const handleAddDescription = (type) => {
        setDescription([...description,
        {
            type,
            value: ""
        }]);
    }

    React.useEffect(() => {
        if (updateMode)
            description.forEach((descObj, index) => {
                let textarea = document.getElementById(`textarea-${index}`);
                textarea.style.height = "auto";
                textarea.style.height = textarea.scrollHeight + "px";
            });
    }, [updateMode])

    return (
        <div className="write-section">
            {updateMode && (<Box display="flex" flexWrap="wrap" alignItems='center'>
                Add
                <Button onClick={e => handleAddDescription('PARAGRAPH')}>Paragraph</Button>
                <Button onClick={e => handleAddDescription('HEADING')}>Heading</Button>
                <Button onClick={e => handleAddDescription('QUOTE')}>Quote</Button>
            </Box>)}
            {
                description.map((descObj, index) => {
                    if (updateMode)
                        return (<textarea
                            placeholder={descObj.type === "HEADING" ? "Heading..." :
                                descObj.type === "QUOTE" ? "Quote..." : "Paragraph..."}
                            type="text"
                            className={descObj.type === "HEADING" ? "heading write-input" :
                                descObj.type === "QUOTE" ? "quote write-input" : "write-input"}
                            key={index}
                            onChange={(e) => handleDescriptionChange(e, index)}
                            value={descObj.value}
                            id={`textarea-${index}`}
                        >
                        </textarea>)
                    else
                        return (<p key={index}
                            className={descObj.type === "HEADING" ? "heading write-input" :
                                descObj.type === "QUOTE" ? "quote write-input" : "write-input"}
                            style={{ marginTop: "0.6em" }}
                        >
                            {descObj.type === "QUOTE" && `" `}
                            {descObj.value}
                            {descObj.type === "QUOTE" && ` "`}
                        </p>)
                })
            }
        </div>
    )
}
