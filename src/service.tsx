import { EventEmitter } from "events";

class Emitter{
    constructor(){
        this.emitter = new EventEmitter();
    }
    emitter;
}

export default Emitter;