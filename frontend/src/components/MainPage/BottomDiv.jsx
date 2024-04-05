import LogoDiv from "../Navigation/LogoDiv"
import { Link } from "react-router-dom"
const MainPageBottomDiv = () => {
    const clicker = () => {
        alert("Feature coming soon!")
    }
    return (
        <div className="bottomDivMain textmark">
            <div className="left">
                <LogoDiv />
                <div className="dloadButtons">
                    <img onClick={() => clicker()} className="dloadImg" src="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/dloadApple.webp" />
                    <img onClick={() => clicker()} className="dloadImg" src="https://bmj1988-api-pics.s3.amazonaws.com/foodpics/dloadGoogle.webp" />

                </div>
            </div>
            <div className="right">
                <div className="linkList">
                    <Link onClick={() => clicker()} className="bottomMainLinks">Get Help</Link>
                    <Link onClick={() => clicker()} className="bottomMainLinks">Buy gift cards</Link>
                    <Link onClick={() => clicker()} className="bottomMainLinks">Add your restaurant</Link>
                    <Link onClick={() => clicker()} className="bottomMainLinks">Sign up to deliver</Link>
                    <Link onClick={() => clicker()} className="bottomMainLinks">Create a business account</Link>
                    <Link onClick={() => clicker()} className="bottomMainLinks">Promotions</Link>
                </div>
                <div className="linkList">
                    <Link onClick={() => clicker()} className="bottomMainLinks">Restaurants near me</Link>
                    <Link onClick={() => clicker()} className="bottomMainLinks">View all cities</Link>
                    <Link onClick={() => clicker()} className="bottomMainLinks">View all countries</Link>
                    <Link onClick={() => clicker()} className="bottomMainLinks">Pickup near me</Link>
                    <Link onClick={() => clicker()} className="bottomMainLinks">About Byte Bite</Link>
                    <Link onClick={() => clicker()} className="bottomMainLinks">English</Link>
                </div>
            </div>
        </div>
    )
}

export default MainPageBottomDiv;
