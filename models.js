function Model(models) {
    this.models = models;
}

Block.prototype = new Model();
Block.prototype.constructor = Block;
function Block(point, width, height, depth, color) {
    this.polygonXY = new PolygonXY(point, width, height, color);
    this.polygonXZ = new PolygonXZ(new Point(point.x,
                point.y + height, point.z), width, depth, color);
    this.polygonYZ = new PolygonYZ(new Point(point.x + width,
                point.y, point.z), height, depth, color);
    this.models = [this.polygonXY, this.polygonXZ, this.polygonYZ];
}
