import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { useCartStore } from "./useCartStore";
import { useGetData } from "./useGetData";
import { ScrollUpButton } from "./ScrollUpButton";


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
            const prodRes = await fetch(`https://dummyjson.com/products/category/${category.slug}?limit=4`);
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
    <div className="mt-30 p-10">
      {categories.map((cat, index) => (
        <div key={index} className="bg-white w-full mb-14  rounded-xl">
          <Link to={`/Category/${cat.category.slug}`} className=" rounded-t-xl mb-10 p-2 flex justify-between cursor-pointer bg-gray-300">
            <h2 className="text-md md:text-xl font-bold">{cat.category.name}</h2>
           <div className="flex items-center"><p>See All</p><IoIosArrowForward/></div> 
          </Link>
          <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  w-full items-stretch  rounded-b-xl p-4">
            {cat.products.map((product) => (<>
              
              <div 
                key={product.id || product.title} 
                className="bg-white overflow-hidden p-2 rounded-xl relative flex flex-col h-full transition-all hover:scale-101 shadow-2xl"
              ><Link
              to={`/Category/${cat.category.slug}/${product.title}`}>
                  <img
                    className="w-full h-48 object-cover rounded-md"
                    src={product.thumbnail}
                    alt={product.title}
                  />
                  <h2 className="text-sm md:text-md font-bold text-gray-800">
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
              className={`w-full md:w-auto px-6 py-3 mt-4 text-lg font-semibold rounded-xl transition-colors
                ${product.stock > 0 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'}
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2  cursor-pointer`}
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
              </div>
        </>
            ))}
          </div>
        </div>
      ))}
      <ScrollUpButton/>
    </div>
  );
};