import { MdCode } from 'react-icons/md'
import VideoCourseTutorial from '../../components/tutorial/VideoCourseTutorial'
import { modules, courseResources } from '../../data/react-tutorial'

export default function ReactTutorialPage() {
  return (
    <VideoCourseTutorial
      basePath="/resources/react"
      brandIcon={<MdCode size={17} />}
      brandTitle="React Course"
      brandSub="Web Dev for the Team Site"
      navLabel="Lessons"
      modules={modules}
      courseResources={courseResources}
      defaultSlug={modules[0].slug}
    />
  )
}
