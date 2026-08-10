import { MdWidgets } from 'react-icons/md'
import VideoCourseTutorial from '../../components/tutorial/VideoCourseTutorial'
import { modules, courseResources } from '../../data/blocks-tutorial'

export default function BlocksTutorialPage() {
  return (
    <VideoCourseTutorial
      basePath="/resources/blocks"
      brandIcon={<MdWidgets size={17} />}
      brandTitle="Blocks Course"
      brandSub="FTC Programming for Beginners"
      navLabel="Episodes"
      modules={modules}
      courseResources={courseResources}
      defaultSlug={modules[0].slug}
    />
  )
}
