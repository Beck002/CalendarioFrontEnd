import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../__fixtures__/calendarState"

describe('Pruebas en calendar Slice', () => {

    test('debe devolver el estado inicial', () => { 
        const state = calendarSlice.getInitialState();
        expect( state ).toEqual( initialState );
    }); 

    test('onSetActiveEvent debe activar el evento', () => { 
        const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent( events[0] ));
        expect( state.activeEvent ).toEqual( events[0]);
    });

    test('onAddNewEvent debe agregar un nuevo evento', () => { 

        const newEvent = {
            id: 3 ,
            start: new Date('2022/10/22 13:00:00'),
            end:   new Date('2022/10/22 15:00:00'),
            title: "newEvent test",
            notes: "newEvent test notes",
            bgColor: "#fafafa",
        };           
        const state = calendarSlice.reducer( calendarWithActiveEventState, onAddNewEvent(newEvent));
        expect( state.events ).toEqual([ ...events, newEvent]);
    });

    test('onUpdateEvent debe actualizar un nuevo evento', () => { 

        const updatedEvent = {
            id: 1 ,
            start: new Date('2022/10/22 13:00:00'),
            end:   new Date('2022/10/22 15:00:00'),
            title: "Nota actualizada test",
            notes: "nota actualizada test notes",
            bgColor: "#fafafa",
        };           
        const state = calendarSlice.reducer( calendarWithActiveEventState, onUpdateEvent( updatedEvent ));
        expect( state.events ).toContain( updatedEvent );
    });

    test('onDeleteEvent debe borrar un evento', () => {  

        const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent(events[0]));
        expect(state.events).toEqual([
            {
              id: 2,
              start: new Date('2022/10/22 13:00:00'),
              end:  new Date('2022/10/22 15:00:00'),
              title: 'Notes testing',
              notes: 'note testitng notes',
              bgColor: '#fafafa'
            }
        ]);
    });

    test('onLoadEvents debe cargar los eventos', () => {  

        const state = calendarSlice.reducer( initialState, onLoadEvents(events));
        expect( state.isLoadingEvents ).toBeFalsy();
        expect( state.events ).toEqual(events);

        const newState = calendarSlice.reducer( state, onLoadEvents( events )); 
        expect( state.events.length ).toBe( events.length );



    });

    test('onLogoutCalendar debe resetear el estado', () => {  
        
        const state = calendarSlice.reducer( calendarWithActiveEventState, onLogoutCalendar());
        expect( state ).toEqual( initialState ); 
        
    });

    
    

})