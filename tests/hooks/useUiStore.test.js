import { configureStore } from "@reduxjs/toolkit";
import { renderHook } from "@testing-library/react"
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { useUiStore } from "../../src/hooks"
import { store, uiSlice } from "../../src/store";


const getMockStore = ( initialState )=>{

    return configureStore({
        reducer: {
            ui:       uiSlice.reducer,
        },
        preloadedState:{
            ui:{ ...initialState }
        },
    })

}

describe( 'pruebas useUiStore ', () => {

    test('debe regresar los valores por defecto', () => {  

        const mockStore = getMockStore({
            isDateModalOpen: false
        })

        const { result } = renderHook( ()=> useUiStore(), {
            wrapper: ({ children })=> <Provider store={ mockStore }>{ children }</Provider>
        }); 


        expect(result.current).toEqual({
            isDateModalOpen: false,
            openDateModal:  expect.any(Function),
            closeDateModal: expect.any(Function),
        });

    });


    test('openDateModal debe colocar en true el isDateModalOpen', () => {  

        const mockStore = getMockStore({
            isDateModalOpen: false
        })

        const { result } = renderHook( ()=> useUiStore(), {
            wrapper: ({ children })=> <Provider store={ mockStore }>{ children }</Provider>
        }); 

        const { openDateModal } = result.current; 

        act( () =>{
            openDateModal();
        })
        
        expect( result.current.isDateModalOpen).toBeTruthy();
    }); 



    test('closeDateModal debe colocar en true el isDateModalOpen', () => {  

        const mockStore = getMockStore({
            isDateModalOpen: true
        })

        const { result } = renderHook( ()=> useUiStore(), {
            wrapper: ({ children })=> <Provider store={ mockStore }>{ children }</Provider>
        }); 

        const { closeDateModal } = result.current; 

        act( () =>{
            closeDateModal();
        })
        expect( result.current.isDateModalOpen).toBeFalsy();
    }); 



})