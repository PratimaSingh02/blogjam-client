import { Box, Button, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import { deleteUser } from '../../services/user';
import Error from "../error";

export default function Delete() {
    const { user, dispatch } = useContext(Context);
    const [error, setError] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteUser(user._id);
            dispatch({ type: "LOGOUT" });
        } catch (error) {
            setError("Unable to delete account! Try again.");
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
