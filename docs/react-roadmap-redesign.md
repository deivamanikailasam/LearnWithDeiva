# React Roadmap Redesign — Proposed Tree (Design Phase)

> Status: **PROPOSAL / under review**. No JSON has been changed yet. This document
> is the design artifact to approve before implementation.

## Goal

Turn the React subject from a 2-level skeleton (Topic → leaf "subtopic", where
965 leaves cannot hold content) into a proper **Topic → Subtopic → Sub-subtopic**
tree where **only the sub-subtopic is a content page**, and every sub-subtopic is
a real, teachable unit — never a thin `why` / `advantages` / `cons` /
`tradeoffs` section.

## Locked decisions (from you)

1. **Stages stay.** The 24 roadmap stages are the fixed scaffold.
2. Redesign the **Topic → Subtopic → Sub-subtopic** levels underneath.
3. **Clean rebuild** of the topic tree; preserve the 8 existing content
   documents (all under JS-Essentials: `destructuring--*`, `array-methods--*`).
4. **Design-first**, then implement the JSON.
5. **Structure only** — no `document.json` content generated in this pass.

## Authoring conventions for this redesign

- **Topic** = a roadmap node (kept, occasionally renamed for clarity). Pure
  grouping, no content.
- **Subtopic** = a coherent group of 2–6 sub-subtopics. Pure grouping, no
  content. Named as a theme, not a single concept.
- **Sub-subtopic** = the leaf. **This is the only thing with a content page.**
  Each is a standalone, substantive concept a learner could spend a focused
  session on.
- **What gets removed / merged:**
  - Standalone `Why X`, `Advantages`, `Cons`, `Pros & Cons`, `Use Cases &
    Tradeoffs` → folded into the concept's main page.
  - Thin `What is X` intros → kept only as a substantive lead page that fully
    introduces the concept (not a 2-line definition).
  - `Choosing / Comparing X` → **kept only where it is a genuine decision-guide**
    (criteria + trade-offs + when-to-use), which is substantive. Flagged with
    `[decision]` below for your call.
- **Granularity target:** each Topic has 2–4 Subtopics; each Subtopic has 2–6
  Sub-subtopics. Most existing leaves survive as sub-subtopics, regrouped.
- **ID strategy (implementation detail):** leaf folder ids follow
  `topic--subtopic--leaf` slugs. The 8 existing doc folders
  (`destructuring--object`, `js-essentials--array-methods--map`, …) are kept
  verbatim so their content survives.

Legend: `[doc]` = existing content document to preserve. `[decision]` =
selection/comparison page kept for your approval. `[new]` = leaf added for
completeness (no current equivalent).

---

# SAMPLE STAGE A — React Fundamentals  *(concept-heavy)*

## Topic: Introduction to React
- **Subtopic: What React Is**
  - React as a UI library: the component model *(merges “What is React”, “Library vs Framework”, “How React Works” overview)*
  - The declarative, component-based mental model *(merges “Declarative vs Imperative”)*
- **Subtopic: React in the Frontend Landscape**
  - Single-page applications and where React fits
  - React vs Angular, Vue & Svelte `[decision]`
  - React’s evolution and major versions *(was “History & Versions”)*

*(Dropped as standalone: “Why React” → folded into “React as a UI library”.)*

## Topic: Components & JSX
- **Subtopic: Components**
  - Writing your first function component *(merges “What is a Component?”, “Function Components”)*
  - Class components and why function components won *(was “Class Components (Legacy)”)*
  - Importing, exporting & file conventions *(merges “Importing & Exporting”, “Naming & File Conventions”)*
- **Subtopic: JSX**
  - JSX syntax and rules
  - Embedding JavaScript expressions in JSX
  - Attributes, `className` & dynamic values *(was “JSX Attributes & className”)*
  - Fragments and returning multiple elements
- **Subtopic: Composing UIs**
  - Nesting and composing components
  - Thinking in React: decomposing a UI into a component tree

## Topic: Props
- **Subtopic: Passing Data with Props**
  - Passing and receiving props (+ naming conventions) *(merges “Prop Naming”)*
  - Destructuring props
  - Default prop values
  - Spreading props
- **Subtopic: Composition with Props**
  - The `children` prop
  - Passing JSX and elements as props
- **Subtopic: Data Flow & Contracts**
  - One-way data flow
  - Props vs state
  - Validating props with PropTypes

## Topic: State & useState
- **Subtopic: State Basics**
  - What state is and why components need it
  - Declaring state with `useState`
  - Updating state and triggering re-renders
- **Subtopic: Updating State Correctly**
  - State updates are asynchronous: batching & snapshots *(merges “State Updates Are Asynchronous”)*
  - Functional updates (`prev => next`)
  - Lazy initial state
- **Subtopic: Structuring State**
  - Updating objects and arrays immutably *(was “State with Objects & Arrays”)*
  - Using multiple state variables
  - Lifting state up to share between components

## Topic: Handling Events
- **Subtopic: Event Handler Basics**
  - Attaching handlers with `onClick` and friends
  - Inline vs named handlers
  - Passing arguments to handlers
- **Subtopic: The Event System**
  - Synthetic events and the event object *(merges “Synthetic Events”, “The Event Object”)*
  - `preventDefault` & `stopPropagation`
- **Subtopic: Common Event Types**
  - Mouse and pointer events *(merges “Mouse Events”, “Pointer & Touch Events”)*
  - Keyboard events
  - Form, change, focus & blur events *(merges “Form & Change”, “Focus & Blur”)*

## Topic: Conditional Rendering
- **Subtopic: Conditional Techniques**
  - `if`/`else` and early returns (+ returning `null`) *(merges “Returning null”)*
  - Ternary expressions in JSX
  - Logical `&&` short-circuiting and its pitfalls
- **Subtopic: Organizing Conditional UI**
  - Element variables
  - `switch` statements & lookup maps for many branches

## Topic: Lists & Keys
- **Subtopic: Rendering Lists**
  - Rendering arrays with `map()`
  - Filtering & sorting before rendering *(was “Filtering & Sorting Lists”)*
  - Nested and grouped lists
- **Subtopic: Keys**
  - Why keys matter for reconciliation *(was “Keys & Why They Matter”)*
  - Index-as-key pitfalls
  - Keyed fragments

---

# SAMPLE STAGE B — State Management  *(library-heavy)*

## Topic: State Management Fundamentals
- **Subtopic: Kinds of State**
  - The kinds of state: local, global, server, URL, form
  - Local vs global state
- **Subtopic: Deciding Where State Lives**
  - State colocation
  - Lifting state vs sharing state
  - The prop-drilling problem
- **Subtopic: Choosing an Approach**
  - Choosing a state-management solution `[decision]`

## Topic: State with Context + Reducer
- **Subtopic: Building Global State with Context**
  - The Context + `useReducer` pattern
  - Splitting state and dispatch contexts
- **Subtopic: Making Context Scale**
  - Avoiding unnecessary re-renders *(was “Performance Pitfalls”)*
  - When Context is enough vs reaching for a library `[decision]`

## Topic: Redux & Redux Toolkit
- **Subtopic: The Redux Model**
  - Core concepts: store, actions, reducers
  - One-way data flow & immutability in Redux `[new]`
