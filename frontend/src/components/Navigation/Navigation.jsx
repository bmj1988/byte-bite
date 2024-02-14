import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import ProfileBars from "./ProfileBars";
import DeliveryToggle from "./DeliveryToggle";
import Location from "./Location";
import SearchBar from "./SearchBar";
import ShoppingCart from "./Cart";
import LoginIcon from "./LoginIcon";
import SignUpButton from "./SignUpButton";

function Navigation() {
  return (
    <nav className="nav-bar">
      <div>
        <ProfileBars />
      </div>
      <div style={{ margin: '10px' }}>
        <span className='logo-text'>Byte</span><span className='logo-text bold'>Bite</span>
      </div>
      <DeliveryToggle />
      <Location />
      <SearchBar />
      <ShoppingCart />
      <LoginIcon />
      <SignUpButton/>

    </nav>


  );
}

export default Navigation;
