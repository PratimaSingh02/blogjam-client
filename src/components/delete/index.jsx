import { Box, Button, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import { LoadingContext } from '../../context/LoadingContext';
import { deleteUser } from '../../services/user';
import Error from "../error";

export default function Delete() {
    const { user, dispatch } = useContext(Context);
    const { loadingShow, loadingHide } = useContext(LoadingContext);
    const [error, setError] = useState(false);

    const handleDelete = async () => {
        loadingShow();
        try {
            await deleteUser(user._id);
            dispatch({ type: "LOGOUT" });
        } catch (error) {
            setError("Unable to delete account! Try again.");
        }
        finally {
            loadingHide();
        }
    }

    return (
        <Box m="1em">
            {
                error && <Error message={error} setError={setError} />
            }
            <Typography variant="h6" mt="1em">
                Are you sure you want to delete your account?
            </Typography>
            <Button variant="contained" sx={{ marginTop: "1em" }} onClick={handleDelete}>
                Yes
            </Button>
        </Box>
    )
}
