import { styled } from '@mui/system';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import { Typography } from '@mui/material';

export const PostContainer = styled('div')(({ theme }) => ({
    width: 300,
    minHeight: 250,
    margin: "1em",
    [theme.breakpoints.down("sm")]: {
        // margin: "0.5em 1em"
    }
}));

export const PostTopbar = styled('div')(({ theme }) => ({
    width: "100%",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "black",
    borderRadius: "13px 13px 0 0",
    overflow: "auto",
    [theme.breakpoints.down("sm")]: {
        // backgroundColor: "white"
    }
}));

export const PostImage = styled('img')(({ theme }) => ({
    width: "100%",
    height: 200,
    objectFit: "cover",
    // borderRadius: "0 0 13px 13px ",
    [theme.breakpoints.down("sm")]: {
        // backgroundColor: "white"
    }
}));

export const IconContainer = styled('div')(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    margin: "0 1em",
    [theme.breakpoints.down("sm")]: {
        margin: "0 0.5em",
    }
}));

export const Username = styled(Typography)(({ theme }) => ({
    color: "white",
    margin: "0 0.5em ",
    fontStyle: "italic",
    [theme.breakpoints.down("sm")]: {
        // margin: "0 0.5em",
    }
}));

export const LikeIcon = styled(ThumbUpIcon)(({ theme }) => ({
    fontSize: "1.5rem",
    color: "white",
    marginRight: "0.3em",
    [theme.breakpoints.down("sm")]: {
        marginRight: "0.2em",
    }
}));

export const CommIcon = styled(CommentIcon)(({ theme }) => ({
    fontSize: "1.5rem",
    color: "white",
    marginRight: "0.3em",
    [theme.breakpoints.down("sm")]: {
        marginRight: "0.2em",
    }
}));

export const PostTitle = styled(Typography)(({ theme }) => ({
    fontFamily: "'Josefin Sans', sans-serif",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
        // margin: "0 0.5em",
    }
}));

export const PostDate = styled(Typography)(({ theme }) => ({
    fontFamily: "'Lora', serif",
    fontStyle: "italic",
    color: "#999",
}));

export const PostBottombar = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    height: 50,
    overflow: "auto",
    borderRadius: "0 0 13px 13px",
    backgroundColor: "black",
    // scrollbarWidth: 0
}));

export const PostCategory = styled(Typography)(({ theme }) => ({
    padding: "0.3em 0.6em",
    backgroundColor: "#D4F1F4",
    color: "#145DA0",
    borderRadius: 25,
    margin: "0 0.6em"
}));