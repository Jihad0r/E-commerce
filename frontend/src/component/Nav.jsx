import { BiLogOut } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import { useState, useEffect } from "react";
import { Cart } from "./Cart";

export const Nav = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // Hide on scroll down
      } else {
        setShowNavbar(true); // Show on scroll up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);



  const logout = async () => {
		try {
			const res = await fetch("/api/auth/logout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Something went wrong");
			return data;
		} catch (error) {
			console.error(error.message);
		}
	};
  return(<><div className={`p-4 z-10 flex items-center justify-between bg-purple-400 fixed top-0 left-0 w-full text-white  transition-transform duration-300 ${
	showNavbar ? "translate-y-0" : "-translate-y-full"}`}>
    Navbar
    <div className=" flex"><BiLogOut className="mr-5" onClick={logout}/>
	<FiShoppingCart onClick={() => setShowCart(!showCart)} />
	</div>
    
  </div><Cart showCart={showCart} setShowCart={setShowCart}/></>)
}