# Top 50 JavaScript interview questions

# ` Core JavaScript (Basics to Intermediate) `

## <span style="color:#FFA500"> 1. What are the differences between var, let, and const? </span>

In JavaScript, var, let, and const are three ways to declare variables. They differ in scope, hoisting behavior, and whether their values can change or be re-declared.

### Scope
var → function-scoped or globally-scoped
Accessible throughout the function or globally if declared outside any function.

let and const → block-scoped
Confined to the nearest pair of curly braces ({}), such as in loops or conditional blocks

```js
function example() {
  if (true) {
    var x = 10;
    let y = 20;
  }
  console.log(x); // 10
  console.log(y); // ReferenceError: y is not defined
}
example();
```

### Re-declaration and Re-assignment

```js
var a = 5;  // Can be redeclared
var a = 10; // Works

let b = 5;  // Can be reassigned but not redeclared
b = 10;     // Works
// let b = 20; // Error

const c = 5;    // Cannot be reassigned or redeclared.
// c = 10; // Error 
```

### Hoisting

- var is hoisted to the top of its scope and initialized as undefined.

- let and const are hoisted too but placed in the temporal dead zone (TDZ) until actual initialization, which prevents accessing them before declaration.

```JS
console.log(a); // undefined
var a = 10;

console.log(b); // ReferenceError
let b = 20;
```

### When to Use Each
- Use let when a variable value will change later.

- Use const for fixed values or immutable references.

- Avoid var in modern JavaScript because it can cause unpredictable scoping bugs.

## <span style="color:#FFA500"> 2. What is hoisting? </span>

Hoisting in JavaScript is the behavior where variable and function declarations are moved to the top of their scope (either global or function scope) before the code is executed. This means you can use some variables or functions before they are declared in the actual code.

### How Hoisting Works

- Function declarations are fully hoisted, so you can call them before they appear in the code:
```js
sayHello(); // Works!
function sayHello() {
  console.log("Hello");
}
```
### Hoisting Key Points
- Only declarations are hoisted, not initializations.​

- var is hoisted and set to undefined.

- let and const are hoisted, but not initialized (using them early throws an error).

- Function declarations are fully hoisted. Function expressions (assigned to variables) obey variable hoisting rules.

## <span style="color:#FFA500"> 3. What is scope? </span>

In JavaScript, scope refers to the current context that determines where variables, functions, and objects are accessible within the code. It defines the visibility and lifetime of variables — that is, where you can use them and where they are not available.

1. Global Scope

    - Variables declared outside of any function or block are in the global scope.

    - They can be accessed from anywhere in the program.

```js
let globalVar = "I'm global";

function show() {
  console.log(globalVar); // Accessible
}
show();
console.log(globalVar); // Accessible here too
```

2. Function (Local) Scope

    - Variables declared inside a function are local to that function.

    - They cannot be accessed outside of it.

```js
function greet() {
  let message = "Hello";
  console.log(message); // Works
}
greet();
console.log(message); // Error: message is not defined
```

3. Block Scope

    - Variables declared inside {} (for example, in if, for, or while blocks) using let or const are block-scoped.

    - They exist only within that specific block.

```js
if (true) {
  let name = "Alex";
  console.log(name); // Works
}
console.log(name); // Error: name is not defined
```


## <span style="color:#FFA500"> 4. What are primitive and non-primitive data types?  </span>

### Primitive Data Types
Primitive types are the basic building blocks of data in JavaScript.
They store simple values and are immutable—which means they cannot be changed directly.

Primitive: string, number, boolean, null, undefined, bigint, symbol.

### Non-Primitive Data Type
Non-primitive data types hold collections or references to memory instead of a single value.

Non-primitive: objects, arrays, functions, Date, map.

## <span style="color:#FFA500"> 5. Difference between == and ===? </span>

1. == (Loose Equality)
    - Compares values only.

    - Converts (coerces) the operands into the same data type before comparison.

    - This can lead to unexpected results because of automatic type conversion.

```js
console.log(5 == "5");       // true  → "5" is converted to number 5
console.log(true == 1);      // true  → true is converted to 1
console.log(null == undefined); // true  → both are loosely equal
console.log(0 == false);     // true  → false is converted to 0
```

2. === (Strict Equality)
    - Compares both value and type.

    - Does not perform any type conversion.

    - Returns true only if both operands have the same data type and value.

```js
console.log(5 === "5");      // false → number vs string
console.log(true === 1);     // false → boolean vs number
console.log(null === undefined); // false → different types
console.log(0 === false);    // false → different types
console.log(5 === 5);        // true  → same type and value
```


## <span style="color:#FFA500"> 6. What are truthy and falsy values? </span>

In JavaScript, every value is either truthy or falsy when evaluated in a Boolean context (like an if statement or logical operation). This means JavaScript automatically converts values to true or false when needed.

### Falsy Values
A falsy value is treated as false when evaluated in a Boolean context.
There are only 7 falsy values in JavaScript:

```
Falsy Value  |  Description                   
-------------+--------------------------------
false        |  The boolean false itself      
0            |  The number zero               
-0           |  Negative zero                 
0n           |  BigInt zero                   
""/''/ ````  |  Empty string                  
null         |  Represents “no value”         
undefined    |  Uninitialized or missing value
NaN          |  Not-a-Number value            
```
### Example

```js
if (0) console.log("Falsy");    // Not executed
if ("") console.log("Falsy");   // Not executed
if (undefined) console.log("Falsy"); // Not executed
```

### Truthy Values
A truthy value is any value not falsy.
These values are treated as true when evaluated in a Boolean context.

### Examples of truthy values:

- Non-zero numbers: 42, -5, 3.14

- Non-empty strings: "hello", "0", "false"

- Objects and arrays: {}, []

- Functions: function() {}

- Dates: new Date()

- BigInt other than zero: 123n

- The boolean true

Example:

```js
if (42) console.log("Truthy");       // Executed
if ("hello") console.log("Truthy");  // Executed
if ([]) console.log("Truthy");       // Executed
```

## <span style="color:#FFA500"> 7. Explain closures. </span>

