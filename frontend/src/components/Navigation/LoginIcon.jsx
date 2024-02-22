import { FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import OpenModalButton from '../OpenModalButton'
import LoginFormModal from '../LoginFormModal'
import { useModal } from '../../context/Modal'

const LoginIcon = () => {
    const {setModalContent} = useModal();

    return (
        <div className='loginIcon' onClick={() => setModalContent(<LoginFormModal/>)}>
            <FaUser style={{fontSize: '16px', marginRight: '5px'}}/>
            {"Log in"}
        </div>
    )
}

export default LoginIcon