- **Subtopic: Redux Toolkit (RTK)**
  - Setting up the store & `Provider` *(was “Store Setup & Provider”)*
  - `createSlice` and writing slices *(merges “Redux Toolkit (RTK)”, “createSlice & Slices”)*
  - Reading & updating state: `useSelector` / `useDispatch`
  - Async logic with `createAsyncThunk`
- **Subtopic: Scaling Redux**
  - Data fetching with RTK Query
  - Custom middleware
  - Debugging with Redux DevTools

## Topic: Zustand  *(optional)*
- **Subtopic: Zustand Basics**
  - Creating and consuming a store *(was “Creating a Store”)*
  - Selectors and slicing state
- **Subtopic: Advanced Zustand**
  - Middleware: `persist`, `immer`, `devtools`
  - Async actions

## Topic: Other State Libraries  *(optional)*
- **Subtopic: Atom & Proxy Libraries**
  - Jotai (atoms)
  - Recoil
  - Valtio (proxy state)
- **Subtopic: Other Paradigms**
  - MobX (observables)
  - XState (state machines)
- **Subtopic: Choosing**
  - Comparing and choosing a library `[decision]`

## Topic: State Management Patterns  *(optional)*
- **Subtopic: Modeling State**
  - State normalization
  - Derived & computed state
  - Immutable updates with Immer
- **Subtopic: Stateful Features**
  - Persisting state (localStorage)
  - Undo / redo
  - State machines & statecharts

---

## Pattern decisions (CONFIRMED)

1. **Granularity** — merge closely-related small concepts into substantive pages
   (as shown in the samples). ✅
2. **`[decision]` pages** — keep selection/comparison pages as substantive
   decision-guide sub-subtopics. ✅
3. **`[new]` leaves** — allowed where they fill a real gap (kept minimal). ✅
4. **Topics** — light refinement (rename/split/merge) allowed where it clearly
   improves the path. ✅

> Note: a few small, cohesive topics carry a single subtopic — the data model
> requires content to live at the sub-subtopic level, so one grouping layer is
> the minimum even when a topic is small.

---

# STAGE 1 — Prerequisites & Tooling

## Topic: JavaScript Essentials for React
- **Subtopic: Variables, Types & Operators**
  - Variables & scope (`let`, `const`, `var`)
  - Data types & type coercion
  - Truthy & falsy values
  - Equality: reference vs value
  - Ternary & short-circuit operators (`&&`, `||`)
  - Optional chaining & nullish coalescing (`?.`, `??`)
- **Subtopic: Functions & Closures**
  - Arrow functions
  - Default parameters
  - Closures
  - The `this` keyword
  - Higher-order functions
- **Subtopic: Objects, Arrays & Collections**
  - Object shorthand & computed keys
  - Spread & rest operators
  - Sets & Maps
  - JSON & JSON methods
- **Subtopic: Destructuring**
  - Object destructuring `[doc]`
  - Array destructuring `[doc]`
  - Nested destructuring `[doc]`
  - Defaults & aliasing `[doc]`
- **Subtopic: Array Methods**
  - `map()` `[doc]`
  - `filter()` `[doc]`
  - `reduce()` `[doc]`
  - `find()` & `findIndex()` `[doc]`
  - `forEach()`
  - `some()` & `every()`
- **Subtopic: Async JavaScript**
  - Promises
  - `async` / `await`
  - `Promise.all` / `race` / `allSettled`
  - Error handling in async code
- **Subtopic: Modules, Immutability & Errors**
  - ES Modules (`import` / `export`)
  - Immutability & pure functions
  - Error handling (`try` / `catch`)

## Topic: Development Environment & Tooling
- **Subtopic: Runtime & Packages**
  - Node.js & package managers (npm, yarn, pnpm)
  - `package.json` & dependencies
  - npm scripts
- **Subtopic: Editor & Workflow**
  - Code editor & extensions
  - ESLint & Prettier
  - Terminal & CLI basics
- **Subtopic: Debugging & Version Control**
  - Browser & React DevTools
  - Git & version control basics

## Topic: Creating a React App
- **Subtopic: Scaffolding a Project**
  - Vite
  - Create React App (legacy)
  - Next.js (framework setup)
  - CDN / no-build setup
- **Subtopic: Project Setup Essentials**
  - Project structure & file organization
  - `React.StrictMode`

---

# STAGE 3 — Rendering & JSX Deep Dive

## Topic: How Rendering Works
- **Subtopic: The Render Pipeline**
  - Trigger, render & commit phases
  - Initial render vs re-renders *(merges “Initial Render”, “Re-renders & What Triggers Them”)*
  - Render trees
- **Subtopic: State & Rendering Semantics**
  - State as a snapshot
  - Batching of state updates
- **Subtopic: Purity & StrictMode**
  - Keeping components pure
  - StrictMode double-rendering

## Topic: JSX In Depth
- **Subtopic: How JSX Compiles**
  - JSX compiles to `createElement` *(merges “JSX Compilation”, “createElement & the JSX Transform”)*
  - React elements vs components
- **Subtopic: JSX Syntax Details**
  - Conditionals inside JSX
  - Whitespace & text handling
  - Comments in JSX
- **Subtopic: Attributes & Raw HTML**
  - Spreading props in JSX
  - Boolean & dynamic attributes
  - Inline styles (the `style` prop)
  - `dangerouslySetInnerHTML`

## Topic: Component Lifecycle
- **Subtopic: The Lifecycle Phases**
  - Mount, update & unmount overview
  - Mounting & updating phases *(merges “Mounting Phase”, “Updating Phase”)*
  - Unmounting & cleanup
- **Subtopic: Function vs Class Lifecycle**
  - Effects vs class lifecycle
  - Class lifecycle methods (legacy)

## Topic: Reconciliation & the Virtual DOM
- **Subtopic: The Virtual DOM & Diffing**
  - The virtual DOM
  - The diffing algorithm
- **Subtopic: How React Preserves State**
  - How keys drive reconciliation
  - Preserving & resetting state by position *(merges “Preserving & Resetting State”, “Same-Position Rules”)*

---

# STAGE 4 — Hooks In Depth

## Topic: Hooks Fundamentals & Rules
- **Subtopic: What Hooks Are**
  - What hooks are and why they were introduced *(merges “What Are Hooks?”, “Why Hooks Were Introduced”)*
  - Hooks vs class components
- **Subtopic: The Rules of Hooks**
  - The rules of hooks
  - Hook call order & state identity
  - Enforcing rules with `eslint-plugin-react-hooks`

## Topic: useEffect
- **Subtopic: Effect Basics**
  - What is a side effect?
  - The cleanup function
  - Effect timing (after paint)
- **Subtopic: The Dependency Array**
  - Empty array (run once)
  - No array (run every render)
  - Specific dependencies
  - Object & function dependencies
  - The `exhaustive-deps` lint rule
- **Subtopic: Common Effect Patterns**
  - Data fetching in effects & race conditions *(merges “Data Fetching in Effects”, “Race Conditions & Ignore Flags”)*
  - Subscriptions & event listeners
  - Avoiding infinite loops
  - You might not need an effect

## Topic: useContext
- **Subtopic: Using Context**
  - Creating context & providing a value *(merges “Creating Context”, “Context Provider”)*
  - Consuming context with `useContext`
  - Default context value
