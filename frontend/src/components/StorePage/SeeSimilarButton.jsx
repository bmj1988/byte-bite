import { useState } from "react"
import { FaAngleDown, FaAngleUp } from "react-icons/fa"

const SeeSimilarButton = () => {

    const [clicked, setClicked] = useState(false)
    const onClick = () => {
        setClicked(!clicked)
        alert('Feature coming soon!')
    }
    return (
        <div onClick={() => onClick()}>
            {!clicked && <div className={"seeSimilar"}>
                <p>See Similar</p>
                <FaAngleDown />
            </div>}
            {clicked && <div className={"seeSimilarClicked"}>
                <p>See Similar</p>
                <FaAngleUp />
            </div>}
        </div>
    )
}

export default SeeSimilarButton
