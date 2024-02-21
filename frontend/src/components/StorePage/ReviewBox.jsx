import { FaStar } from "react-icons/fa"
import icons from './utils/iconsForReviewBox'
import colors from "./utils/colorsForReviewBox";

const ReviewBox = ({ review }) => {
    const randomIconIndex = Math.floor(Math.random() * icons.length);
    const randomIcon = icons[randomIconIndex]
    const color = colors[Math.floor(Math.random() * colors.length)]

    return (
        <div className="reviewBox">
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <div style={{ display: 'flex', background: color, borderRadius: '50%', justifyContent: 'center', alignItems: 'center', padding: '6px', marginRight: '5px' }}>
                    {randomIcon}
                </div>
                <p className='reviewBoxName'>{`${review.user.firstName} ${review.user.lastName[0]}.`}</p>
            </div>
            <p className="reviewBoxText">{`${review.review}`}</p>
            <div>{review.stars}<FaStar style={{ fontSize: '12', color: 'black' }} /></div>
        </div>
        )
}

export default ReviewBox