A closure is a function that remembers and still has access to variables from its outer (parent) function's scope, even after that outer function has finished executing. This means the inner function "closes over" its surrounding state (called the lexical environment) and retains access to those variables.

### Why Are Closures Useful?
- They allow private variables by hiding variables inside a function scope.

- They enable data encapsulation and state persistence between function calls.

- They power many JavaScript patterns, such as function factories, callbacks with preserved data, and module patterns.

### Simple Closure Example

```js
function outer() {
  let counter = 0;                  // Outer function's local variable

  function inner() {                // Inner function forms a closure
    counter++;                     // Access & modify outer variable
    console.log(counter);
  }

  return inner;                    // Return inner function
}

const myCounter = outer();          // outer() runs, returns inner
myCounter();                       // Logs: 1
myCounter();                       // Logs: 2
```

- Here, inner remembers counter from outer's scope, even though outer has finished.

- Calling myCounter() keeps incrementing the same counter variable.

### Key Points
- Closures rely on lexical scoping: the function's scope depends on where it was declared, not where it is called.

- Functions retain access to the variables in the scope they were created in.



## <span style="color:#FFA500"> 8. What is an IIFE? </span>

An IIFE (Immediately Invoked Function Expression) in JavaScript is a function that is defined and executed immediately after its creation. It’s sometimes called a self-executing anonymous function. The main purpose of an IIFE is to create a new local scope and avoid polluting the global namespace with variables.​

### Structure of an IIFE
An IIFE usually looks like this:

```js
(function() {
  // Code inside IIFE runs immediately
  var message = "Hello from IIFE";
  console.log(message);
})();

// Arrow function IIFE
(() => {
  console.log("Arrow function IIFE");
})();

// IIFE Example with return value
const result = (function() {
  let x = 10;
  let y = 20;
  return x + y;
})();

console.log(result); // 30

// Async IIFE
(async () => {
  const data = await fetch("https://api.example.com");
  console.log(data);
})();



```

- The function is wrapped inside parentheses (function(){ ... }) to treat it as a function expression.

- The last parentheses () immediately invoke (call) the function.

### Why Use IIFE?
Avoid global variable pollution: Variables inside IIFE cannot be accessed outside, preventing naming conflicts.

Create private scope: Useful for encapsulating code and controlling variable visibility.

Run code immediately: Useful for initialization or setup tasks that should run once.

Support async code: Can be used with async/await inside an IIFE.

## <span style="color:#FFA500"> 9. Difference between undefined, null, and NaN? </span>

In JavaScript, undefined, null, and NaN are special values representing different types of "non-values" or "missing values," but they have distinct meanings and usage contexts.

1. undefined
    - Represents a variable that has been declared but not assigned a value.

    - Also the default return value of functions that don’t explicitly return anything.

    - Indicates absence of initialization.

    - Type: undefined

```js
let x;
console.log(x); // undefined
function greet() {}
console.log(greet()); // undefined
```

2. null
    - Represents an intentional absence of any object value.

    - Used when you want to explicitly indicate “no value” or “empty”.

    - It is a value you assign deliberately.

    - Type: object (historical JavaScript quirk)

```js

let y = null;
console.log(y); // null
```

3. NaN (Not-a-Number)
    - Represents a special numeric value indicating an invalid or unrepresentable number.

    - Usually occurs from invalid mathematical operations like 0/0 or parsing non-numeric strings.

    - Type: number

    - Unique characteristic: NaN is not equal to itself (NaN !== NaN).
  
```js
console.log(0 / 0); // NaN
console.log(Number("hello")); // NaN
console.log(NaN === NaN); // false
```

## <span style="color:#FFA500"> 10. What is event bubbling and capturing? </span>

Event bubbling and capturing are two ways an event travels (propagates) through the DOM when triggered.

### Event Capturing
The event moves from the top (root) of the DOM down to the target element.

```js

document.getElementById("outer").addEventListener("click", () => {
  console.log("Outer - capturing");
}, true);

document.getElementById("inner").addEventListener("click", () => {
  console.log("Inner - capturing");
}, true);

```

If you click the inner element, the event fires outer → inner (top to target).​

### Event Bubbling
The event moves from the target element up to the root.

```js

document.getElementById("outer").addEventListener("click", () => {
  console.log("Outer - bubbling");
});

document.getElementById("inner").addEventListener("click", () => {
  console.log("Inner - bubbling");
});


```

If you click the inner element, the event fires inner → outer (target to top).

To stop event propagation in both capturing and bubbling phases, you use the method event.stopPropagation() inside your event handler. This method immediately stops further propagation of the event through the DOM, whether the event is moving downwards in the capturing phase or upwards in the bubbling phase.

### Example
```javascript
document.getElementById('outer').addEventListener('click', (event) => {
  console.log('Outer clicked');
}, true); // capturing phase

document.getElementById('inner').addEventListener('click', (event) => {
  event.stopPropagation();  // Stops propagation in both phases
  console.log('Inner clicked');
});
```

# Functions and Objects

## <span style="color:#FFA500"> 11. What are higher-order functions? </span>

Higher-order functions are functions that either take other functions as arguments, return functions, or both. They allow you to write more flexible and reusable code by treating functions as first-class citizens.

### Simple Examples

```js

// Passing a function as an argument:
function greet(name, callback) {
  console.log("Hello, " + name);
  callback();
}
function sayGoodbye() {
  console.log("Goodbye!");
}
greet("Ajay", sayGoodbye);


// Returning a function:

function multiplier(factor) {
  return function(num) {
    return num * factor;
  };
}
const mul2 = multiplier(2);
console.log(mul2(5)); // 10

```

### Built-in Examples
Common JavaScript array methods like map(), filter(), and reduce() are higher-order functions because they accept callbacks to process array elements.

## <span style="color:#FFA500"> 12. What are callback functions? </span>

A callback function is a function passed as an argument to another function, which is then executed inside that outer function to complete some task. It's a way to ensure that a function runs only after a certain operation finishes, enabling asynchronous programming in JavaScript.

```js

function greet(name, callback) {
  console.log("Hello, " + name);
  callback();
}
function sayGoodbye() {
  console.log("Goodbye!");
}
greet("Ajay", sayGoodbye);

```

