# classtweak

A JS micro library for CSS class manipulation. classtweak works in conjuction with the new HTML5 [Selectors API](http://www.w3.org/TR/selectors-api/) enabling you to tweak multiple elements and classes at once.

## Usage Examples

The classtweak library is designed to be simple to use and flexible.

### Operating on a DOM element

The simplest case is calling `classtweak` on a dom reference, with class modifiers:

```js
var el = document.getElementById('test');

// add class 'bounce'
classtweak(el, '+bounce');

// remove class 'bounce'
classtweak(el, '-bounce');

// toggle class 'bounce
classtweak(el, '!bounce');

// add class 'bounce' and toggle class 'slide'
classtweak(el, '+bounce !slide');
```

__NOTE:__ It is also possible to tweak multiple objects at once by passing an array of elements.

### Using a Tweaker Function

As an additional helper, `classtweak` can return a function for tweaking the dom elements supplied in the original call:

```js
var tweaker = classtweak(document.getElementById('test'));

// add class 'bounce'
tweaker('+bounce');

// remove class 'bounce'
tweaker('-bounce');

// toggle class 'bounce'
tweaker('!bounce');

// add class 'bounce' and toggle the class 'slide'
tweaker('+bounce !slide');
```

### Using the Query Selector API

You can also work with selectors as per the maturing [Selectors API](http://www.w3.org/TR/selectors-api/):

```js
// add the class 'bounce' to all sections on the page
classtweak('section', '+bounce');
```

By default, this is scoped at the `document` level but can this can be overriden by supplying a third parameter for the HTML element that's subtree will be searched:

```js
var testNode = document.getElementById('test');

// add the class 'bounce' to any sections that are children of the test node
classtweak('section', '+bounce', testNode);
```

## Alternative Modification Syntax

As an option, I've also added an alternative modification syntax based on some feedback I received:

```js
var el = document.getElementById('test');

// add class 'bounce'
classtweak(el, '.bounce');

// remove class 'bounce'
classtweak(el, 'bounce.');

// toggle class 'bounce
classtweak(el, '.bounce.');

// add class 'bounce' and toggle class 'slide'
classtweak(el, '.bounce .slide.');
```

## Chaining

I've also added chaining to classtweak so you can be really, really terse.  The behaviour of chaining is sensitive to the context of the `classtweak` call though so be aware of that.

If you want to tweak classes on a number of different elements with different class modifications you would call classtweak like:

```js
classtweak
	('section', '-active')
	('section[data-route="/"]', '+active');
```

Alternatively if you have created a tweaker on a set of target elements, you can chain those calls too:

```js
classtweak('section')('+slide')('+bounce');
```

In reality, though, this probably has limited value as you can achieve the same by simply passing through a space delimited string of all the class tweaks:

```js
classtweak('section')('+slide +bounce');
```