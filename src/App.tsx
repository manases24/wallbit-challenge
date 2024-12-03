import { ProductForm } from "./components/ProductForm";
import { Navbar } from "./components/Navbar";
import { Cart } from "./components/Cart";

function App() {
  return (
    <div className="text-red">
      <Navbar />
      <ProductForm />
      <Cart/>
    </div>
  );
}

export default App;
