import Client from "./Client";

export const uploadImage = async (file) => {
    const data = new FormData();
    const filename = Date.now() + file.name;//for unique image-file names
    data.append("name", filename);
    data.append("file", file);
    const response = await new Client({
        path: "/upload",
        payload: data
    }).post();

    return filename;
}