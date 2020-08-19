"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setMessagesNotifications = exports.setVipMessagesNotifications = exports.checkNotifications = void 0;

var setVipMessagesNotifications = function setVipMessagesNotifications(notify) {
  return {
    type: 'SET_NEW_VIP_MESSAGES',
    payload: notify
  };
};

exports.setVipMessagesNotifications = setVipMessagesNotifications;

var setMessagesNotifications = function setMessagesNotifications(notify) {
  return {
    type: 'SET_NEW_MESSAGES',
    payload: notify
  };
};

exports.setMessagesNotifications = setMessagesNotifications;

var checkNotifications = function checkNotifications(apiService, dispatch) {
  apiService.getNotify().then(function (data) {
    // console.log(data)
    dispatch(setMessagesNotifications(data.new_message));
    dispatch(setVipMessagesNotifications(data.new_message_ass));
  })["catch"](function (err) {});
};

exports.checkNotifications = checkNotifications;