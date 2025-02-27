import { useState } from "react";
import { Link } from "react-router-dom";
import img from "../img/138223722_10377291-removebg.png";

export const Signup = ({ setIsAuthorized }) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const createUser = async ({ email, username, password }) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setIsAuthorized(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    await createUser(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col-reverse justify-center items-center md:flex-row w-[90%] bg-purple-400 p-4 rounded-xl mt-[5rem] mx-auto md:w-2/3">
      <div className="w-full md:w-1/2">
        <img className="w-full" src={img} alt="icon" />
      </div>
      <form className="flex flex-col w-full space-x-1 md:w-1/2 bg-white rounded-xl p-4" onSubmit={handleSubmit}>
          <input
            className="border-1 p-4 rounded-xl mt-4"
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleInputChange}
            value={formData.email}
          />
          <input
            className="border-1 p-4 rounded-xl mt-4"
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleInputChange}
            value={formData.username}
          />
          <input
            className="border-1 p-4 rounded-xl mt-4"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleInputChange}
            value={formData.password}
          />
           <p className="text-[12px] h-5 text-red-500">{error &&error}</p>
        <button type="submit" className="bg-purple-950 p-4 rounded-xl cursor-pointer text-white mt-4">Signup</button>
        <p>
          I have an account already
          <Link to="/login" className="cursor-pointer mt-1 text-blue-600"> Login</Link>
        </p>
      </form>
    </div>
  );
};

export const Login = ({ setIsAuthorized }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const loginUser = async ({ username, password }) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setIsAuthorized(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    await loginUser(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col-reverse justify-center items-center md:flex-row w-[90%] bg-purple-400 p-4 rounded-xl mt-[5rem] mx-auto md:w-2/3">
      <div className="w-full md:w-1/2">
        <img className="w-full" src={img} alt="icon" />
      </div>
      <form className="flex flex-col w-full space-x-1 md:w-1/2 bg-white rounded-xl p-4" onSubmit={handleSubmit}>
          <input
            className="border-1 p-4 rounded-xl mt-4"
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleInputChange}
            value={formData.username}
          />
          <input
            className="border-1 p-4 rounded-xl mt-4"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleInputChange}
            value={formData.password}
          />
		  <p className="text-[12px] h-5 text-red-500">{error &&error}</p>
        <button type="submit" className="bg-purple-950 p-4 rounded-xl cursor-pointer text-white mt-4">Login</button>
        <p>
          Don't have an account?
          <Link to="/signup" className="cursor-pointer mt-1 text-blue-600"> Signup</Link>
        </p>
      </form>
    </div>
  );
};
