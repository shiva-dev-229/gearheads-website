export interface Resource {
  label: string
  url: string
}

export interface CourseModule {
  id: string
  slug: string
  number: string
  section?: string
  title: string
  meta?: string
  description: string
  body: string[]
  youtubeId?: string
  concepts: string[]
  tip?: string
  resources?: Resource[]
}
