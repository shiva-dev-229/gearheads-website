import { MdCode } from 'react-icons/md'
import VideoCourseTutorial from '../../components/tutorial/VideoCourseTutorial'
import { modules, courseResources } from '../../data/java-tutorial'

export default function JavaTutorialPage() {
  return (
    <VideoCourseTutorial
      basePath="/resources/java"
      brandIcon={<MdCode size={17} />}
      brandTitle="Java Course"
      brandSub="FTC Programming, Beginner to Advanced"
      navLabel="Lessons"
      modules={modules}
      courseResources={courseResources}
      defaultSlug={modules[0].slug}
    />
  )
}
