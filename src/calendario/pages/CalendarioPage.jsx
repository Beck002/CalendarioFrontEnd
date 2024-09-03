import { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { Navbar } from '../components/Navbar';

import { addHours } from 'date-fns';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer, getMessagesEs } from '../../helpers';
import { CalendarEvent } from '../components/CalendarEvent';
import { CalendarModal } from '../components/CalendarModal';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';
import { useEffect } from 'react';




export const CalendarioPage = () => {

    const { user } = useAuthStore()
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
    const { openDateModal } = useUiStore();
    const [ lastView, onLastView] = useState(localStorage.getItem('lastView') || 'week')

    const eventStyleGetter = ( event, start, end, isSelected ) => { 

        const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );

        const style = {
            backgroundColor:  isMyEvent ?  '#347CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }
    
        return {
            style
        }
    }
        

    const onDobleClick = ( )=>{
        openDateModal();
    }

    const onSelect = ( event )=>{
        setActiveEvent( event );
    }

    const onViewChanged = ( event )=>{
        localStorage.setItem( 'lastView', event );
    }

    useEffect(() => {   
        startLoadingEvents();
    }, [])



    return (
        <>  
            <Navbar />
            <Calendar
                defaultView={ lastView }
                culture='es'
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc( 100vh - 80px)' }}
                messages={ getMessagesEs() }
                eventPropGetter={ eventStyleGetter }
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={ onDobleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChanged }
            />    

            <CalendarModal /> 
            <FabAddNew   />
            <FabDelete />
        </>
    )
}
