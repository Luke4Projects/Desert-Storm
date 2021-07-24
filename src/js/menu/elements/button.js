class Button {
    constructor(x, y, w, h, color, text) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.color = color;
        this.fontSize = 180/(this.text.length*1.5);
    }
    render() {
        //draw base of button
        setColor(this.color);
        fillRect(this.x+-this.w/2, this.y+-this.h/2, this.w, this.h);
        //draw text on button
        fillText(this.text, this.x-this.w/2+(this.fontSize/12), this.y+this.h/4, this.fontSize, "white", "Holtwood One SC");
    }
    clicked() {

        //detect if clicked
        if(mouseX > (this.x+-this.w/2)*scaleFitNative && mouseX < (this.x+-this.w/2)*scaleFitNative + this.w*scaleFitNative && mousePressed) {
            if(mouseY > (this.y+-this.h/2)*scaleFitNative && mouseY < (this.y+-this.h/2)*scaleFitNative + this.h*scaleFitNative) {
                return true;
            }
        }


    }
}