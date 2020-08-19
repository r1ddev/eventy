"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.initialState = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  frameIsVisible: false,
  frameIsFloating: false,
  currentSceneUrl: null
};
exports.initialState = initialState;

var floatvideo = function floatvideo(state, action) {
  if (state === undefined) {
    return initialState;
  }

  switch (action.type) {
    case 'SET_VIDEOFRAME_VISIBLE':
      // console.log('REDUCER')
      return _objectSpread({}, state, {
        frameIsVisible: true
      });

    case 'SET_VIDEOFRAME_HIDDEN':
      return _objectSpread({}, state, {
        frameIsVisible: false
      });

    case 'SET_VIDEO_FIXED':
      return _objectSpread({}, state, {
        frameIsFloating: false
      });

    case 'SET_VIDEO_FLOATED':
      return _objectSpread({}, state, {
        frameIsFloating: true
      });

    case 'SET_CURRENT_SCENE_URL':
      return _objectSpread({}, state, {
        currentSceneUrl: action.payload
      });

    default:
      return state;
  }
};

var _default = floatvideo;
exports["default"] = _default;