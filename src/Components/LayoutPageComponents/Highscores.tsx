import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import appStateSlice from "../../State/appState/appStateSlice";
import { State } from "../../State/store";
import HighscoreTable from "./StartMenu/ChildComponents/HighscoreTable";
import "./css/win.css";
import { Link } from "react-router-dom";

const Highscores: React.FC = () => {

    return (
        <>
            <h2 className="win-overlay-header overlay-heading heading-fontsize">Highscores</h2>
            <HighscoreTable />
            <div className="btn-wrapper flex-columns">
                <Link to="/" className="btn">Back</Link>
            </div>
        </>
    );
};

export default Highscores;
