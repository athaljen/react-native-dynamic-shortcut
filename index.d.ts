declare module "react-native-dynamic-shortcut" {
  export interface ShortcutItem {
    /**type of the shortcut item*/
    type: string;
    /**title of the shortcut item*/
    title: string;
    /**subtitle of the shortcut item*/
    subtitle?: string;
    /**remote image url supported in android only */
    icon: string;
    /**userInfo of the shortcut item*/
    userInfo: {
      /**something like deep Linking url*/
      url: string;
    };
  }

  /**
   *@example
   popInitialAction()
      .then(item => {
        if (item) {
          console.log(item, 'app quit mode');
        }
      })
      .catch(err => {
        console.log(err);
      });
  */
  export function popInitialAction(): Promise<ShortcutItem>;

  /**
   *@example
   addShortcutItem({
      type: 'type',
      title: 'title',
      subtitle: 'subtitle',
      icon: 'icon',
      userInfo: {
        url: 'url1',
      },
    })
      .then(() => {
        console.log('shortcut added');
      })
      .catch(err => {
        console.log(err);
      });
  */
  export function setShortcutItems(shortcutItems: Array<ShortcutItem>): void;

  /**
   *@example
   clearShortcutItems()
      .then(() => {
        console.log('shortcut cleared');
      })
      .catch(err => {
        console.log(err);
      });
  */
  export function clearShortcutItems(): void;

  /**
   *@example
   isSupported((error, supported) => {
      if (error) {
        console.log(error);
      } else {
        console.log(supported); //boolean
      }
    });
  */
  export function isSupported(
    callback: (error: Error | any, supported: boolean) => void
  ): void;
}
