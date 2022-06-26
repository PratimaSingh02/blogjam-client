import React from 'react';
import Box from "@mui/material/Box";
import { TitlesDiv, Title, SubTitle, Image } from './style';

export default function Header() {

    return (
        <Box mt="60px">
            <Image className="header-image" >
                <TitlesDiv>
                    <Title variant="h3" >
                        Welcome to BlogJam
                    </Title>
                    <SubTitle variant="body1" >
                        Powered By React & Node
                    </SubTitle>
                </TitlesDiv>
            </Image>
        </Box>
    )
}
