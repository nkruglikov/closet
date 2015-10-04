function Model(models) {
    this.models = models;
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
Log.thickness = 5;


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


Case.prototype = new Model();
Case.prototype.constructor = Case;
function Case(point, width, height, depth,
        color, textureXY, textureXZ, textureYZ) {
    color = color || "#FFFFFF";
    textureXY = textureXY || color;
    textureXZ = textureXZ || color;
    textureYZ = textureYZ || color;
    var x = point.x, y = point.y, z = point.z, t = Log.thickness;
    var thresoldHeight = th = 5;

    this.position = point;

    this.backLog     = new LogXY(new Point(x, y, z + depth),
                                 width + 2*t, height,
                                 color, textureXY);
    this.leftLog     = new LogYZ(point,
                                 height, depth,
                                 color, textureYZ);
    this.rightLog    = new LogYZ(new Point(x + width + t, y, z),
                                 height, depth,
                                 color, textureYZ);
    this.topLog      = new LogXZ(new Point(x + t, y + height - t, z),
                                 width, depth,
                                 color, textureXZ);
    this.bottomLog   = new LogXZ(new Point(x + t, y + th, z),
                                 width, depth,
                                 color, textureXZ);
    this.thresoldLog = new LogXY(new Point(x + t, y, z),
                                 width, th,
                                 color, textureXY);
    this.models = [this.backLog, this.leftLog, this.rightLog,
                   this.topLog, this.bottomLog, this.thresoldLog];
}

Case.prototype.setWidth = function (width) {
    var x = this.position.x, y = this.position.y, z = this.position.z;
    var t = Log.thickness;
    this.backLog.setWidth(width + 2 * t);
    this.rightLog.setX(x + width + t);
    this.topLog.setWidth(width);
    this.bottomLog.setWidth(width);
    this.thresoldLog.setWidth(width);
}

Case.prototype.setHeight = function (height) {
    var x = this.position.x, y = this.position.y, z = this.position.z;
    var t = Log.thickness;
    this.backLog.setHeight(height);
    this.leftLog.setHeight(height);
    this.rightLog.setHeight(height);
    this.topLog.setY(y + height - t);
}

Case.prototype.setDepth = function (depth) {
    var x = this.position.x, y = this.position.y, z = this.position.z;
    var t = Log.thickness;
    this.backLog.setZ(z + depth);
    this.leftLog.setDepth(depth);
    this.rightLog.setDepth(depth);
    this.topLog.setDepth(depth);
    this.bottomLog.setDepth(depth);
}
