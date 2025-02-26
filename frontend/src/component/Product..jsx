import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useCartStore } from './useCartStore';
import { ScrollUpButton } from './ScrollUpButton';

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
    <div className="product  mt-15 mx-auto ">
        {product.map((product)=>(
          <div className="p-6 flex flex-col md:flex-row gap-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="md:w-1/3 overflow-hidden rounded-xl">
            <img
              className="hover:scale-105 transition-transform relative md:fixed"
              src={product.thumbnail}
              alt={product.title}
            />
          </div>
          
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h2>
            
            <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-600">Brand: <span className="text-gray-800">{product.brand}</span></p>
              <p className="text-sm font-medium text-gray-600">SKU: <span className="text-gray-800">{product.sku}</span></p>
              <p className="text-sm font-medium text-gray-600">Weight: <span className="text-gray-800">{product.weight} lbs</span></p>
              <p className="text-sm font-medium text-gray-600">Dimensions: <span className="text-gray-800">{product.dimensions.width}x{product.dimensions.height}x{product.dimensions.depth} in</span></p>
              <p className="text-sm font-medium text-gray-600">Warranty: <span className="text-gray-800">{product.warrantyInformation}</span></p>
              <p className="text-sm font-medium text-gray-600">Availability: <span className={`font-semibold ${product.availabilityStatus === 'In Stock' ? 'text-green-600' : 'text-red-600'}`}>{product.availabilityStatus}</span></p>
            </div>
        
            <div className="flex justify-between items-end border-b pb-4">
              <span className="text-2xl font-bold text-blue-600">${product.price}</span>
              <span className="flex items-center bg-blue-100 px-3 py-1 rounded-full text-sm font-semibold text-blue-800">
                Rating: {product.rating} ⭐
              </span>
            </div>
        
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-900 mt-4">Shipping & Returns:</h3>
              <p className="text-sm text-gray-600">{product.shippingInformation}</p>
              <p className="text-sm text-gray-600">{product.returnPolicy}</p>
            </div>
        
            {product.reviews.length > 0 && (
              <div className="border-t pt-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Customer Reviews:</h3>
                <div className="space-y-3">
                  {product.reviews.map((review, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-gray-900">{review.reviewerName}</p>
                      <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-sm font-medium text-gray-600">Rating:</span>
                        <span className="text-yellow-500 ml-1">{'⭐'.repeat(review.rating)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        
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
        </div>
         ))}
           </div>
           
                 <ScrollUpButton/></>
  )
}
