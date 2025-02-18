import { BiLogOut } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";

export const Nav = () => {
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
  return(<div className="p-4 flex items-center justify-between bg-purple-400 ">
    Navbar
    <div className=" flex"><BiLogOut className="mr-5" onClick={logout}/>
    <FiShoppingCart/></div>
    
  </div>)
}