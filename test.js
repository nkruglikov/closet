$(document).ready(function() {
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var engine = new Engine(ctx);

    engine.draw(new PolygonXY(new Point(0, 0, 0), 10, 10));
});
