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

Object.defineProperty(Block.prototype, "width", {
    set: function (width) {
        ( this.polygonXY.pointB.x
        = this.polygonXZ.pointB.x
        = this.polygonYZ.pointA.x = this.polygonYZ.pointB.x
        = this.polygonXY.pointA.x + width);
    },

    get: function () {
        return this.polygonXY.pointB.x - this.polygonXY.pointA.x;

    }
});

Object.defineProperty(Block.prototype, "height", {
    set: function (height) {
        ( this.polygonXY.pointB.y
        = this.polygonXZ.pointA.y = this.polygonXZ.pointB.y
        = this.polygonYZ.pointB.y
        = this.polygonXY.pointA.y + height);
    },

    get: function () {
        return this.polygonXY.pointB.y - this.polygonXY.pointA.y;
    }
});

Object.defineProperty(Block.prototype, "depth", {
    set: function (depth) {
        ( this.polygonXZ.pointB.z
        = this.polygonYZ.pointB.z
        = this.polygonXZ.pointA.z + depth);
    },

    get: function () {
        return this.polygonXZ.pointB.z - this.polygonXZ.pointA.z;
    }
});

Object.defineProperty(Block.prototype, "x", {
    set: function (x) {
        var width = this.polygonXY.pointB.x - this.polygonXY.pointA.x;
        this.polygonXY.pointA.x = x;
        this.polygonXZ.pointA.x = x;
        this.width = width;
    },

    get: function () {
        return this.polygonXY.pointA.x;
    }
});

Object.defineProperty(Block.prototype, "y", {
    set: function (y) {
        var height = this.polygonXY.pointB.y - this.polygonXY.pointA.y;
        this.polygonXY.pointA.y = y;
        this.polygonYZ.pointA.y = y;
        this.height = height;
    },

    get: function () {
        return this.polygonXY.pointA.y;
    }
});

Object.defineProperty(Block.prototype, "z", {
    set: function (z) {
        var depth = this.polygonXZ.pointB.z - this.polygonXZ.pointA.z;
        ( this.polygonXY.pointA.z = this.polygonXY.pointB.z
        = this.polygonXZ.pointA.z = this.polygonYZ.pointA.z = z);
        this.depth = depth;
    },

    get: function () {
        return this.polygonXZ.pointA.z;
    }
});

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
