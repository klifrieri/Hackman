import { Outlet } from "react-router";

const LayoutPage: React.FC = () => {
    return (
        <div className="overlay-wrapper">
            <div className="overlay">
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutPage;