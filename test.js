$(document).ready(function() {
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var engine = new Engine(ctx, 1);

//  var pA = new Point(10, 10, 10),
//      pB = new Point(20, 20, 20),
//      fill = "#FFFFFF";
//  engine.draw(new PolygonXY(pA, 10, 10, fill));
//  engine.draw(new PolygonXY(pB, -10, -10, fill));
//  engine.draw(new PolygonXZ(pA, 10, 10, fill));
//  engine.draw(new PolygonXZ(pB, -10, -10, fill));
//  engine.draw(new PolygonYZ(pA, 10, 10, fill));
//  engine.draw(new PolygonYZ(pB, -10, -10, fill));

    var scene = new Scene(engine);
//  var pXY1 = new PolygonXY(new Point(1, 1, 0), 5, 5, "salmon");
//  var pXY2 = new PolygonXY(new Point(1, 1, 4), 5, 5, "lightgreen");
//  var pXY3 = new PolygonXY(new Point(1, 1, 2), 5, 5, "lightblue");
//  scene.models.push(pXY1, pXY2, pXY3);
//  var pXZ1 = new PolygonXZ(new Point(10, 1, 0), 5, 5, "salmon");
//  var pXZ2 = new PolygonXZ(new Point(10, 3, 0), 5, 5, "lightgreen");
//  var pXZ3 = new PolygonXZ(new Point(10, 2, 0), 5, 5, "lightblue");
//  scene.models.push(pXZ1, pXZ2, pXZ3);
//  var pYZ1 = new PolygonYZ(new Point(20, 1, 0), 5, 5, "salmon");
//  var pYZ2 = new PolygonYZ(new Point(22, 1, 0), 5, 5, "lightgreen");
//  var pYZ3 = new PolygonYZ(new Point(21, 1, 0), 5, 5, "lightblue");
//  scene.models.push(pYZ1, pYZ2, pYZ3);
//  var pXY4 = new PolygonXY(new Point(25, 0, 10), 15, 15, "yellow");
//  var pXZ4 = new PolygonXZ(new Point(30, 1, 0), 5, 5, "green");
//  var pYZ4 = new PolygonYZ(new Point(30, 1, 0), 5, 5, "blue");
//  var pXY5 = new PolygonXY(new Point(30, 1, 5), 5, 5, "orange");
//  var pXZ5 = new PolygonXZ(new Point(30, 6, 0), 5, 5, "lightgreen");
//  var pYZ5 = new PolygonYZ(new Point(35, 1, 0), 5, 5, "lightblue");
//  scene.models.push(pXY4, pXZ4, pYZ4, pXY5, pXZ5, pYZ5);
//  var block1 = new Block(new Point(30, 20, 0), 10, 5, 1, "brown");
//  var block2 = new Block(new Point(30, 20, 1), 1, 5, 5, "brown");
//  var block3 = new Block(new Point(39, 20, 1), 1, 5, 5, "brown");
//  var block4 = new Block(new Point(30, 20, 6), 10, 5, 1, "brown");
//  scene.models.push(block1, block2, block3, block4);
//  var clr = "#a0522d", txr = "#8b4513", t = Log.thickness;
//  var top_log = new LogXZ(new Point(10, 20, 0), 10, 10, clr, txr);
//  var bottom_log = new LogXZ(new Point(10, 10, 0), 10, 10, clr, txr);
//  var left_log = new LogYZ(new Point(10 - t, 10, 0),
//          10 + t, 10, clr, txr);
//  var right_log = new LogYZ(new Point(20, 10, 0), 10 + t, 10, clr, txr);
//  scene.models.push(top_log, bottom_log, left_log, right_log);
    var clr = "#a54b00", txrXY = "#ab6218", txrXZ = txrYZ = "#bf6d1b";
    var case1 = new Case(new Point(10, 5, 5), 100, 270, 60,
            clr, txrXY, txrXZ, txrYZ);
    scene.models.push(case1);
    scene.redraw();

});
