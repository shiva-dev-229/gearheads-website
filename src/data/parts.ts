// ─── Parts page config ──────────────────────────────────────────────────────
// Single source of truth for the Parts page. To add a new part: create a folder
// under src/assets/parts/final/<folder>/ holding <part>.json (the team's part
// submission), the part's .stl, and a .png preview, then add an entry to PARTS
// below. No other file needs to change.

import mizumiInfo from '../assets/parts/final/mizumi slides/mizumi.json'
import hubProtInfo from '../assets/parts/final/hub protection plates/hub_prot.json'
import batteryInfo from '../assets/parts/final/battery holders/battery.json'

export const TEAM_EMAIL = 'ftcgearheads@gmail.com'
export const PRODUCTION_HUB_URL = '/outreach/production-hub#form'

export type PartCategory = 'Linear Slides' | 'Protection' | 'Battery Holders'

export const CATEGORIES: PartCategory[] = ['Linear Slides', 'Protection', 'Battery Holders']

interface PartSubmission {
  name_of_owner: string
  name_of_part: string
  description: string
  materials: string[]
  print_fabrication_notes: string
  code: { file_type: string; name: string; code: string }[]
}

export interface PartCodeFile {
  name: string
  language: string
  code: string
}

export interface PartVariant {
  id: string
  label: string
  stlFile: string
}

export interface Part {
  id: string
  name: string
  description: string
  category: PartCategory
  /** Team member who designed the part. */
  owner: string
  /** Folder under src/assets/parts/final/ holding this part's files. */
  assetFolder: string
  stlFile: string
  /** Static preview shown on the card. */
  imageFile: string
  /** Alternate builds of the same part, each with its own STL. First is the default. */
  variants?: PartVariant[]
  /** Google Drive link with the part's files + code, or null if not set yet. */
  driveUrl: string | null
  emailSubject: string
  materials: string[]
  printNotes: string
  code: PartCodeFile[]
}

function fromSubmission(
  submission: PartSubmission,
  extra: Pick<Part, 'id' | 'category' | 'assetFolder' | 'stlFile' | 'imageFile' | 'driveUrl'> & Pick<Partial<Part>, 'variants'>,
): Part {
  return {
    ...extra,
    name: submission.name_of_part,
    description: submission.description,
    owner: submission.name_of_owner,
    emailSubject: `Part request — ${submission.name_of_part}`,
    materials: submission.materials,
    printNotes: submission.print_fabrication_notes,
    code: submission.code
      .filter((file) => file.name && file.code)
      .map((file) => ({ name: file.name, language: file.file_type, code: file.code })),
  }
}

export const PARTS: Part[] = [
  fromSubmission(mizumiInfo, {
    id: 'misumi-slides',
    category: 'Linear Slides',
    assetFolder: 'mizumi slides',
    stlFile: 'mizumi.stl',
    imageFile: 'mizumi.png',
    driveUrl: null,
  }),
  fromSubmission(hubProtInfo, {
    id: 'hub-protection-plates',
    category: 'Protection',
    assetFolder: 'hub protection plates',
    stlFile: 'hub_prot.stl',
    imageFile: 'hub_prot.png',
    driveUrl: null,
  }),
  fromSubmission(batteryInfo, {
    id: 'battery-holders',
    category: 'Battery Holders',
    assetFolder: 'battery holders',
    stlFile: 'slim-battery-holder-vertical.stl',
    imageFile: 'battery.png',
    driveUrl: null,
    variants: [
      { id: 'slim-vertical', label: 'Slim · Vertical', stlFile: 'slim-battery-holder-vertical.stl' },
      { id: 'slim-horizontal', label: 'Slim · Horizontal', stlFile: 'slim-battery-holder-horizontal.stl' },
      { id: 'wide-vertical', label: 'Wide · Vertical', stlFile: 'wide-battery-holder-vertical.stl' },
      { id: 'wide-horizontal', label: 'Wide · Horizontal', stlFile: 'wide-battery-holder-horizontal.stl' },
    ],
  }),
]
