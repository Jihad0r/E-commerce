import { Routes,useLocation,Route, Navigate } from 'react-router-dom'
import { Home } from './component/Home'
import { Nav } from './component/Nav'
import { Login, Signup } from './component/auth'
import { useEffect, useState } from 'react'
import {Category} from './component/Category'
import {Product} from './component/Product.'
function App() {
  const [isAuthorized , setIsAuthorized] = useState(false)
  const {pathname} = useLocation()
  console.log(pathname)
  useEffect(()=>{
    async function authorized(){
    try{
      const res = await fetch("/api/auth/myaccount")
      const data = await res.json()
      if(data.error) return null
      if(!res.ok)  throw new Error(data.error || "something went wrong")
      if(data){
        setIsAuthorized(true)
      }
      console.log("loged successful:", data.username);
      return data
    }catch(error){
      console.error(error)
      throw error
    }
  }
  authorized()
  },[])
  return (<>
   {pathname !== "/login" && pathname !== "/signup"  && <Nav setIsAuthorized={setIsAuthorized}/>}
    <Routes>
      <Route path="/login" element={isAuthorized ? <Navigate to="/"/> :<Login setIsAuthorized={setIsAuthorized}/> }/>
      <Route path="/signup" element={isAuthorized ? <Navigate to="/"/> :<Signup setIsAuthorized={setIsAuthorized}/>}/>
      <Route path="/" element={isAuthorized ? <Home/>:<Navigate to="/login"/> }/>
      <Route path="/" element={isAuthorized ? <Home/>:<Navigate to="/login"/> }/>
      <Route path="/Category/:name/:productName" element={isAuthorized ? <Product/>:<Navigate to="/login"/> }/>
      <Route path="/Category/:name" element={isAuthorized ? <Category/>:<Navigate to="/login"/> }/>
    </Routes>
  </>)
};

export default App