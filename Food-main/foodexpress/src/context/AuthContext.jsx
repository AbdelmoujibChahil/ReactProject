import React, { createContext, useContext, useState } from 'react';
import { ClientApi } from "../ClientApi/ClientApi";

// 1. Create the context
const AuthContext = createContext({
  setuser:{},
  user:{},
  isLoggedIn:false,
  login:()=>{},
  logout:()=>{},
});

// 2. Create the custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. Create the Provider
export  const AuthProvider = ({ children }) => {
  // --- MOCK AUTH STATE ---
  // In a real app, this would be null, and you'd set it on login
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [user, setuser] = useState({}); 
   
  // -------------------------
 const login = async(email, password)=> {
    try {
      console.log("1. Récupération du cookie CSRF...");
      await ClientApi.getcsrf();

      console.log("2. Tentative de connexion...");
      const res = await ClientApi.Login(email, password);
      
      if (res.status === 200) {
        console.log("✅ Login réussi:", res.data);
       setIsLoggedIn(true);
      }}
     catch (error) {
      console.error("❌ Erreur:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
     setIsLoggedIn(false);

    }
 }

 
const logout = async()=>{
    try {
        const response  = await ClientApi.Logout();
        console.log(response.status)
        if(response.status === 201 ){
            navigate('/login');
        }
    } catch (error) {
        console.log(error)
    }
}
  // In a real app, you'd have login/logout functions here
  // const login = (email, password) => { ... setIsLoggedIn(true) ... }
  // const logout = () => { ... setIsLoggedIn(false) ... }

   


  const value = {
    isLoggedIn,
    setuser,
    login,
    user, logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
/*// --- AuthContext ---
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Mock login/logout functions
  const login = (email, password) => {
    // In a real app, you'd check this against a database
    console.log("Logging in with", email, password);
    setIsLoggedIn(true);
    setCurrentUser({ name: 'James' }); // Set mock user
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };
};*/