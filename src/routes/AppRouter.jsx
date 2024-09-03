import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth/pages"
import { CalendarioPage } from "../calendario/index";
import { useAuthStore } from "../hooks";

export const AppRouter = () => {
    

    const { checkAuthToken, status } = useAuthStore();
    // const authStatus = 'not-authenticated';


    useEffect(() => {
        checkAuthToken();
    }, [])
    

    if( status === 'checking'){
        return(
            <h3>cargando</h3>
        )
    }

    return (
        <Routes>

            {
                ( status === 'not-authenticated' ) 
                ?(
                    <>
                    <Route path="/auth/*"  element={ <LoginPage />  } />
                    <Route path="/*"       element={ <Navigate to="/auth/login" />  } /> 
                </>
                )
                :(
                    
                    <>
                    <Route path="/"       element={ <CalendarioPage /> } />
                    <Route path="/*"      element={ <Navigate to="/" /> } />
                </>

                ) 

            }

        </Routes>
    )
}