### Why Use Callbacks?
They help manage tasks like waiting for data, user interaction, or timers without blocking the whole program. Callbacks can be synchronous (run immediately) or asynchronous (run later, e.g., after data loads or timers).​

### Built-in Examples:
- setTimeout() uses a callback to run code after delay.

- Event listeners accept callbacks to respond to user events.

## <span style="color:#FFA500"> 13. Difference between call, apply, and bind? </span>

The difference between call, apply, and bind in JavaScript lies mainly in how they handle the this context and function invocation:

call()
- Calls a function immediately.

- Sets this to a specified object.

- Accepts arguments one by one.

```javascript

func.call(thisArg, arg1, arg2);
```

apply()
- Calls a function immediately.

- Sets this to a specified object.

- Accepts arguments as an array.

```javascript
func.apply(thisArg, [arg1, arg2]);
```

bind()
- Returns a new function with this bound to the specified object.

- Does NOT call the function immediately.

- Can partially apply arguments (passed one by one).

```javascript
const boundFunc = func.bind(thisArg, arg1, arg2);
boundFunc();
```

call and apply are identical except how they take arguments, while bind is useful when you want to set context and call the function later.

```js

function greet(greeting, punctuation) {
  console.log(greeting + ' ' + this.name + punctuation);
}

const person = { name: 'Ajay' };

greet.call(person, 'Hello', '!');           // Hello Ajay!
greet.apply(person, ['Hi', '!!']);          // Hi Ajay!!
const greetBound = greet.bind(person, 'Hey');
greetBound('?');                            // Hey Ajay?

```


## <span style="color:#FFA500"> 14. Purpose of this keyword? </span>

The this keyword in JavaScript refers to the object that is currently executing the code or calling a function. It provides a dynamic reference to access properties and methods of that object, allowing more reusable and flexible code.

### Key Points:
- In object methods, this refers to the object itself.

- In a regular function, this refers to the global object (e.g., window in browsers) or undefined in strict mode.

- When used alone, this refers to the global scope.

- In event handlers, this refers to the element that received the event.

- Arrow functions do not have their own this; they inherit it from the parent scope.

### Example:
```javascript
const person = {
  name: 'Ajay',
  greet() {
    console.log('Hello, ' + this.name);
  }
};
person.greet(); // Hello, Ajay
```

Here, this.name accesses the name property of person because this points to the person object.

### Purpose:
this makes JavaScript functions context-aware by linking them to the object that called them, enabling methods to access and manipulate their own data dynamically. It also helps when reusing functions or controlling context with call, apply, and bind.​


## <span style="color:#FFA500"> 15. Difference between arrow and regular functions? </span>

Arrow functions and regular functions differ in several key ways:

1. Syntax
    - Regular functions use the function keyword.

    - Arrow functions have a shorter syntax with => and can omit braces and return for single-expression bodies.

2. this Binding
    - Regular functions have their own this which depends on how the function is called.

    - Arrow functions do not have their own this; they inherit it lexically from their surrounding scope.

3. arguments Object
    - Regular functions have an arguments object containing all passed parameters.

    - Arrow functions do not have their own arguments; to access arguments, they rely on rest parameters (...args).

4. Constructor Usage
    - Regular functions can be used as constructors with new.

    - Arrow functions cannot be used as constructors and will throw errors if called with new.

5. Use Cases
    - Arrow functions are ideal for short functions and when you want to maintain the surrounding this (e.g., in callbacks).

    - Regular functions are better when dynamic this or constructors are needed.

```js

function regularFunc() {
  console.log(this);
}

const arrowFunc = () => {
  console.log(this);
};

const obj = {
  regularFunc,
  arrowFunc
};

obj.regularFunc(); // this refers to obj
obj.arrowFunc();   // this refers to outer scope, not obj

```


## <span style="color:#FFA500"> 16. What are constructor functions? </span>

A constructor function in JavaScript is a special type of function used to create and initialize objects. When called with the new keyword, it constructs a new object, assigns properties and methods to it, and returns that object.

Purpose
- To create multiple objects with similar properties and methods efficiently.

- To avoid repetitive code when creating objects.

How it works
- You define a function, typically starting with a capital letter (e.g., Person()).

- Inside this function, this refers to the new object being created.

- You assign properties to this, which become properties of the object.

- When called using new, the function creates an object, initializes it, and returns it automatically.

```js

function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person1 = new Person('Ajay', 25);
console.log(person1.name); // Ajay
console.log(person1.age);  // 25

const person2 = new Person('Yogesh', 24);

```

## <span style="color:#FFA500"> 17. What is prototypal inheritance? </span>

Prototypal inheritance in JavaScript is a mechanism where objects inherit properties and methods from other objects, known as prototypes. Each object has an internal link to another object called its prototype. When you try to access a property or method on an object, JavaScript first looks for it on the object itself; if it's not found, it follows the prototype chain up to its prototype, and so on, until it reaches null.

How It Works
- Every object has a hidden [[Prototype]] link (accessed via __proto__ or Object.getPrototypeOf()).

- If a property is missing in an object, JavaScript looks up its prototype chain to find it.

- This chain can be multiple levels deep.


```js

const parent = {
  greet() {
    console.log("Hello from the parent!");
  }
};

const child = Object.create(parent);
child.sayHi = function() {
  console.log("Hi from the child!");
};

child.greet();   // "Hello from the parent!" (inherited)
child.sayHi();   // "Hi from the child!" (own method)

```

## <span style="color:#FFA500"> 18. How does the prototype chain work? </span>

The prototype chain is a core JavaScript mechanism that enables objects to inherit properties and methods from other objects.

Key points:
- Every JavaScript object has an internal link, called its prototype, which points to another object.

- When accessing a property or method, JavaScript first looks on the object itself.

- If the property/method isn't found, the search moves up the prototype chain to the object's prototype.

- This continues until the property is found or the chain ends at null (no prototype).

- This mechanism allows objects to reuse shared behavior without duplication.

```js

const parent = {
  greet() {
    console.log("Hello from parent!");
  }
};

const child = Object.create(parent);
child.sayHi = function() {
  console.log("Hi from child!");
};

child.greet();  // Inherited from parent
child.sayHi();  // Own method
```

