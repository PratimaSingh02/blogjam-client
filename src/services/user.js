import Client from "./Client";

export const updateUser = async (userId, username, email, password, profilePicture) => {
    const response = await new Client({
        path: "/user/" + userId,
        payload: {
            userId,
            username,
            email,
            password,
            profilePicture
        }
    }).put();

    return response.data;
}

export const deleteUser = async (userId) => {
    const response = await new Client({
        path: "/user/" + userId,
    }).delete();

    return response.data;
}