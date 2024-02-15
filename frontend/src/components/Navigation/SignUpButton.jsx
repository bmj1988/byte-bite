import OpenModalButton from '../OpenModalButton'
import SignupFormModal from '../SignupFormModal'

const SignUpButton = () => {
    return (
        <div className='loginIcon'>
            <OpenModalButton 
            modalComponent={<SignupFormModal />}
            buttonText='Sign Up'
            />
        </div>
    )
}

export default SignUpButton
