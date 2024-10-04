import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./screens/home";
import AdminHome from "./screens/admin/AdminHome";
import AdminSettings from "./screens/admin/AdminSettings";
import SchoolList from './screens/admin/SchoolList';
import Dashboard from './screens/school/Dashboard';
import StudentManagement from './screens/school/Student';
import TeacherManagement from './screens/school/Teacher';
import CourseManagement from './screens/school/Course';
import SubjectManagement from './screens/school/Subject';
import ExamManagement from './screens/school/Exam';
import CourseAssignment from './screens/school/Assignment';
import Settings from './screens/school/Settings';
import TeacherPanel from './screens/teacher';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/admin" element={<AdminHome />} />
				<Route path="/admin/settings" element={<AdminSettings />} />
				<Route path="/admin/schools" element={<SchoolList />} />
				<Route path="/school-admin" element={<Dashboard />} />
				<Route path="/school-admin/students" element={<StudentManagement />} />
				<Route path="/school-admin/teachers" element={<TeacherManagement />} />
				<Route path="/school-admin/courses" element={<CourseManagement />} />
				<Route path="/school-admin/subjects" element={<SubjectManagement />} />
				<Route path="/school-admin/exams" element={<ExamManagement />} />
				<Route path="/school-admin/assignments" element={<CourseAssignment />} />
				<Route path="/school-admin/settings" element={<Settings />} />
				<Route path="/teacher-admin" element={<TeacherPanel />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
