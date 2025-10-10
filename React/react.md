# 

## <span style="color:#FFA500"> 1. What’s the difference between controlled and uncontrolled components in React?  </span>

Controlled components have their value managed by React state, while uncontrolled components rely on the DOM’s internal state accessed with refs. Controlled components provide more predictable behavior.

### Controlled Components
- React state holds the form data.

- Input values are updated through state and event handlers.

- Provides real-time validation and control.

- Suitable for complex forms with dynamic interaction

### Example

``` jsx
import React, { useState } from 'react';

function ControlledComponent() {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    alert('A name was submitted: ' + value);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={value} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ControlledComponent;
```

Pros:

- Provide real-time validation and instant feedback as user inputs change.

- Easier to implement complex interactions and dynamic form elements.


Cons:

- Requires more boilerplate with state declarations and event handlers.

- Can lead to performance overhead if many inputs update state frequently.


### Uncontrolled Components

- Form element manages its own state inside the DOM.

- React accesses input values via refs.

- Simpler to implement for basic forms.

- Validation and value retrieval occur mostly on form submission.

### Example

```jsx
import React, { useRef } from 'react';

function UncontrolledComponent() {
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    alert('A name was submitted: ' + inputRef.current.value);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" ref={inputRef} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledComponent;
```
Pros:

- Simpler to implement with less code for basic forms.

- No need to write change handlers or maintain state for input values.

- Can be more performant for simple forms since React state isn't updated on every keystroke.

Cons:

- React loses control over the form data until form submission.

- Validation and value retrieval only happen on submit or via refs, limiting real-time checks.

- Debugging can be more challenging since data lives in DOM outside React state.


## <span style="color:#FFA500"> 2. How do you optimize React components to avoid unnecessary re-renders? </span>

Use React.memo, useCallback for stable functions, and useMemo for expensive computations. Also ensure props are minimal and stable.

Key Optimization Strategies
- Use React.memo() for functional components. This prevents a component from re-rendering unless its props change, making it ideal for child components that receive unchanged props.

- Employ useCallback to memoize functions passed as props. Without this, every render recreates the function, causing child components to re-render needlessly.

- Use useMemo for computationally expensive values. It ensures calculations are recomputed only when dependencies change, rather than on every render.

- Avoid recreating objects and functions inside JSX or render methods. Create them outside the component or memoize them, as new references trigger unnecessary re-renders.

- Batch state updates to minimize the number of renders triggered by related state changes.

- Use React Developer Tools to profile component rendering and identify where optimizations are needed.

### Example: Using React.memo, useCallback, and useMemo

```jsx
import React, { useState, useCallback, useMemo } from 'react';

// Child wrapped with React.memo
const ChildComponent = React.memo(({ onClick, value }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>{value}</button>;
});

function ParentComponent() {
  const [count, setCount] = useState(0);

  // useCallback stabilizes function reference
  const increment = useCallback(() => setCount(c => c + 1), []);

  // useMemo for expensive calculation
  const expensiveValue = useMemo(() => {
    return count * 1000;
  }, [count]);

  return (
    <>
      <ChildComponent onClick={increment} value={expensiveValue} />
      <div>Count: {count}</div>
    </>
  );
}
```
This example uses React.memo for the child, useCallback to stabilize the function passed as a prop, and useMemo to cache an expensive computation.

## <span style="color:#FFA500"> 3. Explain the difference between useEffect and useLayoutEffect. </span>

The main difference is timing: useEffect runs asynchronously after the DOM is painted, while useLayoutEffect runs synchronously after DOM changes but before the browser paints. Use useEffect for tasks like data fetching, and useLayoutEffect when immediate DOM measurements or changes are needed to avoid visible flicker.

```jsx
import React, { useEffect, useLayoutEffect, useRef } from 'react';

function Example() {
  const ref = useRef();

  useEffect(() => {
    console.log('useEffect: Runs after DOM paint');
  }, []);

  useLayoutEffect(() => {
    console.log('useLayoutEffect: Runs before DOM paint');
    console.log('Element width:', ref.current.offsetWidth);
  }, []);

  return <div ref={ref}>Hello</div>;
}
```
- useEffect: Good for data fetching, subscriptions, and logging; does not block painting.

