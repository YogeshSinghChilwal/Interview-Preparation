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
There is only one non-primitive data type in JavaScript: the Object.

Non-primitive: objects, arrays, functions.

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

## <span style="color:#FFA500"> 26.  </span>
## <span style="color:#FFA500"> 27.  </span>
## <span style="color:#FFA500"> 28.  </span>
## <span style="color:#FFA500"> 29.  </span>
## <span style="color:#FFA500"> 30.  </span>
## <span style="color:#FFA500"> 31.  </span>
## <span style="color:#FFA500"> 32.  </span>
## <span style="color:#FFA500"> 33.  </span>
## <span style="color:#FFA500"> 34.  </span>
## <span style="color:#FFA500"> 35.  </span>
## <span style="color:#FFA500"> 36.  </span>
## <span style="color:#FFA500"> 37.  </span>
## <span style="color:#FFA500"> 38.  </span>
## <span style="color:#FFA500"> 39.  </span>
## <span style="color:#FFA500"> 40.  </span>