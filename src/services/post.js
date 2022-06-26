import Client from "./Client";

export const createPost = async (username, title, description, categories, photo) => {
    const response = await new Client({
        path: "/post",
        payload: {
            username,
            title,
            description,
            categories,
            photo
        }
    }).post();

    return response.data;
}

export const getAllPosts = async (searchParams) => {
    const response = await new Client({
        path: "/post" + searchParams
    }).get();

    return response.data;
}

export const getPost = async (blogId) => {
    const response = await new Client({
        path: "/post/" + blogId
    }).get();

    return response.data;
}

export const getTrendingPosts = async () => {
    const response = await new Client({
        path: "/post/trending"
    }).get();

    return response.data;
}

export const updatePost = async (blogId, blogData) => {
    const response = await new Client({
        path: "/post/" + blogId,
        payload: { ...blogData }
    }).put();

    return response.data;
}

export const deletePost = async (blogId, data) => {
    const response = await new Client({
        path: "/post/" + blogId,
        payload: data
    }).delete();

    return response.data;
}