This is a demonstration of using Ace editor through React Kotlin App,
and add a custom Ace mode to support a new language defined in EBNF grammar,
the custom mode support syntax highlighting and real-time grammar validation through ANTLR4-generated lexer and parser.

This project was bootstrapped with [Create React Kotlin App](https://github.com/JetBrains/create-react-kotlin-app).

The ANTLR4 integration is based on
[this doc](https://github.com/antlr/antlr4/blob/master/doc/ace-javascript-target.md) from ANTLR project.
The integration with generated lexer rely on a 3rd party Ace module
[antlr4-ace-ext](https://github.com/maiermic/antlr4-ace-ext),
my implementation referenced their
[official demo](https://github.com/maiermic/antlr4-javascript-examples/tree/master/browser-example),
`require.js` and `index.html` head also comes from there.

I need to import other JS code in my custom worker, but looks like Ace `1.2.6` is the last version in npm that supports
importing other scripts from a relative path.
In newer versions, only http URLs work, but that's hard to use with the `require.js` used in this project.
Maybe bundle all worker code together using Webpack will help, but I'm fine with an older Ace.

There is a [react-ace](https://github.com/securingsincity/react-ace) project which is easier to import than vanilla `Ace`,
but they use [brace](https://github.com/thlorenz/brace) which do not support using un-bundled worker code just like
newer versioned Ace.

Below are the original bootstrapped README about `Create React Kotlin App`:

---


We're still working on this guide and you can find its most recent version [here](https://github.com/JetBrains/create-react-kotlin-app/blob/master/packages/react-scripts/template/README.md).

## Sending Feedback

We are always open to [your feedback](https://youtrack.jetbrains.com/issues/CRKA).

## Folder Structure

After creation, your project should look like this:

```
my-app/
  README.md
  node_modules/
  package.json
  .gitignore
  public/
    favicon.ico
    index.html
    manifest.json
  src/
    app/
      App.css
      App.kt
    index/
      index.css
      index.kt
    logo/
      kotlin.svg
      Logo.css
      Logo.kt
      react.svg
    ticker/
      Ticker.kt
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any Kotlin and CSS files inside `src`**, or Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>
Read instructions below for using assets from JavaScript and HTML.

You can, however, create more top-level directories.<br>
They will not be included in the production build so you can use them for things like documentation.

## Available Scripts

Once the installation is done, you can run some commands inside the project folder:

### `npm start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload automatically when you make edits.<br>
You will see build errors and lint warnings in the console.

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
It ensures that React is bundled in production mode and the build is optimized for best performance.

The build is minified and the filenames include hashes for cache management. Your app is ready to be deployed.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Running `npm run eject` copies all configuration files and transitive dependencies (webpack, Kotlin Compiler, etc) right into your project so you have full control over them. Commands like `npm start` and `npm run build` will still work, but they will point to the copied scripts so you can tweak them. At this point, you’re on your own.

## Debugging the App

You can debug the running app right in IntelliJ IDEA Ultimate using its built-in JavaScript debugger. The IDE will run a new instance of Chrome and attach a debugger to it.

Start your app by running `npm start`. Put the breakpoints in your Kotlin code.
Then select `Debug in Chrome` from the list of run/debug configurations on the top-right and click the green debug icon or press `^D` on macOS or `F9` on Windows and Linux to start debugging.

Currently, debugging is supported only in IntelliJ IDEA Ultimate 2017.3.

You can also debug your application using the developer tools in your browser.

