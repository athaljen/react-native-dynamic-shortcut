//
//  RNQuickAction.h
//  RNQuickAction
//
//  Created by Athal Jen on 01/01/2024.
//  Copyright © 2015 react-native. All rights reserved.
//

#import <React/RCTBridgeModule.h>

@interface RNQuickActionManager : NSObject <RCTBridgeModule>
+(void) onQuickActionPress:(UIApplicationShortcutItem *) shortcutItem completionHandler:(void (^)(BOOL succeeded)) completionHandler;
@end
