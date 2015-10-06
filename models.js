Case.prototype = new Model();
Case.prototype.constructor = Case;
function Case(point, width, height, depth,
        color, textureXY, textureXZ, textureYZ) {
    color = color || "#FFFFFF";
    textureXY = textureXY || color;
    textureXZ = textureXZ || color;
    textureYZ = textureYZ || color;
    var x = point.x, y = point.y, z = point.z, t = Log.thickness;
    var th = this.thresoldHeight = 5;

    this.position = point;

    this.backLog     = new LogXY(new Point(x, y, z + depth),
                                 width + 2*t, height,
                                 color, textureXY);
    this.leftLog     = new LogYZ(point,
                                 height, depth,
                                 color, textureYZ);
    this.rightLog    = new LogYZ(new Point(x + width + t, y, z),
                                 height, depth,
                                 color, textureYZ);
    this.topLog      = new LogXZ(new Point(x + t, y + height - t, z),
                                 width, depth,
                                 color, textureXZ);
    this.bottomLog   = new LogXZ(new Point(x + t, y + th, z),
                                 width, depth,
                                 color, textureXZ);
    this.thresoldLog = new LogXY(new Point(x + t, y, z),
                                 width, th,
                                 color, textureXY);
    this.models = [this.backLog, this.leftLog, this.rightLog,
                   this.topLog, this.bottomLog, this.thresoldLog];
}

Case.prototype.setWidth = function (width) {
    var x = this.position.x, y = this.position.y, z = this.position.z;
    var t = Log.thickness;
    this.backLog.setWidth(width + 2 * t);
    this.rightLog.setX(x + width + t);
    this.topLog.setWidth(width);
    this.bottomLog.setWidth(width);
    this.thresoldLog.setWidth(width);
}

Case.prototype.setHeight = function (height) {
    var x = this.position.x, y = this.position.y, z = this.position.z;
    var t = Log.thickness;
    this.backLog.setHeight(height);
    this.leftLog.setHeight(height);
    this.rightLog.setHeight(height);
    this.topLog.setY(y + height - t);
}

Case.prototype.setDepth = function (depth) {
    var x = this.position.x, y = this.position.y, z = this.position.z;
    var t = Log.thickness;
    this.backLog.setZ(z + depth);
    this.leftLog.setDepth(depth);
    this.rightLog.setDepth(depth);
    this.topLog.setDepth(depth);
    this.bottomLog.setDepth(depth);
}


Section.prototype = new Model();
Section.prototype.constructor = Section;
function Section(point, width, height, depth,
        color, textureXY, textureXZ, textureYZ) {
    this.position = point;
    this.width = width;
    this.height = height;
    this.drawers_height = 0;
    this.depth = depth;
    this.color = color;
    this.textureXY = textureXY;
    this.textureXZ = textureXZ;
    this.textureYZ = textureYZ;
    this.shelves = [];
    this.drawers = [];
}

Section.prototype.normalizeShelves = function() {
    for (var i = 0; i < this.shelves.length; i++)
        this.shelves[i].setY(this.position.y + this.drawers_height +
                (i + 1) * (this.height - this.drawers_height) / (this.shelves.length + 1));
}

Section.prototype.addShelf = function() {
    var sh_point = new Point(this.position.x, this.position.y,
            this.position.z);
    var shelf = new LogXZ(sh_point, this.width, this.depth,
            this.color, this.textureXZ);
    this.shelves.push(shelf);
    this.normalizeShelves();
    this.models.push(shelf);
}

Section.prototype.removeShelf = function() {
    if (this.shelves.length == 0)
        return
    var shelf = this.shelves.pop();
    var i = this.models.indexOf(shelf), l = this.models.length;
    this.models = this.models.slice(0, i).concat(
            this.models.slice(i + 1, l));
    this.normalizeShelves();
}

Section.prototype.addDrawer = function() {
    if (this.drawers.length >= 3)
        return;
    var dr_point = new Point(this.position.x,
            this.position.y + (this.drawers.length) * Drawer.height
               + (this.drawers.length + 1) * Drawer.gap, this.position.z);
    var drawer = new Drawer(dr_point, this.width, this.depth,
            this.color, this.textureXY, this.textureYZ);
    this.models.push(drawer);
    this.drawers.push(drawer);
    this.drawers_height += Drawer.height + Drawer.gap;
    this.normalizeShelves();
}

Section.prototype.removeDrawer = function() {
    if (this.drawers.length == 0)
        return;
    var drawer = this.drawers.pop();
    var i = this.models.indexOf(drawer), l = this.models.length;
    this.models = this.models.slice(0, i).concat(
            this.models.slice(i + 1, l));
    this.drawers_height -= Drawer.height + Drawer.gap;
    this.normalizeShelves();
}

Section.prototype.setWidth = function (width) {
    this.width = width;
    for (var i = 0; i < this.shelves.length; i++)
        this.shelves[i].setWidth(width);
    for (var i = 0; i < this.drawers.length; i++)
        this.drawers[i].setWidth(width);
}

Section.prototype.setHeight = function (height) {
    this.height = height;
    this.normalizeShelves();
}

Section.prototype.setDepth = function (depth) {
    this.depth = depth;
    for (var i = 0; i < this.shelves.length; i++)
        this.shelves[i].setDepth(depth);
}

Drawer.prototype = new Model();
Drawer.prototype.constructor = Drawer;
function Drawer(point, width, depth,
        color, textureXY, textureYZ) {
    this.backLog = new LogXY(new Point(point.x, point.y,
                point.z + depth),
            width, Drawer.height,
            color, textureXY);
    this.frontLog = new LogXY(new Point(point.x, point.y,
                point.z),
            width, Drawer.height,
            color, textureXY);
    this.leftLog = new LogYZ(new Point(point.x, point.y,
                point.z + Log.thickness),
             Drawer.height, depth - 1 * Log.thickness,
            color, textureYZ);
    this.rightLog = new LogYZ(new Point(point.x + width - Log.thickness,
                point.y, point.z + Log.thickness),
             Drawer.height, depth - 1 * Log.thickness,
            color, textureYZ);
    this.models = [this.backLog, this.frontLog, this.leftLog, this.rightLog];
}
Drawer.height = 20;
Drawer.gap = 5;

Drawer.prototype.setWidth = function (width) {
    this.frontLog.setWidth(width);
    this.backLog.setWidth(width);
    this.rightLog.setX(this.leftLog.polygonYZ.pointA.x + width - Log.thickness);
}
