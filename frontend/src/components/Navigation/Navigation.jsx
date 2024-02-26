import "./Navigation.css";
import ProfileBars from "./ProfileBars";
import DeliveryToggle from "./DeliveryToggle";
import Location from "./Location";
import SearchBar from "./SearchBar";
import ShoppingCart from "./Cart";
import LoginIcon from "./LoginIcon";
import SignUpButton from "./SignUpButton";
import LogoDiv from "./LogoDiv";
import { useSelector } from "react-redux";

function Navigation() {
  const user = useSelector((state) => state.session?.user)

  return (
    <nav className="nav-bar">
      <div style={{display: 'flex'}}>
      <ProfileBars />
      <LogoDiv />
      </div>
      <DeliveryToggle />
      <Location />
      <SearchBar />
      <ShoppingCart />
      {!user && <>
        <LoginIcon />
        <SignUpButton />
      </>}
    </nav>


  );
}

export default Navigation;
