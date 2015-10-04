// Points & polygons
function Point(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

function Polygon(a, b, fill_style) {
    this.init(a, b, fill_style);
}

Polygon.prototype.init = function(a, b, fill_style) {
    this.pointA = a;
    this.pointB = b;
    this.fillStyle = fill_style || "#FFFFFF";
}

Polygon.prototype.minX = function() {
    return Math.min(this.pointA.x, this.pointB.x);
}

Polygon.prototype.minY = function() {
    return Math.min(this.pointA.y, this.pointB.y);
}

Polygon.prototype.minZ = function() {
    return Math.min(this.pointA.z, this.pointB.z);
}

Polygon.prototype.maxX = function() {
    return Math.max(this.pointA.x, this.pointB.x);
}

Polygon.prototype.maxY = function() {
    return Math.max(this.pointA.y, this.pointB.y);
}

Polygon.prototype.maxZ = function() {
    return Math.max(this.pointA.z, this.pointB.z);
}


PolygonXY.prototype = new Polygon();
PolygonXY.prototype.constructor = PolygonXY;
function PolygonXY(a, size_x, size_y, fill_style) {
    this.init(a, new Point(a.x + size_x, a.y + size_y, a.z), fill_style);
}

PolygonXZ.prototype = new Polygon();
PolygonXZ.prototype.constructor = PolygonXZ;
function PolygonXZ(a, size_x, size_z, fill_style) {
    this.init(a, new Point(a.x + size_x, a.y, a.z + size_z), fill_style);
}

PolygonYZ.prototype = new Polygon();
PolygonYZ.prototype.constructor = PolygonYZ;
function PolygonYZ(a, size_y, size_z, fill_style) {
    this.init(a, new Point(a.x, a.y + size_y, a.z + size_z), fill_style);
}

// Graphical engine
function Engine(ctx, scale) {
    // public properties
    this.ctx = ctx;
    this.scale = scale || 10;

    // private variables
    var width  = ctx.canvas.clientWidth,
        height = ctx.canvas.clientHeight;
    var coeff = Math.sqrt(2) / 2;
    var self = this;

    // privileged factory methods
    this.PointProjection = function (point) {
        this.x = self.scale * (point.x + coeff * point.z);
        this.y = height - self.scale * (point.y + coeff / 2 * point.z);
    }

    this.PolygonProjection = function (polygon) {
        var a = polygon.pointA, b,
            c = polygon.pointB, d;
        if (polygon instanceof PolygonXY) {
            b = new Point(a.x, c.y, a.z);
            d = new Point(c.x, a.y, a.z);
        }
        else if (polygon instanceof PolygonXZ) {
            b = new Point(a.x, a.y, c.z);
            d = new Point(c.x, a.y, a.z);
        }
        else if (polygon instanceof PolygonYZ) {
            b = new Point(a.x, c.y, a.z);
            d = new Point(a.x, a.y, c.z);
        }
        this.points = [new self.PointProjection(a),
                       new self.PointProjection(b),
                       new self.PointProjection(c),
                       new self.PointProjection(d)];
    }
}

// Public methods
Engine.prototype.draw = function (polygon) {
    var prj = new this.PolygonProjection(polygon);
    var point = prj.points[prj.points.length - 1];

    this.ctx.beginPath();
    this.ctx.fillStyle = polygon.fillStyle;
    this.ctx.lineWidth = 0.25;
    this.ctx.lineJoin = "round";
    this.ctx.lineCap = "round";

    this.ctx.moveTo(point.x, point.y);
    for (var i = 0; i < prj.points.length; i++)
        this.ctx.lineTo(prj.points[i].x, prj.points[i].y);
    this.ctx.fill();
    this.ctx.stroke();
}
