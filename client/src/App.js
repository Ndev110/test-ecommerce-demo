import logo from './logo.svg';
import './App.css';
import ProductList from './components/productList';
import OrderList from './components/orderList';
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <ProductList />
      <OrderList />
      </header>
    </div>
  );
}

export default App;
