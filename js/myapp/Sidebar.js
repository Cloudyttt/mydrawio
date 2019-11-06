(function () {
  Sidebar.prototype.yinzhang = GRAPH_IMAGE_PATH + '/myapp/overlapLayer.png';
  Sidebar.prototype.magnify = GRAPH_IMAGE_PATH + '/myapp/magnifier.png';

  /**
   * Aliases for IDs in the libs parameter.
   */
  Sidebar.prototype.libAliases = {};

  /**
   *
   */
  Sidebar.prototype.defaultEntries = 'general';


  /**
   * Description of custom libraries, see https://desk.draw.io/a/solutions/articles/16000058316
   */
  Sidebar.prototype.customEntries = null;

  /**
   * Array of strings for the built-in libraries to be enabled in the more shapes dialog. Null means all,
   * empty array means none, possible keys are listed for the libs parameter at
   *
   * https://desk.draw.io/support/solutions/articles/16000042546
   */
  Sidebar.prototype.enabledLibraries = null;

  /**
   *
   */
  Sidebar.prototype.configuration = [{id: 'general', libs: ['general']}];


  /**
   * Toggle palette.
   */
  Sidebar.prototype.togglePalettes = function (prefix, ids) {
    this.showPalettes(prefix, ids);
  };

  /**
   * Toggle palette.
   */
  Sidebar.prototype.togglePalette = function (id) {
    this.showPalette(id);
  };

  /**
   * Shows or hides palettes.
   */
  Sidebar.prototype.showPalettes = function (prefix, ids, visible) {
    for (var i = 0; i < ids.length; i++) {
      this.showPalette(prefix + ids[i], visible);
    }
  };


  /**
   * 隐藏或展示一个调色板
   */
  Sidebar.prototype.showPalette = function (id, visible) {
    var elts = this.palettes[id];

    if (elts != null) {
      var vis = (visible != null) ? ((visible) ? 'block' : 'none') : (elts[0].style.display == 'none') ? 'block' : 'none';

      for (var i = 0; i < elts.length; i++) {
        elts[i].style.display = vis;
      }
    }
  };

  /**
   *
   */
  Sidebar.prototype.isEntryVisible = function (key) {
    for (var i = 0; i < this.configuration.length; i++) {
      if (this.configuration[i].id == key) {
        var id = (this.configuration[i].libs != null) ? ((this.configuration[i].prefix || '') + this.configuration[i].libs[0]) : key;
        var elts = this.palettes[id];

        if (elts != null) {
          return elts[0].style.display != 'none';
        }

        break;
      }
    }

    if (this.customEntries != null) {
      for (var i = 0; i < this.customEntries.length; i++) {
        var section = this.customEntries[i];

        for (var j = 0; j < section.entries.length; j++) {
          var entry = section.entries[j];

          if (entry.id == key) {
            if (entry.libs != null && entry.libs.length > 0) {
              var elts = this.palettes[entry.id + '.0'];

              if (elts != null) {
                return elts[0].style.display != 'none';
              }
            }

            break;
          }
        }
      }
    }

    return false;
  };

  /**
   *
   */
  Sidebar.prototype.showEntries = function (stc, remember, force) {
    this.libs = (stc != null && (force || stc.length > 0)) ? stc : ((urlParams['libs'] != null &&
      urlParams['libs'].length > 0) ? decodeURIComponent(urlParams['libs']) : mxSettings.getLibraries());
    var tmp = this.libs.split(';');

    // Maps library names via the alias table
    for (var i = 0; i < tmp.length; i++) {
      tmp[i] = this.libAliases[tmp[i]] || tmp[i];
    }

    for (var i = 0; i < this.configuration.length; i++) {
      // Search has separate switch in Extras menu
      if (this.configuration[i].id != 'search') {
        this.showPalettes(this.configuration[i].prefix || '',
          this.configuration[i].libs || [this.configuration[i].id],
          mxUtils.indexOf(tmp, this.configuration[i].id) >= 0);
      }
    }

    if (this.customEntries != null) {
      for (var i = 0; i < this.customEntries.length; i++) {
        var section = this.customEntries[i];

        for (var j = 0; j < section.entries.length; j++) {
          var entry = section.entries[j];

          if (entry.libs != null && entry.libs.length > 0) {
            var libs = [];

            for (var k = 0; k < entry.libs.length; k++) {
              libs.push(entry.id + '.' + k);
            }

            this.showPalettes('', libs, mxUtils.indexOf(tmp, entry.id) >= 0);
          }
        }
      }
    }

    if (remember) {
      mxSettings.setLibraries(stc);
      mxSettings.save();
    }
  };

  /**
   * Overrides the sidebar init.
   */
  Sidebar.prototype.init = function () {
    this.addMyPalette();
  };

  /**
   * 自定义侧边栏小部件
   */
  Sidebar.prototype.addMyPalette = function () {
    // 标注 部分
    this.addPaletteFunctions('myPalette', '标注', true, [
      // 线部分
      this.createEdgeTemplateEntry('endArrow=classic;bendable=0;strokeColor=#FF0000;rotatable=1;dashed=0;', 50, 50, null, '箭头'),
      this.createEdgeTemplateEntry('endArrow=none;rounded=0;bendable=0;strokeColor=#FF0000;rotatable=1;dashed=0;', 50, 50, null, '直线'),
      this.createEdgeTemplateEntry('endArrow=none;dashed=1;bendable=0;strokeColor=#FF0000;rotatable=1;dashed=1;', 50, 50, null, '虚线'),

      // 曲线1
      this.addEntry('curve', mxUtils.bind(this, function () {
        var cell = new mxCell('', new mxGeometry(0, 0, 50, 50), 'curved=1;endArrow=openAsync;strokeColor=#FF0000;rotatable=1;dashed=0;');
        cell.geometry.setTerminalPoint(new mxPoint(20, 50), true); //
        cell.geometry.setTerminalPoint(new mxPoint(20, 0), false);
        cell.geometry.points = [new mxPoint(-30, 30)];
        cell.geometry.relative = true;
        cell.edge = true;

        return this.createEdgeTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, '曲线（顺）');
      })),

      /*this.addEntry('curve', mxUtils.bind(this, function () {
        var cell = new mxCell('', new mxGeometry(0, 0, 50, 50), 'curved=1;endArrow=openAsync;strokeColor=#FF0000;rotatable=1;');
        cell.geometry.setTerminalPoint(new mxPoint(50, 50), true); //
        cell.geometry.setTerminalPoint(new mxPoint(50, 0), false);
        cell.geometry.points = [new mxPoint(0, 0), new mxPoint(0, 50)];
        cell.geometry.relative = true;
        cell.edge = true;

        return this.createEdgeTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, '曲线（顺）');
      })),*/

      // 曲线2
      this.addEntry('curve', mxUtils.bind(this, function () {
        var cell = new mxCell('', new mxGeometry(0, 0, 50, 50), 'curved=1;beginArrow=openAsync;endArrow=none;startArrow=openAsync;startFill=0;strokeColor=#FF0000;dashed=0;');
        cell.geometry.setTerminalPoint(new mxPoint(20, 50), true);
        cell.geometry.setTerminalPoint(new mxPoint(20, 0), false);
        cell.geometry.points = [new mxPoint(-30, 30)];
        cell.geometry.relative = true;
        cell.edge = true;

        return this.createEdgeTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, '曲线（逆）');
      })),

      // 折线1
      this.addEntry('polyline', mxUtils.bind(this, function () {
        var cell = new mxCell('', new mxGeometry(0, 0, 50, 50), 'endArrow=none;rounded=0;strokeColor=#FF0000;dashed=0;dashed=0;');
        cell.geometry.setTerminalPoint(new mxPoint(50, 50), true);
        cell.geometry.setTerminalPoint(new mxPoint(50, 0), false);
        cell.geometry.points = [/*new mxPoint(50, 30), */new mxPoint(0, 25)];
        cell.geometry.relative = true;
        cell.edge = true;

        return this.createEdgeTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, '折线');
      })),

      // 形状部分
      this.createVertexTemplateEntry('rounded=0;fillColor=none;connectable=0;editable=0;strokeColor=#FF0000;editable=1;dashed=0;', 80, 60, null, '矩形'),
      this.createVertexTemplateEntry('ellipse;fillColor=none;connectable=0;editable=0;strokeColor=#FF0000;editable=1;dashed=0;', 50, 50, null, '圆形'),
      this.createVertexTemplateEntry('shape=mxgraph.flowchart.annotation_1;flipH=1;connectable=0;editable=0;strokeColor=#FF0000;dashed=0;', 15, 60, null, '方括号'),
      this.createVertexTemplateEntry('shape=ellipse;whiteSpace=wrap;aspect=fixed;fontSize=12;connectable=0;resizable=0;rotatable=0;fontsize=12;strokeColor=#FF0000;fontColor=#FF0000;fillColor=none;dashed=0;', 15, 15, '1', '序号'),
      this.createVertexTemplateEntry('text;whiteSpace=wrap;align=center;connectable=0;fontSize=16;fontColor=#FF0000;strokeColor=none;fillColor=none;', 40, 40, '(文)', '文字'),
      this.createVertexTemplateEntry('text;whiteSpace=wrap;align=center;connectable=0;fontSize=16;fontColor=#FF0000;strokeColor=none;fillColor=none;', 30, 30, '?', '问号')
    ]);
    // 图片工具部分
    this.addPaletteFunctions('myImageTool', '图片工具', true, [
      this.createVertexTemplateEntry('magnify;myImage;shape=myImage;clipPath=inset(0% 0% 0% 0%);imageAspect=1;aspect=fixed;connectable=0;cursor=pointer;image=' + this.magnify, 80, 80, '', '放大镜'),
    ]);
    // 分割线 部分
    this.addPaletteFunctions('mySplits', '分割线', true, [
      this.createVertexTemplateEntry('line;strokeWidth=2;direction=south;connectable=0;editable=0;editable=0;dashed=0;', 10, 160, '', '垂直分割线'),
      this.createVertexTemplateEntry('line;strokeWidth=2;connectable=0;editable=0;dashed=0;', 160, 10, '', '水平分割线'),
    ]);
  };


})();
