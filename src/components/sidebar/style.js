import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export const Parent = styled('div')(({ theme }) => ({
    height: "50vh",
    width: 250,
    margin: "1em 1em 0 0",
    [theme.breakpoints.down("sm")]: {
        height: 350,
        width: "100%",
        margin: "1em  0 2em 0",
    }
}));

export const CategoryContainer = styled('div')(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    height: "50%",
    overflow: "auto",
    [theme.breakpoints.down("sm")]: {
        height: 120
    }
}));

export const Title = styled(Typography)(({ theme }) => ({
    borderTop: "1px solid #a7a4a4",
    borderBottom: "1px solid #a7a4a4",
    width: "100%",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
        // margin:""
    }
}));

export const TrendContainer = styled('div')(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    height: "50%",
    overflow: "auto",
    [theme.breakpoints.down("sm")]: {
        height: 180
    }
}));

export const Trending = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "1em",
    color: "#145DA0",
    fontStyle: "italic",
    [theme.breakpoints.down("sm")]: {
        width: "fit-content",
        margin: "0.5em 1em"
    }
}));

export const LikeIcon = styled(ThumbUpIcon)(({ theme }) => ({
    fontSize: "1.5rem",
    color: "#68BBE3",
    marginRight: "0.3em",
    [theme.breakpoints.down("sm")]: {
        marginRight: "0.2em",
    }
}));