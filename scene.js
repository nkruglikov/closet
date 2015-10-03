// Model class
function Model(polygons) {
    this.polygons = polygons;
}

// Scene class
function Scene(engine) {
    this.models = [];
    this.engine = engine;
}

Scene.prototype.redraw = function() {
    var polygons = [];
    (function getPolygons(models) {
        for (var i = 0; i < models.length; i++) {
            if (models[i] instanceof Polygon)
                polygons.push(models[i]);
            else if (model instanceof Model)
                getPolygons(models[i]);
        }
    })(this.models);

    function polygonComparator(p1, p2) {
        // Same types
        if (p1 instanceof PolygonXY && p2 instanceof PolygonXY)
            return p2.pointA.z - p1.pointA.z;
        else if (p1 instanceof PolygonXZ && p2 instanceof PolygonXZ)
            return p1.pointA.y - p2.pointA.y;
        else if (p1 instanceof PolygonYZ && p2 instanceof PolygonYZ)
            return p1.pointA.x - p2.pointA.x;
        // Different types
        else if (p1 instanceof PolygonXY && p2 instanceof PolygonYZ) {
            var x0 = p1.minX() - p2.minX();
            var z0 = p1.minZ() - p2.minZ();
            var y0 = p1.minY() - p2.minY();
            var y1 = p2.maxY() - p2.minY();
            return x0 >= 0 || z0 <= 0 || y0 >= y1 ? 1 : -1;
        }
        else if (p1 instanceof PolygonXY && p2 instanceof PolygonXZ) {
            var y0 = p1.minY() - p2.minY();
            var z0 = p1.minZ() - p2.minZ();
            var x0 = p1.minX() - p2.minX();
            var x1 = p2.maxX() - p2.minX();
            return y0 >= 0 || z0 <= 0 || x0 >= x1 ? 1 : -1;
        }
        else if (p1 instanceof PolygonXZ && p2 instanceof PolygonYZ) {
            var x0 = p1.minX() - p2.minX();
            var z2 = p1.maxZ() - p2.minZ();
            var y0 = p1.minY() - p2.minY();
            var y1 = p2.maxY() - p2.minY();
            return x0 >= 0 || z2 <= 0 || y0 >= y1 ? 1 : -1;
        }
    }

    console.log(polygons);
    polygons.sort(polygonComparator);

    for (var i = 0; i < polygons.length; i++) {
        this.engine.draw(polygons[i]);
    }
}
