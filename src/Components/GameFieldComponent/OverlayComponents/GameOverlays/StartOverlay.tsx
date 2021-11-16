import "./css/startOverlay.css"
import Image from "../../../../IMG/hackman1.png"


const Start:React.FC = () => {


    return (
        <div className="s-overlay-wrapper">
            <div className="s-overlay-menu">
                <div className="s-overlay-header">
                    <div className="s-overlay-header-l s-text">HAC</div>
                    <div className="s-overlay-header-img">
                        <img src={Image} alt="Hackman-Logo" id="image"></img>
                    </div>
                    <div className="s-overlay-header-r s-text">MAN</div>
                </div>
                <div className="s-overlay-buttons">
                    <button className="s-overlay-button">START</button>
                    <button className="s-overlay-button">OPTIONS</button>
                    <button className="s-overlay-button">HELP</button>
                </div>
            </div>
        </div>
    )
}

export default Start