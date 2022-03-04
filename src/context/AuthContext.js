import auth from '../Services/Users/auth';
import { createContext, useEffect, useState } from 'react';

// Checks if a user is logged in whenever a component is rendered



const AuthContext = createContext();

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(undefined);
    const [userInfo, setUserInfo] = useState(undefined);

    async function getLoggedIn() {
        const loggedInRes = await auth.loggedIn();

        // data is the axios response body. returns true/false
        setLoggedIn(loggedInRes.data)
    }

    async function getUserInfo() {
        const userInfoResponse = await auth.getUserInfo();

        // data is the axios response body. returns true/false
        setUserInfo(userInfoResponse.data);
    }

    useEffect(() => {
        getLoggedIn();
        getUserInfo();
    }, []);
    
    // Any componenets in the AuthContext.Provider will be passed the value={}
    return (
        <AuthContext.Provider value={{loggedIn, getLoggedIn, userInfo}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
export {AuthContextProvider};
