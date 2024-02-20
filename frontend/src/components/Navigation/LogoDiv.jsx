import { useLocation, useNavigate } from "react-router-dom"

const LogoDiv = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const click = () => {
        if (location.pathname !== '/') {
            navigate('/')
            return
        }
    }

    return (<div style={{ margin: '10px', cursor: 'pointer' }} onClick={() => click()} >
        <span className='logo-text'>Byte</span><span className='logo-text bolder'>Bite</span>
    </div>)
}

export default LogoDiv
