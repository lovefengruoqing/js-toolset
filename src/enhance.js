/**
 * @module js-toolset/enhance
 * @description JavaScript 常用方法增强
 */

/**
 * @name isArray
 * @function
 * @description 判断传入的对象是不是数组
 * @param {Array} o 数组
 */
export const isArray = o => Object.prototype.toString.call(o) === '[object Array]';

/**
 * @name isObject
 * @function
 * @description 判断目标函数是不是对象
 * @param {Object} o 对象
 */
export const isObject = o => Object.prototype.toString.call(o) === '[object Object]';

/**
 * @name isString
 * @function
 * @description 判断目标函数是不是字符串
 * @param {String} o 字符串
 */
export const isString = o => Object.prototype.toString.call(o) === '[object String]';

/**
 * @name isPictureSrc
 * @function
 * @description 判断是否为图片的路径
 * @param {String} src 字符串，图片路径
 */
export const isPictureSrc = (src) => {
  let flag = false;
  const picFilter = '.jpeg|.gif|.jpg|.png|.bmp|.pic|';
  if (isString(src)) {
    const index = src.lastIndexOf('.');
    const suffix = src.slice(index).toLowerCase();
    if (picFilter.indexOf(suffix) > -1) {
      flag = true;
    }
  }

  return flag;
};

/**
 * @name isHTMLElement
 * @function
 * @description 判断是不是 dom 对象
 * @param {HTMLElement} o dom 元素
 */
export const isHTMLElement = o => o instanceof HTMLElement;
