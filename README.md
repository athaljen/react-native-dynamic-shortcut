# React Native Quick Actions

Support for the new 3D Touch home screen quick actions for your React Native apps!

### Credit @ [Jordan Byron](http://github.com/jordanbyron/)

**This project currently supports iOS 9+ and Android 7**

![](/assets/example.png)

## Installing

```bash
$ yarn add react-native-dynamic-shortcut
$ react-native link react-native-dynamic-shortcut
```

### Additional steps on iOS

Add the following lines to your `AppDelegate.m` file:

```obj-c
#import "RNQuickActionManager.h"

// @implementation AppDelegate

- (void)application:(UIApplication *)application performActionForShortcutItem:(UIApplicationShortcutItem *)shortcutItem completionHandler:(void (^)(BOOL succeeded)) completionHandler {
  [RNQuickActionManager onQuickActionPress:shortcutItem completionHandler:completionHandler];
}

// @end
```

### Manual Linking on Android

Add the following to `app/build.gradle` within the `dependencies { ... }` section

```java
implementation project(':react-native-dynamic-shortcut')
```

Add `import com.reactNativeQuickActions.AppShortcutsPackage;` to your `MainApplication.java`

Also add `new AppShortcutsPackage()` within the

```java
protected List<ReactPackage> getPackages() {
   @SuppressWarnings("UnnecessaryLocalVariable")
   List<ReactPackage> packages = new PackageList(this).getPackages();
  //  packages.add(new AppShortcutsPackage()); //like this
   return packages;
}

//or

public List<ReactPackage> createAdditionalReactPackages() {
  return Arrays.<ReactPackage>asList(
    ...
  );
}
```

section of `MainApplication.java`

## Usage

### Adding static quick actions - iOS only

Add these entries into to your `Info.plist` file and replace the generic stuff (Action Title, .action, etc):

```xml
<key>UIApplicationShortcutItems</key>
<array>
  <dict>
    <key>UIApplicationShortcutItemIconType</key>
    <string>UIApplicationShortcutIconTypeLocation</string>
    <key>UIApplicationShortcutItemTitle</key>
    <string>Action Title</string>
    <key>UIApplicationShortcutItemType</key>
    <string>$(PRODUCT_BUNDLE_IDENTIFIER).action</string>
  </dict>
</array>
```

A full list of available icons can be found here:

<https://developer.apple.com/documentation/uikit/uiapplicationshortcuticon/icontype>

### Adding dynamic quick actions

In order to add / remove dynamic actions during application lifecycle, you need to import `react-native-dynamic-shortcut` and call either `setShortcutItems` to set actions or `clearShortcutItems` to clear.

```js
import DynamicShortcut from "react-native-dynamic-shortcut";

DynamicShortcut.setShortcutItems([
  {
    type: "Orders", // Required
    title: "See your orders", // Optional, if empty, `type` will be used instead
    subtitle: "See orders you've made",
    icon: "Compose" or "https://image.png", // Note URL support in android only, Icons instructions below
    userInfo: {
      url: "app://orders" // Provide any custom data like deep linking URL
    }
  }
]);
```

### To clear actions:

```js
DynamicShortcut.clearShortcutItems();
```

#### Icons

##### iOS

On iOS you can use the default icons provided by Apple, they're listed here: https://developer.apple.com/design/human-interface-guidelines/ios/icons-and-images/system-icons/#quick-action-icons

You can also use custom icons creating new Image set inside Image.xcassets on XCode. Make sure to add B/W icons, color icons doesn't support on ios. You'll need to define the 1x, 2x and 3x sizes.

![](/assets/ios.png)

##### Android

On Android you'll need to create an image file (use PNG) inside `android/app/src/main/res/drawable`.
Name the image with underscores, don't use hyphens.

You can provide an image url to set the icon, make sure its a valid Url.

### Listening

First, you'll need to make sure `DeviceEventEmitter` is added to the list of
requires for React Native.

Use `DeviceEventEmitter` to listen for `quickActionShortcut` messages when app in background.

```js
import { DeviceEventEmitter } from "react-native";

DeviceEventEmitter.addListener("quickActionShortcut", (data) => {
  console.log(data);
});
```

To get any actions sent when the app is cold-launched using the following code:

```js
import DynamicShortcut from "react-native-dynamic-shortcut";

DynamicShortcut.popInitialAction()
  .then((item) => {
    console.log(item, "app quit mode");
  })
  .catch((er) => {
    console.log(console.error());
  });
```

Please note that on Android if android:launchMode is set to default value standard in AndroidManifest.xml, the app will be re-created each time when app is being brought back from background and it won't receive quickActionShortcut event from DeviceEventEmitter, instead popInitialAction will be receiving the app shortcut event.

### Check if 3D Touch is supported

The following function will alert you if the user's device supports 3D Touch. Please
note this project currently only supports iOS 9+ which means this code will not
work on iOS devices running versions < 9.0.

```js
import DynamicShortcut from "react-native-dynamic-shortcut";

DynamicShortcut.isSupported((error, supported) => {
  if (!supported) {
    console.log("Device does not support 3D Touch or 3D Touch is disabled.");
  }
});
```

## Example

```jsx
useEffect(() => {
  DynamicShortcut.isSupported((error, supported) => {
    if (supported) {
      DynamicShortcut.setShortcutItems([
        {
          type: "Profile",
          title: "Profile",
          icon: "logo",
          userInfo: { url: "dummy" },
        },
      ]);

      DynamicShortcut.setShortcutItems([
        {
          type: "Profile",
          title: "Profile",
          icon: "https://mountains.png", //(android only) ios support B/W images
          userInfo: { url: "dummy" },
        },
      ]);
    }
  });

  DeviceEventEmitter.addListener("quickActionShortcut", (item) => {
    console.log(item, "app in background");
  });

  DynamicShortcut.popInitialAction()
    .then((item) => {
      console.log(item, "app quit mode");
    })
    .catch((er) => {
      console.log(console.error());
    });

  return () => {
    DeviceEventEmitter.removeAllListeners("quickActionShortcut");
  };
}, []);
```

## License

Copyright (c) 2024 athal jen (http://github.com/athaljen/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
