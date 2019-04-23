/**
 * @module js-toolset/draw
 * @description 提供一些绘图常用的方法
 */

/**
 * @name addLinearGradient
 * @function
 * @description 添加线性渐变
 * @param {Object} g canvas 2d 画笔
 * @param {Object} fPoint 起始点坐标
 * @param {Object} tPoint 终止点坐标
 * @param {Array} colors 颜色数据数组
 */
export const addLinearGradient = (g, fPoint, tPoint, colors = [[0, '#efefef'], [0.5, 'blue'], [1, 'red']]) => {
  const gradient = g.createLinearGradient(
    fPoint.x,
    fPoint.y,
    tPoint.x,
    tPoint.y,
  );

  colors.forEach((item) => {
    gradient.addColorStop(...item);
  });

  // eslint-disable-next-line no-param-reassign
  g.fillStyle = gradient;
  // eslint-disable-next-line no-param-reassign
  g.strokeStyle = gradient;
};

/**
 * @name drawTitleDecoration
 * @function
 * @description 绘制标题装饰线（小竖线）
 * @param {Object} g canvas 画笔
 * @param {Object} param1 一些参数
 */
export const drawTitleDecoration = (g, {
  xOffset = 0, yOffset = 0, width = 2, height = 10,
}) => {
  const interval = 5;
  // eslint-disable-next-line no-param-reassign
  g.lineWidth = width;
  xOffset -= width + interval / 2;
  yOffset -= height / 2;
  addLinearGradient(
    g,
    { x: xOffset, y: yOffset },
    { x: xOffset, y: yOffset + height },

    [[0, 'rgba(255, 255, 255, 0)'], [0.4, '#03a9f4'], [0.5, '#03e9f4'], [0.6, '#03a9f4'], [1, 'rgba(255, 255, 255, 0)']],
  );
  g.moveTo(xOffset, yOffset);
  g.lineTo(xOffset, yOffset + height);
  xOffset += interval;
  g.moveTo(xOffset, yOffset);
  g.lineTo(xOffset, yOffset + height);
  g.stroke();
};

/**
 * @name drawLine
 * @function
 * @description 绘制凹形的渐变线
 * @param {CanvasRenderingContext2D} g canvas 画笔
 * @param {Number} w 宽度
 * @param {Number} h 高度
 * @param {Number} textWidth 文本的宽度
 * @param {Object} translate 平移的宽度
 * @param {Boolean} reverse 是否翻转
 */
export const drawLine = (
  g, w = 1920, h = 98, textWidth = 408, translate = { x: 0, y: 0 }, reverse = false,
) => {
  // code goes here
  if (!(g instanceof CanvasRenderingContext2D)) {
    console.Error('g 不为 canvas 画笔');
  } else {
    const offset = 20;
    const offset2 = 10;
    const offset3 = 20;

    g.beginPath();
    addLinearGradient(g, { x: 0, y: 0 }, { x: w, y: 0 }, [
      [0, '#0264aa00'],
      [0.35, '#0095fe'],
      [0.5, '#6fddff'],
      [0.35, '#0095fe'],
      [1, '#0264aa00'],
    ]);
    g.translate(translate.x, translate.y);

    let y1 = offset2;
    let y2 = h / 2 + offset2 + offset3 - translate.y;
    y2 = y2 > h ? (h - 2) : y2;
    if (reverse) {
      ([y1, y2] = [y2, y1]);
    }
    g.moveTo(offset, y1);
    g.lineTo(w / 2 - textWidth / 2 - offset * 2, y1);
    g.lineTo(
      w / 2 - textWidth / 2 - offset,
      y2,
    );
    g.lineTo(
      w / 2 + textWidth / 2 + offset,
      y2,
    );
    g.lineTo(w / 2 + textWidth / 2 + offset * 2, y1);
    g.lineTo(w - offset, y1);
    // g.closePath();

    g.lineWidth = 2;
    g.stroke();

    g.translate(-translate.x, -translate.y);
  }
};

/**
 * @name drawLineWithArray
 * @function
 * @description 根据一组点来绘制
 * @param {CanvasRenderingContext2D} g canvas 画笔
 * @param {Array} array 点的数组集合
 */
export const drawLineWithArray = (g, array) => {
  array.forEach((point, index) => {
    if (index === 0) {
      g.moveTo(...point);
    } else {
      g.lineTo(...point);
    }
  });
};
