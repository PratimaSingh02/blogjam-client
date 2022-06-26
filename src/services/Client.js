import axios from "axios";
import { verifyAndRefreshTokens, refreshTokens } from "./auth";
import jwt_decode from "jwt-decode";

const axiosJWT = axios.create();

axiosJWT.interceptors.request.use(async (config) => {
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
            config.headers["authorization"] = "Bearer " + newAccessToken;
        } catch (error) {
            localStorage.removeItem("user");
            localStorage.removeItem("tokens");
        }
    }
    else
        config.headers["authorization"] = "Bearer " + JSON.parse(localStorage.getItem("tokens")).accessToken;
    return config;
},
    (error) => {
        return Promise.reject(error);
    });

class Client {
    url = process.env.REACT_APP_SERVER_URL;
    payload;

    constructor({ path, payload = {} }) {
        this.url += path;
        this.payload = payload;
    }

    get = async () => {
        try {
            await verifyAndRefreshTokens();
            const response = await axiosJWT.get(this.url);
            return response;
        } catch (error) {
            throw error;
        }
    }

    post = async () => {
        try {
            await verifyAndRefreshTokens();
            const response = await axiosJWT.post(this.url, this.payload);
            return response;
        } catch (error) {
            throw error;
        }
    }

    put = async () => {
        try {
            await verifyAndRefreshTokens();
            const response = await axiosJWT.put(this.url, this.payload);
            return response;
        } catch (error) {
            throw error;
        }
    }

    delete = async () => {
        try {
            await verifyAndRefreshTokens();
            const result = await axiosJWT({
                url: this.url,
                method: 'delete',
                data: this.payload
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

}

export default Client;