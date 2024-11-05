import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Cart from './components/Cart';
import Category from './components/Category';
import Login from './components/LogIn';
import Register from './components/Register';
import AddProducts from './components/AddProducts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path='/LogIn' element={<Login/>} />
        <Route path='/Register' element={<Register/>} />
        <Route path="/AddProducts" element={<AddProducts />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path='/Category' element={<Category/> } />
      </Routes>
    </Router>
  );
}

export default App;
