import { Box } from '@mui/material';
import React, { useContext } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Context } from '../../context/Context';
import { TopBar, Logo, MenuItem, ProfilePic, CustomTextField } from './style';
import { debounce } from '../../utils/debounce';


export default function Topbar() {
    const { user, dispatch } = useContext(Context);
    const [searchParams, setSearchParams] = useSearchParams();
    let navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
    }

    const handleUserChange = (e) => {
        setSearchParams({ user: e.target.value });
    }
    const debounceUserChange = debounce(handleUserChange, 2000);

    return (
        <TopBar>
            <Logo variant="h5" >
                Blog<span style={{ color: "red" }}>Jam</span>
            </Logo>
            <Box display="flex">
                <Link
                    to="/"
                    className="link">
                    <MenuItem variant="h6" >
                        Home
                    </MenuItem>
                </Link>
                <Link
                    to="/write"
                    className="link">
                    <MenuItem variant="h6" >
                        Write
                    </MenuItem>
                </Link>
                {user &&
                    <MenuItem variant="h6" onClick={handleLogout}>
                        Logout
                    </MenuItem>}
            </Box>
            <Box display="flex" alignItems="center">
                {
                    user ? (<>
                        <Link to="/profile" className="link">
                            {user.profilePicture ?
                                <ProfilePic
                                    src={process.env.REACT_APP_PUBLIC_FOLDER_URL + user.profilePicture}
                                    alt=""
                                /> :
                                <i className=" fa-solid fa-circle-user" style={{ fontSize: "1.5rem" }} />
                            }
                        </Link>
                        <CustomTextField
                            variant='outlined'
                            placeholder='Search user'
                            onInput={debounceUserChange}
                        />
                    </>) : (<Box display="flex">
                        <Link
                            to="/login"
                            className="link">
                            <MenuItem variant="h6" >
                                Login
                            </MenuItem>
                        </Link>
                        <Link
                            to="/register"
                            className="link">
                            <MenuItem variant="h6" >
                                Register
                            </MenuItem>
                        </Link>
                    </Box>)
                }
            </Box>
        </TopBar>
    )
}
