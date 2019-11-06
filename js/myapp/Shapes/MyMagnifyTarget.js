(function () {
  /*
  * function myMagnifyTarget(bounds, fill, stroke, strokewidth) {
  *   this.stencil = stencil;
  *
  *   this.strokewidth = 1;
  *   this.rotation = 0;
  *   this.opacity = 100;
  *   this.fillOpacity = 100;
  *   this.strokeOpacity = 100;
  *   this.flipH = false;
  *   this.flipV = false;
  *
  *   this.bounds = bounds;
  *   this.fill = fill;
  *   this.stroke = stroke;
  *   this.strokewidth = (strokewidth != null) ? strokewidth : 1;
  * }
  *
  * */
  function myMagnifyTarget(bounds, fill, stroke, strokewidth) {
    mxShape.call(this);
    this.bounds = bounds;
    this.fill = fill;
    this.stroke = stroke;
    this.strokewidth = (strokewidth != null) ? strokewidth : 1;
  };

  /**
   * Extends mxShape.
   * myMagnifyTarget <= mxRectangleShape
   *
   */
  mxUtils.extend(myMagnifyTarget, mxRectangleShape);  //  myMagnifyTarget继承自mxRectangleShape

  mxCellRenderer.registerShape('myMagnifyTarget', myMagnifyTarget);   // 全局注册mySeqNum


  myMagnifyTarget.prototype.customProperties = [  //自定义属性
    {name: 'isMultiply', dispName: 'Is Multiply', type: 'bool', defVal: 0},
    {name: 'clipTop', dispName: 'clipTop', type: 'float', defVal: 0},
    {name: 'clipRight', dispName: 'clipRight', type: 'float', defVal: 0},
    {name: 'clipBottom', dispName: 'clipBottom', type: 'float', defVal: 0},
    {name: 'clipLeft', dispName: 'clipLeft', type: 'float', defVal: 0},
  ];

  var parentPaint = myMagnifyTarget.prototype.paintBackground;
  myMagnifyTarget.prototype.paintBackground = function (c, x, y, w, h) {
    parentPaint.apply(this, arguments); // this.parentPaint(arguments)
  }

  myMagnifyTarget.prototype.paintVertexShape = function (c, x, y, w, h) {
    if (this.image != null) {
      var fill = mxUtils.getValue(this.style, mxConstants.STYLE_IMAGE_BACKGROUND, null);
      var stroke = mxUtils.getValue(this.style, mxConstants.STYLE_IMAGE_BORDER, null);
      var isMultiply = mxUtils.getValue(this.style, 'isMultiply', 0);
      console.log('isMultiply: ',isMultiply);
      var clipTop = mxUtils.getValue(this.style, 'clipTop', 0);
      var clipRight = mxUtils.getValue(this.style, 'clipRight', 0);
      var clipBottom = mxUtils.getValue(this.style, 'clipBottom', 0);
      var clipLeft = mxUtils.getValue(this.style, 'clipLeft', 0);
      var clip = (clipTop * 100) + '% ' + (clipRight * 100) + '% ' + (clipBottom * 100) + '% ' + (clipLeft * 100) + '%';

      if (fill != null) {
        // Stroke rendering required for shadow
        c.setFillColor(fill);
        c.setStrokeColor(stroke);
        c.rect(x, y, w, h);
        c.fillAndStroke();
      }

      // FlipH/V are implicit via mxShape.updateTransform
      var wClip = w * (1 - clipLeft - clipRight); // 宽度等于总宽度-左右边距宽度
      var hClip = h * (1 - clipTop - clipBottom); // 高度等于总高度-上下边距宽度
      var w2 = w * w / wClip;
      var h2 = h * h / hClip;
      var x2 = x - w2 * clipLeft;
      var y2 = y - h2 * clipTop;
      c.image(x2, y2, w2, h2, this.image, this.preserveImageAspect, false, false, clip, isMultiply === 1 ? 'mix-blend-mode: multiply' : null);

      var stroke = mxUtils.getValue(this.style, mxConstants.STYLE_IMAGE_BORDER, null);

      if (stroke != null) {
        c.setShadow(false);
        c.setStrokeColor(stroke);
        c.rect(x, y, w, h);
        c.stroke();
      }
    }
    this.paintBackground.apply(this, arguments);
  };
})();