Here, child inherits the greet method through the prototype link to parent.

### Built-in prototype chain
For example, arrays inherit from Array.prototype, which inherits from Object.prototype, then null.

```js
const arr = [1, 2, 3];
arr.toString();  // Uses toString from Object.prototype
```

## <span style="color:#FFA500"> 19. What are getters and setters? </span>

Getters and setters are special methods in JavaScript used to control access to an object’s properties. They allow you to run code when a property is read (getter) or written (setter), enabling encapsulation and computed properties.

Getters
- Use the get keyword.

- Invoked automatically when the property is accessed.

- Can compute and return a value dynamically.

Setters
- Use the set keyword.

- Invoked automatically when a property is assigned a value.

- Can validate or modify the value before setting.

```js

const person = {
  firstName: "John",
  lastName: "Doe",
  
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(" ");
  }
};

console.log(person.fullName);  // John Doe
person.fullName = "Jane Smith";
console.log(person.firstName); // Jane
```



## <span style="color:#FFA500"> 20. What are pure functions? </span>

Pure functions in JavaScript are functions that always produce the same output given the same input and have no side effects. This means the function’s return value depends solely on its arguments, without modifying any external state or relying on outside data.

### Characteristics:
- Deterministic: For the same input, output is always consistent.

- No side effects: They don’t change variables or states outside their scope, don’t make HTTP calls, mutate data, or interact with the DOM.

### Example:

```javascript
function add(a, b) {
  return a + b; // Always returns same result for same inputs
}
Versus an impure function that affects external state:

javascript
let count = 0;
function increment() {
  count++; // Modifies external variable: side effect
}
```

### Benefits:
- Easier to test and debug.

- Better for functional programming and predictable code behavior.

- Enable optimizations like memoization for performance.


# ES6+ Features

## <span style="color:#FFA500"> 21. What are template literals? </span>

Template literals in JavaScript are string literals enclosed by backticks (`) instead of single or double quotes. They allow for easier string creation by supporting multi-line strings, embedded expressions, and string interpolation using ${expression} syntax.

Key features:
- String interpolation: Embed variables or expressions directly inside strings, e.g., `Hello, ${name}!`.

- Multi-line strings: Write strings across multiple lines without escape characters.

- Tagged templates: Use custom functions to process template literals.

### Example:
```javascript
const name = "Alice";
const age = 25;

const greeting = `Hello, ${name}. You are ${age} years old.`;
console.log(greeting); 
// Output: Hello, Alice. You are 25 years old.

const multiline = `This is line one
This is line two`;
console.log(multiline);
```

### Benefits:
- Cleaner and more readable string formatting.

- Avoids cumbersome concatenation with +.

- Supports complex expressions inside ${} directly.

## <span style="color:#FFA500"> 22. What is destructuring? </span>

Destructuring in JavaScript is a syntax that allows you to unpack values from arrays or properties from objects into separate variables more concisely. It simplifies handling complex data structures by making assignments clearer and reducing repetitive code.

### How it works with objects:

```javascript
const person = { name: "Alice", age: 25 };
const { name, age } = person; // extracts properties into variables
console.log(name);  // Alice
console.log(age);   // 25
```

### How it works with arrays:

```javascript
const colors = ["red", "green", "blue"];
const [firstColor, secondColor] = colors; // assigns array elements to variables
console.log(firstColor); // red
console.log(secondColor); // green
```

### Example of default values and renaming:

```javascript
const person = { name: "Alice" };
const { name, age = 30 } = person; // default age
console.log(age); // 30

const user = { id: 1, fullName: "John Doe" };
const { fullName: userName } = user; // renaming
console.log(userName); // John Doe
```

## <span style="color:#FFA500"> 23. Difference between spread and rest? </span>


The spread and rest operators in JavaScript use the same syntax ... but serve opposite purposes:

### Spread Operator
- Purpose: Expands elements of an iterable (array, string, or object) into individual elements.

- Usage: Used in function calls, array literals, or object literals to “spread” out values.

Example:

```javascript
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];  // arr2 is [1, 2, 3, 4, 5]
function sum(a, b, c) {
  return a + b + c;
}
sum(...arr1);  // 6
```

### Rest Operator
- Purpose: Collects multiple function arguments or remaining elements during destructuring into a single array.

- Usage: Used in function parameters or destructuring assignments to “gather” values.

Example:

```javascript
function greet(greeting, ...names) {
  console.log(greeting + ', ' + names.join(' and '));
}
greet('Hello', 'Alice', 'Bob', 'Charlie'); // Hello, Alice and Bob and Charlie
```


## <span style="color:#FFA500"> 24. What are default parameters? </span>

Default parameters in JavaScript allow you to specify default values for function parameters in case no argument or undefined is passed during the function call. This feature helps avoid errors or unexpected undefined values and makes your functions more robust and readable.


```javascript
function greet(name = 'Guest') {
  console.log(`Hello, ${name}!`);
}
greet();            // Hello, Guest!
greet('Ajay');      // Hello, Ajay!
```


## <span style="color:#FFA500"> 25. Explain modules (import/export). </span>

JavaScript modules let you organize and reuse code by splitting it into separate files, each explicitly exporting and importing functionality.

Export:
- Use export to make variables, functions, or classes available outside the module.

- Two types:

    - Named exports: Export multiple values by name.

    - Default export: Export a single value as the module’s main export.

Example of named exports (person.js):

```javascript
export const name = "Jesse";
export function greet() { console.log("Hello"); }
```

Example of default export (message.js):

```javascript
export default function message() {
  console.log("Welcome!");
}
```

Import:
- Use import to bring exported content into another file.

- For named exports, import with {} braces using the exact exported names.

- For default export, import without braces and assign any name.

Import named exports:

```javascript
import { name, greet } from "./person.js";
Import default export:
```

```javascript
import message from "./message.js";
message(); // Calls the default exported function
```

## <span style="color:#FFA500"> 26. What are Promises? </span>

A Promise in JavaScript is an object that represents the eventual completion or failure of an asynchronous operation. It helps avoid callback hell and makes async code easier to read.

A Promise can be in one of three states:

- pending → still working

- fulfilled → operation succeeded

- rejected → operation failed

```js

