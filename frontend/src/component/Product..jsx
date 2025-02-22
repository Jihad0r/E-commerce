import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useCartStore } from './useCartStore';

export const Product = () => {
    const [product, setProducts] = useState([]);
    const {name,productName} = useParams()
    
        const { addToCart } = useCartStore(); 
    useEffect(()=>{
    const getProducts = async () => {
        try {
          const res = await fetch(`https://dummyjson.com/products/category/${name}`);
          const data = await res.json();
          console.log(data.products)
          const product = data.products.filter((prod)=>(prod.title === productName))

          setProducts(product)
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
      getProducts()
    }, [name]);
  return (
    <>
    <h1 className='capitalize'>{name}</h1>
    <div className="product mt-10 mx-auto ">
        {product.map((product)=>(
               <div className="p-6 flex flex-col md:flex-row rounded-xl space-y-4">
               <img
                 className="w-full md:w-1/3 object-cover rounded-md"
                 src={product.thumbnail}
                 alt={product.title}
               />
               <div>
               <h2 className="text-xl font-bold text-gray-800">{product.title}</h2>
               <p className="text-gray-600">{product.description}</p>
               <p className="text-sm text-gray-500">Brand: {product.brand} | SKU: {product.sku}</p>
               <p className="text-sm text-gray-500">Weight: {product.weight} lbs</p>
               <p className="text-sm text-gray-500">Dimensions: {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} inches</p>
               <p className="text-sm text-gray-500">Warranty: {product.warrantyInformation}</p>
               <p className="text-sm text-gray-500">Shipping: {product.shippingInformation}</p>
               <p className="text-sm text-gray-500">Return Policy: {product.returnPolicy}</p>
               <p className="text-sm text-gray-500">Status: {product.availabilityStatus}</p>
               <div className="flex justify-between items-center">
                 <span className="text-lg font-semibold text-blue-500">${product.price}</span>
                 <span className="text-sm text-gray-500">Rating: {product.rating} ⭐</span>
               </div>
               <div>
                 <h3 className="text-md font-bold text-gray-800 mt-2">Reviews:</h3>
                 {product.reviews.map((review, index) => (
                   <p key={index} className="text-sm text-gray-600">{review.reviewerName}: {review.comment} ({review.rating}⭐)</p>
                 ))}
               </div>
               <button
                 className="w-full px-4 py-2 mt-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-400"
                 onClick={()=>addToCart(product)}
                 disabled={product.stock === 0}
               >
                 {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
               </button></div>
             </div>
         ))}
           </div></>
  )
}
