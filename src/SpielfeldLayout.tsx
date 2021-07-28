import Coin from "./Components/Fields/Path/Coin";
import Empy from "./Components/Fields/Path/Empty";
import Holl from "./Components/Fields/HorizontalWalls/HorizontalWall";
import Hwrs from "./Components/Fields/HorizontalWalls/HorizontalWallRightSideShort";
import Hwls from "./Components/Fields/HorizontalWalls/HorizontalWallLeftSideShort";
import Vell from "./Components/Fields/VerticalWalls/VerticalWall";
import Vwts from "./Components/Fields/VerticalWalls/VerticalWallTopShort";
import Vwbs from "./Components/Fields/VerticalWalls/VerticalWallBottomShort";
import Tpbo from "./Components/Fields/TPieces/TPieceBottom";
import Tpto from "./Components/Fields/TPieces/TPieceTop";
import Tprs from "./Components/Fields/TPieces/TPieceRight";
import Tpls from "./Components/Fields/TPieces/TPieceLeft";
import Colt from "./Components/Fields/Corners/CornerLeftTop";
import Colb from "./Components/Fields/Corners/CornerLeftBottom";
import Cort from "./Components/Fields/Corners/CornerRightTop";
import Corb from "./Components/Fields/Corners/CornerRightBottom";
import Snac from "./Components/Fields/Path/Snack";
import Hack from "./Components/Hackman/Hackman";
import Geis from "./Components/Ghost/Ghost";
import React from 'react';

const SpielfeldLayout = () => {
    let fields: React.FC<any>[][] = [
        [Colt, Holl, Holl, Holl, Holl, Tpbo, Holl, Holl, Holl, Holl, Tpbo, Holl, Holl, Holl, Holl, Tpbo, Holl, Holl, Holl, Holl, Cort],
        [Vell, Snac, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Coin, Vwbs, Coin, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Snac, Vell],
        [Vell, Coin, Hwls, Hwrs, Coin, Vwbs, Coin, Hwls, Hwrs, Coin, Coin, Coin, Hwls, Hwrs, Coin, Vwbs, Coin, Hwls, Hwrs, Coin, Vell],
        [Vell, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vwts, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vell],
        [Tpls, Cort, Coin, Hwls, Holl, Holl, Holl, Hwrs, Coin, Hwls, Tpto, Hwrs, Coin, Hwls, Holl, Holl, Holl, Hwrs, Coin, Colt, Tprs],
        [Vell, Vell, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Snac, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vell, Vell],
        [Colb, Corb, Coin, Vwts, Coin, Colt, Cort, Coin, Colt, Hwrs, Coin, Hwls, Cort, Coin, Colt, Cort, Coin, Vwts, Coin, Colb, Corb],
        [Empy, Empy, Coin, Vell, Coin, Vell, Vell, Coin, Vell, Geis, Empy, Geis, Vell, Coin, Vell, Vell, Coin, Vell, Coin, Empy, Empy],
        [Hwls, Hwrs, Coin, Vell, Coin, Vell, Vell, Coin, Vell, Empy, Empy, Empy, Vell, Coin, Vell, Vell, Coin, Vell, Coin, Hwls, Hwrs],
        [Empy, Empy, Coin, Vell, Coin, Vell, Vell, Coin, Vell, Geis, Empy, Geis, Vell, Coin, Vell, Vell, Coin, Vell, Coin, Empy, Empy],
        [Colt, Hwrs, Coin, Vwbs, Coin, Colb, Corb, Coin, Colb, Holl, Tpbo, Holl, Corb, Coin, Colb, Corb, Coin, Vwbs, Coin, Hwls, Cort],
        [Vell, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vwbs, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vell],
        [Vell, Coin, Hwls, Hwrs, Coin, Vwts, Coin, Hwls, Hwrs, Coin, Hack, Coin, Hwls, Hwrs, Coin, Vwts, Coin, Hwls, Hwrs, Coin, Vell],
        [Vell, Snac, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Coin, Vwts, Coin, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Snac, Vell],
        [Colb, Holl, Holl, Holl, Holl, Tpto, Holl, Holl, Holl, Holl, Tpto, Holl, Holl, Holl, Holl, Tpto, Holl, Holl, Holl, Holl, Corb]
    ]

    return fields.slice();
}



export default SpielfeldLayout;
