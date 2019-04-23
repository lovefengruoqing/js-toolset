/**
 * dom module.
 * @module js-toolset/dom
 */


import * as en from './enhance';


/**
 * @name getDomWidthOrHeight
 * @function
 * @description 获取目标 dom 元素的宽度或者高度
 * @param {Object} dom 目标 DOM 元素
 * @param {Boolean} isWidth 是否想要获取宽度
 */
export const getDomWidthOrHeight = (dom, isWidth) => {
  // 如果不传第二个参数，默认获取宽度
  // eslint-disable-next-line no-param-reassign
  isWidth = isWidth === undefined ? true : isWidth;

  const {
    clientWidth,
    clientHeight,
  } = dom;

  // 如果是 想要获取宽度
  if (isWidth) {
    return clientWidth;
  }
  return clientHeight;
};

/**
 * @name getDomSpecifiedPointLocation
 * @function
 * @description 获取 dom 元素指定点坐标
 * @param {HTMLElement} dom dom 元素
 * @param {*} specifiedPoint
 */
export const getDomSpecifiedPointLocation = (dom, specifiedPoint) => {
  let loc;
  if (en.isHTMLElement(dom)) {
    const {
      top, left, right, bottom,
    } = dom.getBoundingClientRect();
    switch (specifiedPoint) {
      case 1: loc = { x: left, y: top }; break;
      case 2: loc = { x: right, y: top }; break;
      case 3: loc = { x: left, y: bottom }; break;
      case 4: loc = { x: right, y: bottom }; break;
      default: loc = { x: (left + right) / 2, y: (top + bottom) / 2 };
    }
  }
  return loc;
};

/**
 * @name loadLibs
 * @function
 * @description 批量加载 libs 脚本
 * @param {Array} list 脚本路径集合，路径主路径为 assets
 */
// eslint-disable-next-line consistent-return
export const loadLibs = (list) => {
  /**
   * @static
   * @function
   * @param {url} src 地址
   */
  function addPrefix(src) {
    return `../assets/${src}`;
  }

  const { head } = document;

  if (en.isArray(list)) {
    return list.map((item) => {
      const script = document.createElement('script');
      script.setAttribute('src', addPrefix(item));
      head.appendChild(script);
      return script;
    });
  }
};

/**
 * @name unloadLibs
 * @function
 * @descriptions 卸载掉 libs
 * @param {Array} list HTMLElement 集合
 */
export const unloadLibs = (list) => {
  const { head } = document;
  if (en.isArray(list)) {
    list.forEach((item) => {
      if (en.isHTMLElement(item)) {
        head.removeChild(item);
      }
    });
  }
};
