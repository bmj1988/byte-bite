import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare } from "react-icons/fa"
import { Link } from "react-router-dom"

const BottomLine = () => {
    const clicker = () => {
        alert("Feature coming soon!")
    }

    return (
        <div className="bottomDivMain">
            <div className="bottomLineSocialIcons">
                <FaFacebookSquare onClick={() => clicker()} />
                <FaTwitterSquare onClick={() => clicker()} />
                <FaInstagramSquare onClick={() => clicker()} />
            </div>
            <div className="bottomLineLinks">
                <Link className="bottomMainLinks" onClick={() => clicker()}>Privacy Policy</Link>
                <Link className="bottomMainLinks" onClick={() => clicker()}>Terms</Link>
                <Link className="bottomMainLinks" onClick={() => clicker()}>Pricing</Link>
                <Link className="bottomMainLinks" onClick={() => clicker()}>Do not sell or share my personal information</Link>
            </div>
        </div>
    )
}

export default BottomLine;
