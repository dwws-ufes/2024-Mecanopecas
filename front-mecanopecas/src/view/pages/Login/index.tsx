import React, { useState } from 'react';
import { useAuthenticate, useLogout } from '../../../hooks/authHooks.ts';

const LoginComponent = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const loginMutation = useAuthenticate();

    const handleLogin = (e) => {
        e.preventDefault();
        loginMutation.mutate(credentials);
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="text"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
            <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <button type="submit">Login</button>
        </form>
    );
};

const LogoutButton = () => {
    const logout = useLogout();

    return <button onClick={logout}>Logout</button>;
};

export default LoginComponent;