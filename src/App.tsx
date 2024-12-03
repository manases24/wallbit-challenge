import { ProductForm } from "./components/ProductForm";
import { Navbar } from "./components/Navbar";
import { ProductList } from "./components/ProductList";

function App() {
  return (
    <div className="text-red">
      <Navbar />
      <ProductForm />
      <ProductList/>
    </div>
  );
}

export default App;
