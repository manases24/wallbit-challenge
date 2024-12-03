import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/features/products/productsSlice";
import { useEffect } from "react";
import { fetchProducts } from "../redux/features/products/productsSlice";

export const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items} = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  return (
    <section className="container border border-x-2 py-6 mt-6">
    <h1 className="text-2xl font-bold mb-4">Shopping Card</h1>
    <div className="grid grid-cols-4 gap-6">
      {items.map((product) => (
        <div key={product.id} className="border p-4 rounded">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover mb-4"
          />
          <h2 className="text-lg font-bold">{product.title}</h2>
          <p className="text-gray-600">${product.price}</p>
        </div>
      ))}
    </div>
  </section>
  );
};
