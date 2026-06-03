// Import necessary modules and types
import { createContext, useContext, useEffect, useState } from "react";
import type { AuthContextType } from "../types/Auth";
import type { User } from "../types/User";

// Create the AuthContext with a default value of null          
const AuthContext =
    createContext<AuthContextType | null>(null);

// Create the AuthProvider component to manage authentication state and provide it to the rest of the app
export const AuthProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    // State to hold the current user and authentication token
    const [user, setUser] =
        useState<User | null>(null);

    const [token, setToken] =
        useState<string | null>(null);

    //  On component mount, check localStorage for existing token and user data to maintain authentication state across page refreshes
    useEffect(() => {
        const savedToken =
            localStorage.getItem("token");

        const savedUser =
            localStorage.getItem("user");

        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
        }
    }, []);

    // Function to handle user login, which updates the state and localStorage with the user's information and authentication token
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

    //
    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };


// Provide the authentication state and functions to the rest of the app through the AuthContext.Provider
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

// Custom hook to access the authentication context, ensuring that it is used within the AuthProvider
export const useAuth = () => {
    const context =
        useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
};