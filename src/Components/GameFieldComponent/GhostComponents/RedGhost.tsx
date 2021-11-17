import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../State/store";
import GhostCharacter from "../../../Types_Classes/Character/Base/GhostCharacter";
import {  getGhostAnimationClassName, getGhostBodyClassName, getGhostHeadClassName } from "./determineGhostCssClass";

const RedGhost: React.FC<any> = () => {
    const ghostCharacter: GhostCharacter = useSelector((state: State) => state.ghosts[1]);

    const [ghostHeadClassName, setGhostHeadClassName] = useState("");
    const [ghostBodyClassName, setGhostBodyClassName] = useState("");
    const [ghostAnimationClassName, setGhostAnimationClassName] = useState("ghost");


    useEffect(() => {
        setGhostHeadClassName(getGhostHeadClassName(ghostCharacter.isEdible,ghostCharacter.name));
        setGhostBodyClassName(getGhostBodyClassName(ghostCharacter.isEdible,ghostCharacter.name));
    }, [ghostCharacter.isEdible]);

    useEffect(() => {
        setGhostAnimationClassName(getGhostAnimationClassName(ghostCharacter.direction))
        const timeout = setTimeout(() => {
            setGhostAnimationClassName("ghost");
        }, 1000);

        return () => clearTimeout(timeout);
        //eslint-disable-next-line   
    }, []);

    return (
        <div className="field">
            <div className={ghostAnimationClassName}>
                <div className={ghostHeadClassName}>
                    <div className="ghost-eye"></div>
                    <div className="ghost-eye"></div>
                </div>
                <div className={ghostBodyClassName}>
                    <div className="ghost-spikes"></div>
                    <div className="ghost-spikes"></div>
                    <div className="ghost-spikes"></div>
                </div>
            </div>

        </div>
    );
}

export default RedGhost;

// .ghost{
//     z-index: 99;
//     position:relative;
// }

// .ghost-head {
//     /* top: 10%;
//     left: 10%; */
//     width: 70%;
//     height: 70%;
//     display:flex;
//     flex-direction:row;
//     border-radius: 50%;
//     transform:translateX(18%); 
//     z-index: 99;
// }

// .ghost-head-fill{
//     background: rgb(4, 4, 98);
// }

// .ghost-edible-head-fill{
//     background: blue;
// } 

// .ghost-eye{
//     margin-left: 15%;
//     height: 25%;
//     width: 20%;
//     border-radius: 50%;
//     transform: translateY(100%) translateX(30%);
//     background-color: rgb(189, 170, 170);
//     z-index: 99;
// }

// .ghost-eye-fill{
// }

// .ghost-body {
//     position: relative;
//     width: 70%;
//     height: 40%;
//     /* top: 45%;
//     left: 10%; */
//     /* display: flex;
//     flex-direction: row; */
//     z-index: 99;
//     transform:translateX(18%) translateY(-50%);
// }

// .ghost-body-fill{
//     background: rgb(4, 4, 98);
// }

// .ghost-edible-body-fill{
//     background-color: blue;
// }

// .ghost-spikes{
//     width: 60%;
//     height: 80%;
//     border-radius: 50%;
//     background-color: black;
//     transform: translateY(100%);
// }


// .move-ghost-from-right-to-left{
//     animation-name: move-ghost-from-right-to-left;
//     animation-duration: 1s;   
//     -webkit-animation-name: move-ghost-from-right-to-left; /* Chrome, Safari, Opera */
//     -webkit-animation-duration: 1s; /* Chrome, Safari, Opera */
// }
// .move-ghost-from-left-to-right{
//     animation-name: move-ghost-from-left-to-right;
//     animation-duration: 1s;   
//     -webkit-animation-name: move-ghost-from-left-to-right; /* Chrome, Safari, Opera */
//     -webkit-animation-duration: 1s; /* Chrome, Safari, Opera */
// }
// .move-ghost-from-up-to-bottom{
//     animation-name: move-ghost-from-up-to-bottom;
//     animation-duration: 1s;   
//     -webkit-animation-name: move-ghost-from-up-to-bottom; /* Chrome, Safari, Opera */
//     -webkit-animation-duration: 1s; /* Chrome, Safari, Opera */ 
// }
// .move-ghost-from-bottom-to-up{
//     animation-name: move-ghost-from-bottom-to-up;
//     animation-duration:1s;   
//     -webkit-animation-name: move-ghost-from-bottom-to-up; /* Chrome, Safari, Opera */
//     -webkit-animation-duration:1; /* Chrome, Safari, Opera */
// }


// @keyframes move-ghost-from-right-to-left {
//     0%  {transform: translateX(100%);}
//     7.15%   {transform: translateX(92.9%);}
//     14.3%   {transform: translateX(85.75%);}
//     21.45%   {transform: translateX(78.6%);}
//     28.6%   {transform: translateX(71.45%);}
//     35.75%   {transform: translateX(64.3%);}
//     42.8%   {transform: translateX(57.15%);}
//     50%  {transform: translateX(50%);}
//     57.15%   {transform: translateX(42.9%);}
//     64.3%   {transform: translateX(35.75%);}
//     71.45%   {transform: translateX(28.6%);}
//     78.6%   {transform: translateX(21.45%);}
//     85.75%   {transform: translateX(14.3%);}
//     92.9%   {transform: translateX(7.15%);}
//     100%  {transform: translateX(0%);} 
//   } 

