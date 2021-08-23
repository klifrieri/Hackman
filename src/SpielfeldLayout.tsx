import Coin from "./Components/GameFieldComponent/FieldComponents/Path/Coin";
import Empy from "./Components/GameFieldComponent/FieldComponents/Path/Empty";
import Holl from "./Components/GameFieldComponent/FieldComponents/HorizontalWalls/HorizontalWall";
import Hwrs from "./Components/GameFieldComponent/FieldComponents/HorizontalWalls/HorizontalWallRightSideShort";
import Hwls from "./Components/GameFieldComponent/FieldComponents/HorizontalWalls/HorizontalWallLeftSideShort";
import Vell from "./Components/GameFieldComponent/FieldComponents/VerticalWalls/VerticalWall";
import Vwts from "./Components/GameFieldComponent/FieldComponents/VerticalWalls/VerticalWallTopShort";
import Vwbs from "./Components/GameFieldComponent/FieldComponents/VerticalWalls/VerticalWallBottomShort";
import Tpbo from "./Components/GameFieldComponent/FieldComponents/TPieces/TPieceBottom";
import Tpto from "./Components/GameFieldComponent/FieldComponents/TPieces/TPieceTop";
import Tprs from "./Components/GameFieldComponent/FieldComponents/TPieces/TPieceRight";
import Tpls from "./Components/GameFieldComponent/FieldComponents/TPieces/TPieceLeft";
import Colt from "./Components/GameFieldComponent/FieldComponents/Corners/CornerLeftTop";
import Colb from "./Components/GameFieldComponent/FieldComponents/Corners/CornerLeftBottom";
import Cort from "./Components/GameFieldComponent/FieldComponents/Corners/CornerRightTop";
import Corb from "./Components/GameFieldComponent/FieldComponents/Corners/CornerRightBottom";
import Snac from "./Components/GameFieldComponent/FieldComponents/Path/Snack";
import Hack from "./Components/GameFieldComponent/HackmanComponent/Hackman";
import Gei1 from "./Components/GameFieldComponent/GhostComponents/Ghost1";
import Gei2 from "./Components/GameFieldComponent/GhostComponents/Ghost2";
import Gei3 from "./Components/GameFieldComponent/GhostComponents/Ghost3";
import Gei4 from "./Components/GameFieldComponent/GhostComponents/Ghost4";
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
        [Empy, Empy, Coin, Vell, Coin, Vell, Vell, Coin, Vell, Gei1, Empy, Gei2, Vell, Coin, Vell, Vell, Coin, Vell, Coin, Empy, Empy],
        [Hwls, Hwrs, Coin, Vell, Coin, Vell, Vell, Coin, Vell, Empy, Empy, Empy, Vell, Coin, Vell, Vell, Coin, Vell, Coin, Hwls, Hwrs],
        [Empy, Empy, Coin, Vell, Coin, Vell, Vell, Coin, Vell, Gei3, Empy, Gei4, Vell, Coin, Vell, Vell, Coin, Vell, Coin, Empy, Empy],
        [Colt, Hwrs, Coin, Vwbs, Coin, Colb, Corb, Coin, Colb, Holl, Tpbo, Holl, Corb, Coin, Colb, Corb, Coin, Vwbs, Coin, Hwls, Cort],
        [Vell, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vwbs, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Vell],
        [Vell, Coin, Hwls, Hwrs, Coin, Vwts, Coin, Hwls, Hwrs, Snac, Hack, Coin, Hwls, Hwrs, Coin, Vwts, Coin, Hwls, Hwrs, Coin, Vell],
        [Vell, Snac, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Coin, Vwts, Coin, Coin, Coin, Coin, Vell, Coin, Coin, Coin, Snac, Vell],
        [Colb, Holl, Holl, Holl, Holl, Tpto, Holl, Holl, Holl, Holl, Tpto, Holl, Holl, Holl, Holl, Tpto, Holl, Holl, Holl, Holl, Corb]
    ]

    return fields.slice();
}



export default SpielfeldLayout;
