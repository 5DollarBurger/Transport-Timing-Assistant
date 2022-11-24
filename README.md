# Transport-Timing-Assistant

This app provides decision support on when to leave your home, so that you can board your public transport with minimal waiting.

## Setup

- Navigate to node_modules/react-native/react-native.config.js
- Add the following:

```
module.exports = {
  ...,
  dependencies: {
    ...,
    "react-native-sqlite-storage": {
      platforms: {
        android: {
          sourceDir:
            "../node_modules/react-native-sqlite-storage/platforms/android-native",
          packageImportPath: "import io.liteglue.SQLitePluginPackage;",
          packageInstance: "new SQLitePluginPackage()"
        }
      }
    }
    ...
  }
  ...
};
```
