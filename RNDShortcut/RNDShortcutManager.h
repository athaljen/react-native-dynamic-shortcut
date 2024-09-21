//  Created by Athal Jen on 01/01/2024.
#import <React/RCTBridgeModule.h>

@interface RNDShortcutManager : NSObject <RCTBridgeModule>
+(void) onShortcutActionPress:(UIApplicationShortcutItem *) shortcutItem completionHandler:(void (^)(BOOL succeeded)) completionHandler;
@end
