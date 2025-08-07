import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Auth from './pages/Auth/Auth';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Auth/>} path='/auth'></Route>
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
