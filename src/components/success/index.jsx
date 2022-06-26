import React, { useEffect } from 'react';

export default function Success({ message = "Success!", setSuccess = () => { } }) {

    useEffect(() => {
        setTimeout(() => {
            setSuccess(false);
        }, 10000);
    }, []);

    return (<div style={{ textAlign: "center", margin: "1em auto" }}>
        <span
            style={{
                padding: "1em 2em",
                backgroundColor: "#D3F8D3",
                color: "#189A18",
                borderRadius: 6
            }}>
            {message}
        </span>
    </div>)
}
