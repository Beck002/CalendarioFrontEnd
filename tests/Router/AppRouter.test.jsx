import { render, screen} from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { useAuthStore } from "../../src/hooks";
import { AppRouter } from "../../src/routes/AppRouter";
import { store } from "../../src/store";



jest.mock("../../src/hooks/useAuthStore"); 

jest.mock("../../src/calendario/pages/CalendarioPage.jsx", ()=>({
    CalendarioPage: ()=> <h1>CalendarioPage</h1>
}))
 

describe('Pruebas en el componente AppRouter', ()=>{
    
    const mockCheckAuthToken = jest.fn();
    beforeEach(()=> jest.clearAllMocks());

    test('debe de mostrar la pantalla de carga y llamar al checkAuthToken', () => {  

        useAuthStore.mockReturnValue(({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken 
        }));

        render(<AppRouter/>);


        expect( screen.getByText('cargando')).toBeTruthy();
        expect( mockCheckAuthToken ).toHaveBeenCalled();

    });

    test('debe mostrar el login en caso de no estar autenticado ', () => {  

        useAuthStore.mockReturnValue(({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken 
        }));    
        
        const { container } = render(
            <Provider store={ store }>
                <MemoryRouter>
                    <AppRouter/>
                </MemoryRouter>
            </Provider>
        );

        expect( screen.getByText('Ingreso')).toBeTruthy(); 
        expect( container ).toMatchSnapshot();
    }); 

    test('debe mostrar el calendario en caso de estar autenticado ', () => {  

        useAuthStore.mockReturnValue(({
            status: 'authenticated',
            checkAuthToken: mockCheckAuthToken 
        }));    
        
        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <AppRouter/>
                </MemoryRouter>
            </Provider>
        );

        expect( screen.getByText('CalendarioPage')).toBeTruthy(); 


    })
})