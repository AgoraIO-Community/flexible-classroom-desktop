
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
3. To install dependencies, run the following command:
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

    ii. To package the Mobile Web SDK code:
    ```bash
    # package SDK
    yarn pack:classroom:sdk
    # package plugins
    yarn pack:classroom:plugin
    ```
    Find the output in the `packages/agora-classroom-sdk/lib/edu_sdk.bundle.js` and `packages/agora-plugin-gallery/lib/classroom_widget.bundle.js` respectively.


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