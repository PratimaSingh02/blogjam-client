import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, MenuItem } from './style';

const menuItems = [
    {
        label: "My Blogs",
        link: "/profile"
    },
    {
        label: "Update Account",
        link: "settings"
    },
    {
        label: "Delete Account",
        link: "delete"
    },
];

export default function ProfileOptions() {
    const location = useLocation();

    return (
        <Container>
            {
                menuItems.map((menu, index) => (
                    <Link to={menu.link} className="link" key={index}>
                        <MenuItem
                            variant="body1"
                            sx={menu.link.indexOf(location.pathname.split("/").slice(-1)[0]) >= 0 ?
                                { color: "#0039a6" } : {}}
                        >
                            {menu.label}
                        </MenuItem>
                    </Link>
                ))
            }
        </Container>
    )
}
