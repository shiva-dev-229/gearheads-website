import { MdSportsScore } from 'react-icons/md'
import VideoCourseTutorial from '../../components/tutorial/VideoCourseTutorial'
import { modules, courseResources } from '../../data/qualifier-prep'

export default function QualifierPrepPage() {
  return (
    <VideoCourseTutorial
      basePath="/resources/qualifier-prep"
      brandIcon={<MdSportsScore size={17} />}
      brandTitle="Qualifier Prep"
      brandSub="Skirmish in Brookfield Webinars"
      navLabel="Webinars"
      modules={modules}
      courseResources={courseResources}
      defaultSlug={modules[0].slug}
    />
  )
}
