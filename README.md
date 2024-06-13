
## Get Started
#### Clone the repository and install dependencies
1. Clone the Flexible-Classroom-Desktop repository:
   ```bash
   git clone https://github.com/AgoraIO-Community/flexible-classroom-desktop.git
   ```
2. Checkout the latest release branch.
   
   i. Change directory to `flexible-classroom-desktop`
   
   ii. Switch the branch, run the following commands:
   ```bash
   cd flexible-classroom-desktop
   git checkout release/2.9.40-special.1
   ```
4. To install dependencies, run the following command:
   ```bash
   yarn install:packages
   ```

#### Run the project in development mode
4. To run the project in development mode
   
   i. To run the SDK for `PC Web`,use the following command:
   ```bash
   yarn dev:scene
   ```
   Then you can visit `http://localhost:3002` to debug your code.

   ii. To run the SDK for `Mobile Web`,use the following command:
   ```bash
   yarn dev:classroom
   ```
   Then you can visit `http://localhost:3001` to debug your code.（Recommended to use mobile browser devtools for debugging.）

   iii. If you want to debug our App Demo, use the following command:
   ```bash
   yarn dev
   ```
   Then you can visit `http://localhost:3000` to debug your code.(This mode depends on the SDK product and cannot hot update the SDK code. It is only used for debugging App code.)
#### Package the SDK
5. After finishing the development, package the SDK JS file with the following command:

    i. To package the PC Web SDK code:
    ```bash
    # package SDK
    yarn pack:scene:sdk
    # package plugins
    yarn pack:scene:plugin
    ```
    Find the output in the `packages/fcr-ui-scene/lib/scene.bundle.js` and `packages/agora-plugin-gallery/lib/scene_widget.bundle.js` respectively.
   
   ##### Sample Code 
   ```html
   <!DOCTYPE html>
   <html lang="en">
      <head>
         <meta charset="UTF-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1" />
         <script src="./packages/fcr-ui-scene/lib/scene.bundle.js"></script>
         <script src="./packages/agora-plugin-gallery/lib/scene_widget.bundle.js"></script>
      </head>

      <body>
         <style>
            html,
            body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            }
            #root {
            width: 100%;
            height: 100%;
            }
         </style>
         <div id="root"></div>
         <script type="text/javascript">
            const virtualBackgroundImages = {
            // virtual background assets
            virtualBackground1: 'effect/default1.jpg',
            virtualBackground2: 'effect/default2.jpg',
            virtualBackground3: 'effect/default3.jpg',
            virtualBackground4: 'effect/default4.jpg',
            virtualBackground5: 'effect/default5.jpg',
            virtualBackground6: 'effect/default6.jpg',
            virtualBackground7: 'effect/default7.jpg',
            };

            const virtualBackgroundVideos = [
            'effect/default8.mp4',
            'effect/default9.mp4',
            ];
            // Start cloud classroom
            const unmount = FcrUIScene.launch(
            document.querySelector('#root'),
            {
               appId: 'your appid',
               region: 'NA',
               userUuid: '12345678',
               userName: 'Teacher001',
               roomUuid: 'room003',
               roomType: 10, // Room type: 10 is cloud class.
               roomName: 'RoomName001',
               devicePretest: true, // Whether to enable pre-class equipment detection
               token: 'your token', // In a test environment, you can use temporary RTM Token; in a production or security environment, it is strongly recommended that you use a server-generated RTM Token.
               language: 'en',
               duration: 60 * 60 * 2, // Course time in seconds.
               recordUrl: 'your record url',
               roleType: 1, // User roles: 1 is teacher, 2 is student
               widgets: {
                  easemobIM: FcrChatroom, // IM widget
                  netlessBoard: FcrBoardWidget, // Interactive whiteboard widget
                  poll: FcrPollingWidget, // Voter widget
                  mediaPlayer: FcrStreamMediaPlayerWidget, // Video sync player widget
                  webView: FcrWebviewWidget, // Embedded browser widget
                  countdownTimer: FcrCountdownWidget, // Countdown widget
                  popupQuiz: FcrPopupQuizWidget, // Clicker widget
               },
               virtualBackgroundImages,
               virtualBackgroundVideos,
            },
            () => {
               // success
            },
            (err) => {
               console.log(err);
               // failure
            },
            (type) => {
               //Destroy
               history.push(`/?reason=${type}`);
            },
            );
         </script>
      </body>
   </html>
   ```
    ii. To package the Mobile Web SDK code:
    ```bash
    # package SDK
    yarn pack:classroom:sdk
    # package plugins
    yarn pack:classroom:plugin
    ```
    Find the output in the `packages/agora-classroom-sdk/lib/edu_sdk.bundle.js` and `packages/agora-plugin-gallery/lib/edu_widget.bundle.js` respectively.

   ##### Sample Code 
   ```html
   <!DOCTYPE html>
      <html lang="en">
      <head>
         <meta charset="UTF-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1" />
         <script src="./packages/agora-classroom-sdk/lib/edu_sdk.bundle.js"></script>
         <script src="./packages/agora-plugin-gallery/lib/edu_widget.bundle.js"></script>
      </head>

      <body>
         
         <div id="root"></div>
         <script type="text/javascript">
            AgoraEduSDK.config({
               appId: 'your appid',
               region: 'NA',
            });

            const unmount = AgoraEduSDK.launch(document.querySelector('#root'), {
            userUuid: '12345678',
            rtmToken: 'your token',
            roomUuid: 'room003',
            roomName: 'RoomName001',
            userName: 'Teacher001',
            roleType: 2, // User roles: 1 is teacher, 2 is student
            language: 'en',
            duration: 60 * 60 * 2, // Course time in seconds.
            latencyLevel: 2,
            roomType: 10, // Room type: 10 is cloud class.
            userFlexProperties: {
               watermark: false,
               boardBackgroundImage:
                  'https://solutions-apaas.agora.io/demo/education/static/img/background_default1.png',
            },
            platform: 'H5',
            mediaOptions: {
               web: {
                  codec: 'vp8',
               },
            },
            returnToPath: '/',
            widgets: {
               countdownTimer: AgoraCountdown, // Countdown widget
               easemobIM: AgoraHXChatWidget, // IM widget
               netlessBoard: FcrBoardWidget, // Interactive whiteboard widget
               poll: AgoraPolling, // Voter widget
               webView: FcrWebviewWidget, // webView widget for online courseware
               mediaPlayer: FcrStreamMediaPlayerWidget,// media player for youtube
            },
            shareUrl: 'your share url',
            });
         </script>
      </body>
   </html>

   ```

