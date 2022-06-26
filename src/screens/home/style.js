import { styled } from '@mui/system';

export const Container = styled('div')(({ theme }) => ({
    display: "flex",
    alignItems: "flex-start",
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column-reverse",
        // justifyContent: "space-between"
    }
}));