- **Subtopic: Context in Practice**
  - Updating context from children
  - Using multiple contexts
  - Context & re-render performance

## Topic: useRef
- **Subtopic: Refs for Values & DOM**
  - Referencing DOM elements
  - Mutable values that persist across renders
  - Refs vs state
- **Subtopic: Advanced Ref Techniques**
  - Forwarding refs
  - Callback refs
  - `useImperativeHandle`

## Topic: useReducer
- **Subtopic: Reducer Basics**
  - The reducer function
  - Dispatching actions
  - The state & action pattern
- **Subtopic: Applying useReducer**
  - `useReducer` vs `useState`
  - Lazy initialization
  - `useReducer` with Context

## Topic: useMemo & useCallback
- **Subtopic: Memoizing Values & Functions**
  - `useMemo`: caching expensive calculations *(merges “useMemo”, “Caching Expensive Calculations”)*
  - `useCallback`: memoizing functions
  - Dependency arrays in memo hooks
- **Subtopic: Using Memoization Well**
  - Referential equality & why it matters
  - When to memoize (and when not to) `[decision]`

## Topic: Custom Hooks
- **Subtopic: Writing Custom Hooks**
  - Extracting reusable logic (+ the `use` naming convention) *(merges “Naming Convention”)*
  - Composing hooks
  - Sharing stateful logic between components
- **Subtopic: Practical Custom Hooks**
  - Common custom hooks (`useToggle`, `useFetch`, `useLocalStorage`)
  - Testing custom hooks

## Topic: Other Built-in Hooks  *(optional)*
- **Subtopic: Utility & DOM Hooks**
  - `useLayoutEffect`
  - `useInsertionEffect`
  - `useId`
  - `useDebugValue`
- **Subtopic: Concurrent Hooks**
  - `useTransition`
  - `useDeferredValue`
  - `useSyncExternalStore`
- **Subtopic: React 19 Hooks**
  - `use()` API
  - `useActionState`
  - `useFormStatus`
  - `useOptimistic`

---

# STAGE 5 — Component Patterns & Composition

## Topic: Composition Techniques
- **Subtopic: Composition Building Blocks**
  - Composition with `children`
  - Containment & slots (named children props) *(merges “Containment”, “Slots & Named Children Props”)*
- **Subtopic: Composition Strategy**
  - Specialization & configuration
  - Composition vs inheritance

## Topic: Render Props  *(optional)*
- **Subtopic: Using Render Props**
  - Render prop basics
  - Function as a child
- **Subtopic: Render Props Tradeoffs**
  - When to use render props vs hooks `[decision]` *(was “Use Cases & Tradeoffs”)*

## Topic: Higher-Order Components  *(optional)*
- **Subtopic: Building HOCs**
  - What is an HOC?
  - Creating an HOC
  - Props manipulation
- **Subtopic: HOCs in Practice**
  - Composing HOCs
  - Caveats & the hooks alternative `[decision]`

## Topic: Compound Components  *(optional)*
- **Subtopic: The Compound Component Pattern**
  - The compound component pattern
  - Sharing implicit state via context
  - Designing flexible component APIs

## Topic: Controlled vs Uncontrolled Components
- **Subtopic: Controlled & Uncontrolled Inputs**
  - Controlled components
  - Uncontrolled components
  - Choosing between them `[decision]`

## Topic: Common Design Patterns
- **Subtopic: Structural Patterns**
  - Container & presentational
  - Layout components
  - Polymorphic components (the `as` prop)
- **Subtopic: Logic-Sharing Patterns**
  - Provider pattern
  - Custom hook pattern
  - State reducer pattern
  - Prop getters

---

# STAGE 6 — Styling in React

## Topic: Styling Fundamentals
- **Subtopic: Core Styling Approaches**
  - Inline styles
  - Plain CSS stylesheets
  - Global vs scoped styles
- **Subtopic: Dynamic & Conditional Styles**
  - Dynamic `className` (clsx / classnames)
  - Conditional styling
- **Subtopic: CSS Tooling**
  - Sass / SCSS
  - PostCSS & Autoprefixer

## Topic: CSS Modules
- **Subtopic: Working with CSS Modules**
  - CSS Modules basics
  - Naming & scoping
  - Composition & `:global`

## Topic: CSS-in-JS  *(optional)*
- **Subtopic: CSS-in-JS Libraries**
  - styled-components
  - Emotion
- **Subtopic: CSS-in-JS Techniques**
  - Props-based styling
  - Theming
  - Runtime vs zero-runtime (Linaria, Vanilla Extract)

## Topic: Utility-First CSS (Tailwind)
- **Subtopic: Tailwind Basics**
  - Tailwind setup
  - Utility classes
  - Responsive & state variants
- **Subtopic: Customizing Tailwind**
  - Theme customization
  - Extracting components & `@apply`

## Topic: Component & UI Libraries  *(optional)*
- **Subtopic: Styled Component Libraries**
  - Material UI (MUI)
  - Ant Design
  - Chakra UI
- **Subtopic: Headless & Modern Libraries**
  - shadcn/ui
  - Headless UI & Radix primitives
- **Subtopic: Choosing**
  - Choosing a component library `[decision]`

## Topic: Responsive & Adaptive Design
- **Subtopic: Responsive CSS**
  - Media queries
  - Container queries
  - Mobile-first approach
- **Subtopic: Responsive in React**
  - Responsive hooks (`useMediaQuery`)
  - Fluid layouts with Flexbox & Grid

## Topic: Advanced Styling Topics  *(optional)*
- **Subtopic: Theming & Tokens**
  - Theming & dark mode
  - CSS custom properties
  - Design tokens
- **Subtopic: Motion & Accessible Styling**
  - CSS animations & transitions
  - Accessible styling & focus states

---

# STAGE 7 — Forms & User Input

## Topic: Form Basics
- **Subtopic: Form Building Blocks**
  - The `form` element & `onSubmit`
  - Textarea & select
  - File inputs
- **Subtopic: Input Types**
  - Text & password
  - Number & range
  - Checkbox
  - Radio buttons
  - Select & multi-select
  - Date & time
- **Subtopic: Controlled & Uncontrolled Inputs**
  - Controlled inputs
  - Uncontrolled inputs & refs
  - Handling multiple inputs
  - Default values

## Topic: Form State & Validation
- **Subtopic: Validation Basics**
  - Client-side validation
  - Native HTML validation
  - Displaying error messages
- **Subtopic: Advanced Validation**
  - Touched & dirty state
  - Async validation
  - Schema validation (Zod, Yup)

## Topic: Form Libraries
- **Subtopic: Popular Form Libraries**
  - React Hook Form
  - Formik
  - TanStack Form
  - React Final Form
- **Subtopic: Choosing**
  - Choosing a form library `[decision]`

## Topic: Form Submission & Actions
- **Subtopic: Submitting Forms**
  - Handling submit
  - Form actions & server actions
  - Submission error handling
- **Subtopic: Advanced Submission UX**
  - Pending & optimistic UI (`useActionState` / `useFormStatus`)
  - Multi-step forms & wizards

