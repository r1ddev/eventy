export const initialState = {
    users: null,
    loading: true,
    error: null,
    banUserId: null,
    banLoading: false,
    banError: false,
}

const adminusers = (state, action) => {
    if (state === undefined) {
        return initialState
    }

    switch (action.type) {

        case 'FETCH_ADMINUSERS_SUCCESS':
            return {
                ...state,
                users: action.payload,
                loading: false,
                error: false
            };

        case 'FETCH_ADMINUSERS_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case 'FETCH_ADMINUSERS_LOADING':
            return {
                ...state,
                loading: true,
                error: false
            };

        case 'FETCH_ADMIN_USER_BAN_LOADING':
            return {
                ...state,
                banUserId: action.payload.banUserId,
                banLoading: true,
                banError: false
            };

        case 'FETCH_ADMIN_USER_BAN_SUCCESS':
            return {
                ...state,
                users: updateUser(action.payload.userId, action.payload.banned, state),
                banUserId: null,
                banLoading: false,
                banError: false
            };

        case 'FETCH_ADMIN_USER_BAN_ERROR':
            return {
                users: updateUser(action.payload.userId, action.payload.banned, state),
                banUserId: null,
                banLoading: false,
                banError: action.payload
            };

        default:
            return state;
    }
};

const updateUser = (userId, banned, state) => {

    const { users } = state;
    const userIndex = users.findIndex(({ id }) => id === userId);

    const user = user.userIndex;
    user.banned - banned;

    return [
        ...users.slice(0, userIndex),
        user,
        ...users.slice(userIndex + 1)
    ]
}

export default adminusers;