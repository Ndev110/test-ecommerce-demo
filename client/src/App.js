import logo from './logo.svg';
import './App.css';
import {ProductList} from './components/productList';
import {OrderList} from './components/orderList';
import { useNavigate } from 'react-router-dom';
import { Button,Select,Lable } from "flowbite-react";
function App() {

  const navigate = useNavigate();
  const goToOrderList = () => {
    navigate('/order-list');
  };
  return (
    <div className="App">
      <header className="App-header">
      <ProductList />
    
      <Button className="self-center mt-4 mb-2"  onClick={goToOrderList}>Go to Order List</Button>
      </header>
    
    </div>
  );
}

export default App;
