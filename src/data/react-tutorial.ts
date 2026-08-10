import type { CourseModule } from './tutorial-types'

export const courseResources = [
  { label: 'React Docs — react.dev', url: 'https://react.dev/' },
  { label: 'MDN Web Docs', url: 'https://developer.mozilla.org/' },
]

export const sectionOrder = [
  'Foundations',
  'Core Skills',
  'Data & Effects',
  'App Structure',
  'Polish & Practice',
  'Capstone',
]

export const modules: CourseModule[] = [
  // ─── Section 1: Foundations ──────────────────────────────────────────────
  {
    id: 'l-1',
    slug: 'why-react-and-setup',
    number: '01',
    section: 'Foundations',
    title: 'Why React? & Environment Setup',
    description: 'What a UI library solves that plain JS/DOM manipulation doesn\'t, and getting a project running.',
    body: [
      'Direct DOM manipulation gets unwieldy fast once a page has more than a few interactive pieces — React\'s pitch is describing what the UI should look like for a given state, and letting the library handle updating the DOM to match.',
      'This lesson installs Node, scaffolds a project with Vite, and gets the dev server running — the last purely-setup lesson before writing any components.',
    ],
    concepts: ['UI library vs. DOM manipulation', 'Node.js', 'Vite scaffolding', 'Dev server'],
    resources: [{ label: 'Vite Docs', url: 'https://vitejs.dev/' }],
  },
  {
    id: 'l-2',
    slug: 'jsx-and-first-component',
    number: '02',
    section: 'Foundations',
    title: 'JSX & Your First Component',
    description: 'JSX as syntax sugar, function components, and the one-component-per-file convention.',
    body: [
      'JSX looks like HTML inside JavaScript, but it\'s syntax sugar that compiles down to React.createElement() calls — understanding that equivalence demystifies a lot of "why does this JSX rule exist" confusion later.',
      'A function component is just a function that returns markup. This lesson writes the first one and establishes the one-component-per-file convention used for the rest of the course.',
    ],
    concepts: ['JSX', 'React.createElement()', 'Function components', 'One component per file'],
  },
  {
    id: 'l-3',
    slug: 'composing-components',
    number: '03',
    section: 'Foundations',
    title: 'Composing Components',
    description: 'Nesting components and thinking in a component tree.',
    body: [
      'A page becomes a tree of nested components rather than one large file — this lesson practices splitting a page into logical pieces and reasoning about the resulting component tree.',
      'This mental model — trees of small, focused components — is the foundation everything else in the course builds on, from props to routing.',
    ],
    concepts: ['Component nesting', 'Component tree', 'Splitting pages into pieces'],
  },

  // ─── Section 2: Core Skills ──────────────────────────────────────────────
  {
    id: 'l-4',
    slug: 'props',
    number: '04',
    section: 'Core Skills',
    title: 'Props',
    description: 'Passing data down to child components.',
    body: [
      'Props pass data from a parent component into a child, by convention shaped consistently and given sensible default values.',
      'Props are read-only — a child component should never mutate a prop it receives. This lesson calls out that rule explicitly since it\'s an easy one for beginners to break by accident.',
    ],
    concepts: ['Props', 'Default values', 'Read-only data flow'],
    tip: 'Never mutate a prop from inside a child component — if a child needs to change something, it should call a function passed down from the parent instead.',
  },
  {
    id: 'l-5',
    slug: 'state-with-usestate',
    number: '05',
    section: 'Core Skills',
    title: 'State with useState',
    description: 'The difference between state and props, and triggering re-renders.',
    body: [
      'State is data a component owns and can change over time; props are data handed down from outside. Calling the setter function from useState is what actually triggers a re-render.',
      'The most common beginner mistake here is mutating state directly (e.g. pushing into an array in place) instead of calling the setter — React won\'t notice the change and the UI won\'t update.',
    ],
    concepts: ['useState', 'State vs. props', 'Re-renders'],
    tip: 'Always update state through its setter function — mutating state directly won\'t trigger a re-render, even though the underlying data technically changed.',
  },
  {
    id: 'l-6',
    slug: 'handling-events',
    number: '06',
    section: 'Core Skills',
    title: 'Handling Events',
    description: 'onClick, onChange, and passing handler functions.',
    body: [
      'Event handlers — onClick, onChange, and similar — are passed as functions, not called directly, a distinction that trips up nearly every beginner at least once.',
      'This lesson also covers closures capturing stale state: a handler defined in one render can "remember" an old state value if it\'s not written carefully.',
    ],
    concepts: ['onClick / onChange', 'Passing handler functions', 'Stale closures'],
    tip: 'A handler can capture a stale value of state from the render it was created in — if a click handler seems to use an "old" value, stale closures are the first thing to check.',
  },
  {
    id: 'l-7',
    slug: 'forms-and-controlled-inputs',
    number: '07',
    section: 'Core Skills',
    title: 'Forms & Controlled Inputs',
    description: 'Controlled vs. uncontrolled inputs, and basic validation.',
    body: [
      'A controlled input syncs its value to state on every keystroke, giving the component full control over what the input displays; an uncontrolled input just reads the DOM directly when needed.',
      'This lesson builds a controlled form and adds basic validation before allowing submission.',
    ],
    concepts: ['Controlled vs. uncontrolled inputs', 'Syncing input to state', 'Basic validation'],
  },

  // ─── Section 3: Data & Effects ───────────────────────────────────────────
  {
    id: 'l-8',
    slug: 'rendering-lists-and-keys',
    number: '08',
    section: 'Data & Effects',
    title: 'Rendering Lists & Keys',
    description: 'Using .map() to render arrays, and why key matters.',
    body: [
      '.map() turns an array of data into an array of elements. Each element needs a stable key — not just to silence a console warning, but because React uses it to match elements across re-renders during reconciliation.',
      'Using the array index as a key works until the list order can change — inserting, removing, or reordering items with an index key can cause React to mismatch state between items.',
    ],
    concepts: ['.map() rendering', 'key prop', 'Reconciliation'],
    tip: 'Avoid using array index as a key for any list whose order can change — use a stable, unique ID from the data instead.',
  },
  {
    id: 'l-9',
    slug: 'side-effects-with-useeffect',
    number: '09',
    section: 'Data & Effects',
    title: 'Side Effects with useEffect',
    description: 'Running code outside the render cycle, dependency arrays, and cleanup.',
    body: [
      'useEffect runs code outside of rendering — for things like subscriptions or manual DOM work. The dependency array controls when it re-runs, and a cleanup function undoes anything the effect set up.',
      'The most common mistake is a missing dependency, which causes the effect to close over a stale value the same way an event handler can.',
    ],
    concepts: ['useEffect', 'Dependency array', 'Cleanup functions'],
    tip: 'A missing dependency in the dependency array is the most common source of a "why is this stale" bug in an effect — when in doubt, include everything the effect reads.',
  },
  {
    id: 'l-10',
    slug: 'fetching-data-from-an-api',
    number: '10',
    section: 'Data & Effects',
    title: 'Fetching Data from an API',
    description: 'Loading/error/success states, and avoiding race conditions.',
    body: [
      'Fetching inside useEffect means tracking three states explicitly: loading, error, and success — the UI needs to render something reasonable for each.',
      'A race condition can happen if a component unmounts (or the input changes) while a request is still in flight — the cleanup function from the previous lesson is what prevents updating state on an unmounted component.',
    ],
    concepts: ['fetch in useEffect', 'Loading/error/success states', 'Race conditions'],
    tip: 'If a fetch can be triggered again before the previous one resolves (e.g. fast typing into a search box), guard against a stale response overwriting a newer one.',
  },

  // ─── Section 4: App Structure ────────────────────────────────────────────
  {
    id: 'l-11',
    slug: 'routing-with-react-router',
    number: '11',
    section: 'App Structure',
    title: 'Routing with React Router',
    description: 'Client-side routing, route params, and nested routes.',
    body: [
      'Client-side routing swaps which component renders based on the URL without a full page reload — this lesson covers basic routes, reading route params, and nesting routes for shared layout.',
      'Using a Link component instead of a plain anchor tag is what keeps navigation client-side — a plain <a> tag triggers a full page reload and loses all React state.',
    ],
    concepts: ['Client-side routing', 'Route params', 'Nested routes', 'Link vs. <a>'],
    tip: 'Use the router\'s Link component for internal navigation, not a plain <a> tag — an anchor tag forces a full page reload and throws away all in-memory state.',
    resources: [{ label: 'React Router Docs', url: 'https://reactrouter.com/' }],
  },
  {
    id: 'l-12',
    slug: 'sharing-state-with-context',
    number: '12',
    section: 'App Structure',
    title: 'Sharing State with Context',
    description: 'createContext/useContext, and when prop-drilling becomes a real problem.',
    body: [
      'Prop-drilling — passing a prop through several layers of components that don\'t use it themselves, just to reach a deeply nested child — is the problem Context solves.',
      'This lesson is equally about when not to reach for Context: most component state should stay local, and reaching for Context by default adds indirection the app doesn\'t need yet.',
    ],
    concepts: ['createContext / useContext', 'Prop-drilling', 'When to keep state local'],
    tip: 'Context isn\'t a general-purpose state manager — most state should stay local to the component that needs it. Reach for Context only when several distant components genuinely need the same data.',
  },
  {
    id: 'l-13',
    slug: 'component-composition-patterns',
    number: '13',
    section: 'App Structure',
    title: 'Component Composition Patterns',
    description: 'Children as props, and lifting state up when siblings need to share data.',
    body: [
      'Passing components as children (children as props) is a composition pattern that avoids prop-drilling for layout-shaped problems, compared against render-props and hooks-based composition.',
      'Lifting state up — moving state to the nearest shared parent — is the standard fix when two sibling components need to stay in sync.',
    ],
    concepts: ['Children as props', 'Render props', 'Lifting state up'],
  },

  // ─── Section 5: Polish & Practice ────────────────────────────────────────
  {
    id: 'l-14',
    slug: 'custom-hooks',
    number: '14',
    section: 'Polish & Practice',
    title: 'Custom Hooks',
    description: 'Extracting reusable stateful logic behind a useX function.',
    body: [
      'A custom hook is just a function that calls other hooks, named with a use prefix so React (and other developers) recognize it follows the rules of hooks.',
      'This lesson extracts a piece of stateful logic used in an earlier lesson into a reusable custom hook, and covers why hooks can\'t be called conditionally.',
    ],
    concepts: ['Custom hooks', 'useX naming convention', 'Rules of hooks'],
    tip: 'Hooks can\'t be called conditionally, in loops, or after an early return — they must run in the same order on every render, which is what lets React track their state correctly.',
  },
  {
    id: 'l-15',
    slug: 'styling-approaches',
    number: '15',
    section: 'Polish & Practice',
    title: 'Styling Approaches',
    description: 'CSS Modules vs. plain CSS vs. a utility framework, and conditional class names.',
    body: [
      'This lesson compares CSS Modules, plain CSS, and utility-first frameworks at a survey level — the goal is understanding the tradeoffs well enough to pick one per team preference, not mastering all three.',
      'Conditionally applying a class name based on state or props is covered as the one styling pattern that comes up regardless of which approach a team picks.',
    ],
    concepts: ['CSS Modules', 'Utility-first CSS', 'Conditional class names'],
  },
  {
    id: 'l-16',
    slug: 'testing-basics',
    number: '16',
    section: 'Polish & Practice',
    title: 'Testing Basics',
    description: 'Component testing with React Testing Library, testing behavior over implementation.',
    body: [
      'React Testing Library encourages testing what a user would actually see and do — clicking a button, reading rendered text — rather than reaching into component internals.',
      'This lesson is intentionally scoped to the basics: enough to write a meaningful test for a simple component, not a full testing-strategy deep-dive.',
    ],
    concepts: ['React Testing Library', 'Testing behavior vs. implementation'],
    resources: [{ label: 'Testing Library Docs', url: 'https://testing-library.com/' }],
  },

  // ─── Section 6: Capstone ─────────────────────────────────────────────────
  {
    id: 'l-17',
    slug: 'capstone-part-1',
    number: '17',
    section: 'Capstone',
    title: 'Capstone Build, Part 1',
    description: 'Planning a multi-page app before writing any code.',
    body: [
      'Before writing code, this lesson plans the capstone app: what routes it needs, what data each page depends on, and how to break the UI into components.',
      'The rest of the lesson scaffolds that planned structure — routes and empty component shells — as the starting point for Part 2.',
    ],
    concepts: ['App planning', 'Route + data mapping', 'Component breakdown'],
  },
  {
    id: 'l-18',
    slug: 'capstone-part-2-and-deployment',
    number: '18',
    section: 'Capstone',
    title: 'Capstone Build, Part 2 & Deployment',
    description: 'Wiring the app end-to-end and a basic deploy walkthrough.',
    body: [
      'This lesson wires the planned capstone app end-to-end — routing, state, and data fetching all working together — then walks through a basic build and deploy to a static host.',
      'The course wraps up here, with pointers to state-management libraries and SSR frameworks like Next.js as optional next steps beyond this course\'s scope.',
    ],
    concepts: ['End-to-end wiring', 'Build & deploy', 'Next steps beyond this course'],
  },
]
