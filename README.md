# classtweak

A small JS library for CSS class manipulation library designed to work in conjuction with the new HTML5 [Selectors API](http://www.w3.org/TR/selectors-api/) so you can tweak multiple elements and multiple classes all at once.

## Example Usage

Using classtweak is designed to be simple and flexible.

### Operating on a DOM element

The simplest case for using classtweak is having a reference to a DOM element and then calling `classtweak` with class modifiers:

```js
var el = document.getElementById('test');

// add the bounce class
classtweak(el, '+bounce');

// remove the bounce class
classtweak(el, '-bounce');

// toggle the bounce class
classtweak(el, '!bounce');

// add the bounce class and toggle the slide class
classtweak(el, '+bounce !slide');
```

__NOTE:__ It is also possible to tweak multiple objects at once by passing through an array of elements rather than a single element.

### Using a Tweaker Function

As an additional helper, calling the `classtweak` function returns a function that can be used to tweak classes on the elements that were initially passed through:

```js
var tweaker = classtweak(document.getElementById('test'));

// add the bounce class
tweaker('+bounce');

// remove the bounce class
tweaker('-bounce');

// toggle the bounce class
tweaker('!bounce');

// add the bounce class and toggle the slide class
tweaker('+bounce !slide');

### Using the Query Selector API

While the cases above show how to interact with DOM elements directly, with the [Selectors API](http://www.w3.org/TR/selectors-api/) maturing support for working with selectors has been integrated also:

```js
// add the bounce class to all sections on the page
classtweak('section', '+bounce');
```