const fetchData = new Promise((resolve, reject) => {
  const success = true;
  if (success) resolve("Data fetched!");
  else reject("Error fetching data");
});

fetchData
  .then((res) => console.log(res))    // "Data fetched!"
  .catch((err) => console.log(err));

```


## <span style="color:#FFA500"> 27. Explain async/await. </span>

async/await is a cleaner and more readable way to handle Promises in JavaScript.

- async makes a function return a Promise.

- await pauses the function until the Promise resolves or rejects.

It helps write asynchronous code that looks synchronous.

```js

async function getData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error:", error);
  }
}

getData();

```

Here, await waits for the fetch to complete before moving to the next line — no .then() needed.

## <span style="color:#FFA500"> 28. What are generators? </span>

A generator is a special type of function in JavaScript that can be paused and resumed.
It’s defined using function* and uses the yield keyword to pause execution.

Generators return an iterator object that can be used to control execution manually.

```js

function* countNumbers() {
  yield 1;
  yield 2;
  yield 3;
}

const counter = countNumbers();

console.log(counter.next().value); // 1
console.log(counter.next().value); // 2
console.log(counter.next().value); // 3

```
Each next() call resumes the function from where it last stopped.

## <span style="color:#FFA500"> 29. What are Map, Set, WeakMap, WeakSet? </span>

These are built-in data structures in JavaScript used for storing collections of data — similar to objects and arrays but with different rules.

### Map

- Stores key-value pairs (like objects) but keys can be any type.

- Keeps insertion order.

```js
const map = new Map();
map.set('name', 'Yogesh');
map.set(1, 'Number key');
console.log(map.get('name')); // Yogesh
```

### Set

- Stores unique values only (no duplicates).

```js

const set = new Set([1, 2, 2, 3]);
console.log(set); // Set(3) {1, 2, 3}

```

### WeakMap

- Like Map, but keys must be objects.

- Keys are weakly referenced, meaning if the object is deleted elsewhere, it’s removed from the WeakMap automatically.

```js

let obj = {};
const weakMap = new WeakMap();
weakMap.set(obj, 'data');
obj = null; // key is garbage-collected

```

### WeakSet

- Like Set, but only stores objects and also uses weak references.

```js

let user = { name: 'Yogesh' };
const weakSet = new WeakSet();
weakSet.add(user);
user = null; // object removed automatically

```

Use Map/Set for general data storage, and WeakMap/WeakSet when you want automatic memory cleanup for object references.


## <span style="color:#FFA500"> 30. What are symbols? </span>

A Symbol is a unique and immutable primitive value introduced in ES6.
It’s often used as an object key to avoid property name conflicts — even if two symbols have the same description, they’re always different.

```js

const id1 = Symbol("id");
const id2 = Symbol("id");

console.log(id1 === id2); // false (each symbol is unique)

const user = {
  name: "Yogesh",
  [id1]: 123
};

console.log(user[id1]); // 123

```

Symbols are useful for creating hidden or private-like properties in objects that won’t accidentally clash with others.

# Asynchronous JavaScript

## <span style="color:#FFA500"> 31. What is the event loop? </span>

The event loop is the mechanism in JavaScript that allows it to handle asynchronous operations (like setTimeout, Promises, etc.) while still being single-threaded.

It continuously checks the call stack and the callback queue:

- If the call stack is empty,

- It takes a function from the queue and pushes it to the stack to execute.

This is how JavaScript performs non-blocking operations.

```js

console.log("Start");

setTimeout(() => console.log("Timeout"), 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("End");

OUTPUT:

Start
End
Promise
Timeout

```

The Promise callback runs before setTimeout because microtasks (Promises) have higher priority than macrotasks (timers) in the event loop.

## <span style="color:#FFA500"> 32. Difference between synchronous and asynchronous code? </span>

- Synchronous code runs line by line, where each task waits for the previous one to finish — blocking execution.

- Asynchronous code runs non-blocking, allowing other tasks to continue while waiting for an operation (like fetching data) to complete.

Example (Synchronous):
```js
console.log("1");
console.log("2");
console.log("3");
// Output: 1 2 3
```

Example (Asynchronous):
```js
console.log("1");
setTimeout(() => console.log("2"), 1000);
console.log("3");
// Output: 1 3 2
```

Asynchronous code improves performance by not stopping execution during slow tasks like API calls or file reads.


## <span style="color:#FFA500"> 33. What are microtasks and macrotasks? </span>

In JavaScript, microtasks and macrotasks are two types of tasks managed by the event loop. They define when callbacks are executed.

### Microtasks

- Come from Promises, queueMicrotask(), and MutationObservers.

- Run right after the current code and before any macrotasks.

- Have higher priority.

```js
Promise.resolve().then(() => console.log("Microtask"));
```

### Macrotasks

- Come from setTimeout, setInterval, setImmediate, I/O, and DOM events.

- Run after all microtasks in the current cycle finish.

```js
setTimeout(() => console.log("Macrotask"), 0);
```

### Example Together:

```js

console.log("Start");

setTimeout(() => console.log("Macrotask"), 0);
Promise.resolve().then(() => console.log("Microtask"));

console.log("End");

OUTPUT:

Start
End
Microtask
Macrotask
```

The microtask queue is emptied before the macrotask queue starts.

## <span style="color:#FFA500"> 34. What is callback hell? </span>

Callback hell happens when multiple asynchronous operations are nested inside each other, making the code hard to read, debug, and maintain.

It usually looks like a pyramid of nested callbacks.

```js

getUser((user) => {
  getPosts(user.id, (posts) => {
    getComments(posts[0].id, (comments) => {
      console.log(comments);
    });
  });
});

```

The code grows horizontally, becoming messy and error-prone.

### Solution:
Use Promises or async/await to flatten the structure:

```js
async function showComments() {
  const user = await getUser();
  const posts = await getPosts(user.id);
  const comments = await getComments(posts[0].id);
  console.log(comments);
}
```

## <span style="color:#FFA500"> 35. How does fetch API work? </span>

The Fetch API is a modern way to make HTTP requests in JavaScript.
It returns a Promise that resolves to a Response object, which you can convert to JSON, text, or other formats.

### Basic Steps:

- Call fetch(url) → returns a Promise.

- Use .then() or await to get the response.

- Parse the response (e.g., response.json()).

```js

// Using Promises
fetch("https://api.example.com/data")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log("Error:", err));

