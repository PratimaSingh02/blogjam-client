import React, { useContext } from 'react';
import { Box } from '@mui/material';
import { Outlet, Route, Routes } from 'react-router-dom';
import ProfileOptions from '../../components/profileOptions';
import Posts from '../../components/posts';
import { Context } from '../../context/Context';
import Settings from "../../components/settings";
import { Container, Content } from "./style";
import Delete from '../../components/delete';

export default function Profile() {
    const { user, dispatch } = useContext(Context);

    return (<Container>
        <ProfileOptions />
        <Content >
            <Routes>
                <Route path="/" element={<ProfileLayout />}>
                    <Route
                        index
                        element={<Posts user={user.username} />}
                    />
                    <Route
                        path="settings"
                        element={<Settings />}
                    />
                    <Route
                        path="delete"
                        element={<Delete />}
                    />
                </Route>
            </Routes>
        </Content>
    </Container>)
}

function ProfileLayout() {
    return (
        <Box flexGrow={1} overflow='auto'  >
            <Outlet />
        </Box>
    );
}
