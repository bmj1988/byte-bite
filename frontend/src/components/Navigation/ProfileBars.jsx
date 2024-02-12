import {FaBars} from 'react-icons/fa'

/// on Click needs to open modal on left side of page, spans full height of page
/// and about 300 pixels across, probably should shrink

/// Not logged in the modal has options for Login and Sign up

/// Logged in has user account details

const ProfileBars = () => {

    return (
        <FaBars style={{color: "black", margin: '10px', fontSize: '20px'}}/>
    )
}

export default ProfileBars
