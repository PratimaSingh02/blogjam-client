import { styled } from '@mui/system';
import { Typography } from '@mui/material';

export const TitlesDiv = styled('div')(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "'Lora', serif",
    color: "#444",
    paddingTop: "1em",
    [theme.breakpoints.down("sm")]: {
    }
}));

export const Title = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        fontSize: 26,
        color: "#FFE4C4"
    }
}));

export const SubTitle = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        color: "white"
    }
}));

export const Image = styled('div')(({ theme }) => ({
    width: "100%",
    height: 450,
    marginTop: 80,
    background: 'url("https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")',
    backgroundPosition: "center",
    [theme.breakpoints.down("sm")]: {
        height: 200,
        backgroundImage: 'url("https://www.macmillandictionaryblog.com/wp-content/uploads/2018/08/Squirrel.jpg")',
        backgroundPosition: "left center"
    }
}));