import { useState } from "react"

const SeeSimilarButton = () => {

    const [clicked, setClicked] = useState(false)
    const onClick = () => {
        setClicked(!clicked)
    }
    return (
        <div className={clicked ? "seeSimilarClicked" : "seeSimilar"} onClick={() => onClick()}>
            {clicked ? "See similar ▴" : "See similar ▾"}
        </div>
    )
}

export default SeeSimilarButton
