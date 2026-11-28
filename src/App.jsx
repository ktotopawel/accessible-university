import { Route, Routes } from 'react-router';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Studies from './pages/Studies.jsx';
import Accessibility from './pages/Accessibility.jsx';
import CampusMap from './pages/CampusMap.jsx';
import Staff from './pages/Staff.jsx';
import Courses from './pages/courses/Courses.jsx';
import CoursesScience from './pages/courses/CoursesScience.jsx';
import CoursesTraining from './pages/courses/CoursesTraining.jsx';
import CourseCategory from './pages/courses/CourseCategory.jsx';
import LessonComplexNumbers from './pages/courses/LessonComplexNumbers.jsx';
import Schedule from './pages/schedule/Schedule.jsx';
import ScheduleProgramme from './pages/schedule/ScheduleProgramme.jsx';
import ScheduleSemester from './pages/schedule/ScheduleSemester.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="studies" element={<Studies />} />
        <Route path="accessibility" element={<Accessibility />} />
        <Route path="campus-map" element={<CampusMap />} />
        <Route path="staff" element={<Staff />} />

        <Route path="courses" element={<Courses />} />
        <Route path="courses/science" element={<CoursesScience />} />
        <Route path="courses/science/complex-numbers" element={<LessonComplexNumbers />} />
        <Route path="courses/training" element={<CoursesTraining />} />
        <Route path="courses/:category" element={<CourseCategory />} />

        <Route path="schedule" element={<Schedule />} />
        <Route path="schedule/:programme" element={<ScheduleProgramme />} />
        <Route path="schedule/:programme/:semester" element={<ScheduleSemester />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
