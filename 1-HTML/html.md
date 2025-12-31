# HTML questions you’ll face in frontend / full-stack interviews

## <span style="color:#FFA500"> 1. What is semantic HTML and why should I care in React/Next.js? </span>

Semantic HTML means using meaningful tags like header, main, nav, article, instead of random 'div' s, so the structure and purpose of content is clear to browsers, screen readers, and search engines. In React/Next.js it still matters because JSX compiles to HTML, and good semantics improve accessibility, SEO, and maintainability of your components.

## <span style="color:#FFA500"> 2. Difference between section and article? </span>

- article is for a self‑contained piece of content that makes sense on its own (like a blog post, news item, or a single card).
  ​
- section is for grouping related content by theme inside a page or article (like “Features”, “Pricing”, “Testimonials” sections).

### Example

```html
<main>
  <!-- Whole blog post = article -->
  <article>
    <h1>Understanding Semantic HTML</h1>

    <!-- Parts of the article = sections -->
    <section>
      <h2>What is semantic HTML?</h2>
      <p>...</p>
    </section>

    <section>
      <h2>Why it matters for accessibility</h2>
      <p>...</p>
    </section>
  </article>
</main>
```

## <span style="color:#FFA500"> 3. What are data-\* attributes and why do frameworks still use them? </span>

data-\* attributes are custom attributes you add to any HTML tag to store extra information in the DOM, like data-id="123" or data-role="dialog". They are ignored by the browser’s layout engine but can be read by JavaScript via element.dataset or getAttribute.

### Example

```html
<button data-user-id="42" data-action="delete">Delete user</button>

<script>
  const btn = document.querySelector("button");
  console.log(btn.dataset.userId); // "42"
  console.log(btn.dataset.action); // "delete"
</script>
```

Why frameworks still use them

- For DOM hooks: libraries and test tools often select elements by data-\* (e.g. data-testid, data-js, data-modal) so they don’t overload class names or depend on visual CSS.
  ​
- For interop and low‑level APIs: even in React/Next.js, data attributes are handy when working with IntersectionObserver, drag‑and‑drop, or third‑party scripts where you only get the DOM node and need some extra identifier or config on it.

## <span style="color:#FFA500"> 4. What is accessibility and how does HTML help? </span>

Accessibility means making websites usable for everyone, including people with disabilities (visual, hearing, motor, cognitive), so they can perceive, navigate, and interact with content. It also improves overall UX and SEO, so even users without disabilities benefit from clearer structure, better navigation, and cleaner code.
​

How HTML helps with accessibility

- Semantic tags like header, main, nav, article, button give meaning to the structure so screen readers and other assistive tech can understand the page.
  ​
- Proper attributes like alt on images, label + for on forms, type="button|submit", and aria-\* attributes communicate purpose and state, not just visuals.
  ​

Simple example

```html
<main>
  <h1>Login</h1>

  <form>
    <label for="email">Email</label>
    <input id="email" type="email" />

    <label for="password">Password</label>
    <input id="password" type="password" />

    <button type="submit">Sign in</button>
  </form>
</main>
```

## <span style="color:#FFA500"> 5. Why is button better than 'div onClick'? </span>

button is better because it is a built‑in interactive control with keyboard, focus, and screen‑reader support out of the box, while a 'div onClick' is just a generic box that you manually turned into something clickable. Using button means less custom code, fewer accessibility bugs, and behavior users expect across browsers and devices

## <span style="color:#FFA500"> 6. What is aria-label and when should you use it? </span>

aria-label is an attribute that gives an invisible, text label to an element so screen readers know what it is or what it does. It sets or overrides the “accessible name” that assistive tech announces for that element.
​

When to use aria-label

- Use when there’s no visible text label, for example icon‑only buttons (close, search, menu), custom controls, or regions that need a name

### Example Icon Button

```html
<button aria-label="Close menu">
  <svg aria-hidden="true">...</svg>
</button>
```

## <span style="color:#FFA500"> 7. Difference between label for and placeholder? </span>

- label for creates a real label linked to an input by ID, making it clickable and readable by screen readers.
  ​
- placeholder shows hint text inside the input that disappears when typing; it's not a label and screen readers often ignore it

## <span style="color:#FFA500"> 8. What happens if input has no name attribute? </span>

It won’t be submitted in form data.
Backend won’t receive it.

## <span style="color:#FFA500"> 9. Difference between GET and POST in forms? </span>

In forms, GET puts the form data in the URL as query params, while POST sends the data in the request body. GET is mainly for reading/filtering data (search, filters), POST is for actions that change data (login, create, update).
​

Behavior difference

- GET: Data visible in URL like ?q=react&page=2, can be bookmarked/cached, and usually has size limits.
  ​

- POST: Data hidden from URL (in body), not cached or bookmarked, better for larger or sensitive data

Example

