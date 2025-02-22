import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "./useCartStore";


export const Home = () => {
  const [categories, setCategories] = useState([]);
  const { addToCart } = useCartStore(); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products/categories");
        const categoriesData = await res.json();

        const allProducts = await Promise.all(
          categoriesData.map(async (category) => {
            const prodRes = await fetch(`https://dummyjson.com/products/category/${category.slug}?limit=3`);
            const productsData = await prodRes.json();
            return { category, products: productsData.products };
          })
        );

        setCategories(allProducts);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="mt-14 p-10">
      {categories.map((cat, index) => (
        <div key={index} className="p-2 bg-gray-300 w-full mb-14  rounded-xl">
          <Link to={`/Category/${cat.category.slug}`}>
            <h2 className="text-3xl mb-10 font-bold">{cat.category.name}</h2>
          </Link>
          <div className="products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-300 w-full items-stretch rounded-xl">
            {cat.products.map((product) => (<>
              
              <div 
                key={product.id || product.title} 
                className="bg-white overflow-hidden p-2 rounded-xl relative flex flex-col h-full shadow-md"
              ><Link
              to={`/Category/${cat.category.slug}/${product.title}`}>
                  <img
                    className="w-full h-48 object-cover rounded-md"
                    src={product.thumbnail}
                    alt={product.title}
                  />
                  <h2 className="text-xl font-bold text-gray-800">
                    {product.title}
                  </h2></Link>
                  <p className="text-gray-600 mt-2 mb-4 truncate whitespace-nowrap overflow-hidden text-ellipsis h-6">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-blue-500">
                      ${product.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      Rating: {product.rating} ⭐
                    </span>
                  </div>
                  <button
                    className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition mt-auto disabled:bg-gray-400"
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                  >
                    {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>
              </div>
        </>
            ))}
            <Link
              to={`/Category/${cat.category.slug}`} 
              className="flex items-center justify-center bg-white  rounded-xl text-2xl font-semibold hover:bg-gray-100 transition h-full min-h-[350px]"
            >
              More...
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};