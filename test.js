$(document).ready(function() {
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var engine = new Engine(ctx);

    var pA = new Point(10, 10, 10),
        pB = new Point(20, 20, 20),
        fill = "#FFFFFF";
    engine.draw(new PolygonXY(pA, 10, 10, fill));
    engine.draw(new PolygonXY(pB, -10, -10, fill));
    engine.draw(new PolygonXZ(pA, 10, 10, fill));
    engine.draw(new PolygonXZ(pB, -10, -10, fill));
    engine.draw(new PolygonYZ(pA, 10, 10, fill));
    engine.draw(new PolygonYZ(pB, -10, -10, fill));

    var scene = new Scene(engine);
    pXY1 = new PolygonXY(new Point(1, 1, 0), 5, 5);
    pXY2 = new PolygonXY(new Point(1, 1, 4), 5, 5);
    pXY3 = new PolygonXY(new Point(1, 1, 2), 5, 5);
    scene.models.push(pXY1, pXY2, pXY3);
    pXZ1 = new PolygonXZ(new Point(10, 1, 0), 5, 5);
    pXZ2 = new PolygonXZ(new Point(10, 3, 0), 5, 5);
    pXZ3 = new PolygonXZ(new Point(10, 2, 0), 5, 5);
    scene.models.push(pXZ1, pXZ2, pXZ3);
    pYZ1 = new PolygonYZ(new Point(20, 1, 0), 5, 5);
    pYZ2 = new PolygonYZ(new Point(22, 1, 0), 5, 5);
    pYZ3 = new PolygonYZ(new Point(21, 1, 0), 5, 5);
    scene.models.push(pYZ1, pYZ2, pYZ3);
    scene.redraw();

});
