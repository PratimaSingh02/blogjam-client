import React from 'react';
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import Posts from '../../components/posts';
import { Container } from "./style";

export default function Home() {
    return (<>
        <Header />
        <Container>
            <Posts />
            <Sidebar />
        </Container>
    </>)
}
