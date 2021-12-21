import { authConstants } from "./constants"

export const login = (user) => {
    return (dispath) => {
        dispath({
            type: authConstants.LOGIN_REQUEST,
            payload: {
                ...user
            }
        });
    }
}