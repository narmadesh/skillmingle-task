import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import CreateTeam from './pages/admin/CreateTeam.jsx';
import CreateMember from './pages/admin/CreateMember.jsx';
import EditTeam from './pages/admin/EditTeam.jsx';
import TeamMembers from './pages/admin/TeamMembers.jsx';
import EditMember from './pages/admin/EditMember.jsx';
import MemberDashboard from './pages/member/MemberDashboard.jsx';
import CreateDocument from './pages/member/CreateDocument.jsx';
import TodoList from './pages/member/TodoList.jsx';
import CreateTodo from './pages/member/CreateTodo.jsx';
import EditTodo from './pages/member/EditTodo.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/teams/create' element={<CreateTeam />} />
        <Route path='/admin/team/:id/edit' element={<EditTeam />} />
        <Route path='/admin/team/:id/members' element={<TeamMembers />} />
        <Route path='/admin/members/:id/create' element={<CreateMember />} />
        <Route path='/admin/members/:id/edit' element={<EditMember />} />
        <Route path='/member/dashboard' element={<MemberDashboard />} />
        <Route path='/member/documents/create' element={<CreateDocument />} />
        <Route path='/member/todos' element={<TodoList />} />
        <Route path='/member/todos/create' element={<CreateTodo />} />
        <Route path='/member/todos/:id/edit' element={<EditTodo />} />
        </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
