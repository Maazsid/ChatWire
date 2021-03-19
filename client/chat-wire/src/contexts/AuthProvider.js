import React, { useContext, useState } from 'react'

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}

const AuthProvider = ({children}) => {

    const [user,setUser] = useState();

    return (
       <AuthContext.Provider value = {{user,setUser}}>
           {children}
       </AuthContext.Provider>
    )
}

export default AuthProvider;
