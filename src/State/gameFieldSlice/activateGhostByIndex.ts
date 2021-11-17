import { WritableDraft } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import GhostCharacter from "../../Types_Classes/Character/Base/GhostCharacter";

const activateGhostByIndex = (index: number, ghosts: WritableDraft<GhostCharacter[]>) => {
    switch (index) {
        case 1:
            ghosts[0].shallTick = true;
            break;
        case 2:
            ghosts[1].shallTick = true;
            break;
        case 3:
            ghosts[2].shallTick = true;
            break;
        case 4:
            ghosts[3].shallTick = true;
            break;
    }
}

export default activateGhostByIndex;