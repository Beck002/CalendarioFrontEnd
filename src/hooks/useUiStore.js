
import { useSelector, useDispatch } from 'react-redux'; 
import { onCloseDateModal, onOpenDateModal } from '../store';

export const useUiStore = () => {

    const { 
        isDateModalOpen 
    } = useSelector( state => state.ui);

    const dispatch = useDispatch();

    const openDateModal = () =>{
        dispatch( onOpenDateModal() );
    }

    const closeDateModal = (  ) =>{
        dispatch( onCloseDateModal() ); 
    } 

    const toggleModal = () =>{
        ( isDateModalOpen )
            ? closeDateModal()
            : openDateModal()
    }

    return {
        //* Propiedades
        isDateModalOpen,

        //* Metodos
        openDateModal,
        closeDateModal
    }


}
