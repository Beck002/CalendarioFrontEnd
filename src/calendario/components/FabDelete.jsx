import { useCalendarStore } from "../../hooks"

export const FabDelete = () => {

    const { startDeletingEvent, hasEventSelected } = useCalendarStore()

    const handleDelete = ()=> {
        startDeletingEvent();        
    }


    return (
        <button
            aria-label="btn-delete"
            onClick={ handleDelete }
            style={{ 'display': ( hasEventSelected ) ? '' : 'none'}}
            className="btn btn-danger fab-danger"
        >

            <i className="fas fa-trash-alt"></i>

        </button>
    )
}