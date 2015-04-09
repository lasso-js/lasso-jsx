lasso-jsx
==============

This Node.js module is a plugin for the [Lasso.js](https://github.com/raptorjs/lasso), that provides support to precompile [Facebook React](http://facebook.github.io/react/) JSX files with the `.jsx` extension into JavaScript.

## Install

```sh
$ npm install --save lasso-jsx
```


## Usage

In your dependencies list in `browser.json`, just go ahead and all your source .jsx files
```js
[
    "main.jsx",
    "components/toolbar.jsx",
    ...
]
```
And add `lasso-jsx` as the required plugin in `lasso-config.json`

```js
{
	"plugins": [
	    "lasso-jsx"
	    ...
	],
	...
}
```

The JSX directive `/** @jsx React.DOM */` is automatically prepended to `.jsx` files if missing.
