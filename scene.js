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
            else if (models[i] instanceof Model)
                getPolygons(models[i].models);
        }
    })(this.models);

    function polygonComparator(p1, p2) {
        return  ( p1.maxZ() <= p2.minZ() ?  1
                : p1.minZ() >= p2.maxZ() ? -1
                : p1.minX() >= p2.maxX() ?  1
                : p1.maxX() <= p2.minX() ? -1
                : p1.minY() >= p2.maxY() ?  1
                : p1.maxY() <= p2.minY() ? -1
                : 0);
    }

    polygons.sort(polygonComparator);

    for (var i = 0; i < polygons.length; i++) {
        this.engine.draw(polygons[i]);
        console.log(polygons[i].constructor.name, polygons[i].fillStyle);
    }
}