// @-webkit-keyframes move-ghost-from-right-to-left {
//     0%  {transform: translateX(100%);}
//     7.15%   {transform: translateX(92.9%);}
//     14.3%   {transform: translateX(85.75%);}
//     21.45%   {transform: translateX(78.6%);}
//     28.6%   {transform: translateX(71.45%);}
//     35.75%   {transform: translateX(64.3%);}
//     42.8%   {transform: translateX(57.15%);}
//     50%  {transform: translateX(50%);}
//     57.15%   {transform: translateX(42.9%);}
//     64.3%   {transform: translateX(35.75%);}
//     71.45%   {transform: translateX(28.6%);}
//     78.6%   {transform: translateX(21.45%);}
//     85.75%   {transform: translateX(14.3%);}
//     92.9%   {transform: translateX(7.15%);}
//     100%  {transform: translateX(0%);} 
//   } 


// @keyframes move-ghost-from-left-to-right {
//     0%  {transform:rotateY(-180deg) translateX(100%);}
//     7.15%   {transform:rotateY(-180deg) translateX(92.9%);}
//     14.3%   {transform:rotateY(-180deg) translateX(85.75%);}
//     21.45%   {transform:rotateY(-180deg) translateX(78.6%);}
//     28.6%   {transform:rotateY(-180deg) translateX(71.45%);}
//     35.75%   {transform:rotateY(-180deg) translateX(64.3%);}
//     42.8%   {transform:rotateY(-180deg) translateX(57.15%);}
//     50%  {transform:rotateY(-180deg) translateX(50%);}
//     57.15%   {transform:rotateY(-180deg) translateX(42.9%);}
//     64.3%   {transform:rotateY(-180deg) translateX(35.75%);}
//     71.45%   {transform:rotateY(-180deg) translateX(28.6%);}
//     78.6%   {transform:rotateY(-180deg) translateX(21.45%);}
//     85.75%   {transform:rotateY(-180deg) translateX(14.3%);}
//     92.9%   {transform:rotateY(-180deg) translateX(7.15%);}
//     100%  {transform:rotateY(-180deg) translateX(0%);} 
//   } 

// @-webkit-keyframes move-ghost-from-left-to-right {
//     0%  {transform:rotateY(-180deg) translateX(100%);}
//     7.15%   {transform:rotateY(-180deg) translateX(92.9%);}
//     14.3%   {transform:rotateY(-180deg) translateX(85.75%);}
//     21.45%   {transform:rotateY(-180deg) translateX(78.6%);}
//     28.6%   {transform:rotateY(-180deg) translateX(71.45%);}
//     35.75%   {transform:rotateY(-180deg) translateX(64.3%);}
//     42.8%   {transform:rotateY(-180deg) translateX(57.15%);}
//     50%  {transform:rotateY(-180deg) translateX(50%);}
//     57.15%   {transform:rotateY(-180deg) translateX(42.9%);}
//     64.3%   {transform:rotateY(-180deg) translateX(35.75%);}
//     71.45%   {transform:rotateY(-180deg) translateX(28.6%);}
//     78.6%   {transform:rotateY(-180deg) translateX(21.45%);}
//     85.75%   {transform:rotateY(-180deg) translateX(14.3%);}
//     92.9%   {transform:rotateY(-180deg) translateX(7.15%);}
//     100%  {transform:rotateY(-180deg) translateX(0%);} 
//   } 


// @keyframes move-ghost-from-bottom-to-up {
//     0%  {transform:translateY(100%);}
//     7.15%   {transform:translateY(92.9%);}
//     14.3%   {transform:translateY(85.75%);}
//     21.45%   {transform:translateY(78.6%);}
//     28.6%   {transform:translateY(71.45%);}
//     35.75%   {transform:translateY(64.3%);}
//     42.8%   {transform:translateY(57.15%);}
//     50%  {transform:translateY(50%);}
//     57.15%   {transform:translateY(42.9%);}
//     64.3%   {transform:translateY(35.75%);}
//     71.45%   {transform:translateY(28.6%);}
//     78.6%   {transform:translateY(21.45%);}
//     85.75%   {transform:translateY(14.3%);}
//     92.9%   {transform:translateY(7.15%);}
//     100%  {transform:translateY(0%);} 
//   } 

// @webkit-keyframes move-ghost-from-bottom-to-up {
//     0%  {transform:translateY(100%);}
//     7.15%   {transform:translateY(92.9%);}
//     14.3%   {transform:translateY(85.75%);}
//     21.45%   {transform:translateY(78.6%);}
//     28.6%   {transform:translateY(71.45%);}
//     35.75%   {transform:translateY(64.3%);}
//     42.8%   {transform:translateY(57.15%);}
//     50%  {transform:translateY(50%);}
//     57.15%   {transform:translateY(42.9%);}
//     64.3%   {transform:translateY(35.75%);}
//     71.45%   {transform:translateY(28.6%);}
//     78.6%   {transform:translateY(21.45%);}
//     85.75%   {transform:translateY(14.3%);}
//     92.9%   {transform:translateY(7.15%);}
//     100%  {transform:translateY(0%);} 
//   } 