## Topic: Advanced Inputs & UX  *(optional)*
- **Subtopic: Enhanced Inputs**
  - Debounced & throttled inputs
  - Masked & formatted inputs
  - Autocomplete & combobox
- **Subtopic: Complex & Accessible Inputs**
  - Dynamic & repeating fields
  - Rich text & editors
  - Form accessibility (labels, ARIA)

---

# STAGE 8 — Routing

## Topic: Routing Fundamentals
- **Subtopic: How Client-Side Routing Works**
  - Client-side vs server routing
  - The History API & the URL
- **Subtopic: Setting Up Routes**
  - Router setup
  - Defining routes (`Routes` & `Route`)
  - Route config (`createBrowserRouter`, `useRoutes`)
- **Subtopic: Navigating**
  - `Link` & `NavLink`
  - Programmatic navigation (`useNavigate`)
  - Router hooks (`useLocation`, `useMatch`)

## Topic: Route Patterns
- **Subtopic: Nested & Layout Routes**
  - Nested routes & `Outlet`
  - Index routes
  - Layout routes
- **Subtopic: Dynamic & Query Routing**
  - Dynamic segments (`useParams`)
  - Query params (`useSearchParams`)
  - Relative & absolute routes
  - 404 / catch-all routes

## Topic: Data APIs & Loaders
- **Subtopic: Loading & Mutating Data**
  - Route loaders
  - Route actions
  - `useLoaderData` & `useActionData`
- **Subtopic: Advanced Data Routing**
  - `defer` & `Await` (streaming)
  - Route error boundaries
  - Fetchers

## Topic: Advanced Routing  *(optional)*
- **Subtopic: Guarding & Navigation**
  - Protected & authenticated routes
  - Redirects & navigation guards
- **Subtopic: Routing UX & Performance**
  - Lazy-loaded routes & code splitting
  - Scroll restoration
  - Route transitions & pending UI
  - Persistent & nested layouts

## Topic: Routing Libraries & Ecosystem  *(optional)*
- **Subtopic: Routing Libraries**
  - React Router
  - TanStack Router
  - Lightweight routers (wouter)
- **Subtopic: Framework & File-Based Routing**
  - Next.js App & Pages Router
  - File-based routing

---

# STAGE 10 — Data Fetching & Server State

## Topic: Data Fetching Fundamentals
- **Subtopic: Making Requests**
  - The Fetch API
  - Axios
  - `async` / `await` in components
- **Subtopic: Fetching in Components**
  - Fetching in `useEffect`
  - Loading & error states
  - Aborting requests & cleanup
  - Parallel & sequential requests

## Topic: Server State Concepts
- **Subtopic: The Server-State Model**
  - Client state vs server state
  - Caching
  - Stale-while-revalidate
  - Request deduplication
  - Background refetching

## Topic: TanStack Query (React Query)
- **Subtopic: Querying Data**
  - `useQuery`
  - Query keys
  - Prefetching
- **Subtopic: Mutations & Cache**
  - `useMutation`
  - Cache invalidation
  - Optimistic updates
- **Subtopic: Advanced Query**
  - Pagination & infinite queries
  - Query DevTools

## Topic: SWR & Other Data Libraries  *(optional)*
- **Subtopic: SWR**
  - SWR basics
  - Mutation & revalidation
- **Subtopic: Other Data Libraries**
  - RTK Query
  - Apollo Client (GraphQL)
  - urql (GraphQL)

## Topic: GraphQL in React  *(optional)*
- **Subtopic: GraphQL Basics**
  - Queries & mutations
  - Subscriptions
  - GraphQL code generation
- **Subtopic: GraphQL Clients**
  - Apollo Client
  - Relay

## Topic: Real-time Data  *(optional)*
- **Subtopic: Real-time Transports**
  - WebSockets
  - Server-Sent Events
  - Polling
- **Subtopic: Real-time in Practice**
  - Realtime libraries (Socket.IO, Supabase, Firebase)
  - Live queries

---

# STAGE 11 — Performance Optimization

## Topic: Rendering Performance
- **Subtopic: Reducing Re-renders**
  - Avoiding unnecessary re-renders
  - `React.memo`
  - `useMemo` & `useCallback` for performance
- **Subtopic: Structural Optimizations**
  - Optimizing state structure
  - Context optimization
  - Key stability
  - Lifting content up (the `children` trick)

## Topic: Code Splitting & Lazy Loading
- **Subtopic: Splitting Code**
  - `React.lazy` & Suspense
  - Dynamic `import()`
- **Subtopic: Splitting Strategies**
  - Route-based splitting
  - Component-based splitting
  - Preloading & prefetching chunks

## Topic: List Virtualization  *(optional)*
- **Subtopic: Virtualizing Long Lists**
  - How virtualization works and when to use it `[decision]` *(merges “Why Virtualize”, “Tradeoffs & Pitfalls”)*
  - react-window
  - TanStack Virtual
  - Infinite scroll

## Topic: Concurrent Rendering for Performance  *(optional)*
- **Subtopic: Transitions & Deferred Values**
  - `useTransition` & `startTransition` *(merges “useTransition”, “startTransition”)*
  - `useDeferredValue`
- **Subtopic: Other Concurrent Wins**
  - Suspense for perceived performance
  - The React Compiler (auto-memoization)

## Topic: Bundle & Asset Optimization
- **Subtopic: Optimizing JavaScript**
  - Analyzing bundle size
  - Tree shaking
  - Dependency cost & alternatives
- **Subtopic: Optimizing Assets & Delivery**
  - Image optimization & lazy loading
  - Font optimization
  - Compression (gzip, brotli)

## Topic: Measuring & Profiling
- **Subtopic: Profiling React**
  - React Profiler
  - The Profiler API & `onRender`
  - why-did-you-render
- **Subtopic: Measuring Real Performance**
  - Browser performance tools
  - Core Web Vitals
  - Lighthouse audits

---

# STAGE 12 — TypeScript with React

## Topic: TypeScript Fundamentals for React
- **Subtopic: Core Types**
  - Basic types
  - Interfaces vs types
  - Union & intersection types
  - Type inference
- **Subtopic: Generics, Utilities & Config**
  - Generics
  - Utility types (Partial, Pick, Omit…)
  - `tsconfig` & setup

## Topic: Typing Components & Props
- **Subtopic: Typing Props**
  - Typing props
  - Typing `children` (`ReactNode`)
  - Default & optional props
- **Subtopic: Typing Component APIs**
  - `FC` vs explicit return types
  - Typing event handlers
  - Typing `style` & `className`
  - Polymorphic component types

## Topic: Typing Hooks
- **Subtopic: Typing Built-in Hooks**
  - Typing `useState`
  - Typing `useRef`
  - Typing `useReducer`
  - Typing `useContext`
- **Subtopic: Typing Custom Hooks**
  - Typing custom hooks
  - Generic hooks

## Topic: Advanced TypeScript Patterns  *(optional)*
- **Subtopic: Advanced Type Constructs**
  - Discriminated unions
  - Conditional & mapped types
  - Template literal types
  - Type guards & narrowing
- **Subtopic: Advanced React Typing**
  - Generic components
  - Module augmentation & declaration files
  - Typing third-party libraries

