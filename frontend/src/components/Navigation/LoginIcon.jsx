import { FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import OpenModalButton from '../OpenModalButton'
import LoginFormModal from '../LoginFormModal'

const LoginIcon = () => {
    const user = useSelector((store) => store.session.user)

    return (
        <div className='loginIcon'>
            <FaUser style={{fontSize: '16px', marginRight: '5px'}}/>
            <OpenModalButton 
            modalComponent={<LoginFormModal/>}
            buttonText='Log In'
            />
        </div>
    )
}

export default LoginIcon
