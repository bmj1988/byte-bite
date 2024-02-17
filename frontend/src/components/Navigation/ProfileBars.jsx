import {FaBars} from 'react-icons/fa'
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useModal } from '../../context/Modal';

/// on Click needs to open modal on left side of page, spans full height of page
/// and about 300 pixels across, probably should shrink

/// Not logged in the modal has options for Login and Sign up

/// Logged in has user account details

const ProfileBars = () => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((store) => store.session.user);
    const ulRef = useRef();
    const navigate = useNavigate()
    const {setHideAddButton, hideAddButton} = useModal()
    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setHideAddButton(!hideAddButton)
        console.log('HIDE ADD BUTTON', hideAddButton)
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setHideAddButton(!hideAddButton)
                console.log('HIDE ADD BUTTON', hideAddButton)
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu)
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false)

    const logout = (e) => {
        e.preventDefault();
        dispatch(thunkLogout());
        closeMenu();
    };

    const toMyReviews = (e) => {
        e.preventDefault();
        navigate('/reviews/current');
        closeMenu();
    }

    const toMyRestaurants = (e) => {
        e.preventDefault();
        navigate('/store/my-stores');
        closeMenu();
    }

    return (
        <>
        <button className="profile-bars" onClick={toggleMenu}>
        <div>
            <FaBars style={{color: "black", margin: '10px', fontSize: '20px'}}/>
        </div>
        </button>
        <div className={showMenu ? "sidebar-overlay active" : "sidebar-overlay"} onClick={closeMenu}></div>
        <div className={showMenu ? "profile-sidebar active" : "profile-sidebar"}>
        <ul className={"profile-dropdown"} ref={ulRef}>
        {user ? (
            <>
                <li>{user.firstName} {user.lastName}</li>
                <li>{user.email}</li>
                <li><button onClick={logout}>Log Out</button></li>
                <li><button onClick={toMyReviews}>My Reviews</button></li>
                <li><button onClick={toMyRestaurants}>My Restaurants</button></li>
            </>
        ) : (
            <>
            <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
            />
            </>
        )}
        </ul>
        </div>
        </>
    )
}

export default ProfileBars
