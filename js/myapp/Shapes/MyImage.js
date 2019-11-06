(function () {
  function myImage(bounds, image, fill, stroke, strokewidth) {
    mxShape.call(this);
    this.bounds = bounds;
    this.image = image;
    this.fill = fill;
    this.stroke = stroke;
    this.strokewidth = (strokewidth != null) ? strokewidth : 1;
    this.shadow = false;
    this.connectable = false;
  };

  /**
   * 扩展MXShape。
   */
  mxUtils.extend(myImage, mxImageShape);  //myImage继承自mxImageShape

  mxCellRenderer.registerShape('myImage', myImage); //注册新的自定义全局形状

  myImage.prototype.constraints = null;

  myImage.prototype.customProperties = [  // 图形属性
    {name: 'isMultiply', dispName: '正片叠底', type: 'bool', defVal: 0},
    {name: 'grayscale', dispName: '图片灰度', type: 'bool', defVal: 0},
    {name: 'clipTop', dispName: '顶部裁剪比例', type: 'float', min: 0,  max: 1, defVal: 0},
    {name: 'clipRight', dispName: '右侧裁剪比例', type: 'float', min: 0,  max: 1, defVal: 0},
    {name: 'clipBottom', dispName: '底部裁剪比例', type: 'float', min: 0,  max: 1, defVal: 0},
    {name: 'clipLeft', dispName: '左侧裁剪比例', type: 'float', min: 0,  max: 1, defVal: 0},
  ];

  myImage.prototype.paintVertexShape = function (c, x, y, w, h) {
    this.style['connectable'] = 0;
    if (this.image != null) {
      var fill = mxUtils.getValue(this.style, mxConstants.STYLE_IMAGE_BACKGROUND, null);
      var stroke = mxUtils.getValue(this.style, mxConstants.STYLE_IMAGE_BORDER, null);
      var isMultiply = mxUtils.getValue(this.style, 'isMultiply', 0);
      var grayscale = mxUtils.getValue(this.style, 'grayscale', 0);
      var clipTop = mxUtils.getValue(this.style, 'clipTop', 0) * 100;
      var clipRight = mxUtils.getValue(this.style, 'clipRight', 0) * 100;
      var clipBottom = mxUtils.getValue(this.style, 'clipBottom', 0) * 100;
      var clipLeft = mxUtils.getValue(this.style, 'clipLeft', 0) * 100;
      var clip = clipTop + '% ' + clipRight + '% ' + clipBottom + '% ' + clipLeft + '%';

      if (fill != null) {
        // Stroke rendering required for shadow 阴影所需的笔画渲染
        c.setFillColor(fill);
        c.setStrokeColor(stroke);
        c.rect(x, y, w, h);
        c.fillAndStroke();
      }
      /*console.log('isMultiply', isMultiply);
      console.log('grayscale', grayscale);*/
      let myStyle = null;
      let filter = null;
      if(isMultiply && grayscale){
        myStyle = 'mix-blend-mode: multiply;';
        filter = 'url(#grayscale)';
      } else if(!isMultiply && grayscale){
        filter = 'url(#grayscale)';
        myStyle = '';
      } else if(isMultiply && !grayscale){
        myStyle = 'mix-blend-mode: multiply;';
      }
      // console.log('filter=>', filter);

      // console.log('myStyle=>', filter);
      // FlipH/V are implicit via mxShape.updateTransform
      /*console.log('c=>', c);*/
      c.image(x, y, w, h, this.image, this.preserveImageAspect, false, false, clip, myStyle, filter); // mxSvgCanvas2D.image

      var stroke = mxUtils.getValue(this.style, mxConstants.STYLE_IMAGE_BORDER, null);

      /*console.log('stroke=>', stroke);*/

      if (stroke != null) {
        c.setShadow(false);
        c.setStrokeColor(stroke);
        c.rect(x, y, w, h);
        c.stroke();
      }
    } else {
      mxRectangleShape.prototype.paintBackground.apply(this, arguments);  // this.mxRectangleShape.paintBackground(arguments)
    }

  };

  Graph.handleFactory['myImage'] = function (state) {
    var handles = [Graph.createHandle(
      state,
      ['clipTop'],  // keys
      function (bounds) { // getPositionFn
      var left = mxUtils.getValue(this.state.style, 'clipLeft', 0);
      var right = mxUtils.getValue(this.state.style, 'clipRight', 0);

      var t = Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.state.style, 'clipTop', 0))));
      return new mxPoint(bounds.x + bounds.width * (1 + left - right) / 2, bounds.y + bounds.height * t);
      },
      function (bounds, pt) { // setPositionFn
      this.state.style['clipTop'] = Math.max(0, Math.min(1, ((pt.y - bounds.y) / bounds.height).toFixed(4)));
      }
    )];


    var handle2 = Graph.createHandle(
      state,
      ['clipRight'],
      function (bounds) {
      var top = mxUtils.getValue(this.state.style, 'clipTop', 0);
      var bottom = mxUtils.getValue(this.state.style, 'clipBottom', 0);

      var t = Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.state.style, 'clipRight', 0))));
      return new mxPoint(bounds.x + bounds.width - bounds.width * t, bounds.y + bounds.height * (1 + top - bottom) / 2);
      },
      function (bounds, pt) {
      this.state.style['clipRight'] = Math.max(0, Math.min(1, ((bounds.x + bounds.width - pt.x) / bounds.width).toFixed(4)));
      }
    );
    handles.push(handle2);


    var handle3 = Graph.createHandle(state, ['clipBottom'], function (bounds) {
      var left = mxUtils.getValue(this.state.style, 'clipLeft', 0);
      var right = mxUtils.getValue(this.state.style, 'clipRight', 0);

      var t = Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.state.style, 'clipBottom', 0))));
      return new mxPoint(bounds.x + bounds.width * (1 + left - right) / 2, bounds.y + bounds.height - bounds.height * t);
    }, function (bounds, pt) {
      this.state.style['clipBottom'] = Math.max(0, Math.min(1, ((bounds.y + bounds.height - pt.y) / bounds.height).toFixed(4)));
    });
    handles.push(handle3);


    var handle4 = Graph.createHandle(state, ['clipLeft'], function (bounds) {
      var top = mxUtils.getValue(this.state.style, 'clipTop', 0);
      var bottom = mxUtils.getValue(this.state.style, 'clipBottom', 0);

      var t = Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.state.style, 'clipLeft', 0))));
      return new mxPoint(bounds.x + bounds.width * t, bounds.y + bounds.height * (1 + top - bottom) / 2);
    }, function (bounds, pt) {
      this.state.style['clipLeft'] = Math.max(0, Math.min(1, ((pt.x - bounds.x) / bounds.width).toFixed(4)));
    });
    handles.push(handle4);


    return handles;
  };

})();
