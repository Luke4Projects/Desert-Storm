class Particle3D {
    constructor(x, y, z, w, d, color, op) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.d = d;
        this.color = color;
        this.op = op;

        this.points = [];
        this.points.push(new Point3D(this.x, this.y, this.z));
        this.points.push(new Point3D(this.x+this.w, this.y, this.z));
        this.points.push(new Point3D(this.x, this.y, this.z+this.d));
        this.points.push(new Point3D(this.x+this.w, this.y, this.z+this.d));
    }
    render() {
        for(let i = 0; i < this.points.length; i++) {
            this.points[i].update();
        }
        setOpacity(this.op);
        setColor(this.color);
        c.beginPath();
        moveTo(this.points[0].rx, this.points[0].ry);
        lineTo(this.points[1].rx, this.points[1].ry);
        lineTo(this.points[3].rx, this.points[3].ry);
        lineTo(this.points[2].rx, this.points[2].ry);
        c.fill();
        c.closePath();
        setOpacity(1);
    }
}