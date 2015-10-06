function Model(models) {
    this.models = models || [];
}


Block.prototype = new Model();
Block.prototype.constructor = Block;
function Block(point, width, height, depth, color) {
    if (arguments.length >= 4)
        this.init(point, width, height, depth, color);
}

Block.prototype.init = function (point, width, height, depth, color) {
    this.polygonXY = new PolygonXY(point, width, height, color);
    this.polygonXZ = new PolygonXZ(new Point(point.x,
                point.y + height, point.z), width, depth, color);
    this.polygonYZ = new PolygonYZ(new Point(point.x + width,
                point.y, point.z), height, depth, color);
    this.models = [this.polygonXY, this.polygonXZ, this.polygonYZ];
}

Block.prototype.setWidth = function (width) {
    this.polygonXY.pointB.x = this.polygonXY.pointA.x + width;
    this.polygonXZ.pointB.x = this.polygonXZ.pointA.x + width;
    this.polygonYZ.pointA.x = this.polygonYZ.pointB.x = this.polygonXY.pointB.x;
}

Block.prototype.setX = function (x) {
    var width = this.polygonXY.pointB.x - this.polygonXY.pointA.x;
    this.polygonXY.pointA.x = x;
    this.polygonXZ.pointA.x = x;
    this.setWidth(width);
}

Block.prototype.setHeight = function (height) {
    ( this.polygonXY.pointB.y
    = this.polygonXZ.pointA.y = this.polygonXZ.pointB.y
    = this.polygonYZ.pointB.y
    = this.polygonXY.pointA.y + height);
}

Block.prototype.setY = function (y) {
    var height = this.polygonXY.pointB.y - this.polygonXY.pointA.y;
    this.polygonXY.pointA.y = y;
    this.polygonYZ.pointA.y = y;
    this.setHeight(height);
}

Block.prototype.setDepth = function (depth) {
    ( this.polygonXZ.pointB.z
    = this.polygonYZ.pointB.z
    = this.polygonXZ.pointA.z + depth);
}

Block.prototype.setZ = function (z) {
    var depth = this.polygonXZ.pointB.z - this.polygonXZ.pointA.z;
    ( this.polygonXY.pointA.z = this.polygonXY.pointB.z
    = this.polygonXZ.pointA.z = this.polygonYZ.pointA.z = z);
    this.setDepth(depth);
}

Log.prototype = new Block();
Log.prototype.constructor = Log;
function Log() {
    this.thickness = Log.thickness;
}
Log.thickness = 2.5;


LogXY.prototype = new Log();
LogXY.prototype.constructor = LogXY;
function LogXY(point, width, height, color, texture) {
    texture = texture || color || "#FFFFFF";
    this.init(point, width, height, this.thickness, color);
    this.polygonXY.fillStyle = texture;
}


LogXZ.prototype = new Log();
LogXZ.prototype.constructor = LogXZ;
function LogXZ(point, width, depth, color, texture) {
    texture = texture || color || "#FFFFFF";
    this.init(point, width, this.thickness, depth, color);
    this.polygonXZ.fillStyle = texture;
}


LogYZ.prototype = new Log();
LogYZ.prototype.constructor = LogYZ;
function LogYZ(point, height, depth, color, texture) {
    texture = texture || color || "#FFFFFF";
    this.init(point, this.thickness, height, depth, color);
    this.polygonYZ.fillStyle = texture;
}