// Using async/await
async function getData() {
  try {
    const res = await fetch("https://api.example.com/data");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log("Error:", err);
  }
}
getData();
```

Fetch is promise-based, unlike older XMLHttpRequest, making async requests simpler and cleaner.

## <span style="color:#FFA500"> 36. Explain Promise.all, race, and allSettled. </span>

These are Promise combinators that handle multiple Promises at once.

### Promise.all

- Waits for all Promises to resolve.

- If any Promise rejects, it rejects immediately.

```js
Promise.all([
  Promise.resolve(1),
  Promise.resolve(2)
]).then(console.log); // [1, 2]
```

### Promise.race

Resolves or rejects as soon as the first Promise settles.

```js
Promise.race([
  new Promise(res => setTimeout(() => res("A"), 500)),
  new Promise(res => setTimeout(() => res("B"), 100))
]).then(console.log); // "B"
```

### Promise.allSettled

- Waits for all Promises to settle (resolve or reject).

- Returns an array with each Promise’s status and value/reason.

```js

Promise.allSettled([
  Promise.resolve(1),
  Promise.reject("Error")
]).then(console.log);
/* [
  { status: "fulfilled", value: 1 },
  { status: "rejected", reason: "Error" }
] */
```

## <span style="color:#FFA500"> 37. What is debouncing and throttling? </span>

Debouncing waits to run a function until a certain time has passed since the last event—useful for things like search input, so it only triggers once the user stops typing for a while. Throttling lets a function run at most once every set interval, good for actions like scroll or resize, so the function doesn’t overload the browser.

```js
function debounce(func, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

const debouncedSearch = debounce((query) => {
  console.log("Search for:", query);
}, 500);

document.getElementById("searchBox").addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});
```

This waits until 500ms after you stop typing before running the search.

Throttling Example

```js

function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

const throttledScroll = throttle(() => {
  console.log("Scrolled");
}, 1000);

window.addEventListener("scroll", throttledScroll);
```

Here, the function logs “Scrolled” at most once every second, no matter how often the scroll event fires.

## <span style="color:#FFA500"> 38. What is async iteration? </span>

Async iteration lets you loop over data that arrives over time (like data from a server or a stream), using the for await...of loop. It works with objects that use Symbol.asyncIterator and return Promises.

```js
const asyncIterable = {
  async *[Symbol.asyncIterator]() {
    yield "a";
    await new Promise(r => setTimeout(r, 100));
    yield "b";
  }
};

// Loop over values, waiting for each
(async () => {
  for await (const value of asyncIterable) {
    console.log(value); // prints "a", then "b"
  }
})();
```

- Use cases: reading files, processing HTTP streams, or fetching data in chunks.​

- Regular for...of waits for values right away. for await...of waits for Promises to resolve before moving to the next value



## <span style="color:#FFA500"> 39. What is Web API? </span>

A Web API (Application Programming Interface) is a set of tools and rules that lets programs communicate with web services or browser features. In JavaScript, Web APIs allow you to work with browser things like the DOM, fetch data from servers, use geolocation, or interact with hardware.

Examples:
### Browser Web API (like DOM):

```js
document.getElementById("demo").textContent = "Hello!";
```

### Fetch API:

```js
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data));
```

Some Web APIs are built into browsers (like localStorage, Geolocation, and Fetch), and some are third-party APIs (like Twitter or YouTube Web APIs).​

Web APIs make it easier to build interactive, connected, and modern web applications.

## <span style="color:#FFA500"> 40. Difference between process.nextTick() and setImmediate()? </span>

The difference between process.nextTick() and setImmediate() in Node.js lies in when they execute relative to the event loop:

- process.nextTick() schedules a callback to run immediately after the current operation completes, before the event loop continues. It runs before any I/O or timer events, allowing urgent tasks to run first. However, excessive use can starve the event loop and block I/O.​

- setImmediate() schedules a callback to run on the next iteration of the event loop, after I/O events in the current loop finish. It's useful for deferring execution until after current I/O operations without blocking.​

Example:
```js
console.log('Start');

process.nextTick(() => {
  console.log('Next Tick');
});

setImmediate(() => {
  console.log('Set Immediate');
});

console.log('End');


Output order:

text
Start
End
Next Tick
Set Immediate
```

# DOM, BOM, and Browser Concepts

## <span style="color:#FFA500"> 41. What is the DOM? </span>

The DOM (Document Object Model) is a programming interface for web documents that represents the structure of a webpage as a tree of objects or nodes. It allows JavaScript to access, modify, and interact with the content, structure, and style of a webpage dynamically.​

Each element, attribute, and text in an HTML document is a node in the DOM tree. JavaScript can manipulate these nodes to change the page on the fly—for example, adding elements, changing text, or handling user events.​

Example:

```js
const heading = document.createElement("h1");
heading.textContent = "Hello, DOM!";
document.body.appendChild(heading);
```

This creates a new heading in the page dynamically using the DOM.

In short, the DOM acts as a bridge between the static HTML document and dynamic JavaScript, enabling interactive web pages.

## <span style="color:#FFA500"> 42. How to manipulate the DOM? </span>

Manipulating the DOM means changing the webpage's structure, content, or style using JavaScript.

### Common ways to manipulate the DOM:
```js

//Select elements:
const element = document.getElementById("myId");

//Change content:
element.textContent = "New text!";

//Modify styles:
element.style.color = "blue";

//Create and add new elements:
const newDiv = document.createElement("div");
newDiv.textContent = "Hello World";
document.body.appendChild(newDiv);

//Remove elements:
element.remove();

