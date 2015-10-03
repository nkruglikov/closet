$(document).ready(function() {
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var engine = new Engine(ctx);

    var pA = new Point(10, 10, 10),
        pB = new Point(20, 20, 20);
    engine.draw(new PolygonXY(pA, 10, 10));
    engine.draw(new PolygonXY(pB, -10, -10));
    engine.draw(new PolygonXZ(pA, 10, 10));
    engine.draw(new PolygonXZ(pB, -10, -10));
    engine.draw(new PolygonYZ(pA, 10, 10));
    engine.draw(new PolygonYZ(pB, -10, -10));
});
