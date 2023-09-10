import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminView from './components/AdminView';
import UserView from './components/UserView';
import './css/StyleAdminView.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="admin" element={<AdminView />} />
          <Route path="user" element={<UserView />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