```html
<!-- GET: good for search/filter -->
<form method="get" action="/search">
  <input name="q" />
  <button type="submit">Search</button>
</form>
<!-- URL: /search?q=hello -->

<!-- POST: good for login/creating data -->
<form method="post" action="/login">
  <input name="email" />
  <input name="password" type="password" />
  <button type="submit">Log in</button>
</form>
```

## <span style="color:#FFA500"> 10. What is the DOM? </span>

Not “HTML structure”.

DOM = tree representation used by JS to manipulate UI.

HTML → Parsed → DOM → JS interacts

## <span style="color:#FFA500"> 11. What happens when browser loads HTML? </span>

When the browser loads HTML, it turns the raw HTML text into a visual page in several steps. It builds internal models (DOM and CSSOM), figures out layout, then paints pixels to the screen.
​

### High-level steps

- Browser gets the HTML response from the server and starts parsing it immediately (top to bottom).

- While parsing, it builds the DOM tree (structure of elements) and discovers external resources (CSS, JS, images) to download.​

- CSS is parsed into the CSSOM, then DOM + CSSOM are combined into a render tree, layout is calculated, and the page is painted to the screen.

Simple mental model

1. Get HTML → parse into DOM.
   ​

2. Get CSS → parse into CSSOM.
   ​

3. Combine DOM + CSSOM → layout → paint.

## <span style="color:#FFA500"> 12. Why is img without width/height bad? </span>

Causes layout shift (CLS).

Next.js solves this with Image.

## <span style="color:#FFA500"> 13. Why do we use key in lists? </span>

Not HTML, but DOM logic.

In React lists, key is used so the library can correctly track each item between renders and update only what changed instead of re‑rendering or messing up the list. Without a good key, React may reuse the wrong DOM nodes when you insert, delete, or reorder items, causing bugs (wrong state, incorrect animations, etc.).

## <span style="color:#FFA500"> 14. Why fragments (<> </>) exist? </span>

To avoid unnecessary DOM nodes.

Extra <div> = CSS & layout problems.

## <span style="color:#FFA500"> 15. Can multiple elements have same id? </span>

HTML spec says NO.

JS still allows it → but behavior becomes unpredictable.

## <span style="color:#FFA500"> 16. Difference between display: none and visibility: hidden? </span>

display: none → removed from layout & accessibility tree

visibility: hidden → space exists, still in DOM

## <span style="color:#FFA500"> 17. Why avoid inline HTML event handlers? </span>

Inline HTML event handlers like button onclick="doSomething()" are avoided because they mix
markup with JavaScript, are harder to maintain, and can introduce security and flexibility
problems compared to using addEventListener or framework handlers. They also make it harder to
scale and follow modern patterns (modules, CSP, separation of concerns).

## <span style="color:#FFA500"> 18. Is JSX HTML? </span>

JSX is not HTML; it is a JavaScript syntax extension that looks like HTML but gets compiled to React.createElement calls (or similar) before it ever reaches the browser. JSX runs inside JavaScript, while HTML is a separate markup language that the browser understands directly.

How JSX and HTML differ (in interview terms)

- JSX is parsed by the JS toolchain (Babel, TypeScript), not by the browser; browsers never “see” JSX, only JavaScript.

- JSX lets you embed JS expressions with {} and use features like props, components (MyComponent ), and must follow JS rules (camelCase attributes like className, onClick, htmlFor, single root, all tags closed).

- HTML is static markup: no {} expressions, attribute names are usually lowercase (class, onclick), and it is interpreted directly by the browser’s HTML parser.

Tiny example

```jsx
// JSX in React
function App() {
  const name = "Dev";
  return <h1 className="title">Hello, {name}</h1>;
}
```

After compilation, this becomes JavaScript like:

```js
React.createElement("h1", { className: "title" }, "Hello, Dev");
```

## <span style="color:#FFA500"> 20. What’s the difference between controlled and uncontrolled inputs? </span>

Controlled → React controls value via state

Uncontrolled → DOM controls value via ref

## <span style="color:#FFA500"> 21. When would you choose uncontrolled inputs? </span>

Large forms

Performance-sensitive cases

When you don’t need live validation

## <span style="color:#FFA500"> 22. Why does React use htmlFor instead of for? </span>

Because for is a JS reserved keyword.

## <span style="color:#FFA500"> 23. Why does onClick use camelCase? </span>

Because JSX is JavaScript.

## <span style="color:#FFA500"> 24. Why does form submit reload the page in React? </span>

Because HTML forms submit by default.

React doesn’t stop native browser behavior unless you do:

```js
e.preventDefault();
```

## <span style="color:#FFA500"> 25. What is dangerouslySetInnerHTML? </span>

React’s way to inject raw HTML:

```jsx
<div dangerouslySetInnerHTML={{ __html: content }} />
```

Why “dangerous”?
→ XSS attacks
