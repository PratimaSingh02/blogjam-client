import axios from "axios";
import jwt_decode from "jwt-decode";

export const refreshTokens = async () => {
    let { refreshToken } = JSON.parse(localStorage.getItem("tokens"));
    const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/auth/refresh",
        { token: refreshToken });//don't include headers
    return response.data;
}

export const verifyAndRefreshTokens = async () => {
    let { accessToken } = JSON.parse(localStorage.getItem("tokens"));
    let currentDate = new Date();
    const decodedToken = jwt_decode(accessToken);

    //if expiration time is < currentTime, then token expired
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
        try {
            let { accessToken: newAccessToken, refreshToken: newRefreshToken } = await refreshTokens();
            localStorage.setItem("tokens", JSON.stringify({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            }));
        } catch (error) {
            localStorage.removeItem("user");
            localStorage.removeItem("tokens");
        }
    }
}

export const login = async (username, password) => {
    const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/auth/login", {
        username,
        password
    });//don't include headers

    localStorage.setItem("tokens", JSON.stringify({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
    }));

    return response.data;
}

export const register = async (username, email, password) => {
    const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/auth/register", {
        username,
        email,
        password
    });//don't include headers

    return response.data;
}




