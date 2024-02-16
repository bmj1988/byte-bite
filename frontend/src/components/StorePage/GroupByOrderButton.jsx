// import { useState } from "react"
import { FaUserPlus } from "react-icons/fa"

const GroupOrderButton = () => {

    // const [clicked, setClicked] = useState(false)
    // const onClick = () => {
    //     setClicked(!clicked)
    // }
    return (
        <div className="seeSimilar flexButtonRow">
            <FaUserPlus style={{fontSize: '16px', marginRight: '5px'}}/>
            {"Group order"}
        </div>
    )
}

export default GroupOrderButton
