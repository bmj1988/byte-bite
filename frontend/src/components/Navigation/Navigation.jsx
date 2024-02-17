import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import ProfileBars from "./ProfileBars";
import DeliveryToggle from "./DeliveryToggle";
import Location from "./Location";
import SearchBar from "./SearchBar";
import ShoppingCart from "./Cart";
import LoginIcon from "./LoginIcon";
import SignUpButton from "./SignUpButton";
import LogoDiv from "./LogoDiv";

function Navigation() {

  return (
    <nav className="nav-bar">

      <ProfileBars />
      <LogoDiv />
      <DeliveryToggle />
      <Location />
      <SearchBar />
      <ShoppingCart />
      <LoginIcon />
      <SignUpButton />

    </nav>


  );
}

export default Navigation;
