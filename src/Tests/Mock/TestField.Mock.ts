import Colt from '../../Components/Corners/CornerLeftTop'
import Colb from "../../Components/Corners/CornerLeftBottom";
import Cort from "../../Components/Corners/CornerRightTop";
import Corb from "../../Components/Corners/CornerRightBottom";
import Coin from "../../Components/Coin";
import Empy from "../../Components/Empty";
import Hack from "../../Components/Hackman";
import Snac from "../../Components/Snack";
import Geis from "../../Components/Ghost";

const testGameFieldCoinHackmanMiddle: React.FC<any>[][] = [
    [Colt,Coin,Cort],
    [Coin,Hack,Coin],
    [Colb,Coin,Corb],
]

const testGameFieldCoinPacmanTop: React.FC<any>[][] = [
    [Colt,Hack,Cort],
    [Coin,Coin,Coin],
    [Colb,Coin,Corb],
]

const testGameFieldCoinPacmanRight: React.FC<any>[][] = [
    [Colt,Coin,Cort],
    [Coin,Coin,Hack],
    [Colb,Coin,Corb],
]

const testGameFieldCoinPacmanLeft: React.FC<any>[][] = [
    [Colt,Coin,Cort],
    [Hack,Coin,Coin],
    [Colb,Coin,Corb],
]

const testGameFieldCoinPacmanDown: React.FC<any>[][] = [
    [Colt,Coin,Cort],
    [Coin,Coin,Coin],
    [Colb,Hack,Corb],
]

const testGameFieldCoinGhostUp: React.FC<any>[][] = [
    [Colt,Geis,Cort],
    [Coin,Coin,Coin],
    [Colb,Coin,Corb],
]

const testGameFieldCoinGhostRight: React.FC<any>[][] = [
    [Colt,Coin,Cort],
    [Coin,Coin,Geis],
    [Colb,Coin,Corb],
]

const testGameFieldCoinGhostLeft: React.FC<any>[][] = [
    [Colt,Coin,Cort],
    [Geis,Coin,Coin],
    [Colb,Coin,Corb],
]

const testGameFieldCoinGhostDown: React.FC<any>[][] = [
    [Colt,Coin,Cort],
    [Coin,Coin,Coin],
    [Colb,Geis,Corb],
]

const testGameFieldEmpty: React.FC<any>[][] = [
    [Colt,Empy,Cort],
    [Empy,Hack,Empy],
    [Colb,Empy,Corb],
]

const testGameFieldSnack: React.FC<any>[][] = [
    [Colt,Snac,Cort],
    [Snac,Hack,Snac],
    [Colb,Snac,Corb],
]

const testGameFieldGhost: React.FC<any>[][] = [
    [Colt,Geis,Cort],
    [Geis,Hack,Geis],
    [Colb,Geis,Corb],
]

const testGameFieldElse: React.FC<any>[][] = [
    [Colt,Colt,Colt],
    [Colt,Hack,Colt],
    [Colt,Colt,Colt],
]
const testGameFieldPortalUpAndDown: React.FC<any>[][] = [
    [Hack],
    [Hack]
]
const testGameFieldPortalLeftAndRight: React.FC<any>[][] = [
    [Hack,Hack]
]

const testGameFieldPortalEverywhere: React.FC<any>[][] = [
    [Hack]
]

export {testGameFieldCoinHackmanMiddle,testGameFieldCoinGhostDown,testGameFieldCoinGhostLeft,testGameFieldCoinGhostRight,testGameFieldCoinGhostUp, testGameFieldCoinPacmanRight,testGameFieldCoinPacmanDown,testGameFieldCoinPacmanLeft, testGameFieldCoinPacmanTop,testGameFieldSnack,testGameFieldEmpty,testGameFieldElse,testGameFieldGhost,testGameFieldPortalEverywhere,testGameFieldPortalLeftAndRight,testGameFieldPortalUpAndDown};