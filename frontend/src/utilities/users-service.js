import * as usersAPI from "./users-api"

export async function signUp(userData) {
    // make network request
    const response = await usersAPI.signUp(userData)

    // retrieve the token
    const data = response.data
    // add token to local
    localStorage.setItem('data', JSON.stringify(data))
    // return whatever is sent
    return response
}

export async function login(userData) {
    const response = await usersAPI.login(userData);
    // Persist the token to localStorage
    const data = response.data
    localStorage.setItem('data', JSON.stringify(data));
    return response
}


// Create a function to logout
export const logOut = () => {
    localStorage.removeItem("data");
};



// get token from local

export const getToken = () => {
    // reach to local and look for a token
    const token = JSON.parse(localStorage.getItem('data'))?.token
    // console.log(token);

    // Assuming no token was found
    if (!token) return null
    // If the function reaches this point of the code that mean a token was found
    const payload = JSON.parse(atob(token.split(".")[1]))
    // Verify that the decoded payload is not expired
    if (payload.exp < Number.parseInt(Date.now() / 1000)) {
        // Meaning the jwt has expired
        localStorage.removeItem('data')
        // return early
        return null
    }


    // Again if the code gets to this line it means that there was a token and the token was valid
    return token
}

export const getUser = () => {
    const token = getToken()
    return token ? JSON.parse(localStorage.getItem("data")) : null
}