# scss-container-queries

Container queries made with scss mixins and just a little bit of javascript. See online demo here: https://scss-container-queries-demo.netlify.app/

## Install

```
npm i scss-container-queries
```

## Usage

First import `containerWidthEncoder` to your project.

```
import { containerWidthEncoder } from "scss-container-queries";
```

Create the encoder instance and pass in the selector string for elements you want container queries to work. By default the selector is `[data-qc]`.

Then start listening to width changes.

```
const encoder = containerWidthEncoder("[data-cq]");

encoder.start();
```

Set the proper data attribute to elements you want to listen.

```
<div data-cq>...</div>
```

Import `_container-queries.scss` mixins to your sass project. If the tilde path doesn't work use hard path like `../../` to find the module.

```
@import "~/node_modules/scss-container-queries/container-queries";
```

Now you have `containerMinWidth()` and `containerMaxWidth()` in your disposal and you can start using container queries in you sass.

Like so:

```
@include containerMinWidth(0, 7, 0, 0) {
    background-color: black;
}
```

Once the container's width is above 700px the styles are active just like with regular media queries.

You can stop the encoder by calling stop()

```
encoder.stop();
```

## How it works

1. The javascript module listens to width changes and write the width of the container to it's data-attributes constantly. It doesn't care about css or break points.
2. The sass mixin takes care of css selectors that understand and reads the width written to the element's data-attributes.

Let's say the container's width is 231px. The `containerWidthEncoder` will encode it's width to the container as so:

```
<div data-cq-tho="0" data-cq-hun="0-1-2" data-cq-ten="0-1-2-3" data-cq-one="0-1">...</div>
```

We encode how many thousands, hundreds, tens and ones are in the width.

And when you use the sass mixin the css becomes like so:

```
@include containerMinWidth(0, 2, 5, 0) {
    background-color: black;
}

...becomes...

[data-cq-tho*="1"][data-cq-one],
[data-cq-tho$="0"][data-cq-hun*="3"][data-cq-one],
[data-cq-tho$="0"][data-cq-hun$="2"][data-cq-ten*="6"][data-cq-one],
[data-cq-tho$="0"][data-cq-hun$="2"][data-cq-ten$="5"][data-cq-one*="0"] {
  background-color: black;
}

```

We use css attribute selectors in a fancy way to check if our width is a match.

## Why?

There are many solutions to accomplish container queries with javascript while we wait for proper css solution. What's unique in this library is that with most other libraries you need to some how tell javascript the break points you are using in your styles which makes maintainability hard. You can't just write your container queries in your styles.

With this solution there is seperation of concern between your javascript and css. You can just use container queries in your styles and javascript is only responsible for updating the width of the container constantly.

## Caviats

Because the way we use css you might encounter problems with specificity as every time you use container queries the style's specificity are at minimum 4 levels deep.

Tip for countering this is to increase specificity on your other styles with repeating your class name 5 times: `.myClass.myClass.myClass.myClass.myClass`
