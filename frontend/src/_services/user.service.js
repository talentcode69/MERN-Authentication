import { authHeader } from '../_helpers';
import axios from 'axios';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};
const serverurl = `http://127.0.0.1:4000`;
console.log(`${serverurl}/users/authenticate`);
function login(username, password) {
    const requestOptions = {
        username: username,
        password: password
    };
    console.log(`${serverurl}/users/authenticate`);
    return axios.post(`${serverurl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a user in the response
            //if (user.token) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            //}

            return user;
        }).catch(handleError);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        headers: authHeader()
    };

    return axios.get(`${serverurl}/users`, requestOptions).then(handleResponse);
}
function getById(id) {
    const requestOptions = {
        headers: authHeader()
    };
    return axios.get(`${serverurl}/users/${id}`,requestOptions).then(handleResponse);
}
function register(user) {
    return axios.post(`${serverurl}/users/register`,user).then(handleResponse);
}
function update(user) {
    const requestOptions = {
        headers: authHeader()
    };
    
    return axios.put(`${serverurl}/users/${user.id}`,user,requestOptions).then(handleResponse);
}
function _delete(id) {
    const requestOptions = {
        headers: authHeader()
    };
    return axios.delete(`${serverurl}/users/${id}`,requestOptions).then(handleResponse);
}
function handleResponse(response) {
    // return response.text().then(text => {
    //     const data = text && JSON.parse(text);
    //     if (!response.ok) {
    //         if (response.status === 401) {
    //             // auto logout if 401 response returned from api
    //             logout();
    //             window.location.reload(true);
    //         }

    //         const error = (data && data.message) || response.statusText;
    //         return Promise.reject(error);
    //     }

    //     return data;
    // });
    console.log(response);
    if (response.statusText === "OK")
        return response.data;
    if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
    }

    const error = (response && response.data.message) || response.statusText;
    return Promise.reject(error);
}
function handleError(err) {
    //console.log(err); 
    return Promise.reject(err.response.data.message);
}