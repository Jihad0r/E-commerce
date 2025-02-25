import { useState, useEffect } from "react";

import { AiOutlineClose } from "react-icons/ai"; 
import { AiOutlinePlus } from "react-icons/ai"; 
import { AiOutlineMinus } from "react-icons/ai";
export const Cart = ({ showCart, setShowCart,cartRef}) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeButton, setActiveButton] = useState({ title: "", action: "" ,isclicked:false});

    const handleClick = (title, action,isclicked) => {
        setActiveButton({ title, action,isclicked:true });
        setTimeout(() => setActiveButton({ title: "", action: "" ,isclicked:false}), 200);
    };
      

    if (showCart && innerWidth <= 768) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden"); 
      }

    const fetchCart = async () => {
        try {
            const res = await fetch("/api/cart"); 
            if (!res.ok) throw new Error("Failed to fetch cart");
            const data = await res.json();
            setCart(data|| []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateCartAmount = async (title, action) => {
        try {
            const res = await fetch("/api/cart/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, action }),
            });
            if (!res.ok) throw new Error("Failed to update cart");
            const data = await res.json();
            setCart(data.cart || []);
        } catch (err) {
            console.error(err);
        }
    };
    const deleteProduct = async (title) => {
        try {
            const res = await fetch("/api/cart/delete", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title }),
            });

            if (!res.ok) throw new Error("Failed to delete product");
            const data = await res.json();
            setCart(data || []);
        } catch (err) {
            console.error(err);
        }
    };

    const clearCart = async () => {
        try {
            const res = await fetch("/api/cart/deleteall", { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to clear cart");
            setCart([]); 
        } catch (err) {
            console.error(err);
        }
    };
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.amount, 0);
    const totalAmount = cart.reduce((acc, item) => acc + item.amount, 0);

    useEffect(() => {
        fetchCart();
    }, [fetchCart,deleteProduct]);
    return (
    <div 
        className={`w-full md:w-1/3 fixed top-[8%] md:top-[11%] bottom-0 right-0 p-4 backdrop-blur-md bg-purple-300
            transition-transform duration-700 shadow-lg z-50 
            ${showCart ? "translate-x-0" : "translate-x-full"}`} ref={cartRef}
    >
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Shopping Cart</h2>
            <button 
                onClick={() => setShowCart(false)}
                className=" text-lg p-1 rounded-full cursor-pointer"
            >
                <AiOutlineClose/>
            </button>
        </div>
        <div className="overflow-auto h-90">
        {loading && <p className="text-white">Loading cart...</p>}
        {cart.length === 0 && !loading && <p className="">Your cart is empty.</p>}

        {cart.map((item) => (
            <div key={item.title} className="flex  justify-between items-center border-b py-2 relative">
                <div className="flex items-center">
                <img src={item.img} className="w-20 h-20" alt={item.title}/>
                <div><h2>{item.title}</h2>
                <span className="font-medium  mr-4">${item.price}</span>
                <span className="font-medium ">${parseInt(item.price * item.amount)}</span>
                </div></div>
                <div className="flex items-center gap-2 mr-10">
               <button
                onClick={() => {updateCartAmount(item.title, "decrease");   handleClick(item.title, "decrease");
                }}
                className={`rounded-full border-1 ${
                  activeButton.title === item.title && activeButton.action === "decrease"&&activeButton.isclicked
                    ? "text-blue-400"
                    : ""
                } cursor-pointer`}
              >
                        <AiOutlineMinus/>
                </button>
                    <span className=" w-4">{item.amount}</span>
                <button
                onClick={() => {updateCartAmount(item.title, "increase");   handleClick(item.title, "increase");
                }}
                className={`rounded-full border-1 ${
                  activeButton.title === item.title && activeButton.action === "increase"&&activeButton.isclicked
                    ? "text-blue-400"
                    : ""
                } cursor-pointer`}
              >
                <AiOutlinePlus />
                </button>
                </div>

                 <button 
                        onClick={() => deleteProduct(item.title)} 
                        className="px-2 py-1  rounded absolute top-0 right-0 cursor-pointer"
                    >
                         <AiOutlineClose/>
                    </button>
            </div>
        ))}
        </div>
        <div className="totals flex justify-between items-center">
            <span>Total Price: ${totalPrice.toFixed(2)}</span><span>Total Amount: {totalAmount}</span>
        </div>

        {cart.length > 0 && (
            <>
            <button 
            onClick={clearCart}
            className="w-full mt-4 p-2 text-white bg-blue-500 rounded font-bold cursor-pointer">
            Pay Now
        </button>
            <button 
                onClick={clearCart}
                className="w-full mt-4 p-2 text-white bg-red-500 rounded font-bold cursor-pointer"
            >
                Clear Cart
            </button></>
        )}
        
    </div>
    );
};
