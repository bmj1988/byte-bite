// import { useState } from "react"
import { FaUserPlus } from "react-icons/fa"

const GroupOrderButton = () => {

    const clicker = () => {
        alert('Feature coming soon!')
    }

    return (
        <div className="seeSimilar flexButtonRow" onClick={() => clicker()}>
            <FaUserPlus style={{fontSize: '16px', marginRight: '5px'}}/>
            {"Group order"}
        </div>
    )
}

export default GroupOrderButton