## Topic: TypeScript Tooling & Ecosystem  *(optional)*
- **Subtopic: TypeScript Tooling**
  - ESLint with TypeScript
  - Strict mode & compiler options
  - Type checking in CI
- **Subtopic: Typed APIs & Migration**
  - Typed API clients (zod, ts-rest, tRPC)
  - Migrating JS to TS

---

# STAGE 13 — Testing

## Topic: Testing Fundamentals
- **Subtopic: Testing Principles**
  - What to test in React, and why *(merges “Why Test?”, “What to Test in React”)*
  - Types of tests (unit, integration, e2e)
  - The testing pyramid & trophy
- **Subtopic: Testing Practices**
  - Test-driven development
  - Code coverage

## Topic: Test Runners & Setup
- **Subtopic: Runners & Configuration**
  - Jest
  - Vitest
  - Configuration & setup
- **Subtopic: Writing Tests**
  - Matchers & assertions
  - Mocking & spies
  - Snapshot testing

## Topic: React Testing Library
- **Subtopic: Rendering & Querying**
  - `render` & `screen`
  - Queries (`getBy`, `findBy`, `queryBy`)
  - Accessible queries (role, label)
- **Subtopic: Interactions, Async & Best Practices**
  - Simulating user events
  - Async testing (`waitFor`, `findBy`)
  - Testing hooks (`renderHook`)
  - Best practices & anti-patterns

## Topic: Mocking APIs & Modules
- **Subtopic: Mocking Network Requests**
  - Mock Service Worker (MSW)
  - Mocking fetch & axios
- **Subtopic: Mocking Modules & Time**
  - Module mocks
  - Fake timers
  - Mocking context & providers

## Topic: End-to-End Testing  *(optional)*
- **Subtopic: E2E Tools & Tests**
  - Cypress
  - Playwright
  - Writing E2E tests
- **Subtopic: Beyond E2E**
  - Component testing
  - Visual regression testing
  - E2E in CI

## Topic: Advanced Testing Topics  *(optional)*
- **Subtopic: Testing Complex Scenarios**
  - Integration testing strategies
  - Testing async state & data fetching
  - Testing routing
  - Testing forms
- **Subtopic: Specialized Testing**
  - Accessibility testing (axe)
  - Storybook & interaction tests

---

# STAGE 14 — Advanced React APIs

## Topic: Refs & DOM Manipulation
- **Subtopic: Accessing the DOM**
  - `createRef` & `useRef`
  - Accessing DOM nodes
  - Measuring & focusing DOM
- **Subtopic: Forwarding & Exposing Refs**
  - `forwardRef`
  - `ref` as a prop (React 19)
  - Callback refs
  - `useImperativeHandle`

## Topic: Portals
- **Subtopic: Using Portals**
  - `createPortal`
  - Modals, tooltips & overlays
- **Subtopic: Portal Behavior**
  - Event bubbling through portals
  - Focus management

## Topic: Error Boundaries
- **Subtopic: Building Error Boundaries**
  - What error boundaries are
  - Class implementation (`componentDidCatch`)
  - Fallback UI
- **Subtopic: Error Boundaries in Practice**
  - `react-error-boundary`
  - Resetting & retrying
  - Error logging

## Topic: Suspense
- **Subtopic: Suspense Basics**
  - What is Suspense
  - Fallbacks & boundaries
  - Suspense for lazy loading
- **Subtopic: Suspense for Data**
  - Suspense for data fetching
  - `use()` with Suspense
  - Streaming with Suspense

## Topic: Concurrent React  *(optional)*
- **Subtopic: Concurrent Rendering Model**
  - Concurrent rendering
  - Interruptible rendering
  - Automatic batching
- **Subtopic: Concurrency Concerns**
  - Transitions
  - Tearing & `useSyncExternalStore`

## Topic: Advanced Context & Composition  *(optional)*
- **Subtopic: Optimizing Context**
  - Context selectors
  - Avoiding re-renders
- **Subtopic: Structuring Context**
  - Composing multiple providers
  - Context module functions

## Topic: Other Advanced APIs  *(optional)*
- **Subtopic: Element APIs**
  - `createElement`
  - `cloneElement`
  - `isValidElement`
  - The `React.Children` API
- **Subtopic: Root & Low-Level APIs**
  - `createRoot` & `hydrateRoot`
  - `flushSync`
  - Resource preloading APIs (`preload`, `preinit`)

## Topic: Working with Browser APIs  *(optional)*
- **Subtopic: Storage APIs**
  - localStorage & sessionStorage
  - IndexedDB
- **Subtopic: Observer APIs**
  - Intersection Observer
  - Resize Observer
  - Mutation Observer
- **Subtopic: Device & Media APIs**
  - Geolocation
  - Media devices (`getUserMedia`)
  - Clipboard API
  - Notifications API
- **Subtopic: Performance & Page APIs**
  - Web Workers
  - Fullscreen & Page Visibility

---

# STAGE 15 — SSR & Meta-Frameworks

## Topic: Rendering Strategies
- **Subtopic: Rendering Modes**
  - Client-side rendering (CSR)
  - Server-side rendering (SSR)
  - Static site generation (SSG)
  - Incremental static regeneration (ISR)
- **Subtopic: Delivery & Choice**
  - Hydration
  - Streaming SSR
  - Choosing a rendering strategy `[decision]`

## Topic: Next.js
- **Subtopic: Routing & Layouts**
  - App Router
  - Pages Router
  - Routing & layouts
- **Subtopic: Data & Mutations**
  - Data fetching (fetch, caching)
  - Server Actions
  - Route handlers & API routes
- **Subtopic: Rendering & Optimization**
  - Rendering modes (SSR, SSG, ISR)
  - Metadata & SEO
  - Image & font optimization
- **Subtopic: Middleware & Deployment**
  - Middleware
  - Deployment

## Topic: Remix / React Router Framework  *(optional)*
- **Subtopic: Remix Routing & Data**
  - Routes, loaders & actions
  - Nested routing
  - Data flow & revalidation
- **Subtopic: Remix Forms & Errors**
  - Forms & mutations
  - Error handling

## Topic: Other Meta-Frameworks  *(optional)*
- **Subtopic: Alternative Frameworks**
  - Gatsby
  - Astro (with React)
  - TanStack Start
  - RedwoodJS
- **Subtopic: Choosing**
  - Choosing a framework `[decision]`

## Topic: SSR Concepts & Challenges
- **Subtopic: Server/Client Boundaries**
  - Hydration mismatches
  - Data serialization
  - Server vs client code (window checks)
- **Subtopic: Production SSR Concerns**
  - SEO & meta tags
  - Caching & CDNs
  - Authentication with SSR

---

# STAGE 16 — React Server Components & Modern React

## Topic: React Server Components (RSC)
- **Subtopic: The RSC Model**
  - What are Server Components
  - Server vs Client Components
  - Component boundaries
- **Subtopic: Directives & Composition**
  - The `'use client'` directive
  - The `'use server'` directive
  - Composing Server & Client Components
- **Subtopic: Data & Constraints**
  - Data fetching in RSC
  - Props serialization
  - Limitations & gotchas

## Topic: Server Actions & Mutations
- **Subtopic: Writing Server Actions**
  - Defining server actions
  - Forms with actions
  - Revalidation
