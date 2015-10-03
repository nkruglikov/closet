// Points & polygons
function Point(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

function Polygon(a, b, fill_style, fill_style) {
    this.pointA = a;
    this.pointB = b;
    this.fillStyle = fill_style;
}

PolygonXY.prototype = new Polygon();
PolygonXY.prototype.constructor = PolygonXY;
function PolygonXY(a, size_x, size_y, fill_style) {
    this.pointA = a;
    this.pointB = new Point(a.x + size_x, a.y + size_y, a.z);
    this.fillStyle = fill_style;
}

PolygonXZ.prototype = new Polygon();
PolygonXZ.prototype.constructor = PolygonXZ;
function PolygonXZ(a, size_x, size_z, fill_style) {
    this.pointA = a;
    this.pointB = new Point(a.x + size_x, a.y, a.z + size_z);
    this.fillStyle = fill_style;
}

PolygonYZ.prototype = new Polygon();
PolygonYZ.prototype.constructor = PolygonYZ;
function PolygonYZ(a, size_y, size_z, fill_style) {
    this.pointA = a;
    this.pointB = new Point(a.x, a.y + size_y, a.z + size_z);
    this.fillStyle = fill_style;
}

// Graphical engine
function Engine(ctx) {
    // private variables
    var width  = ctx.canvas.clientWidth,
        height = ctx.canvas.clientHeight;
    var coeff = Math.sqrt(2) / 4;
    var scale = 10;

    // private methods
    function projection(point) {
        var x = scale * (point.x + coeff * point.z);
        var y = height - scale * (point.y + coeff * point.z);
        return { x: x, y: y };
    }

    // privileged methods
    this.draw = function (polygon) {
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

        var pa = projection(a), pb = projection(b),
            pc = projection(c), pd = projection(d);

        ctx.beginPath();
        ctx.fillStyle = polygon.fillStyle;
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.lineTo(pc.x, pc.y);
        ctx.lineTo(pd.x, pd.y);
        ctx.lineTo(pa.x, pa.y);
        ctx.fill();
        ctx.stroke();
    }

    // public properties
    this.ctx = ctx;
}
