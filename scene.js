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
        /*
        // Different types
        else if (p1 instanceof PolygonXY && p2 instanceof PolygonYZ) {
        }
        */
    }

    console.log(polygons);
    polygons.sort(polygonComparator);

    for (var i = 0; i < polygons.length; i++) {
        this.engine.draw(polygons[i]);
    }
}