## Source code structure
- `agora-demo-app`: A sample project that includes functions such as creating a room, joining a room, and integrating SDK.
  
- `agora-classroom-sdk`: The Cloud Class Scene SDK for mobile web, which contains the following modules:
     
      - `/src/index`: SDK interface.
  
      - `/src/container`: This folder contains all the business components. A business component is implemented by combining the UI components with the UI stores.
  
      - `/src/scenarios`: This folder contains the code for arranging the layout of business components in classroom scenarios.
  
      - `/src/uistores`: The UI stores implement the business logic for the UI components.
  
      - `/src/ui-kit`: Common UI components.
- `agora-plugin-gallery`: An independent plug-in library for Agora Classroom SDK.
  
- `fcr-ui-scene`: The Cloud Class Scene SDK for PC Web, which contains the following modules:
     
      - `/src/index`: SDK interface.
  
      - `/src/container`: This folder contains all the business components. A business component is implemented by combining the UI components with the UI stores.
  
      - `/src/scenarios`: UI scene. Scenarios are composed of multiple business components.
  
      - `/src/uistores`: The UI stores implement the business logic for the UI components.
  
      - `/src/components`: Common UI components.
  
## More Information
Please visit https://docs.agora.io/en/flexible-classroom/develop/integrate-flexible-classroom/integrate-flexible-classroom-fcr?platform=web for more information.
