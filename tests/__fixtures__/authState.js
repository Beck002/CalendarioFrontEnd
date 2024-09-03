export const initialState = {
    status: 'checking',
    user: {},
    errorMessage: undefined,
};

export const authenticatedState = {
    status: 'authenticated',
    user: {
        uid: 'asd',
        name: 'Beck'
    },
    errorMessage: undefined,
}

export const notAuthenticatedState = {
    status: 'not-Authenticated',
    user: {},
    errorMessage: undefined,
};
