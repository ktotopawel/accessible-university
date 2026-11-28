import { Route, Routes } from 'react-router';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Studies from './pages/Studies.jsx';
import Accessibility from './pages/Accessibility.jsx';
import AccessibilityStatement from './pages/AccessibilityStatement.jsx';
import CampusMap from './pages/CampusMap.jsx';
import Staff from './pages/Staff.jsx';
import Courses from './pages/courses/Courses.jsx';
import CourseCategory from './pages/courses/CourseCategory.jsx';
import Lesson from './pages/courses/Lesson.jsx';
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
        <Route path="accessibility/statement" element={<AccessibilityStatement />} />
        <Route path="campus-map" element={<CampusMap />} />
        <Route path="staff" element={<Staff />} />

        <Route path="courses" element={<Courses />} />
        <Route path="courses/:category" element={<CourseCategory />} />
        <Route path="courses/:category/:lesson" element={<Lesson />} />

        <Route path="schedule" element={<Schedule />} />
        <Route path="schedule/:programme" element={<ScheduleProgramme />} />
        <Route path="schedule/:programme/:semester" element={<ScheduleSemester />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
