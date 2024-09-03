import { configureStore } from "@reduxjs/toolkit";
import { act, render, renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { authSlice } from "../../src/store";
import { useAuthStore } from "../../src/hooks";
import { initialState, notAuthenticatedState } from "../__fixtures__/authState";
import { calendarApi } from "../../src/api";
import { testUserCredentials } from '../__fixtures__/testUser'

const getMockStore = ( initialState )=> {

    return configureStore({
        reducer: {
            auth: authSlice.reducer
        }, 
        preloadedState: {
            auth: {...initialState}
        }
    })

};

describe('pruebas en hook useAuthSotre', ()=>{

    beforeEach(()=> localStorage.clear());

    test('debe regresar los valores por defecto', () => {  

        const mockStore = getMockStore({...initialState});

        const { result } = renderHook(()=> useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{children}</Provider>
        });



        expect( result.current ).toEqual({
            status: 'checking',
            user: {},
            errorMessage: undefined,
            startLogin: expect.any(Function),
            startCreateUser: expect.any(Function),       
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function)
        });

    }); 

    test('startLogin debe realizar el login correctamente', async () => { 


        const mockStore = getMockStore({...notAuthenticatedState}); 
        const { result } = renderHook( ()=> useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });
    
        
        await act( async ()=>{
            await result.current.startLogin(testUserCredentials);
        })
        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined, 
            status: 'authenticated',
            user: { name: 'test user', uid: '638a0c4e35ce1dfb6d5fbd58' },
        })
        expect( localStorage.getItem('token')).toEqual( expect.any(String));
        expect( localStorage.getItem('token-init-date')).toEqual( expect.any(String));
    });

    test('startLogin debe de fallar la autenticacion', async() => {  

        const mockStore = getMockStore({...notAuthenticatedState});
        const { result } = renderHook(()=> useAuthStore(), {
            wrapper: ({ children })=> <Provider store={ mockStore }>{ children }</Provider>
        }); 

        await act( async()=>{
            await result.current.startLogin({
                email: 'error@hotmail.com',
                password: '1234567',
            }); 
        });

        const { errorMessage, user, status } = result.current;

        expect({ errorMessage, user, status }).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: {
                ok: false,
                errorMessage: expect.any(String)
            },
        });

        // await waitFor(
        //     ()=> expect( result.current.errorMessage ).toBe( undefined )
        // )
    });

    test('startCreateUser debe crear un usuario ', async() => {

        const testUserJest = {
            email: 'testuserTesting@hotmail.com',
            password: '1234567',
            name: 'Test User Testing'
        }
        const mockStore = getMockStore({...notAuthenticatedState}); 
        const { result } = renderHook( ()=> useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });
    
            
        const spy = jest.spyOn( calendarApi, 'post').mockReturnValue({
            data:{
                ok: true,
                uid: "123456789",
                name: "test user jest",
                token: "0123456789"
            }
        });


        await act( async ()=>{
            await result.current.startCreateUser(testUserJest);
        })
  
        const { errorMessage, status, user } = result.current;  


        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: {
                name: "test user jest",
                uid: "123456789",
            }
        });

        

        spy.mockRestore(); 
    });


    
    test('startCreateUser debe fallar al registrar', async () => {  

        const mockStore = getMockStore({...notAuthenticatedState}); 
        const { result } = renderHook( ()=> useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });
    
        await act( async ()=>{
            await result.current.startCreateUser(testUserCredentials);
        })

        const { errorMessage, status, user } = result.current;  

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'El email ya esta registrado',
            status: 'not-authenticated',
            user: {}
        });
    });

    test('checkAuthToken debe fallar si no hay un token', () => {  

        const mockStore = getMockStore({...initialState});

        const { result } = renderHook( ()=> useAuthStore(), {
            wrapper: ({ children })=> <Provider store={ mockStore }>{ children }</Provider> 
        });     
    
        
        // act( ()=>{
        //     result.current.checkAuthToken(); 
        // })

        // const { user, errorMessage, status } = result.current; 

        // expect({ user, errorMessage, status }).toEqual({ 
        //     user: {},
        //     errorMessage: undefined,
        //     status: 'not-authenticated' 
        // });

    }); 
    

    test('checkAuthToken debe autenticar en caso de que exista un token', async () => {  

        const { data } = await calendarApi.post('/auth', testUserCredentials);
        localStorage.setItem('token', data.token); 

        const mockStore = getMockStore({...initialState});

        const { result } = renderHook( ()=> useAuthStore(), {
            wrapper: ({ children })=> <Provider store={ mockStore }>{ children }</Provider> 
        });     
    
        
        await act( async()=>{
            await result.current.checkAuthToken(); 
        })
        const { user, errorMessage, status } = result.current;   

        expect({ user, errorMessage, status }).toEqual({
            status: 'authenticated',
            user: { name: 'test user', uid: '638a0c4e35ce1dfb6d5fbd58' },
            errorMessage: undefined,
        })
    });


})