class Point3D {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;

        this.rs = 1;
        this.rx = this.x;
        this.ry = this.y;
    }
    render() {
        setColor("black");
        fillRect(this.rx, this.ry, this.rs, this.rs);
    }
    update() {
        // project to 3d
        this.rs = 800 / (800 + this.z-camera.z);
        this.rx = ((this.x-camera.x) * this.rs) + 500;
        this.ry = ((this.y-camera.y) * this.rs) + 250;
    }
    updateNoZ() { // update but without camera Z axis control
        // project to 3d
        this.rs = 800 / (800 + this.z);
        this.rx = ((this.x-camera.x) * this.rs) + 500;
        this.ry = ((this.y-camera.y) * this.rs) + 250;
    }
}