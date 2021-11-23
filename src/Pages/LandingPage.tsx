import "./css/landingPage.css";
import { Outlet } from "react-router";

const LandingPage:React.FC = () => {
    return (
        <div className="s-overlay-wrapper">
            <Outlet/>
        </div>
    )
}

export default LandingPage;