- **Subtopic: Action UX & Security**
  - `useActionState`
  - Optimistic UI (`useOptimistic`)
  - Security considerations

## Topic: Streaming & Suspense in RSC  *(optional)*
- **Subtopic: Streaming & Hydration**
  - Streaming HTML
  - Selective hydration
- **Subtopic: Loading & Prerendering**
  - Loading UI & Suspense boundaries
  - Partial prerendering

## Topic: React 19 Features
- **Subtopic: New APIs**
  - Actions
  - The `use()` API
  - `ref` as a prop
  - Form hooks (`useFormStatus`, `useActionState`)
- **Subtopic: Built-in Capabilities**
  - Document metadata support
  - Asset loading & stylesheets
  - Improved error handling

## Topic: Modern React Architecture  *(optional)*
- **Subtopic: Server-First Thinking**
  - The server-first mindset
  - Data loading patterns
  - Full-stack React
- **Subtopic: Architecture Approaches**
  - Islands architecture
  - Progressive enhancement

---

# STAGE 17 — Animation & Gestures

## Topic: Animation Fundamentals
- **Subtopic: CSS-Based Animation**
  - CSS transitions in React
  - CSS keyframe animations
- **Subtopic: Animating with React**
  - Animating on state change
  - Enter & exit animations
  - Animation performance (transform, opacity)

## Topic: Framer Motion (Motion)
- **Subtopic: Motion Basics**
  - `motion` components
  - `animate`, `initial` & `exit`
  - Spring & tween transitions
- **Subtopic: Orchestration**
  - Variants
  - `AnimatePresence`
  - Layout animations
- **Subtopic: Interaction & Scroll**
  - Gestures (hover, tap, drag)
  - Scroll animations

## Topic: Other Animation Libraries  *(optional)*
- **Subtopic: Animation Libraries**
  - React Spring
  - GSAP
  - React Transition Group
  - AutoAnimate
  - Lottie (After Effects)
- **Subtopic: Choosing**
  - Choosing a library `[decision]`

## Topic: Advanced Animation & Interaction  *(optional)*
- **Subtopic: Advanced Motion**
  - Drag & drop
  - Scroll-driven animations
  - Shared layout / FLIP
- **Subtopic: Specialized Animation**
  - SVG animation
  - 3D with React Three Fiber
  - Reduced motion & accessibility

---

# STAGE 18 — Build Tools & Ecosystem

## Topic: Build Tools & Bundlers
- **Subtopic: Bundlers & Compilers**
  - Vite
  - Webpack
  - Rollup
  - esbuild
  - SWC & Babel
  - Turbopack
- **Subtopic: Build Configuration**
  - Module resolution & aliases
  - Environment variables

## Topic: Package Management
- **Subtopic: Managing Dependencies**
  - npm, yarn & pnpm
  - Semantic versioning
  - Lockfiles
- **Subtopic: Monorepos & Publishing**
  - Monorepos (Turborepo, Nx)
  - Workspaces
  - Publishing packages

## Topic: Developer Tooling
- **Subtopic: Linting & Formatting**
  - ESLint
  - Prettier
  - EditorConfig
  - Husky & lint-staged
- **Subtopic: Debugging Tools**
  - React DevTools
  - Debugging techniques

## Topic: Component Development & Docs  *(optional)*
- **Subtopic: Building Components in Isolation**
  - Storybook stories
  - Visual testing (Chromatic)
- **Subtopic: Systems & Documentation**
  - Design systems
  - Building component libraries
  - Documentation (Docusaurus, MDX)

## Topic: The React Ecosystem  *(optional)*
- **Subtopic: Frameworks & UI**
  - Meta-frameworks overview
  - UI component libraries
- **Subtopic: Utility & Data-Viz Libraries**
  - Utility libraries (lodash, date-fns)
  - Icon libraries
  - Charting libraries
  - Table libraries (TanStack Table)
  - Maps & visualization

---

# STAGE 19 — Architecture, Patterns & Best Practices

## Topic: Project Structure & Organization
- **Subtopic: Organizing Code**
  - Folder structures (feature, atomic)
  - Feature-based architecture
  - Colocation
- **Subtopic: Conventions & Scaling**
  - Barrel files & exports
  - Naming conventions
  - Monorepo structure

## Topic: Architecture Patterns  *(optional)*
- **Subtopic: Component Architecture**
  - Component architecture
  - Container / presentational
  - Atomic design
- **Subtopic: Application Architecture**
  - Separation of concerns
  - Layered architecture
  - Clean architecture in React
  - Micro-frontends

## Topic: Code Quality & Best Practices
- **Subtopic: Writing Clean React**
  - Clean code in React
  - DRY components
  - Common anti-patterns
- **Subtopic: Maintaining Quality**
  - Error handling patterns
  - Avoiding prop drilling
  - Refactoring strategies
  - Code reviews

## Topic: Accessibility (a11y)
- **Subtopic: Accessible Markup**
  - Semantic HTML
  - ARIA attributes
  - Accessible forms
- **Subtopic: Interaction & Assistive Tech**
  - Keyboard navigation
  - Focus management
  - Screen readers
- **Subtopic: Standards & Verification**
  - Color & contrast
  - WCAG guidelines
  - Accessibility testing

## Topic: React Security
- **Subtopic: Common Vulnerabilities**
  - Cross-site scripting (XSS)
  - `dangerouslySetInnerHTML` risks
  - CSRF protection
- **Subtopic: Securing the App**
  - Auth tokens & storage
  - Environment secrets
  - Dependency security
  - Content Security Policy

## Topic: Authentication & Authorization
- **Subtopic: Auth Foundations**
  - Authentication vs authorization
  - Login & signup flows
- **Subtopic: Tokens & Sessions**
  - JWT & tokens
  - Sessions & cookies
  - Token refresh & persistence
  - OAuth & social login
- **Subtopic: Authorization & Integration**
  - Role-based access control
  - Auth context & hooks
  - Auth providers (Auth0, Clerk, Firebase, Supabase)

## Topic: Internationalization (i18n)  *(optional)*
- **Subtopic: i18n Foundations**
  - i18n concepts
  - Pluralization & formatting
  - RTL support
- **Subtopic: i18n Tooling**
  - react-i18next
  - FormatJS / react-intl
  - Locale routing

---

# STAGE 20 — Deployment & CI/CD

## Topic: Building for Production
- **Subtopic: Production Builds**
  - Production builds
  - Environment configuration
  - Source maps
- **Subtopic: Deployment Targets**
  - Static vs server deployment
  - Build optimization

## Topic: Hosting Platforms
- **Subtopic: Static & Edge Hosting**
  - Vercel
  - Netlify
  - Cloudflare Pages
  - GitHub Pages
- **Subtopic: Server & Container Hosting**
  - AWS (S3, Amplify, CloudFront)
  - Docker & containers
  - Node servers (SSR hosting)

## Topic: CI/CD Pipelines
- **Subtopic: Building Pipelines**
  - GitHub Actions
  - Automated testing in CI
  - Build pipelines
- **Subtopic: Releasing Safely**
  - Preview deployments
  - Release strategies
  - Rollbacks

## Topic: Monitoring & Observability
- **Subtopic: Errors & Performance**
  - Error tracking (Sentry)
  - Performance monitoring (RUM)
  - Logging
