var RNDShortcutManager = require('react-native').NativeModules.RNDShortcutManager;
var _initialAction = RNDShortcutManager && RNDShortcutManager.initialAction;

module.exports = {
  /**
   * An initial action will be available if the app was cold-launched
   * from an action.
   *
   * The first caller of `popInitialAction` will get the initial
   * action object, or `null`. Subsequent invocations will return null.
   */
  popInitialAction: function () {
    return new Promise(resolve => {
      var initialAction = _initialAction;
      _initialAction = null;
      resolve(initialAction);
    });
  },

  /**
   * Adds shortcut items to application
   */
  setShortcutItems: function (items) {
    RNDShortcutManager.setShortcutItems(items);
  },

  /**
   * Clears all previously set dynamic icons
   */
  clearShortcutItems: function () {
    RNDShortcutManager.clearShortcutItems();
  },

  /**
   * Check if quick actions are supported
   */
  isSupported: function (callback) {
    RNDShortcutManager.isSupported(callback);
  },
};
