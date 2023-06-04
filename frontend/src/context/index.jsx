import { createContext, useState } from "react";

const UserContext = createContext({ authorities: [], auth: false, email: "" });

const UserProvider = ({ children }) => {

    const [user, setUser] = useState({ authorities: [], auth: false, email: "" });

    const login = (usuario) => {
        setUser({ authorities: usuario.authorities, auth: true, email: usuario.sub });
    };

    const logout = () => {
        setUser({ authorities: [], auth: false, email: "" })
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserProvider, UserContext };