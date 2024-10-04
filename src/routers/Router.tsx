/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import Login from "../pages/auth/Login";
import { useSelector } from "react-redux";
import { login, selectCurrentUser } from "../pages/auth/authSlice";
import { useAppDispatch } from "../app/hooks";
import AdminDashboard from "../pages/admin/dashboard/AdminDashboard";
import Dashboard from "../pages/organization/Dashboard";
import AddNumbers from "../pages/admin/numbers/AddNumbers";
// Teacher routes
// import Overview from "../pages/teacher/overview/index.tsx";
// import Notes from "../pages/teacher/notes/Notes.tsx";
// import ShareNotes from "../pages/teacher/notes/ShareNotes.tsx";
// import SharedNotes from "../pages/teacher/notes/SharedNotes.tsx";
// import NewNote from "../pages/teacher/notes/NewNote.tsx";
// import Quizzes from "../pages/teacher/quizzes/index.tsx";
// import NewQuiz from "../pages/teacher/quizzes/NewQuiz/index.tsx";
// import SharedQuizzes from "../pages/teacher/quizzes/SharedQuizzes/index.tsx";
// import ViewQuiz from "../pages/teacher/quizzes/ViewQuiz/index.tsx";
// import QuizReportList from "../pages/teacher/quizzes/ReportList/index.tsx";
// import Questions from "../pages/teacher/question/index.tsx";
// import NewQuestion from "../pages/teacher/question/NewQuestion/NewQuestion.tsx";
// import BulkQuestion from "../pages/teacher/question/BulkQuestion/BulkQuestion.tsx";
// import MediaLibrary from "../pages/teacher/media-library/index.tsx";
// import UploadMediaPage from "../pages/teacher/media-library/upload/index.tsx";
// import ShareNote from "../pages/teacher/notes/ShareNote.tsx";
// import EditQuestion from "../pages/teacher/question/EditQuestions/EditQuestion.tsx";
// import ReviewQuestions from "../pages/teacher/question/Reviews/ReviewList.tsx";
// // Student routes
// import StudentOverview from "../pages/student/overview/index.tsx";
// import ClassQuiz from "../pages/student/class-quiz/ClassQuiz.tsx";
// import ViewQuizzes from "../pages/student/class-quiz/ViewQuizzes.tsx";
// import ViewNotes from "../pages/student/notes/ViewNotes.tsx";
// import ViewExpandedNote from "../pages/student/notes/ViewExpandedNote.tsx";
// import RecentQuiz from "../pages/student/quiz/RecentQuiz.tsx";
// import PracticeQuiz from "../pages/student/quiz/PracticeQuiz.tsx";
// import ViewQuizAnswers from "../pages/student/class-quiz/ViewQuizAnswers.tsx";

type ProtectedRoute = {
  user: any;
  children?: any;
};

const ProtectedRoute = ({ user, children }: ProtectedRoute) => {
  //wrapper component for protected routes
  const isAuth = !!user;

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const NoNav = () => (
  <>
    <Outlet />
  </>
);

const Router = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  let currentUserRole = null;
  if (user) {
    currentUserRole = user.role;
  }

  useEffect(() => {
    //log the user back in with local storage data
    const userString = localStorage.getItem("user");
    const access_tokenString = localStorage.getItem("access_token");
    const refresh_tokenString = localStorage.getItem("refresh_token");

    if (userString && access_tokenString && refresh_tokenString) {
      const data = JSON.parse(userString) as any;
      const access_token = JSON.parse(access_tokenString) as string;
      const refresh_token = JSON.parse(refresh_tokenString) as string;

      dispatch(login({ data, access_token, refresh_token }));
    }
  }, []);

  useEffect(() => {
    //route the user to dashboard, if a logged in user tries to access signin page
    if (!!user && location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [navigate, user]);

  return (
    <Routes>
      <Route element={<NoNav />}>
        {/* public routes that dont have the sidebar nav */}
        <Route path="/" element={<Login />} />
        <Route path="*" element={<h1>Url does not match</h1>} />
      </Route>

      {/* Admin routes */}
      {currentUserRole === "admin" ? (
        <Route
          //protected pages
          element={
            <ProtectedRoute user={user}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/add-number" element={<AddNumbers />} />

          {/* <Route path="/notes">
            <Route index element={<Notes />} />
            <Route path="new-note" element={<NewNote />} />
            <Route path="share-note" element={<ShareNotes />} />
            <Route path="shared-notes" element={<SharedNotes />} />
            <Route path="share-note/:id" element={<ShareNote />} />
          </Route>
          <Route path="/quizzes">
            <Route index element={<Quizzes />} />
            <Route path="new" element={<NewQuiz />} />
            <Route path="shared" element={<SharedQuizzes />} />
            <Route path="view/:id" element={<ViewQuiz />} />
            <Route path="report-list" element={<QuizReportList />} />
          </Route>
          <Route path="/questions">
            <Route index element={<Questions />} />
            <Route path="new" element={<NewQuestion />} />
            <Route path="edit/:id" element={<EditQuestion />} />
            <Route path="bulk" element={<BulkQuestion />} />
            <Route path="view/:id" element={<h1>view question</h1>} />
            <Route path="review" element={<ReviewQuestions />} />
          </Route>
          <Route path="/media-library">
            <Route index element={<MediaLibrary />} />
            <Route path="upload" element={<UploadMediaPage />} />
          </Route> */}
        </Route>
      ) : (
        // Student route
        <Route
          //protected pages
          element={
            <ProtectedRoute user={user}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      )}

      <Route path="*" element={<h1>404, page not found</h1>} />
    </Routes>
  );
};

export default Router;