//Add event listeners:
element.addEventListener("click", () => alert("Clicked!"));
```

Manipulating the DOM is how JavaScript makes web pages interactive and dynamic by updating the page without reloading it.

## <span style="color:#FFA500"> 43. What is event delegation? </span>

Event delegation is a technique in JavaScript where instead of adding event listeners to many child elements, you add one event listener to their common parent. The event bubbles up from the child element to the parent, and the parent handles the event by checking the event's target to see which child triggered it.​

Why use event delegation?
Saves memory and improves performance by reducing the number of event listeners.

Handles dynamically added elements without extra listeners.

Simple example:

```js
document.getElementById('parent').addEventListener('click', function(event) {
  if (event.target.tagName === 'BUTTON') {
    console.log('Button clicked:', event.target.textContent);
  }
});
```

Here, a single listener on the parent catches clicks on any button inside.​


## <span style="color:#FFA500"> 44. How to prevent default behavior? </span>

To prevent the default behavior of an event in JavaScript, use the event.preventDefault() method inside an event handler. This stops the browser's default action associated with that event.

Examples:
### Preventing a link from navigating:

```js
document.querySelector('a').addEventListener('click', function(event) {
  event.preventDefault();
  console.log('Link click prevented');
});
```

### Preventing a form from submitting:

```js
document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  console.log('Form submission prevented');
});
```

## <span style="color:#FFA500"> 45. How to store data in browser? </span>

You can store data in the browser mainly using these methods:

1. localStorage
    - Stores key-value pairs persistently (data stays even after browser closes).

    - Simple API to set, get, remove data.

```js
localStorage.setItem("username", "JohnDoe"); // Store
const user = localStorage.getItem("username"); // Retrieve
localStorage.removeItem("username"); // Remove
```

2. sessionStorage
    - Similar to localStorage but data lasts only for the session (cleared when tab/window closes).

```js
sessionStorage.setItem("sessionID", "12345");
const sessionId = sessionStorage.getItem("sessionID");
sessionStorage.removeItem("sessionID");
```
3. Cookies
    - Small pieces of data sent to the server with each request.

    - Used for sessions, authentication, etc.

Notes:
localStorage and sessionStorage store only strings. To store objects, use JSON.stringify() and JSON.parse():

```js
localStorage.setItem("user", JSON.stringify({ name: "John" }));
const user = JSON.parse(localStorage.getItem("user"));
localStorage capacity is around 5MB depending on the browser.
```

These methods are useful for saving user preferences, session data, or offline/cache data on the client side without involving the server.

## <span style="color:#FFA500"> 46. What is CORS? </span>

CORS (Cross-Origin Resource Sharing) is a browser security mechanism that controls how web pages from one origin (domain, protocol, or port) can request resources (like APIs, fonts, or images) from a different origin.​

### Why CORS exists:
Browsers restrict cross-origin requests by default to protect users from malicious sites stealing data (this is called the same-origin policy). CORS provides a controlled way to safely allow cross-origin requests by using HTTP headers.

### How it works:
- The browser sends a request with an Origin header.

- The server responds with Access-Control-Allow-Origin to specify which domains can access the resource.

- For certain requests, the browser sends a "preflight" OPTIONS request to check if the server permits it.

- If the server allows, the browser proceeds; otherwise, it blocks the request.

Simple example of allowing cross-origin:

```text
Access-Control-Allow-Origin: https://example.com
```

This would allow scripts from https://example.com to access the resource.

## <span style="color:#FFA500"> 47. What is debouncing used for (e.g., in search)? </span>

Debouncing is used to limit how often a function runs, especially for events that happen frequently, like typing in a search box.​

### Use in search:
When a user types, you don’t want to send a search request on every keystroke because it overloads the server. Instead, debounce waits until the user stops typing for a set time (like 300ms) and then triggers the search function once. This reduces unnecessary calls and improves performance.

Simple example:

```js
function debounce(func, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

const search = (query) => console.log('Searching for:', query);

const debouncedSearch = debounce(search, 300);

// Simulate typing
debouncedSearch('he');
debouncedSearch('hel');
debouncedSearch('hell');
debouncedSearch('hello'); // Only this triggers after 300ms
```

This way, the search function runs only once after the user stops typing, conserving resources and providing faster results.

## <span style="color:#FFA500"> 48. Difference between innerHTML, textContent, innerText? </span>

- innerHTML: parses HTML tags.

- textContent: raw text, no HTML.

- innerText: visible text (respects CSS).

## <span style="color:#FFA500"> 49. What is shadow DOM? </span>

Shadow DOM is a web standard that allows developers to create a hidden, encapsulated DOM tree (called the "shadow tree") attached to an element (the "shadow host"). This subtree is separate from the main DOM, meaning its styles and scripts are isolated and don’t affect or get affected by the rest of the page’s DOM.​

Key points:
- It enables component encapsulation, so styles and markup don’t leak out or break other parts of the page.

- The shadow DOM has its own isolated scope for HTML, CSS, and JavaScript.

- It's commonly used in web components for building reusable and self-contained UI elements.

- The shadow boundary separates the shadow DOM from the main DOM.

- Browsers have used it internally for native controls (e.g., 'video' element controls use shadow DOM).

Simple usage example:

```js
const host = document.getElementById('hostElement');
const shadowRoot = host.attachShadow({ mode: 'open' });
shadowRoot.innerHTML = `<style>p { color: red; }</style><p>This is in shadow DOM</p>`;
```
This creates a shadow DOM inside the hostElement where styles and elements inside are isolated from the main document.

In short, shadow DOM provides DOM and style encapsulation to build more robust and modular web components.

## <span style="color:#FFA500"> 50. How does garbage collection work? </span>

Garbage collection in JavaScript is an automatic process where the JavaScript engine frees up memory by removing objects that are no longer reachable or needed by the program.​

### How it works (Mark-and-Sweep algorithm):
1. The GC starts with a set of root objects like global variables and currently executing functions.

2. It marks all objects reachable from these roots by following all references.

3. Then it sweeps through memory and removes objects that were not marked (unreachable).

4. This frees memory occupied by objects no longer accessible by your code.

### Important notes:
- Objects become unreachable if there are no references pointing to them.

- GC runs periodically and automatically; you can’t force garbage collection in JavaScript.

- Modern engines optimize GC with techniques like generational and incremental collection to reduce pauses.

Simple analogy:
Think of GC as spilling paint on roots and following branches—anything not touched by the paint is garbage and cleaned up.

This keeps JavaScript apps efficient by reclaiming memory without manual intervention.

## <span style="color:#FFA500"> 51. What is the difference between deep copy and shallow copy? </span>

A shallow copy copies only the top-level properties of an object, so nested objects or arrays still reference the same memory as the original. A deep copy duplicates all levels, making nested objects completely independent of the original.​

Example
### Shallow Copy:

```js
const obj = { a: 1, b: { c: 2 } };
const shallow = { ...obj };
shallow.b.c = 3;
// obj.b.c is also 3 (same reference)
```

### Deep Copy:

```js
const obj = { a: 1, b: { c: 2 } };
const deep = JSON.parse(JSON.stringify(obj));
deep.b.c = 4;
// obj.b.c is still 2 (different reference)
```

## <span style="color:#FFA500"> 52. What is currying in JavaScript? </span>

Currying in JavaScript is the process of transforming a function with multiple arguments into a sequence of functions, each taking a single argument.​

Example
### Normal function:

```js
function add(a, b, c) {
  return a + b + c;
}
add(1, 2, 3); // 6
```

### Curried version:

```js
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    }
  }
}
curriedAdd(1)(2)(3); // 6

