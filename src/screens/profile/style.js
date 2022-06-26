import { styled } from '@mui/system';

export const Container = styled('div')(({ theme }) => ({
    display: "flex",
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column"
    }
}));

export const Content = styled('div')(({ theme }) => ({
    width: "100%",
    marginLeft: 200,
    [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
        marginTop: 60
    }
}));