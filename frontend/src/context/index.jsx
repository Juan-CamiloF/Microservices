import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({ authorities: [], auth: false, email: "" });

const UserProvider = ({ children }) => {

    const [user, setUser] = useState({
        authorities: [],
        auth: false,
        email: "",
      });
    
      useEffect(() => {
      
        const storedUser = JSON.parse(localStorage.getItem("usuario"));

        if (storedUser) {
 
            setUser(storedUser); 
        }
      }, []);
    


    const login = (usuario) => {
        setUser({ authorities: usuario.authorities, auth: true, email: usuario.sub });
    };

    const logout = () => {
        localStorage.clear()
        setUser({ authorities: [], auth: false, email: "" })
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserProvider, UserContext };