- useLayoutEffect: Ideal for measuring or updating the DOM before it’s displayed, preventing layout glitches.

## <span style="color:#FFA500"> 4. When should you use context vs props drilling? in sort with code example.  </span>

Use props drilling for simple, direct parent-to-child data transfer in small or shallow component trees. Use context when data must be shared across many deeply nested or unrelated components, or for global state that multiple branches need.

When to Use Props Drilling
- Best for straightforward, explicit data flow from parent to child.

- Works well when state is limited to a few levels and not widely shared.

### Example

```jsx
function Parent() {
  const message = "Hello!";
  return <Child message={message} />;
}
function Child({ message }) {
  return <GrandChild message={message} />;
}
function GrandChild({ message }) {
  return <p>{message}</p>;
}
```

When to Use Context
- Ideal for global state, theming, user data, or any value needed by many components at different levels.

- Prevents excessive prop passing and makes state easily accessible.

### Example
```jsx
import React, { createContext, useContext } from 'react';
const MessageContext = createContext();
function App() {
  return (
    <MessageContext.Provider value="Hello!">
      <GrandChild />
    </MessageContext.Provider>
  );
}
function GrandChild() {
  const message = useContext(MessageContext);
  return <p>{message}</p>;
}
```
GrandChild accesses the context directly, without needing intermediate parents to pass the prop.

## <span style="color:#FFA500"> 5. What are error boundaries in React?  </span>

Error boundaries in React are special components that catch JavaScript errors in their child component tree during rendering, lifecycle methods, and constructors, then display a fallback UI instead of crashing the whole application. They act like a protective wrapper in the UI, handling unexpected rendering errors gracefully.

Key Points
- Only class components can be error boundaries, using static getDerivedStateFromError or componentDidCatch lifecycle methods.

- They catch errors in rendering, lifecycle methods, and constructors below them, but not in event handlers, async code, server-side rendering, or inside the boundary itself.

- Useful for isolating faulty parts of the UI, logging errors, and providing a user-friendly fallback instead of a broken app.

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // Log error
  }
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <ComponentThatMayCrash />
</ErrorBoundary>
```

Error boundaries improve app stability by preventing errors in components from crashing the entire React app and allowing a graceful recovery.

## <span style="color:#FFA500"> 6. What are React keys and why are they important?  </span>

React keys are special attributes used when creating lists of elements—like items in a to-do list—to help React efficiently update and render components. Keys must be unique among siblings, so React can identify which items have changed, been added, or removed, making updates fast and preventing bugs.

```jsx
const todos = [
  { id: 101, text: "Learn React" },
  { id: 102, text: "Build a Project" }
];

const listItems = todos.map((todo) => 
  <li key={todo.id}>{todo.text}</li>
);
```
## <span style="color:#FFA500"> 7. What is React reconciliation?  </span>
React reconciliation is the process that React uses to efficiently update the user interface when a component's state or props change. Instead of re-rendering the whole UI, React compares the previous and current versions of its virtual DOM and updates only the parts that have actually changed.

How React Reconciliation Works
- React keeps a lightweight copy of the real DOM called the "virtual DOM".

- When state or props change, React creates a new virtual DOM tree and compares it with the previous one—this is called the “diffing” algorithm.

- Only the differences—called "minimal updates"—are applied to the real DOM, making updates fast and efficient.

### Example
```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };
  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}
```
Each time the "Increment" button is clicked, only the 'p' element displaying the count is updated in the real DOM. The rest of the UI stays untouched, thanks to reconciliation.

## <span style="color:#FFA500"> 8. What is the difference between useState and useReducer. </span>
The main difference between useState and useReducer in React is how they manage state and the kind of state logic they're suited for. useState is simple and best for handling individual or unrelated pieces of state, while useReducer is more powerful—ideal for managing complex state logic or related state updates.

### useState
```jsx
import React, { useState } from "react";
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Add One</button>
    </>
  );
}
```

### useReducer
```jsx
import React, { useReducer } from "react";
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    default:
      return state;
  }
}
function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>
        Add One
      </button>
    </>
  );
}
```