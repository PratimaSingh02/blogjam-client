import { styled } from '@mui/system';

export const TitleContainer = styled('div')(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
        // margin: "0.5em 1em"
    }
}));