# Next.js Interview Question

## <span style="color:#FFA500"> 1. Explain CSR, SSR, SSG, and ISR in Next.js.  </span>

In Next.js, CSR, SSR, SSG, and ISR are four different strategies for rendering web pages, each with its own strengths and use cases. These approaches determine how and when the HTML for a page is generated and delivered to the browser.​

### CSR (Client-Side Rendering)
Everything happens in the browser: JavaScript downloads, runs, and fetches data to build the page after loading.​

Faster interactions after the initial load, but the page may appear empty or incomplete briefly as data is fetched.​

Example: A dashboard that loads data only after the user signs in.

### SSR (Server-Side Rendering)
The server generates the HTML each time a page is requested.​

Better for SEO because search engines see full HTML.​

Great for dynamic, frequently updated content—like news feeds or real-time dashboards.

Example:

```jsx
export async function getServerSideProps(context) {
  const data = await fetchData();
  return { props: { data } };
}
```

### SSG (Static Site Generation)
HTML is generated once at build time, making pages very fast to load since they're just static files.​

Best for pages with content that doesn't change often—like blogs, documentation, or marketing sites.​

Example:

```jsx
export async function getStaticProps() {
  const data = await fetchData();
  return { props: { data } };
}
```

### ISR (Incremental Static Regeneration)
Combines SSG and SSR: Generates static pages at build time, but allows updating them in the background at regular intervals or on demand.​

Keeps sites fast like SSG, while allowing near-real-time updates without rebuilding the whole site.​

Ideal for blogs, e-commerce sites, or news portals where content changes regularly.​

Example:

```jsx
export async function getStaticProps() {
  const data = await fetchData();
  return {
    props: { data },
    revalidate: 60  // page will re-generate every 60 seconds
  };
}
```

## <span style="color:#FFA500"> 2. What’s the difference between Next.js Pages Router and App Router? </span>

The Next.js Pages Router and App Router are two systems for defining routes and building applications, each with its own structure and features.

### Pages Router
- Uses the pages/ directory. Each file automatically creates a route—for example, pages/about.js becomes /about.

- Default components Client

- Data fetching methods include getStaticProps, getServerSideProps, and getInitialProps.

- Easier for simple and straightforward projects.

```js
pages/
  index.js        // route: /
  about.js        // route: /about
  blog/[slug].js  // dynamic route: /blog/:slug
```

### App Router
- Uses the app/ directory. Routing is more flexible and supports nested and shared layouts.

- Defaults to React server components, making apps faster and more efficient.

Data fetching uses the standard fetch() API, with more advanced caching and streaming capabilities.

Supports more granular and dynamic layouts (like nested layouts, loading, and error files per route).

Designed for modern, complex web apps.

```js
app/
  layout.js       // shared layout
  page.js         // route: /
  about/
    page.js       // route: /about
  blog/
    [slug]/
      page.js     // dynamic route: /blog/:slug
```

## <span style="color:#FFA500"> 3. What are middleware in Next.js? </span>

Middleware in Next.js are functions that run before a request reaches a page or API route, allowing developers to intercept, inspect, and modify requests and responses. Middleware is typically defined in a single middleware.js or middleware.ts file at the root of the application, and can be used for tasks like authentication, redirects, logging, rate limiting, and more.

```js
// middleware.ts or middleware.js at project root
import { NextResponse } from "next/server";
export function middleware(request) {
  const token = request.cookies.get("authToken");
  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

// Optional: Add matcher to specify which routes use this middleware
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
```

This checks for an authToken cookie; if missing, and user tries to visit /dashboard, it redirects to /login.

### What Middleware Is Used For

- Rate limiting to prevent abuse or spam​

- Setting or reading cookies for personalization​

- Conditional CORS headers for API security​

- Logging requests and responses for analytics

## <span style="color:#FFA500"> 4. How do you improve SEO with Next.js? </span>

Improving SEO with Next.js involves leveraging its rendering capabilities, metadata management, and performance optimizations to make your site fast, crawlable, and easy for search engines to understand.​

### Key SEO Improvement Techniques in Next.js
- Use Server-Side Rendering (SSR), Static Site Generation (SSG), or Incremental Static Regeneration (ISR)​

- Define Dynamic Metadata

- Optimize Performance - Next.js automatically optimizes code splitting, lazy loading, and image sizes. Using the Next.js Image component, next/font, and other built-in tools ensures fast load times—a critical ranking factor.​

- Use Semantic HTML Tags - Proper tags like article, header, nav, and footer improve accessibility and help search engines grasp content structure.​

- Ensure Mobile Responsiveness

## <span style="color:#FFA500"> 5. What is dynamic routing in Next.js? </span>

Dynamic routing in Next.js lets you create pages with URLs that have variable segments, so routes can adapt to dynamic data like user profiles, blog posts, or products. Instead of creating a separate file for each route, Next.js uses file and folder names wrapped in square brackets [param] to signify dynamic segments that act as placeholders.

### Example in App Router
### Folder structure:

```
app/
  blog/
    [slug]/
      page.js
```

### app/blog/[slug]/page.js

```jsx
export default function BlogPost({ params }) {
  const { slug } = params;  // Next.js automatically passes params here

  return <p>Viewing blog post: {slug}</p>;
}
```

## <span style="color:#FFA500"> 6. How do you share state between server and client components in Next.js App Router? </span>

In Next.js App Router, sharing state between server and client components requires understanding their different rendering environments: server components render only on the server, and client components render in the browser.

### Main Approaches to Share State
1. Fetch Data in Server Component and Pass as Props to Client Component

```jsx
// app/page.tsx (Server Component)
import ClientComponent from "./ClientComponent";

export default async function Page() {
  const data = await fetchDataFromAPI();  // runs on server

  return <ClientComponent initialData={data} />;
}


// app/ClientComponent.tsx (Client Component)
"use client";
import { useState } from "react";

export default function ClientComponent({ initialData }) {
  const [data, setData] = useState(initialData);

  // Client-side state management here
  return <div>{JSON.stringify(data)}</div>;
}

```

2. Use React Context in Client Components - Define a context provider client component that holds the state.

3. Use URL Query Parameters.