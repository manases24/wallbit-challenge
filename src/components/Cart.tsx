import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  removeProduct,
  RootState,
} from "../redux/features/products/productsSlice";

export const Cart = () => {
  const dispatch = useDispatch();
  const { items, error } = useSelector((state: RootState) => state.cart);

  const handleRemoveProduct = (id: number) => {
    dispatch(removeProduct({ id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Carrito de Compras</h1>

      {error && <p className="text-red-500 mb-4">Error: {error}</p>}

      {items.length === 0 ? (
        <p className="text-gray-600">El carrito está vacío.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2">Imagen</th>
                <th className="border border-gray-200 px-4 py-2">Producto</th>
                <th className="border border-gray-200 px-4 py-2">
                  Precio Unitario
                </th>
                <th className="border border-gray-200 px-4 py-2">Cantidad</th>
                <th className="border border-gray-200 px-4 py-2">
                  Precio Total
                </th>
                <th className="border border-gray-200 px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: any) => (
                <tr key={item.id} className="text-center">
                  <td className="border border-gray-200 px-4 py-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {item.title}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    ${item.price}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {item.quantity}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <button
                      onClick={() => handleRemoveProduct(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div></div>
        </div>
      )}

      {items.length > 0 && (
        <div className="mt-4 flex justify-between items-center border-t border-gray-200 pt-4">
          <h3 className="text-lg font-bold">Total:</h3>
          <p className="text-xl font-semibold">${total.toFixed(2)}</p>
        </div>
      )}

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleClearCart}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded"
        >
          Vaciar Carrito
        </button>
      </div>
    </div>
  );
};
