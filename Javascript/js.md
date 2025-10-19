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

## <span style="color:#FFA500"> 10.  </span>
## <span style="color:#FFA500"> 11.  </span>
## <span style="color:#FFA500"> 12.  </span>
## <span style="color:#FFA500"> 13.  </span>
## <span style="color:#FFA500"> 14.  </span>
## <span style="color:#FFA500"> 15. </span>
## <span style="color:#FFA500"> 16.  </span>
## <span style="color:#FFA500"> 17.  </span>
## <span style="color:#FFA500"> 18.  </span>
## <span style="color:#FFA500"> 19.  </span>
## <span style="color:#FFA500"> 20.  </span>