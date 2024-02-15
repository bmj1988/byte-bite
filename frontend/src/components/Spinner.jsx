import { RotatingLines } from 'react-loader-spinner'
import './MainPage/Main.css'

const Spinner = () => {
    return (
        <div className='spinner'>
            <RotatingLines color="black" height="100" width="120"/>
        </div>
    )
}

export default Spinner;
