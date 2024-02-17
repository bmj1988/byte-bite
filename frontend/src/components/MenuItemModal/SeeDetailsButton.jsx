import { useNavigate } from "react-router-dom"

const SeeDetailsButton = () => {
    const navigate = useNavigate();

    const clicker = () => {
        // navigate('') this will navigate to order details page
    }

    return (
        <div onClick={() => console.log('See details')} className="seeDetailsButton">
            {`See details`}
        </div>
    )
}

export default SeeDetailsButton