- **Subtopic: Product Insights**
  - Analytics
  - Feature flags
  - A/B testing

## Topic: PWAs & Offline  *(optional)*
- **Subtopic: PWA Foundations**
  - Service workers
  - Web app manifest
  - Installability
- **Subtopic: Offline & Engagement**
  - Caching strategies
  - Offline support
  - Push notifications

---

# STAGE 21 — React Internals

## Topic: Fiber Architecture  *(optional)*
- **Subtopic: The Fiber Model**
  - What is Fiber
  - Fiber nodes & trees
  - Double buffering (current & workInProgress)
- **Subtopic: How Fiber Works**
  - The work loop
  - Render & commit phases (internal)
  - Scheduling & lane priorities
  - Time slicing

## Topic: Reconciliation Internals  *(optional)*
- **Subtopic: Diffing & Bailouts**
  - Diffing algorithm (internal)
  - Bailout optimization
  - Memoization internals
- **Subtopic: Keys & Effects**
  - Keys & list reconciliation
  - The effect list

## Topic: Hooks Internals  *(optional)*
- **Subtopic: How Hooks Are Stored**
  - The hook linked list
  - Where state is stored
  - Update queues
- **Subtopic: The Hook Dispatcher**
  - The dispatcher
  - Why the rules of hooks exist

## Topic: The Scheduler  *(optional)*
- **Subtopic: Scheduling Model**
  - Cooperative scheduling
  - Priority levels (lanes)
- **Subtopic: Scheduler Internals**
  - MessageChannel & tasks
  - Starvation & expiration

## Topic: Reading the React Source  *(optional)*
- **Subtopic: Navigating the Source**
  - Repository structure
  - Key packages (react, react-dom, scheduler)
  - react-reconciler
- **Subtopic: Extending & Contributing**
  - Custom renderers
  - Contributing to React

## Topic: Advanced Internals & Concepts  *(optional)*
- **Subtopic: Concurrency & Suspense Internals**
  - How concurrent features work
  - Suspense internals
  - Hydration internals
- **Subtopic: Modern Internals**
  - RSC wire protocol
  - React Compiler internals
  - The synthetic event system

---

# STAGE 22 — React Native & Cross-platform

## Topic: React Native Fundamentals  *(optional)*
- **Subtopic: RN Basics**
  - What is React Native
  - Core components (View, Text, Image)
  - Expo
- **Subtopic: Building RN UIs**
  - Styling (StyleSheet, Flexbox)
  - Touchables & gestures
  - Lists (FlatList, SectionList)
  - Platform differences (iOS / Android)

## Topic: Navigation & State in RN  *(optional)*
- **Subtopic: Navigation**
  - React Navigation
  - Stack, tab & drawer navigators
  - Deep linking
- **Subtopic: State & Data**
  - State management in RN
  - Data fetching in RN

## Topic: Native Features & APIs  *(optional)*
- **Subtopic: Device Capabilities**
  - Permissions
  - Camera & media
  - Maps & location
  - Push notifications
- **Subtopic: Storage & Native Code**
  - Async storage & databases
  - Native modules & bridging
  - Animations (Reanimated)

## Topic: RN Build & Deployment  *(optional)*
- **Subtopic: Building & Shipping**
  - Building for iOS & Android
  - App Store & Play Store submission
- **Subtopic: Updates & Testing**
  - Over-the-air updates (EAS Update)
  - CodePush
  - Testing React Native apps

## Topic: Cross-Platform & Beyond  *(optional)*
- **Subtopic: Web & Desktop**
  - React Native for Web
  - Expo Router
  - Desktop with Electron
  - Tauri
- **Subtopic: Sharing & 3D**
  - Code sharing strategies
  - React Three Fiber (3D)

---

# STAGE 23 — Enterprise Development & Enablement

## Topic: Enterprise React Strategy & Operating Model
- **Subtopic: Strategy & Roadmap**
  - React strategy & roadmap
  - React portfolio strategy
  - Executive sponsorship & steering
- **Subtopic: Operating Model**
  - React Center of Excellence (CoE)
  - React target operating model
  - React maturity model & assessment
  - Value streams & capability mapping

## Topic: Discovery & Requirements Engineering
- **Subtopic: Discovery & Business Case**
  - Use case discovery & ideation
  - Business case & ROI modeling
  - Feasibility & risk assessment
  - PoC-to-production criteria
- **Subtopic: Requirements & Stakeholders**
  - Stakeholder mapping & management
  - Requirements elicitation techniques
  - Success criteria, OKRs & KPIs
  - User research & jobs-to-be-done

## Topic: Solution Architecture Process
- **Subtopic: Architecture Governance**
  - Architecture Decision Records (ADRs)
  - Design Review Board (DRB)
  - Architecture review cadence
  - Technology radar practice
- **Subtopic: Designing Solutions**
  - Reference architectures catalog
  - Solution blueprints
  - Non-functional requirements (NFRs)
  - Capacity & quota planning
  - Threat modeling process (STRIDE)

## Topic: Engineering Standards & Quality
- **Subtopic: Standards & Reviews**
  - Enterprise coding standards
  - React style guide & linting
  - Peer review & code review process
  - Definition of done & ready
- **Subtopic: Quality Enforcement**
  - Quality gates & build promotion rules
  - Architectural fitness functions
  - Dependency & license policy
  - Engineering scorecards & health metrics

## Topic: Developer Platform & Paved Roads
- **Subtopic: Paved Roads & Golden Paths**
  - Internal Developer Portal (IDP)
  - React starter templates & scaffolds
  - Golden paths for React teams
  - Shared React libraries & SDKs
- **Subtopic: Platform as a Product**
  - Service catalog program
  - Self-service tooling & provisioning
  - Inner-source program
  - Developer Experience (DevEx) metrics
  - Platform-as-a-product mindset

## Topic: Vendor, Tool & Procurement
- **Subtopic: Sourcing Decisions**
  - Build vs buy vs partner analysis `[decision]`
  - Vendor due diligence
  - Tool rationalization & consolidation
- **Subtopic: Contracts & Partners**
  - Enterprise agreement management
  - Data Processing Agreements (DPAs)
  - Contract & SLA negotiation
  - MSP / partner management

## Topic: Enterprise Data Governance
- **Subtopic: Data Classification & Compliance**
  - Data classification & sensitivity tagging
  - Data residency & sovereignty controls
  - Consent & preference management
- **Subtopic: Data Quality & Ownership**
  - Data lineage & provenance
  - Data stewardship & ownership
  - Data quality management
  - Master & reference data management
  - Data contracts & producer-consumer SLAs

## Topic: Enterprise Risk & Compliance Program
- **Subtopic: Risk & Controls**
  - Enterprise risk register
  - Control libraries & mappings (NIST/ISO/CIS)
  - Third-party risk management (TPRM)
- **Subtopic: Compliance & Certification**
  - Audit readiness & evidence collection
  - SOC 2 / ISO 27001 / FedRAMP programs
  - PCI-DSS / HIPAA / GDPR program
  - Regulatory reporting & disclosures
  - Continuous compliance program

