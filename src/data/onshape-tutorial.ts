import type { CourseModule } from './tutorial-types'

export const courseResources = [
  { label: 'Onshape Learning Center', url: 'https://learn.onshape.com/' },
  { label: 'Onshape for Education', url: 'https://www.onshape.com/en/education' },
]

export const sectionOrder = [
  'Foundations',
  'Part Modeling',
  'Assemblies',
  'FTC-Specific Workflow',
  'Documentation & Collaboration',
  'Capstone',
]

export const modules: CourseModule[] = [
  // ─── Section 1: Foundations ──────────────────────────────────────────────
  {
    id: 'l-1',
    slug: 'why-cad-and-the-onshape-workspace',
    number: '01',
    section: 'Foundations',
    title: 'Why CAD & the Onshape Workspace',
    description: 'What CAD solves versus sketching on paper, and a tour of the Onshape workspace.',
    body: [
      'CAD replaces paper sketches with a precise, editable 3D model — change one dimension and every downstream feature updates instead of needing a redraw.',
      'Onshape is cloud-native: documents, workspaces, and versions are always saved automatically. This lesson tours the toolbar, feature list, and Part Studio before modeling anything.',
    ],
    concepts: ['CAD vs. paper sketching', 'Documents/workspaces/versions', 'Part Studio'],
  },
  {
    id: 'l-2',
    slug: 'sketching-fundamentals',
    number: '02',
    section: 'Foundations',
    title: 'Sketching Fundamentals',
    description: 'Sketch planes, basic geometry, and fully-constrained vs. under-constrained sketches.',
    body: [
      'Every sketch lives on a plane and starts with basic geometry — lines, circles, rectangles. Every dimension should be driven by a constraint, not eyeballed by dragging until it looks right.',
      'A fully-constrained sketch has no remaining freedom to drag; an under-constrained one does. Leaving geometry draggable is a common beginner trap that causes features built later to shift unexpectedly.',
    ],
    concepts: ['Sketch planes', 'Basic geometry', 'Fully- vs. under-constrained sketches'],
    tip: 'Leaving a sketch under-constrained (still draggable) is the most common beginner trap — it looks correct until something upstream changes and the whole sketch shifts.',
  },
  {
    id: 'l-3',
    slug: 'sketch-relations-and-dimensions',
    number: '03',
    section: 'Foundations',
    title: 'Sketch Relations & Dimensions',
    description: 'Coincident/parallel/tangent relations, and a consistent dimensioning strategy.',
    body: [
      'Relations like coincident, parallel, and tangent constrain geometry to behave predictably as it\'s edited, on top of raw dimensions.',
      'This lesson covers dimensioning from a consistent origin or datum rather than chaining dimensions off whatever was drawn last, then edits a dimension to watch the sketch update live.',
    ],
    concepts: ['Coincident / parallel / tangent relations', 'Dimensioning from a datum', 'Live sketch updates'],
  },

  // ─── Section 2: Part Modeling ─────────────────────────────────────────────
  {
    id: 'l-4',
    slug: 'extrude-and-basic-features',
    number: '04',
    section: 'Part Modeling',
    title: 'Extrude & Basic Features',
    description: 'Turning a 2D sketch into a 3D part.',
    body: [
      'Extrude turns a flat sketch into a solid — this lesson covers blind, through-all, and symmetric extrude options, and the difference between adding and removing material.',
      'This is the first lesson that produces an actual 3D part, building directly on the sketching fundamentals from Section 1.',
    ],
    concepts: ['Extrude', 'Blind / through-all / symmetric', 'Add vs. remove material'],
  },
  {
    id: 'l-5',
    slug: 'revolve-fillets-and-patterns',
    number: '05',
    section: 'Part Modeling',
    title: 'Revolve, Fillets & Patterns',
    description: 'Cylindrical parts, edge cleanup, and repeated features.',
    body: [
      'Revolve builds cylindrical parts by spinning a profile around an axis. Fillets and chamfers clean up edges — real hardware needs them, since sharp edges are hard to manufacture or 3D print cleanly.',
      'Linear and circular patterns repeat a feature efficiently — a row of mounting holes, for example — instead of manually sketching each one.',
    ],
    concepts: ['Revolve', 'Fillets & chamfers', 'Linear & circular patterns'],
    tip: 'Sharp edges aren\'t just a cosmetic detail — they\'re genuinely hard to manufacture or 3D print cleanly. Add fillets/chamfers on real parts, not just for looks.',
  },
  {
    id: 'l-6',
    slug: 'reading-and-editing-the-feature-tree',
    number: '06',
    section: 'Part Modeling',
    title: 'Reading & Editing the Feature Tree',
    description: 'The feature tree as build history, and the fragility of editing early features.',
    body: [
      'The feature tree is a build history, not just a list of parts — you can roll back to any earlier point and insert a new feature there.',
      'The common pitfall: editing an early sketch can break every feature built on top of it. This "feature-tree fragility" is worth understanding before a model gets complex.',
    ],
    concepts: ['Feature tree as build history', 'Rolling back to insert a feature', 'Feature-tree fragility'],
    tip: 'Editing an early sketch can silently break every feature built on top of it — expect to check the whole tree after changing something foundational, not just the feature you touched.',
  },

  // ─── Section 3: Assemblies ────────────────────────────────────────────────
  {
    id: 'l-7',
    slug: 'intro-to-assemblies-and-mates',
    number: '07',
    section: 'Assemblies',
    title: 'Intro to Assemblies & Mates',
    description: 'Part Studio vs. Assembly context, and basic mates.',
    body: [
      'An Assembly is a different context from a Part Studio — parts get inserted into it, one designated fixed and the rest floating until mated.',
      'This lesson covers the basic mate types: fastened, revolute, and slider — enough to build a simple moving mechanism.',
    ],
    concepts: ['Part Studio vs. Assembly', 'Fixed vs. floating parts', 'Fastened / revolute / slider mates'],
  },
  {
    id: 'l-8',
    slug: 'degrees-of-freedom-and-mate-connectors',
    number: '08',
    section: 'Assemblies',
    title: 'Degrees of Freedom & Mate Connectors',
    description: 'What a mate actually constrains, and diagnosing an over- or under-constrained assembly.',
    body: [
      'A mate removes specific degrees of freedom — understanding which ones is what makes diagnosing an over- or under-constrained assembly possible instead of guesswork.',
      'Mate connectors give a part precise, reusable attachment points, instead of mating raw faces that can be ambiguous or change if the part is edited.',
    ],
    concepts: ['Degrees of freedom', 'Over-/under-constrained assemblies', 'Mate connectors'],
    tip: 'Mate to a mate connector instead of a raw face wherever possible — it\'s more precise and survives part edits that would otherwise break a face-based mate.',
  },
  {
    id: 'l-9',
    slug: 'motion-and-interference-checking',
    number: '09',
    section: 'Assemblies',
    title: 'Motion & Interference Checking',
    description: 'Previewing range of motion, and catching collisions before anything is built.',
    body: [
      'Dragging a revolute-mated part previews its range of motion directly in the assembly — a fast way to sanity-check a mechanism before committing to it.',
      'Onshape\'s interference-detection tool catches parts that physically collide, well before anything reaches a 3D printer or a machine shop.',
    ],
    concepts: ['Range-of-motion preview', 'Interference detection'],
  },

  // ─── Section 4: FTC-Specific Workflow ─────────────────────────────────────
  {
    id: 'l-10',
    slug: 'importing-standard-ftc-hardware',
    number: '10',
    section: 'FTC-Specific Workflow',
    title: 'Importing Standard FTC Hardware',
    description: 'Pulling REV/goBILDA parts from public CAD libraries instead of modeling from scratch.',
    body: [
      'Standard FTC hardware — motors, servos, structural extrusion — is already modeled in public part libraries or vendor-provided CAD. Pulling those in is faster and more accurate than remodeling from scratch.',
      'Modeling standard hardware by hand wastes time and introduces small dimensional errors that compound once other parts mate against it.',
    ],
    concepts: ['Public part libraries', 'Vendor CAD imports', 'Avoiding remodeling standard hardware'],
    resources: [
      { label: 'REV Robotics', url: 'https://www.revrobotics.com/' },
      { label: 'goBILDA', url: 'https://www.gobilda.com/' },
    ],
  },
  {
    id: 'l-11',
    slug: 'designing-around-standard-mounting-patterns',
    number: '11',
    section: 'FTC-Specific Workflow',
    title: 'Designing Around Standard Mounting Patterns',
    description: 'Matching hole spacing to real hardware, and leaving service clearance.',
    body: [
      'A custom mount needs to match real hardware\'s hole spacing and sizing — extrusion pattern spacing, a servo horn\'s bolt circle — not an approximation.',
      'This lesson also covers leaving clearance for wiring and tools. The common pitfall: a mount that looks correct in CAD but doesn\'t actually clear a bolt head or wire harness once built.',
    ],
    concepts: ['Hole spacing & sizing', 'Service clearance', 'CAD-vs-reality mounting mismatches'],
    tip: 'A mount that looks perfect in CAD can still fail to clear a bolt head or wire harness in real life — check clearance for tools and wiring, not just for the part itself.',
  },

  // ─── Section 5: Documentation & Collaboration ─────────────────────────────
  {
    id: 'l-12',
    slug: 'drawings-and-bill-of-materials',
    number: '12',
    section: 'Documentation & Collaboration',
    title: 'Drawings & Bill of Materials',
    description: 'Generating a dimensioned drawing and an auto-generated BOM.',
    body: [
      'A dimensioned drawing generated from a part or assembly is what manufacturing (or an engineering-portfolio entry) actually needs — a judge or machinist usually can\'t work from the 3D model alone.',
      'An assembly can also auto-generate a bill of materials, saving the manual work of listing every part and its source.',
    ],
    concepts: ['Dimensioned drawings', 'Bill of materials (BOM)', 'Drawings for judges/machinists'],
  },
  {
    id: 'l-13',
    slug: 'versions-branching-and-collaboration',
    number: '13',
    section: 'Documentation & Collaboration',
    title: 'Versions, Branching & Team Collaboration',
    description: 'Onshape\'s version history and branching, and in-browser design review.',
    body: [
      'Onshape\'s version history and branching solve the same problem Git solves for code — parallel work without overwriting a teammate\'s changes — through a different, CAD-specific mechanism.',
      'This lesson also covers commenting on and reviewing a teammate\'s design directly in-browser, without exporting files back and forth.',
    ],
    concepts: ['Version history', 'Branching', 'In-browser design review'],
    tip: 'This is the same core problem the Git Tutorial solves for code — parallel work without overwriting each other — just solved with Onshape-native versioning instead of commits and branches.',
    resources: [{ label: 'GEarheads Git Tutorial', url: '/resources/git/repository-basics' }],
  },

  // ─── Section 6: Capstone ───────────────────────────────────────────────────
  {
    id: 'l-14',
    slug: 'capstone-subsystem-part-1-design',
    number: '14',
    section: 'Capstone',
    title: 'Capstone Subsystem, Part 1 — Design',
    description: 'Planning and building a subsystem against real constraints.',
    body: [
      'This lesson plans a subsystem — a claw or arm assembly — against real constraints: game rules and the existing robot\'s geometry, not a blank slate.',
      'It then builds the part(s) and assembly using every technique from Sections 2 through 4: features, mates, and standard-hardware imports together for the first time.',
    ],
    concepts: ['Subsystem planning', 'Real design constraints', 'Applying prior techniques together'],
  },
  {
    id: 'l-15',
    slug: 'capstone-subsystem-part-2-document-and-review',
    number: '15',
    section: 'Capstone',
    title: 'Capstone Subsystem, Part 2 — Document & Review',
    description: 'Producing a build-ready drawing/BOM, and a design-review pass.',
    body: [
      'This lesson produces a drawing and BOM ready to hand to whoever is building the subsystem, then runs a design-review pass checking for interferences, missing constraints, and manufacturability.',
      'The course wraps up here, with pointers to FeatureScript, configurations, and top-down assembly design as optional next steps beyond this course\'s scope.',
    ],
    concepts: ['Build-ready documentation', 'Design review', 'Next steps beyond this course'],
  },
]
