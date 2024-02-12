import { FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const LoginIcon = () => {
    const user = useSelector((store) => store.session.user)

    return (
        <div className='loginIcon'>
            <FaUser style={{fontSize: '16px', marginRight: '5px'}}/>
            {`Log in`}

        </div>
    )
}

export default LoginIcon
