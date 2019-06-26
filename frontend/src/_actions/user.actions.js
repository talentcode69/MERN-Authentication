import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    update,
    getAll,
    showModal,
    closeModal,
    delete: _delete
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));
        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(alertActions.success("Login Success"));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request(user) { return {type:userConstants.LOGIN_REQUEST, user }}
    function success(user) { return {type:userConstants.LOGIN_SUCCESS, user }}
    function failure(error) { return {type:userConstants.LOGIN_FAILURE, error }}
}
function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}
function register(user) {
    return dispatch => {
        dispatch(request(user));
        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration Successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
function showModal(user) {
    return { type: userConstants.UPDATE_MODAL, user };
}
function closeModal() {
    return { type: userConstants.UPDATE_MODAL_CLOSE };
}
function update(user) {
    return dispatch => {
        dispatch(request(user));
        userService.update(user)
            .then(
                user => {
                    dispatch(success());
                    dispatch(userActions.getAll());
                    dispatch(alertActions.success('Update Successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request(user) { return { type: userConstants.UPDATE_REQUEST, user } }
    function success(user) { return { type: userConstants.UPDATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}
function getAll() {
    return dispatch => {
        dispatch(request());
        userService.getAll()
            .then(
                users => {
                    dispatch(success(users));
                    dispatch(alertActions.success("GetAll Success"));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request() { return { type:userConstants.GETALL_REQUEST } }
    function success(users) { return { type:userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type:userConstants.GETALL_FAILURE, error } }
}
function _delete(id) {
    return dispatch => {
        dispatch(request(id));
        userService.delete(id)
            .then(
                user => {
                    dispatch(success(id));
                    dispatch(alertActions.success("Delete Success"));
                },
                error => {
                    dispatch(failure(id, error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}