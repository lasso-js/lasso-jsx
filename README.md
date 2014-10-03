optimizer-jsx
==============

This Node.js module is a plugin for the [RaptorJS Optimizer](https://github.com/raptorjs/optimizer), that provides support to precompile [Facebook React](http://facebook.github.io/react/) JSX files with the `.jsx` extension into JavaScript.

## Install

```sh
$ npm install --save optimizer-jsx
```


## Usage

In your dependencies list in `optimizer.json`, just go ahead and all your source .jsx files
```js
[
    "main.jsx",
    "components/toolbar.jsx",
    ...
]
```
And add `optimizer-jsx` as the required plugin in `optimizer-config.json`

```js
{
	"plugins": [
	    "optimizer-jsx"
	    ...
	],
	...
}
```

The JSX directive `/** @jsx React.DOM */` is automatically prepended to `.jsx` files if missing.
