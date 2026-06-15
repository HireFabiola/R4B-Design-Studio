import { useState } from "react";
import { AuthContext } from "./AuthContextValue";
import type { User } from "../types/User";

type StoredAuth = {
    user: User | null;
    token: string | null;
};

const getStoredAuth = (): StoredAuth => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (!savedUser || !savedToken) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        return { user: null, token: null };
    }

    try {
        return {
            user: JSON.parse(savedUser) as User,
            token: savedToken,
        };
    } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        return { user: null, token: null };
    }
};

export const AuthProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [storedAuth] = useState(getStoredAuth);
    const [user, setUser] = useState<User | null>(storedAuth.user);
    const [token, setToken] = useState<string | null>(storedAuth.token);

    const login = (
        user: User,
        token: string
    ) => {
        setUser(user);
        setToken(token);

        localStorage.setItem(
            "token",
            token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );
    };

    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
