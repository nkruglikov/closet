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

Object.defineProperty(Case.prototype, "width", {
    set: function (width) {
        var x = this.position.x, y = this.position.y, z = this.position.z;
        var t = Log.thickness;
        this.backLog.width = width + 2 * t;
        this.rightLog.x = x + width + t;
        this.topLog.width = width;
        this.bottomLog.width = width;
        this.thresoldLog.width = width;
    },

    get: function () {
        return this.backLog.width;

    }
});

Object.defineProperty(Case.prototype, "height", {
    set: function (height) {
        var x = this.position.x, y = this.position.y, z = this.position.z;
        var t = Log.thickness;
        this.backLog.height = height;
        this.leftLog.height = height;
        this.rightLog.height = height;
        this.topLog.y = y + height - t;
    },

    get: function() {
        return this.rightLog.height;
    }
});

Object.defineProperty(Case.prototype, "depth", {
    set: function (depth) {
        var x = this.position.x, y = this.position.y, z = this.position.z;
        var t = Log.thickness;
        this.backLog.z = z + depth;
        this.leftLog.depth = depth;
        this.rightLog.depth = depth;
        this.topLog.depth = depth;
        this.bottomLog.depth = depth;
    },

    get: function () {
        return this.topLog.depth + Log.thickness;
    }
});

Sections.prototype = new Model();
Sections.prototype.constructor = Sections;
function Sections(point, width, height, depth,
        color, textureXY, textureXZ, textureYZ) {
        this.position = point;
        this._width = width;
        this._height = height;
        this._depth = depth;
        this.drawers_height = 0;
        this.color = color;
        this.textureXY = textureXY;
        this.textureXZ = textureXZ;
        this.textureYZ = textureYZ;
        var section = new Section(new Point(point.x, point.y, point.z),
            width, height, depth,
            color, textureXY, textureXZ, textureYZ);
        this.models = [section]; // stores both sections and separators
}

Sections.prototype.addSection = function () {
    var len = this.models.length;
    this.models[len - 1].width = Math.floor(this.models[len - 1].width / 2);
    var lastw = this.models[len - 1].width;
    var separator = new LogYZ(
        new Point(this.position.x + this.width - lastw,
            this.position.y, this.position.z),
        this.height, this.depth,
        this.color, this.textureYZ);
    var section = new Section(
        new Point(this.position.x + this.width - lastw + Log.thickness,
            this.position.y, this.position.z),
        lastw - Log.thickness, this.height, this.depth,
        this.color, this.textureXY, this.textureXZ, this.textureYZ);
    this.models.push(separator, section);
}

Sections.prototype.removeSection = function () {
    if (this.models.length > 1) {
        this.models.pop();
        this.models.pop();
    }
}

Object.defineProperty(Sections.prototype, "width", {
    set: function (width) {
        this._width = width;
        for (var i = 0; i < this.models.length; i++)
            this.models[i].width = width;
    },

    get: function () {
        return this._width;
    }
});

Object.defineProperty(Sections.prototype, "height", {
    set: function (height) {
        this._height = height;
    },

    get: function () {
        return this._height;
    }
});

Object.defineProperty(Sections.prototype, "depth", {
    set: function (depth) {
        this._depth = depth;
        for (var i = 0; i < this.models.length; i++)
            this.models[i].depth = depth;
    },

    get: function () {
        return this._depth;
    }
});


Section.prototype = new Model();
Section.prototype.constructor = Section;
function Section(point, width, height, depth,
        color, textureXY, textureXZ, textureYZ) {
    this.position = point;
    this._width = width;
    this._height = height;
    this._depth = depth;
    this.drawers_height = 0;
    this.color = color;
    this.textureXY = textureXY;
    this.textureXZ = textureXZ;
    this.textureYZ = textureYZ;
    this.shelves = [];
    this.drawers = [];
}

Section.prototype.normalizeShelves = function() {
    for (var i = 0; i < this.shelves.length; i++)
        this.shelves[i].y = this.position.y + this.drawers_height +
                (i + 1) * (this.height - this.drawers_height) / (this.shelves.length + 1);
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

Object.defineProperty(Section.prototype, "width", {
    set: function (width) {
        this._width = width;
        for (var i = 0; i < this.shelves.length; i++)
            this.shelves[i].width = width;
        for (var i = 0; i < this.drawers.length; i++)
            this.drawers[i].width = width;
    },

    get: function () {
        return this._width;
    }
});

Object.defineProperty(Section.prototype, "height", {
    set: function (height) {
        this._height = height;
        this.normalizeShelves();
    },

    get: function () {
        return this._height;
    }
});

Object.defineProperty(Section.prototype, "depth", {
    set: function (depth) {
        this._depth = depth;
        for (var i = 0; i < this.shelves.length; i++)
            this.shelves[i].depth = depth;
        for (var i = 0; i < this.drawers.length; i++)
            this.drawers[i].depth = depth;
    },

    get: function () {
        return this._depth;
    }
});

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

Object.defineProperty(Drawer.prototype, "width", {
    set: function (width) {
        this.frontLog.width = width;
        this.backLog.width = width;
        this.rightLog.x = this.leftLog.x + width - Log.thickness;
    },

    get: function () {
        return rightLog.x - leftLog.x + Log.thickness;
    }
});

Object.defineProperty(Drawer.prototype, "depth", {
    set: function (depth) {
        this.leftLog.depth = depth - 2 * Log.thickness;
        this.rightLog.depth = depth - 2 * Log.thickness;
        this.backLog.z = this.frontLog.z + depth - Log.thickness;
    },

    get: function () {
        return this.leftLog.depth + 2 * Log.thickness;
    }
});
