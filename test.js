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

    var t = Log.thickness, th = case1.thresoldHeight;
    var section1 = new Section(new Point(10 + t, 5 + t + th, 5 + 2 * th),
            300, 270 - 2 * t - th, 60 - t - 2 * th,
            clr, txrXY, txrXZ, txrYZ);
    section1.addShelf();
    section1.addShelf();
    section1.removeDrawer();
    scene.models.push(section1);
    scene.redraw();


    $("#control-width").change(function() {
        var width = Number($(this).val());
        var max_width = Number($(this).attr("max"));
        var min_width = Number($(this).attr("min"));
        if (min_width <= width && width <= max_width) {
            case1.setWidth(width);
            section1.setWidth(width);
            $("#display-width").text(width);
            scene.redraw();
        }
    });

    $("#control-height").change(function() {
        var height = Number($(this).val());
        var max_height = Number($(this).attr("max"));
        var min_height = Number($(this).attr("min"));
        if (min_height <= height && height <= max_height) {
            case1.setHeight(height);
            section1.setHeight(height - 2 * t - th);
            $("#display-height").text(height);
            scene.redraw();
        }
    });

    $("#control-depth").change(function() {
        var depth = Number($(this).val());
        var max_depth = Number($(this).attr("max"));
        var min_depth = Number($(this).attr("min"));
        if (min_depth <= depth & depth <= max_depth) {
            case1.setDepth(depth);
            section1.setDepth(depth - t - 2 * th);
            $("#display-depth").text(depth);
            scene.redraw();
        }
    });

    $("#control-add-shelf").click(function() {
        section1.addShelf();
        scene.redraw();
    });

    $("#control-remove-shelf").click(function() {
        section1.removeShelf();
        scene.redraw();
    });

    $("#control-add-drawer").click(function() {
        section1.addDrawer();
        scene.redraw();
    });

    $("#control-remove-drawer").click(function() {
        section1.removeDrawer();
        scene.redraw();
    });
});
