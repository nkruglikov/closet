$(document).ready(function() {
    var canvas = $("#canvas");
    var ctx = canvas.getContext("2d");
    var engine = new Engine(ctx);
    engine.draw(PolygonXY(Point(0, 0, 0), 10, 10));
});