## Topic: Enterprise FinOps Program
- **Subtopic: Cost Visibility & Governance**
  - Cost allocation, showback & chargeback
  - Budget governance & guardrails
  - Internal rate card management
- **Subtopic: Forecasting & Optimization**
  - Cost forecasting & modeling
  - Unit economics per workload / customer
  - Tooling & license management
  - FinOps reporting & reviews

## Topic: Program & Portfolio Management
- **Subtopic: Intake & Prioritization**
  - Demand intake & prioritization
  - OKRs & roadmaps
  - Portfolio rebalancing & stage gates
- **Subtopic: Delivery Coordination**
  - Cross-team dependency mapping
  - Status reporting & cadences
  - Benefits realization tracking
  - Agile-at-scale (SAFe / LeSS / Scrum@Scale)

## Topic: Change Enablement & Culture
- **Subtopic: Change & Communications**
  - Organizational change management (OCM)
  - Communications & narrative strategy
  - Adoption & stickiness metrics
- **Subtopic: Skills & Community**
  - Training curricula & certifications
  - Communities of practice (CoPs)
  - React champions network
  - Workforce reskilling & job redesign

## Topic: Legal & Ethical Governance
- **Subtopic: Legal & Licensing**
  - IP, copyright & OSS licensing
  - Liability & indemnity frameworks
  - Open-source use & contribution governance
- **Subtopic: Policy & Ethics**
  - Acceptable Use Policy (AUP)
  - Responsible disclosure & VDP
  - Data Protection Impact Assessment (DPIA)
  - Sustainability & carbon governance

---

# STAGE 24 — Production-Grade Application Lifecycle

## Topic: Requirements & Design Phase
- **Subtopic: Discovery & Research**
  - Discovery workshops & event storming
  - Personas & job stories
  - Journey mapping & service blueprinting
- **Subtopic: Specification & Sign-Off**
  - PRDs, spec & brief templates
  - Lo-fi prototyping
  - Design sign-off & acceptance
  - Risk & impact assessment for features

## Topic: Implementation & Build Phase
- **Subtopic: Collaborative Build Practices**
  - Pairing, mobbing & ensemble programming
  - Refactoring discipline
  - Feature toggling during build
- **Subtopic: Source Control Workflow**
  - Trunk-based development practice
  - Branching strategy & release branches
  - Commit conventions & conventional commits
  - Code ownership & CODEOWNERS

## Topic: Testing & Validation Phase
- **Subtopic: Test Strategy**
  - Test strategy & pyramid
  - Acceptance criteria & BDD
  - Contract testing process (PACT/CDC)
  - Mutation testing program
- **Subtopic: Specialized Test Programs**
  - Performance & load test program
  - Security test program (SAST/DAST/IAST)
  - Accessibility testing program
  - User Acceptance Testing (UAT) process

## Topic: CI/CD & Release Engineering
- **Subtopic: Pipelines & Environments**
  - CI/CD pipeline design
  - Build promotion & environment stages
  - Environment strategy (Dev → Staging → Prod)
  - Preview / PR environments
- **Subtopic: Release & Supply Chain**
  - Release trains & cadence
  - Feature flag management at scale
  - Secrets management process
  - Supply-chain security (SLSA/SBOM)
  - Artifact & image versioning strategy

## Topic: Production Readiness & Launch
- **Subtopic: Readiness & Go/No-Go**
  - Production Readiness Review (PRR)
  - Launch readiness checklist
  - Go / no-go decision criteria
- **Subtopic: Rollout & Hypercare**
  - Dark launches & shadow mode
  - Gradual rollout (canary, ringed, blue-green)
  - Rollback & recovery strategy
  - Day-1 vs Day-2 operations plan
  - Hypercare & post-launch support

## Topic: Operations & SRE Program
- **Subtopic: Reliability Targets**
  - SLI/SLO/SLA design
  - Error budget policy
  - Reliability reviews & toil audits
- **Subtopic: On-Call & Resilience**
  - On-call program & schedules
  - Escalation paths & severity levels
  - Capacity & demand management
  - DR & business continuity planning
  - Chaos engineering program

## Topic: Observability Program
- **Subtopic: Telemetry & Signals**
  - Telemetry standards & conventions
  - Golden signals
  - Dashboards-as-code
- **Subtopic: Alerting & Data Management**
  - Alerting policy & symptom-based alerts
  - Log management policy
  - Retention & sampling policy
  - Observability platform ownership
  - Cost of telemetry & optimization

## Topic: Incident Management Process
- **Subtopic: Responding to Incidents**
  - Incident classification & severity matrix
  - Incident commander role & roster
  - War room & bridge call protocols
  - Status page & customer communications
- **Subtopic: Learning from Incidents**
  - Blameless postmortem process
  - Action item tracking & closure
  - Incident metrics (MTTD/MTTA/MTTR)
  - Major incident reviews

## Topic: Support & Maintenance Program
- **Subtopic: Support Operations**
  - Tiered support model (L1/L2/L3)
  - Bug triage & backlog hygiene
  - SLA management & reporting
  - Knowledge base maintenance
- **Subtopic: Maintenance & Lifecycle**
  - Patch & vulnerability management cadence
  - Dependency upgrade program
  - React runtime / version policy
  - Decommissioning & sunsetting process

## Topic: Continuous Improvement & Evolution
- **Subtopic: Feedback & Learning**
  - User & operator feedback loops
  - Post-launch reviews & beta graduations
  - Retrospectives & improvement cadence
  - A/B experimentation program
- **Subtopic: Evolving the System**
  - Technical debt management program
  - Evolutionary architecture practice
  - Version deprecation & migration policy

---

# Proposed tree — totals

| Level | Old | New |
| --- | --- | --- |
| Stages | 24 | 24 (unchanged) |
| Topics | 146 | 146 |
| Subtopics | (none — leaves were depth-1) | **317** (new grouping layer) |
| Sub-subtopics (content pages) | 24 possible / 8 authored | **960** |

- `[doc]` preserved existing content: **8** (all JS-Essentials).
- `[decision]` selection/comparison pages: **15**.
- `[new]` added leaves: **1**.

The key change: every clickable leaf is now a depth-2 **sub-subtopic** that can
hold content, grouped under a meaningful **subtopic** — instead of 965 depth-1
leaves that the data model could never give a content page.

---

# Implementation plan (after you approve this tree)

Once you approve the structure above, implementation is mechanical and runs as
its own phase (no content authoring — structure only):

1. **Generate `topic.json` files** for all 146 topics, 317 subtopics, and 963
   sub-subtopics with correct `parentId` chains, `order`, `level`
   (beginner/intermediate/advanced by stage), and `tags`.
2. **Rewrite `roadmap.json`** — stages unchanged; node→topic links verified.
3. **Preserve the 8 content docs** by keeping their folder ids verbatim
   (`destructuring--object`, `js-essentials--array-methods--map`, …) and slotting
   them under the new Destructuring / Array Methods subtopics.
4. **Remove orphaned old folders** that no longer map to a node in the new tree.
5. Run `npm run gen:content`, then `npm run lint` / `npm run build` to confirm
   the tree loads and renders.
6. Spot-check the rebuilt `public/data/subjects/react.json` tree depth.

I will present this as the next part for approval (with the exact ID scheme)
before writing any JSON.
