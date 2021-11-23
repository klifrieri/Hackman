import HorizontalWall from "../../Components/GamePageComponents/FieldComponents/HorizontalWalls/HorizontalWall"
import Block from "../../Components/GamePageComponents/FieldComponents/Path/Block"
import Coin from "../../Components/GamePageComponents/FieldComponents/Path/Coin"
import Empty from "../../Components/GamePageComponents/FieldComponents/Path/Empty"
import Gate from "../../Components/GamePageComponents/FieldComponents/Path/Gate"
import Snack from "../../Components/GamePageComponents/FieldComponents/Path/Snack"
import TPieceBottom from "../../Components/GamePageComponents/FieldComponents/TPieces/TPieceBottom"
import TPieceLeft from "../../Components/GamePageComponents/FieldComponents/TPieces/TPieceLeft"
import TPieceRight from "../../Components/GamePageComponents/FieldComponents/TPieces/TPieceRight"
import TPieceTop from "../../Components/GamePageComponents/FieldComponents/TPieces/TPieceTop"
import VerticalWall from "../../Components/GamePageComponents/FieldComponents/VerticalWalls/VerticalWall"
import VerticalWallTS from "../../Components/GamePageComponents/FieldComponents/VerticalWalls/VerticalWallTopShort"
import BlueGhost from "../../Components/GamePageComponents/GhostComponents/BlueGhost"
import GreenGhost from "../../Components/GamePageComponents/GhostComponents/GreenGhost"
import OrangeGhost from "../../Components/GamePageComponents/GhostComponents/OrangeGhost"
import RedGhost from "../../Components/GamePageComponents/GhostComponents/RedGhost"
import Hackman from "../../Components/GamePageComponents/HackmanComponent/Hackman"
import VerticalWallBS from "../../Components/GamePageComponents/FieldComponents/VerticalWalls/VerticalWallBottomShort";
import HorizontalWallRS from "../../Components/GamePageComponents/FieldComponents/HorizontalWalls/HorizontalWallRightSideShort";
import HorizontalWallLS from "../../Components/GamePageComponents/FieldComponents/HorizontalWalls/HorizontalWallLeftSideShort";
import CornerLT from "../../Components/GamePageComponents/FieldComponents/Corners/CornerLeftTop";
import CornerLB from "../../Components/GamePageComponents/FieldComponents/Corners/CornerLeftBottom";
import CornerRT from "../../Components/GamePageComponents/FieldComponents/Corners/CornerRightTop";
import CornerRB from "../../Components/GamePageComponents/FieldComponents/Corners/CornerRightBottom";

const renderGameField = (component: React.FC, key: number) => {
    if (component === HorizontalWall) return <HorizontalWall key={key} />;
    else if (component === HorizontalWallLS) return <HorizontalWallLS key={key} />;
    else if (component === HorizontalWallRS) return <HorizontalWallRS key={key} />;
    else if (component === VerticalWall) return <VerticalWall key={key} />;
    else if (component === VerticalWallBS) return <VerticalWallBS key={key} />;
    else if (component === VerticalWallTS) return <VerticalWallTS key={key} />;
    else if (component === TPieceBottom) return <TPieceBottom key={key} />;
    else if (component === TPieceTop) return <TPieceTop key={key} />;
    else if (component === TPieceRight) return <TPieceRight key={key} />;
    else if (component === TPieceLeft) return <TPieceLeft key={key} />;
    else if (component === CornerLT) return <CornerLT key={key} />;
    else if (component === CornerLB) return <CornerLB key={key} />;
    else if (component === CornerRT) return <CornerRT key={key} />;
    else if (component === CornerRB) return <CornerRB key={key} />;
    else if (component === Coin) return <Coin key={key} />;
    else if (component === Hackman) return <Hackman key={key} />;
    else if (component === GreenGhost) {
        return <GreenGhost key={key} />;
    } else if (component === RedGhost) {
        return <RedGhost key={key} />;
    } else if (component === OrangeGhost) {
        return <OrangeGhost key={key} />;
    } else if (component === BlueGhost) {
        return <BlueGhost key={key} />;
    } else if (component === Snack) return <Snack key={key} />;
    else if (component === Empty) return <Empty key={key} />;
    else if (component === Gate) return <Gate key={key} />;
    else if (component === Block) return <Block key={key} />;
    else return undefined;
};

export default renderGameField;