import axios from 'axios';

const BASE = 'https://jsonplace-univclone.herokuapp.com'

/**
 * to get the list of Users
 */
export async function getUsers() {
    try {
        const { data } = await axios.get(`${ BASE }/users`);
        return data;
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {string} userId : user ID
 * to get the posts done by the user with userID
 */
export async function getPostsByUser(userId) {
    try {
        const { data } = await axios.get(`${ BASE }/users/${ userId }/posts`);
        return data;
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {string} userId : user ID
 * to get the todos set by the user with userID
 */
export async function getTodosByUser(userId) {
    try {
        const { data } = await axios.get(`${ BASE }/users/${ userId }/todos`);
        return data;
    } catch (error) {
        throw error;
    }
}
