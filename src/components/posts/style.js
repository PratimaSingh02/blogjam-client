import { styled } from '@mui/system';

export const PostsContainer = styled('div')(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    flex: 9,
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: 'center',
        width: "100%",
    }
}));