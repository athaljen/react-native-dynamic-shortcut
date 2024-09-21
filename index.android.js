var RNDShortcut = require("react-native").NativeModules.RNDShortcut;

module.exports = {
  /**
   * An initial action will be available if the app was cold-launched
   * from an action.
   *
   * The first caller of `popInitialAction` will get the initial
   * action object, or `null`. Subsequent invocations will return null.
   */
  popInitialAction: function () {
    return RNDShortcut.popInitialAction();
  },

  /**
   * Adds shortcut items to application
   */
  setShortcutItems: function (items) {
    RNDShortcut.setShortcutItems(items, (errorMessage) => {
      console.warn(errorMessage);
    });
  },

  /**
   * Clears all previously set dynamic icons
   */
  clearShortcutItems: function () {
    RNDShortcut.clearShortcutItems();
  },

  /**
   * Check if quick actions are supported
   */
  isSupported: function (callback) {
    RNDShortcut.isSupported(callback);
  },
};
