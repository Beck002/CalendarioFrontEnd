import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice"
import { authenticatedState, initialState } from "../../__fixtures__/authState"
import { testUserCredentials } from "../../__fixtures__/testUser"

describe('pruebas en authSlice',() => {


    test('debe regresar el estado inicial', () => { 

       expect(authSlice.getInitialState()).toEqual( initialState )

    })

    test(' debe realizar el login', () => { 

        const state = authSlice.reducer( initialState, onLogin( testUserCredentials )); 

        expect( state ).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        }); 

    
    });


    test('debe realizar el logout', () => { 
        const state = authSlice.reducer( authenticatedState, onLogout());   
        expect( state ).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined
        })
    });

    

    test('debe realizar el logout con un errorMessage', () => {
        const errorMessage = 'Error al cerrar sesion' 
        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage));   
        expect( state ).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage
        })
    });

    test('debe limpiar el mensaje de error', () => { 
        const errorMessage = 'Error al cerrar sesion' 
        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage));   
        const newState = authSlice.reducer( state, clearErrorMessage())
        
        expect( newState.errorMessage).toBe(undefined)
    
    });

    
})