$(document).ready(function() {
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var engine = new Engine(ctx, 1);

    var scene = new Scene(engine);
    var clr = "#a54b00", txrXY = "#ab6218", txrXZ = txrYZ = "#bf6d1b";
    var case1 = new Case(new Point(10, 5, 5), 300, 270, 60,
            clr, txrXY, txrXZ, txrYZ);
    scene.models.push(case1);
    scene.redraw();


    $("#control-width").change(function() {
        var width = Number($(this).val());
        var max_width = Number($(this).attr("max"));
        var min_width = Number($(this).attr("min"));
        if (min_width <= width && width <= max_width) {
            case1.setWidth(width);
            scene.redraw();
        }
    });

    $("#control-height").change(function() {
        var height = Number($(this).val());
        var max_height = Number($(this).attr("max"));
        var min_height = Number($(this).attr("min"));
        if (min_height <= height && height <= max_height) {
            case1.setHeight(height);
            scene.redraw();
        }
    });

    $("#control-depth").change(function() {
        var depth = Number($(this).val());
        var max_depth = Number($(this).attr("max"));
        var min_depth = Number($(this).attr("min"));
        if (min_depth <= depth & depth <= max_depth) {
            case1.setDepth(depth);
            scene.redraw();
        }
    });
});
