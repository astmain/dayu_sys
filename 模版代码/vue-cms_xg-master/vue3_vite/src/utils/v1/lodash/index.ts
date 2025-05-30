import isArray from "lodash/isArray"
import isObject from "lodash/isObject"
import isString from "lodash/isString"
import isUndefined from "lodash/isUndefined"
import isNull from "lodash/isNull"
import isNumber from "lodash/isNumber"
import isDate from "lodash/isDate"
import isFunction from "lodash/isFunction"
import isBoolean from "lodash/isBoolean"
import isObjectLike from "lodash/isObjectLike"
import isEqual from "lodash/isEqual"
import isNaN from "lodash/isNaN"
import throttle from "lodash/throttle"
import debounce from "lodash/debounce"


//按需引入减少体积
export {isArray,isObject,isString,isUndefined,isNull,isNumber,isDate,isFunction,isBoolean,isObjectLike,isEqual,isNaN,throttle,debounce}