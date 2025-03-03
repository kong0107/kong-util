# kong-util

Here are some codes I usually use.
Some runs in any environment that supports JavaScript (ES6 and later);
but some is usable only in browsers.

See also [demo](https://kong0107.github.io/kong-util/demo.html), [documentation](https://kong0107.github.io/kong-util/doc/), and [changelog](changelog.md).


## Start

### in browsers

#### traditional way

```html
<script src="https://cdn.jsdelivr.net/npm/kong-util/dist/all.js"></script>
<script>
    // ... other codes
</script>
```


#### module way

```html
<script type="module">
    import kongUtil from "https://cdn.jsdelivr.net/npm/kong-util/mod/all.mjs";
    // ... other codes
</script>
```


### in Node.js

#### install
```bash
npm install --save kong-util
```


#### use
```js
// ES module
import kongUtil from "kong-util";

// both in ES module and CommonJS
import("kong-util").then(kongUtil => {
    // codes here
});
```


## Usage


### basic

```js
kongUtil.wait(100).then(() => console.log("xxx"));
```
The above code would call `console.log` after 100 microseconds without blocking codes after it.

You can also call `kongUtil.use`, which makes methods global to call.

```js
kongUtil.use('wait'); // make `wait` a global function
wait(100).then(() => console.log("xxx")); // same as above
```

To globalize more than two methods, either the following ways work:
```js
kongUtil.use('wait', 'waitFor');
kongUtil.use(['wait', 'waitFor']);
```

Or, simply `kongUtil.use()` (without any argument) would lead all its methods global to use.

```javascript
kongUtil.use();
wait(100).then(() => console.log("xxx"));
$("body").append("some text"); // `$` works as `document.querySelector` if assigned one string.
```

**Warning**: Some function names may conflict with other library, such as `$` in jQuery.


### categories

Functions are categorized into different files.
You can also use only one category without importing others.

```html
<script src="https://cdn.jsdelivr.net/npm/kong-util/dist/async.js"></script>
<script>
    kongUtilAsync.wait(100).then(() => console.log("xxx"));

    // Also, `use` method makes one, some, or all methods global.
    kongUtilAsync.use('wait', 'waitFor');
    wait(200).then(() => console.log("yyy"));
</script>
```

### extend native classes

Assume we have an array `arr = [1, 2, 3, 4, 5];`

If you wanna randomize the order of the array in place, `kongUtilArray.shuffle(arr)` would work.

However, what about we use the function as a method of `Array` class?
Here it goes:

```js
Array.prototype.shuffle = kongUtilArray.shuffle; // or `kongUtil.shuffle`

arr.shuffle();
```

Or, call `extendArrayPrototype` to extend more functions.
```js
kongUtilArray.extendArrayPrototype();

arr.shuffle();
```

**Warning**: This may cause problems if some day JavaScript has native `shuffle` method in `Array` class.


## functions you may be interested in

For all functions, see [documentation](https://kong0107.github.io/kong-util/doc/).


### utilArray

Go sequentially through the elements one by one:

```js
// old way
await fetch(url1);
await fetch(url2);

// new way
await kongUtil.mapAsync(fetch, [url1, url2]);

// after prototype extended
await [url1, url2].mapAsync(fetch);
```


### utilAsync

Add time limit to an async function:

```js
waitFor(fetch(url3), 1000)
.then(
    resp => console.log("success"),
    err => console.error('timeout or error')
);

// another way
const fetchAutoReject = addTimeLimit(fetch, 1000);
fetchAutoReject(url3)
.then(
    resp => console.log("success"),
    err => console.error('timeout or error')
);
```


### utilDom

```js
// creates an HTMLElement by a string
parseHTML("<EM>hi!</em>");

// creates an HTMLElement by JsonML
createElementFromJsonML(
    ["ul",
        ["li", "first"],
        ["li",
            ["em", "second"]
        ]
    ]
);

// sets attributes of an Element
setAttributes('#my-button', {
    type: "button",
    style: "border: 1px solid red",
    onclick: () => console.log("zzz")
});

setText('h1', 'new text here');

// after prototype extended
$('#my-button').set({
    type: "button",
    style: "border: 1px solid red",
    onclick: () => console.log("zzz")
});

$('h1').setText('new text here');
```


### utilEvent

```js
function foo1() {console.log('aaa');}

listen('#my-button', 'click', foo1);
unlisten('#my-button', 'click', foo1);

listenMulti('button', 'click', foo1); // applies to all <button>s

// after prototype extended
$('#my-button').listen('click', foo1); // alias to `addEventListener`
$('#my-button').unlisten('click', foo1); // alias to `removeEventListener`
```


### utilImage
```js
// resize the chosen file and then show it
resizeImage(
    $('[type=file]').files[0],
    {scale: .5, returnType: 'dataURL'}
)
.then(url => {
    $('img').src = url;
});
```


### utilObject

Sometimes you may want to treat objects as arrays:

```js
// returns [4, 9]
emulateArray("map", x => x*x, {a: 2, b: 3});

// returns {a: 4, b: 9}
objectMap(x => x*x, {a: 2, b: 3});
```


### utilString

* camelize
* kebabize
* parseChineseNumber
* compareVersionNumbers
* toCSV
* parseCSV
* base64ToBlob
* dateFormat: simulates PHP's `DateTime::format`


### utilWeb

```js
const params = {x: 3, y: 4};

// old way
fetch(url4, {method: 'POST', body: new URLSearchParams(params)})
.then(res => {
    if (response.ok) return response;
    throw new ReferenceError(response.statusText);
})
.then(res => res.json())
.then(obj => { /* ... */ });

// new way
fetchJSON(url4, {method: 'POST', body: params})
.then(obj => { /* ... */ });
```
