import * as actionTypes from './actionTypes';

export const redirect = ( path ) => {
    return {
        type: actionTypes.REDIRECT,
        redirectLink: path
    }
}

export const resetRedirect = (  ) => {
    return {
        type: actionTypes.RESET_REDIRECT
    }
}

export const authSuccessful = ( token, id ) => {
    return {
        type: actionTypes.AUTH_SUCCESSFUL,
        token: token,
        userId: id
    }
}

export const authFail = () => {
    return {
        type: actionTypes.AUTH_FAIL
    }
}