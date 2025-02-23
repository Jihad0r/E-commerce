import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { useCartStore } from './useCartStore';
import { ScrollUpButton } from './ScrollUpButton';

export  const Category = () => {
    const [products, setProducts] = useState([]);
    const {name} = useParams()
    const { addToCart } = useCartStore();
    useEffect(()=>{
    const getProducts = async () => {
        try {
          const res = await fetch(`https://dummyjson.com/products/category/${name}`);
          const data = await res.json();
          setProducts(data.products)
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
      getProducts()
    }, [name]);
  return (
    <div className='p-4  w-full mt-14  rounded-xl'>
    <h1 className='capitalize text-3xl mb-5 font-bold'>{name}</h1>
    <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product)=>(<>
             
             <div 
               key={product.id || product.title} 
               className="bg-white overflow-hidden p-2 rounded-xl relative flex flex-col h-full shadow-md"
             >
     <Link
             to={`/Category/${name}/${product.title}`}><img
       className="w-full h-48 object-cover rounded-md"
       src={product.thumbnail}
       alt={product.title}
     />
     <h2 className="text-xl font-bold text-gray-800">{product.title}</h2></Link>
     <p className="text-gray-600 mt-2 mb-4  truncate whitespace-nowrap overflow-hidden text-ellipsis h-6">{product.description}</p>
     <div className="flex justify-between items-center">
       <span className="text-lg font-semibold text-blue-500">${product.price}</span>
       <span className="text-sm text-gray-500">Rating: {product.rating} ⭐</span>
     </div>
                 <button className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition mt-auto disabled:bg-gray-400"
                 onClick={()=>addToCart(product)}
                 disabled={product.stock === 0}>
                   
                 {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
     </button>
   </div></>
        ))}
    </div>
          <ScrollUpButton/></div>
  )
}