import { FaAppleAlt, FaLemon, FaCarrot, FaLeaf, FaSeedling, FaPepperHot, FaStar } from "react-icons/fa"

const icons = [
    <FaAppleAlt style={{ fontSize: '25px', color: 'red' }} />,
    <FaSeedling style={{ fontSize: '25px', color: 'green' }} />,
    <FaCarrot style={{ fontSize: '25px', color: 'orange' }} />,
    <FaLeaf style={{ fontSize: '25px', color: 'green' }} />,
    <FaPepperHot style={{ fontSize: '25px', color: 'red' }} />,
    <FaLemon style={{ fontSize: '25px', color: 'yellow' }} />
]

const ReviewBox = ({ review }) => {
    const randomIconIndex = Math.floor(Math.random() * icons.length);
    const randomIcon = icons[randomIconIndex]
    return (
        <div className="reviewBox">
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <div style={{ display: 'flex', background: 'pink', borderRadius: '50%', justifyContent: 'center', alignItems: 'center', padding: '6px', marginRight: '5px' }}>
                    {randomIcon}
                </div>
                <p className='reviewBoxName'>{`${review.user.firstName} ${review.user.lastName[0]}.`}</p>
            </div>
            <p className="reviewBoxText">{`${review.review}`}</p>
            <div>{review.stars}<FaStar style={{ fontSize: '25px', color: 'gold' }} /></div>
        </div>)
}

export default ReviewBox
