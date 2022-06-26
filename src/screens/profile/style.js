import { styled } from '@mui/system';

export const Container = styled('div')(({ theme }) => ({
    display: "flex",
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column"
    }
}));