// Arrow function

const add = a => b => a + b;


```
Currying makes it easy to create specialized functions and use partial application

## <span style="color:#FFA500"> 53. Explain memoization. </span>

emoization is an optimization technique that speeds up function calls by caching the results of expensive computations and returning the cached result when the same inputs occur again.​

Example
### Memoized Fibonacci function:

```js
function fib(n, memo = {}) {
  if (memo[n]) return memo[n];
  if (n <= 1) return 1;
  memo[n] = fib(n-1, memo) + fib(n-2, memo);
  return memo[n];
}
```

With memoization, repeated calls with the same arguments are much faster because the result is reused from the cache.

## <span style="color:#FFA500"> 54. What is composition in JavaScript functions? </span>

Composition in JavaScript functions means creating a new function by combining multiple functions, where the output of one function becomes the input of the next. This lets you build complex operations by chaining simple functions together.​

Example
```js
const add2 = (x) => x + 2;
const square = (x) => x * x;

// Compose: runs from right to left (square first, then add2)
const composed = (x) => add2(square(x));
console.log(composed(3)); // 11

// Or, using a utility:
const compose = (...fns) => (x) => fns.reduceRight((val, fn) => fn(val), x);
const add2ThenSquare = compose(square, add2);
console.log(add2ThenSquare(3)); // 25
```

Composition helps keep code modular, readable, and reusable.

## <span style="color:#FFA500"> 55. What are polyfills? </span>

Polyfills are pieces of JavaScript code that add modern features to older browsers or environments that don't natively support them. They act as a fallback, allowing developers to use new methods, APIs, or standards while ensuring compatibility across all browsers.​

Example
Suppose Array.prototype.includes is not supported in an old browser. A polyfill can add this method:

```js
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement) {
    for (let i = 0; i < this.length; i++) {
      if (this[i] === searchElement) return true;
    }
    return false;
  };
}
```

Now, [10][11][12].includes(2) works everywhere, even if the browser is outdated.

## <span style="color:#FFA500"> 56. What is the difference between mutable and immutable objects? </span>

Mutable objects in JavaScript can be changed after they are created, while immutable objects cannot be changed—their content always stays the same unless you make a new object.​

Example

### Mutable:

```js
let obj = { name: 'John' };
obj.name = 'Jane'; // obj is now { name: 'Jane' }
```

### Immutable:

```js
const frozenObj = Object.freeze({ name: 'John' });
frozenObj.name = 'Jane'; // Nothing changes; still { name: 'John' }
```

Arrays and objects are mutable by default, but you can use Object.freeze() or similar techniques to make them immutable. Primitive types like numbers and strings are always immutable—they can’t be changed in place.

## <span style="color:#FFA500"> 57. Explain call stack overflow. </span>

A call stack overflow in JavaScript occurs when the call stack exceeds its memory limit due to too many nested or recursive function calls, typically from infinite or very deep recursion. The call stack is a memory structure that tracks function execution by storing each active function call. When functions keep calling each other without proper termination, the stack fills up and triggers a "stack overflow" error, causing the program to crash or halt execution.​

Example
```js
function recurse() {
  recurse(); // Calls itself infinitely
}
recurse(); // This causes call stack overflow error
```

This happens because each function call adds to the call stack, and without a base case to stop recursion, the calls never return, exhausting stack space.​

In summary, call stack overflow signals excessive function calls that exceed the stack's capacity, often from infinite recursion or extremely deep call chains, and it requires fixing the recursion or call logic to avoid it.

## <span style="color:#FFA500"> 58. What are Tagged Template Literals? </span>

Tagged Template Literals in JavaScript allow you to customize how a template literal is processed by passing it to a function (called a "tag"). Instead of just producing a string with interpolation, the tag function receives the raw string parts and the evaluated expressions separately, letting you manipulate or transform them before returning a result.​

Example

```js
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => result + str + (values[i] ? `<b>${values[i]}</b>` : ''), '');
}

const name = "Alice";
const age = 25;

console.log(highlight`Name: ${name}, Age: ${age}`);
// Output: Name: <b>Alice</b>, Age: <b>25</b>

```

Here, the highlight function receives the literal segments and expression values, then formats the output by wrapping the values in 'b' tags. This gives you power to control formatting, escaping, or any custom processing when using template literals.

## <span style="color:#FFA500"> 59.  </span>
## <span style="color:#FFA500"> 60.  </span>
## <span style="color:#FFA500"> 61.  </span>
## <span style="color:#FFA500"> 62.  </span>
## <span style="color:#FFA500"> 63.  </span>
## <span style="color:#FFA500"> 64.  </span>
## <span style="color:#FFA500"> 65.  </span>
## <span style="color:#FFA500"> 66.  </span>
## <span style="color:#FFA500"> 67.  </span>
## <span style="color:#FFA500"> 68.  </span>
## <span style="color:#FFA500"> 69.  </span>
## <span style="color:#FFA500"> 70.  </span>