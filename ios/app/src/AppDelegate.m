/*
 * Copyright @ 2018-present 8x8, Inc.
 * Copyright @ 2017-2018 Atlassian Pty Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#import "AppDelegate.h"
#import "FIRUtilities.h"
#import "Types.h"
#import "ViewController.h"

@import Firebase;
@import JitsiMeetSDK;

@implementation AppDelegate

-             (BOOL)application:(UIApplication *)application
  didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    JitsiMeet *jitsiMeet = [JitsiMeet sharedInstance];
    NSURL *url = [NSURL URLWithString:@"https://picsum.photos/id/237/200/300"];

    NSURL *url2 = [NSURL URLWithString:@"https://i.pinimg.com/originals/62/ae/fb/62aefb044922a5a847546e30b9036913.jpg"];

    JitsiMeetUserInfo *userInfo = [[JitsiMeetUserInfo alloc] initWithDisplayName:@"IOS APP" andEmail:@"abc@example.com" andAvatar:url2];
    jitsiMeet.conferenceActivityType = JitsiMeetConferenceActivityType;
    jitsiMeet.customUrlScheme = @"com.jitsi.meets";
    jitsiMeet.universalLinkDomains = @[@"meet.jit.si", @"alpha.jitsi.net", @"beta.meet.jit.si"];
IncomingCallInfo *incomingCallInfo = [[IncomingCallInfo alloc] initWithCallerAvatarURL:@"https://i.pinimg.com/originals/62/ae/fb/62aefb044922a5a847546e30b9036913.jpg" andCallerName:@"" andCallerDetails:@"John Doe" andhasVideo:true];
    jitsiMeet.defaultConferenceOptions = [JitsiMeetConferenceOptions fromBuilder:^(JitsiMeetConferenceOptionsBuilder *builder) {
        [builder setFeatureFlag:@"welcomepage.enabled" withBoolean:NO];
        [builder setFeatureFlag:@"resolution" withValue:@(360)];
        [builder setFeatureFlag:@"ios.screensharing.enabled" withBoolean:YES];
        [builder setFeatureFlag:@"ios.recording.enabled" withBoolean:YES];
    // }];
       builder.serverURL = [NSURL URLWithString:@"https://meet.jit.si"];
      //builder.serverURL = [NSURL URLWithString:@"https://meetdev.melp.us"];
      
  // [jitsiMeet application:application didFinishLaunchingWithOptions:launchOptions];
        [builder setRoom:@"b934594111c9b6c5a326f037b18be0d5"];

      
//
//       [builder setToken:@"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJtZWxwX2NvbmYiLCJzdWIiOiJtZWV0ZGV2Lm1lbHAudXMiLCJtb2RlcmF0b3IiOnRydWUsImlzcyI6Im1lbHBfY29uZl84IiwiY29udGV4dCI6eyJjYWxsZWUiOnsibmFtZSI6IiIsImlkIjoiMTIzOTk1MjkzMiIsImF2YXRhciI6IiIsImVtYWlsIjoiIn0sInVzZXIiOnsibmFtZSI6IlZhaWJoYXYgSmFpbiIsImlkIjoiMTIzOTk1MjkzMiIsImF2YXRhciI6Imh0dHBzOi8vdXMtYXBpLm1lbHAudXMvZG93bmxvYWQvdjAvOHE0cTBxdjU5cW04L2MwM2FAdXNlci5qcGVnP3Nlc3Npb25pZD05ZWJ2czF4am1zY2cmaXN0aHVtYj0xIiwiZW1haWwiOiIxMjM5OTUyOTMyQG1lbHAuY29tIn0sImdyb3VwIjoib25ldG9vbmUifSwiaWF0IjoxNzE1MDA2Njg2LCJyb29tIjoiYjkzNDU5NDExMWM5YjZjNWEzMjZmMDM3YjE4YmUwZDUiLCJyb29tTmFtZSI6IlZhaWJoYXYgSmFpbiIsImV4cCI6MTcxNTA0OTg4Nn0.Yjg4stl1-qqDP3tqeV5n97zeY9mdhCcGU4-P9t-Tc3c"];

        [builder setUserInfo:userInfo];

        [builder setGroupCall:NO];

        [builder setGroupCall:NO];

        [builder setAudioOnly:YES];

        [builder setIsPrivateRoom:NO];

        [builder setTeamName:@"Melp Discussion Discussion Discussion Discussion Discussion Discussion"];

        [builder setUserPicUrl:@"https://i.pinimg.com/originals/62/ae/fb/62aefb044922a5a847546e30b9036913.jpg"];

        [builder setIncomingCallInfo:incomingCallInfo];

          

        }];

        

        [jitsiMeet application:application didFinishLaunchingWithOptions:launchOptions];
    // Initialize Crashlytics and Firebase if a valid GoogleService-Info.plist file was provided.
  if ([FIRUtilities appContainsRealServiceInfoPlist]) {
        NSLog(@"Enabling Firebase");
        [FIRApp configure];
        // Crashlytics defaults to disabled with the FirebaseCrashlyticsCollectionEnabled Info.plist key.
        [[FIRCrashlytics crashlytics] setCrashlyticsCollectionEnabled:![jitsiMeet isCrashReportingDisabled]];
    }

    ViewController *rootController = (ViewController *)self.window.rootViewController;
    [jitsiMeet showSplashScreen:rootController.view];

    return YES;
}

- (void) applicationWillTerminate:(UIApplication *)application {
    NSLog(@"Application will terminate!");
    // Try to leave the current meeting graceefully.
    ViewController *rootController = (ViewController *)self.window.rootViewController;
    [rootController terminate];
}

#pragma mark Linking delegate methods

-    (BOOL)application:(UIApplication *)application
  continueUserActivity:(NSUserActivity *)userActivity
    restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> *restorableObjects))restorationHandler {

    if ([FIRUtilities appContainsRealServiceInfoPlist]) {
        // 1. Attempt to handle Universal Links through Firebase in order to support
        //    its Dynamic Links (which we utilize for the purposes of deferred deep
        //    linking).
        BOOL handled
          = [[FIRDynamicLinks dynamicLinks]
                handleUniversalLink:userActivity.webpageURL
                         completion:^(FIRDynamicLink * _Nullable dynamicLink, NSError * _Nullable error) {
           NSURL *firebaseUrl = [FIRUtilities extractURL:dynamicLink];
           if (firebaseUrl != nil) {
             userActivity.webpageURL = firebaseUrl;
             [[JitsiMeet sharedInstance] application:application
                                continueUserActivity:userActivity
                                  restorationHandler:restorationHandler];
           }
        }];

        if (handled) {
          return handled;
        }
    }

    // 2. Default to plain old, non-Firebase-assisted Universal Links.
    return [[JitsiMeet sharedInstance] application:application
                              continueUserActivity:userActivity
                                restorationHandler:restorationHandler];
}

- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {

    // This shows up during a reload in development, skip it.
    // https://github.com/firebase/firebase-ios-sdk/issues/233
    if ([[url absoluteString] containsString:@"google/link/?dismiss=1&is_weak_match=1"]) {
        return NO;
    }

    NSURL *openUrl = url;

    if ([FIRUtilities appContainsRealServiceInfoPlist]) {
        // Process Firebase Dynamic Links
        FIRDynamicLink *dynamicLink = [[FIRDynamicLinks dynamicLinks] dynamicLinkFromCustomSchemeURL:url];
        NSURL *firebaseUrl = [FIRUtilities extractURL:dynamicLink];
        if (firebaseUrl != nil) {
            openUrl = firebaseUrl;
        }
    }

    return [[JitsiMeet sharedInstance] application:app
                                           openURL:openUrl
                                           options:options];
}

- (UIInterfaceOrientationMask)application:(UIApplication *)application
  supportedInterfaceOrientationsForWindow:(UIWindow *)window {
    return [[JitsiMeet sharedInstance] application:application
           supportedInterfaceOrientationsForWindow:window];
}

@end
