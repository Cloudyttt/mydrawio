(function () {
  var seqNumber = 0;
  /*
  * function mySeqNum(bounds, fill, stroke, strokewidth) {
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
  function mySeqNum(bounds, fill, stroke, strokewidth) {
    mxShape.call(this);
    this.bounds = bounds;
    this.fill = fill;
    this.stroke = stroke;
    this.strokewidth = (strokewidth != null) ? strokewidth : 1;
  };

  /**
   * Extends mxShape.
   */
  mxUtils.extend(mySeqNum, mxEllipse);  // mySeqNum继承自mxEllipse

  mxCellRenderer.registerShape('mySeqNum', mySeqNum); //全局注册mySeqNum
  /*
  parentInit():
  mxShape.prototype.init = function(container)
  {
    if (this.node == null)
    {
      this.node = this.create(container);

      if (container != null)
      {
        container.appendChild(this.node);
      }
    }
  };*/
  var parentInit = mySeqNum.prototype.init;

  mySeqNum.prototype.init = function (container) {
    parentInit.apply(this, arguments);  // this.parentInit(arguments)
    if (seqNumber == 0) {
      this.state.cell.value = 1;
      seqNumber++;
    } else {
      this.state.cell.value = seqNumber++;
    }
  }
})();