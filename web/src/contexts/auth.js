"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = exports.AuthContext = void 0;
const react_1 = require("react");
const api_1 = require("../services/api");
exports.AuthContext = (0, react_1.createContext)({});
function AuthProvider(props) {
    const [user, setUser] = (0, react_1.useState)(null);
    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=7a12f26cad3e263956ad`;
    const signIn = async (githubCode) => {
        const response = await api_1.api.post('authenticate', {
            code: githubCode,
        });
        const { token, user } = response.data;
        localStorage.setItem('@dowhile:token', token);
        api_1.api.defaults.headers.common.authorization = `Bearer ${token}`;
        setUser(user);
    };
    function signOut() {
        setUser(null);
        localStorage.removeItem('@dowhile:token');
    }
    (0, react_1.useEffect)(() => {
        //manter usuario logado
        const token = localStorage.getItem('@dowhile:token');
        if (token) {
            api_1.api.defaults.headers.common.authorization = `Bearer ${token}`;
            api_1.api.get('profile').then(response => {
                setUser(response.data);
            });
        }
    }, []);
    (0, react_1.useEffect)(() => {
        const url = window.location.href;
        const hasGithubCode = url.includes('?code=');
        if (hasGithubCode) {
            const [urlWithoutCode, githubCode] = url.split('?code=');
            window.history.pushState({}, '', urlWithoutCode);
            signIn(githubCode);
        }
    }, []);
    return (<exports.AuthContext.Provider value={{ signInUrl, user, signOut }}>
            {props.children}
        </exports.AuthContext.Provider>);
}
exports.AuthProvider = AuthProvider;
