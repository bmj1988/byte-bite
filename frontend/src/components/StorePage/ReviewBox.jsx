import { FaAppleAlt } from "react-icons/fa"

const ReviewBox = ({ review }) => {
    return (
        <div className="reviewBox">
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <div style={{ display: 'flex', background: 'pink', borderRadius: '50%', justifyContent: 'center', alignItems: 'center', padding: '6px', marginRight: '5px' }}>
                    <FaAppleAlt style={{ fontSize: '25px', color: 'red' }} />
                </div>
                <p className='reviewBoxName'>{`${review.user.firstName} ${review.user.lastName[0]}.`}</p>
            </div>
            <p className="reviewBoxText">{`${review.review}`}</p>
        </div>)
}

export default ReviewBox
