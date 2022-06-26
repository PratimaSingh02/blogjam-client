import Client from "./Client";

export const getAllCategories = async () => {
    const response = await new Client({
        path: "/category"
    }).get();

    return response.data.map(category => (category.name));
}