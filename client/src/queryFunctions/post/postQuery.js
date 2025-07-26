import axiosInstance from '../../api/axiosInstance'
import { endPoints } from '../../api/url'

export const createPost = async (data) => {
    try {
        const response = await axiosInstance.post(endPoints.createPost, data);
        console.log("posted data :", response.data);

        // If  API response is structured as { data: { ...profileData } }
        return response?.data;

        // If it's just { ...profileData } then return response.data
        // return response.data;

    } catch (error) {
        console.error("Error creating post:", error.response?.data || error.message);
        throw error; // rethrow so React Query (or caller) can handle it
    }
};


export const fetchPosts = async () => {
    try {
        const response = await axiosInstance.get(endPoints.getAllPosts);
        console.log("all post", response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching post:", error.response?.data || error.message);
        throw error; // rethrow so React Query (or caller) can handle it
    }

};


export const likePost = async (postId) => {
    try {
        const res = await axiosInstance.put(`${endPoints.likePost}${postId}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching post:", error.response?.data || error.message);
        throw error;
    }

};

export const unlikePost = async (postId) => {
    try {
        const res = await axiosInstance.put(`${endPoints.unlikePost}${postId}`);

        return res.data;
    } catch (error) {
        console.error("Error fetching post:", error.response?.data || error.message);
        throw error;
    }

};