import { useModal } from '../../context/Modal'
import SignupFormModal from '../SignupFormModal'

const SignUpButton = () => {
    const {setModalContent} = useModal();

    return (
        <div className='loginIcon' onClick={() => setModalContent(<SignupFormModal/>)}>
           {"Sign up"}
        </div>
    )
}

export default SignUpButton
