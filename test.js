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
    pXY1 = new PolygonXY(new Point(1, 1, 0), 5, 5, "salmon");
    pXY2 = new PolygonXY(new Point(1, 1, 4), 5, 5, "lightgreen");
    pXY3 = new PolygonXY(new Point(1, 1, 2), 5, 5, "lightblue");
    scene.models.push(pXY1, pXY2, pXY3);
    pXZ1 = new PolygonXZ(new Point(10, 1, 0), 5, 5, "salmon");
    pXZ2 = new PolygonXZ(new Point(10, 3, 0), 5, 5, "lightgreen");
    pXZ3 = new PolygonXZ(new Point(10, 2, 0), 5, 5, "lightblue");
    scene.models.push(pXZ1, pXZ2, pXZ3);
    pYZ1 = new PolygonYZ(new Point(20, 1, 0), 5, 5, "salmon");
    pYZ2 = new PolygonYZ(new Point(22, 1, 0), 5, 5, "lightgreen");
    pYZ3 = new PolygonYZ(new Point(21, 1, 0), 5, 5, "lightblue");
    scene.models.push(pYZ1, pYZ2, pYZ3);
    pXY4 = new PolygonXY(new Point(25, 0, 10), 15, 15, "yellow");
    pXZ4 = new PolygonXZ(new Point(30, 1, 0), 5, 5, "green");
    pYZ4 = new PolygonYZ(new Point(30, 1, 0), 5, 5, "blue");
    pXY5 = new PolygonXY(new Point(30, 1, 5), 5, 5, "orange");
    pXZ5 = new PolygonXZ(new Point(30, 6, 0), 5, 5, "lightgreen");
    pYZ5 = new PolygonYZ(new Point(35, 1, 0), 5, 5, "lightblue");
    scene.models.push(pXY4, pXZ4, pYZ4, pXY5, pXZ5, pYZ5);
    scene.redraw();

});
