import { fireEvent, render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendario/components/FabDelete";
import { useCalendarStore } from "../../../src/hooks";


jest.mock( "../../../src/hooks" )

describe( 'pruebas en el componente FabDelete', ()=>{

    const mockStartDeletingEvent = jest.fn(); 

    beforeEach(()=> jest.clearAllMocks());

    test( 'debe  mostrar el componente correctamente' , () => {  
        
        useCalendarStore.mockReturnValue(({
            hasEventSelected: false
        }))

        render( <FabDelete/> ); 
        screen.debug();

        const btn = screen.getByLabelText('btn-delete'); 

        expect( btn.classList ).toContain('btn'); 
        expect( btn.classList ).toContain('btn-danger'); 
        expect( btn.style.display ).toBe('none'); 

    });

    test( 'debe  mostrar el boton si hay un evento activo' , () => {  
        
        useCalendarStore.mockReturnValue(({
            hasEventSelected: true
        }))

        render( <FabDelete/> ); 
        screen.debug();

        // expect( btn.style.display ).toBe(''); 

    });

    
    test( 'debe llamar a startDeletingEvent' , () => {  
        
        useCalendarStore.mockReturnValue(({
            hasEventSelected: true,
            startDeletingEvent: mockStartDeletingEvent
        })); 
        render( <FabDelete/> ); 

        const btn = screen.getByLabelText('btn-delete');

        fireEvent.click( btn );

        expect( mockStartDeletingEvent ).toHaveBeenCalled();

    });
});