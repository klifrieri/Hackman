import { RefObject } from "react";

    const gameFieldCssInjection = (centerRef:RefObject<HTMLDivElement>) => {
        setRowHeightStyleTag();
        let headTag = document.getElementsByTagName("head");
        let row = centerRef.current?.firstElementChild;
        if(!row){
            return;
        }
        let rowHeightInPx = getComputedStyle(row!).height;

        var styleTag = document.createElement("style");
        styleTag.type = "text/css";
        styleTag.id = "styleTag";
        styleTag.innerHTML = `div.center > div.row > div.field {width: ${rowHeightInPx};}`;
        let styleSheetTest = document.getElementById("styleTag");
        if (styleSheetTest) {
            headTag[0].removeChild(styleSheetTest);
        }
        headTag[0].appendChild(styleTag);
    };

    const setRowHeightStyleTag = () => {
        let headTag = document.getElementsByTagName("head");
        let height = window.innerHeight;
        let width = window.innerWidth;
        if (width - height < 50) {
            width -= 50;
        }

        console.debug("Height" + height);
        console.debug("\nWidth" + width);
        var styleRow = document.createElement("style");
        styleRow.type = "text/css";
        styleRow.id = "rowStyleTag";
        let estimatedHeight = 0;
        if (height > width + width / 2) {
            estimatedHeight = 2;
        } else if (height > width) {
            estimatedHeight = 3;
        } else {
            estimatedHeight = 5;
        }
        styleRow.innerHTML = `div.center > div.row { height: ${estimatedHeight}%}`;
        let styleSheetTest = document.getElementById("rowStyleTag");
        if (styleSheetTest) {
            headTag[0].removeChild(styleSheetTest);
        }
        headTag[0].appendChild(styleRow);
    };

    export default gameFieldCssInjection;