import { styled } from '@mui/system';
import { Typography } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
    width: 200,
    height: "100vh",
    position: "fixed",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "5px 0 5px -5px #333",
    paddingTop: "1em",
    [theme.breakpoints.down("sm")]: {
        height: 50,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        borderBottom: "1px solid lightgray",
        boxShadow: "unset"
    }
}));

export const MenuItem = styled(Typography)(({ theme }) => ({
    color: "black",
    margin: "1em 0",
    [theme.breakpoints.down("sm")]: {
        // margin: " 0 1em"
    }
}));