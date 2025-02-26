import { BiLogOut } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { useState,useEffect ,useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Cart } from "./Cart";

export const Nav = ({setIsAuthorized}) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [input, setInput] = useState("");
  const [showinput, setShowInput] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dropdownRef = useRef(null);
  const cartRef= useRef(null);
  const searchRef =  useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        cartRef.current &&
        !cartRef.current.contains(e.target)
      ) {
        setIsCartOpen(false);
      }
      if(searchRef.current &&
        !searchRef.current.contains(e.target)){
          setIsSearchOpen(false)
        }
      
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=100");
        const data = await res.json();
        setAllProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
        setShowInput(false)
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (!res.ok) throw new Error("Logout failed");
      setIsAuthorized(false)
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim()) {
      const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <div
        className={`p-4 z-20 flex items-center justify-between bg-purple-400 fixed top-0 left-0 w-full text-white transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Link to={`/`} className="text-2xl">
          <GoHome />
        </Link>

        {/* Desktop Search */}
        <div ref={searchRef} className="relative flex-1 max-w-xl hidden md:block mx-auto">
          <div className="flex items-center bg-white rounded-lg">
            <input
              type="text"
              name="search"
              value={input}
              onChange={handleChange}
              onClick={()=>setIsSearchOpen((prev) => !prev)}
              placeholder="What are you looking for?"
              className="w-full px-4 py-2 text-gray-900 rounded-lg focus:outline-none"
            />
            <button className="px-4 text-gray-600 hover:text-gray-900 cursor-pointer">
              <IoIosSearch size={24} />
            </button>
          </div>
          {isSearchOpen&& <>
          {filteredProducts.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto z-20">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="p-3 flex items-center hover:bg-gray-100 cursor-pointer border-b border-gray-200"
                  onClick={() => {
                    navigate(`/Category/${product.category}/${product.title}`);
                    setInput("");
                    setFilteredProducts([]);
                  }}
                >
                  <img className="w-10 h-10 mr-5" src={product.thumbnail} alt={product.title} />
                  <span className="text-gray-900">{product.title}</span>
                </div>
              ))}
            </div>
          )}</>}
        </div>

        <div className="flex items-center gap-4">
          <button
            className="px-4 block md:hidden text-white hover:text-gray-900 cursor-pointer"
            onClick={() => {setShowInput(!showinput);setIsDropdownOpen((prev) => !prev)}}
          >
            <IoIosSearch size={24} /> 
          </button>
          <BiLogOut 
            className="cursor-pointer text-2xl" 
            onClick={logout} 
            title="Logout"
          />
          <FiShoppingCart
            className="cursor-pointer text-2xl"
            cartRef={cartRef} 
            onClick={() =>{ setShowCart(!showCart);setIsCartOpen((prev) => !prev)}}
            title="Cart"
          />
        </div>
      </div>

      {/* Mobile Search */}
     {isDropdownOpen&& <div
        className={`fixed top-15 left-0 w-full block md:hidden z-10 bg-purple-400 transition-transform duration-300 
          ${showinput && showNavbar ? "block translate-y-0" : "hidden -translate-y-full"}
          
        `}
       ref={dropdownRef}>
        <div className="p-4 relative">
          <div className="flex items-center bg-white rounded-lg">
            <input
              type="text" 
              name="search"
              value={input}
              onChange={handleChange}
              placeholder="What are you looking for?"
              className="w-full px-4 py-2 text-gray-900 rounded-lg focus:outline-none"
            />
          </div>
          {filteredProducts.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto z-20">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="p-3 flex items-center hover:bg-gray-100 cursor-pointer border-b border-gray-200"
                  onClick={() => {
                    navigate(`/Category/${product.category}/${product.title}`);
                    setInput("");
                    setFilteredProducts([]);
                    setShowInput(false);
                  }}
                >
                  <img className="w-10 h-10 mr-5" src={product.thumbnail} alt={product.title} />
                  <span className="text-gray-900">{product.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>}

     {isCartOpen && <Cart cartRef={cartRef}  showCart={showCart} setShowCart={setShowCart} />}
    </>
  );
};