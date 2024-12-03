import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductApi, AppDispatch } from "../redux/features/products/productsSlice";



export const ProductForm = () => {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para manejar el mensaje de error
  const dispatch = useDispatch<AppDispatch>();

  const handleAddProduct = async () => {
    if (productId && quantity > 0) {
      try {
        setErrorMessage(null); // Reseteamos el mensaje de error
        await dispatch(addProductApi({ productId, quantity })).unwrap(); // Desempaquetamos el resultado
        setProductId(""); // Limpiamos el campo de ID
        setQuantity(1); // Limpiamos el campo de cantidad
      } catch (error: any) {
        setErrorMessage("El producto con el ID proporcionado no existe. Intente con otro."); // Mostramos el mensaje de error
      }
    }
  };

  return (
    <section className="container border border-x-2 py-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">Agregar producto al carrito</h2>
      <div className="mb-4">
        {errorMessage && (
          <p className="text-red-500 bg-red-100 border border-red-300 p-2 rounded">
            {errorMessage}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <input
          className="border border-gray-300 p-2 rounded"
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="ID del producto"
        />
        <input
          className="border border-gray-300 p-2 rounded"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="Cantidad"
        />
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Agregar
        </button>
      </div>
    </section>
  );
};
