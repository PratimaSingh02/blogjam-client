import { TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const TopBar = styled('div')(({ theme }) => ({
    position: "sticky",
    top: 0,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    zIndex: 1000,
    padding: "0.5em 1em",
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        height: "fit-content",
    }
}));

export const Logo = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        display: "none"
    }
}));

export const MenuItem = styled(Typography)(({ theme }) => ({
    fontFamily: "'Josefin Sans', sans-serif",
    margin: "0.5em",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
        // backgroundColor: "white"
    }
}));

export const ProfilePic = styled("img")(({ theme }) => ({
    width: 40,
    height: 40,
    borderRadius: "50%",
    objectFit: "cover",
    cursor: "pointer",
}));

export const CustomTextField = styled(TextField)(({ theme }) => ({
    width: 200,
    marginLeft: "1em",
    [theme.breakpoints.down("sm")]: {
        width: 250
    }
}));