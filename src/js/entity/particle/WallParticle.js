class WallParticle {
    constructor(x, y, z, h, d, color, main) {
        // set positions
        this.x = x;
        this.y = y;
        this.z = z;
        // set sizes
        this.h = h; // height
        this.d = d; // depth
        // set other attributes
        this.color = color;
        this.main = main;

        // points
        this.points = [];
        this.points.push(new Point3D(this.x, this.y, this.z))
        this.points.push(new Point3D(this.x, this.y+this.h, this.z))
        this.points.push(new Point3D(this.x, this.y, this.z+this.d))
        this.points.push(new Point3D(this.x, this.y+this.h, this.z+this.d))
    }
    render() {
        for(let i = 0; i < this.points.length; i++) {
            if(this.main) {
                this.points[i].updateNoZ();
            } else {
                this.points[i].update();
            }
        }
        setColor(this.color);
        c.beginPath();
        moveTo(this.points[0].rx, this.points[0].ry);
        lineTo(this.points[1].rx, this.points[1].ry);
        lineTo(this.points[3].rx, this.points[3].ry);
        lineTo(this.points[2].rx, this.points[2].ry);
        c.fill();
        c.closePath();
    }
}