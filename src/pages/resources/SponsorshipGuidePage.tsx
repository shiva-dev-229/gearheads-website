import { MdHandshake } from 'react-icons/md'
import VideoCourseTutorial from '../../components/tutorial/VideoCourseTutorial'
import { modules, courseResources } from '../../data/sponsorship-guide'

export default function SponsorshipGuidePage() {
  return (
    <VideoCourseTutorial
      basePath="/resources/sponsorship"
      brandIcon={<MdHandshake size={17} />}
      brandTitle="Sponsorship Guide"
      brandSub="How to Get a Sponsor"
      navLabel="Lessons"
      modules={modules}
      courseResources={courseResources}
      defaultSlug={modules[0].slug}
    />
  )
}
