import React, { useEffect } from 'react'

export default function Error({ setError = () => { }, message = "Try again." }) {

    useEffect(() => {
        setTimeout(() => {
            setError(false);
        }, 10000);
    }, []);

    return (<div style={{ textAlign: "center", margin: "1em auto" }}>
        <span
            style={{
                padding: "1em 2em",
                backgroundColor: "#ffcccb",
                color: "#FF0000",
                borderRadius: 8
            }}>
            {message}
        </span>
    </div>)
}
