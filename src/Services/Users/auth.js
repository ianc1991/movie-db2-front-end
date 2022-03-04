import http from './httpAuth';

class AuthService {
    login({userName, password}) {
        return http.post('/login', {
            userName,
            password
        },
        {
            withCredentials: true
        });
    }

    register({userName, password}) {
        return http.post('/register', {
            userName,
            password
        },
        {
            // To store cookie in browser
            withCredentials: true
        });
    }

    logout() {
        return http.get('/logout', {
            withCredentials: true
        })
    }

    // Check if logged in
    loggedIn() {
        return http.get('/loggedIn', {
            withCredentials: true,
        });
    }

    // Return user info
    getUserInfo() {
        return http.get('/userdata', {
            withCredentials: true
        });
    }
}

export default new AuthService();