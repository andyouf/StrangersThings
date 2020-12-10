/**
 * 
 * @param {token} token - sets the token in localStorage 
 */
export const setToken = (token) => {
    localStorage.setItem('access_token', token); 
};


// clears the token in localStorage

export const removeToken = () => {
    localStorage.removeItem('access_token'); 
}


// retrieve the token stored in localstorage
 
export const getToken = () => {
    return localStorage.getItem('access_token');
};

// set the header authorization token for axios

export const makeheaders = () => {
    const token = getToken();
    if (token) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
}