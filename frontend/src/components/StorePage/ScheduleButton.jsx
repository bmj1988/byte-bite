import { FaCalendarDay } from "react-icons/fa"

const ScheduleButton = () => {

    // const [clicked, setClicked] = useState(false)
    // const onClick = () => {
    //     setClicked(!clicked)
    // }
    return (
        <div className="seeSimilar flexButtonRow">
            <FaCalendarDay style={{fontSize: '16px', marginRight: '5px'}}/>
            {"Schedule"}
        </div>
    )
}

export default ScheduleButton
