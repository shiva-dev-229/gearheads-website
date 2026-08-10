import { MdPrecisionManufacturing } from 'react-icons/md'
import VideoCourseTutorial from '../../components/tutorial/VideoCourseTutorial'
import { modules, courseResources } from '../../data/onshape-tutorial'

export default function OnshapeTutorialsPage() {
  return (
    <VideoCourseTutorial
      basePath="/resources/onshape-tutorials"
      brandIcon={<MdPrecisionManufacturing size={17} />}
      brandTitle="Onshape Course"
      brandSub="Robot CAD for FTC"
      navLabel="Lessons"
      modules={modules}
      courseResources={courseResources}
      defaultSlug={modules[0].slug}
    />
  )
}
