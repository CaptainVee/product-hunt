import  * as actionTypes from '../actions/actionTypes';

const initialState = {
    redirectLink: '/',
    redirected: false,
    token: '',
    userId: '',
    authenticated: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.REDIRECT:
            return {
                ...state,
                redirectLink: action.redirectLink,
                redirected: true
            }
        
        case actionTypes.RESET_REDIRECT:
            return {
                ...state,
                redirectLink: '/',
                redirected: false
            }
        case actionTypes.AUTH_SUCCESSFUL:
            return {
                ...state,
                token: action.token,
                authenticated: true,
                userId: action.userId
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                token: '',
                authenticated: false
            }
        case actionTypes.LOG_OUT:
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            return {
                ...state,
                token: '',
                userId: '',
                authenticated: false
            }
        default :
            return state
    }
}

export default reducer;