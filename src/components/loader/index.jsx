import React from 'react';
import Box from "@mui/material/Box";
import LinearProgress from '@mui/material/LinearProgress';

export default function Loader() {
    return (<>
        <Box sx={{
            position: "fixed", /* Sit on top of the page content */
            width: "100%", /* Full width (cover the whole page) */
            height: "100%", /* Full height (cover the whole page) */
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)", /* Black background with opacity */
            zIndex: 1500,
        }}>
            <LinearProgress />
        </Box>
    </>)
}
