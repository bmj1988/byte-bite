import { FaCalendarDay } from "react-icons/fa"

const ScheduleButton = () => {


    const clicker = () => {
        alert('Feature coming soon!')
    }

    return (
        <div className="seeSimilar flexButtonRow" onClick={() => clicker()}>
            <FaCalendarDay style={{fontSize: '16px', marginRight: '5px'}}/>
            {"Schedule"}
        </div>
    )
}

export default ScheduleButton
