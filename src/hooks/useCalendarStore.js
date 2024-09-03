import { useSelector, useDispatch } from 'react-redux'; 
import Swal from 'sweetalert2';
import { calendarApi } from '../api';
import { convertDatesToEventDates } from '../helpers';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';

export const useCalendarStore = () => {

    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector( state => state.calendar);
    const { user }                = useSelector( state => state.auth);

    const setActiveEvent = ( calendarEvent )=>{
        dispatch( onSetActiveEvent( calendarEvent) );
    }


    const startSavingEvent = async ( calendarEvent ) => {
      

        // TODO: UpdateEvent
        try {
            
            if( calendarEvent.id ){    
                //Actualizando
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch( onUpdateEvent({ ...calendarEvent, user }));
            }
    
            // creando 
            const { data } = await calendarApi.post('/events', calendarEvent)
            dispatch( onAddNewEvent({ 
                ...calendarEvent,
                id: data.eventoGuardado.id,
                user
            }))
        } catch (error) {

            console.log(error);
            Swal.fire('Error al guardar', error.response.data.errorMessage, 'error')
        }
        

    }

    const startDeletingEvent = async (  ) =>{

        try {
            await calendarApi.delete(`/events/${ activeEvent.id }`);
            dispatch( onDeleteEvent());
        } catch (error) {
            console.log(error);
            Swal.fire('Error al borrar', error.response.data.errorMessage, 'error')

        }

    }

    const startLoadingEvents = async () => {

        try {

            const { data } = await calendarApi.get('/events')
            const eventos  = convertDatesToEventDates( data.listaEventos );
            dispatch( onLoadEvents( eventos ) ) 
        } catch (error) {
            console.log(error);   
        }
    }


    return{
        //* Propiedades
        events,
        activeEvent,
        hasEventSelected : !!activeEvent,

        //* Método
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }



}
