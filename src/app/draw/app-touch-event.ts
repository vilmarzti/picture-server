// TouchEvent workaround
// TouchEvent is not recognized in FF
export class AppTouchEvent {
    public type: string;
    public touches: any[]
    constructor(type: string, touches: any[]){
        this.type = type
        this.touches = touches
    }
}
