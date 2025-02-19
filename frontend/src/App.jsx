import { Routes,useLocation,Route, Navigate } from 'react-router-dom'
import { Home } from './component/Home'
import { Nav } from './component/Nav'
import { Login, Signup } from './component/auth'
import { useEffect, useState } from 'react'
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
   {pathname !== "/login" && pathname !== "/signup"  && <Nav/>}
    <Routes>
      <Route path="/login" element={isAuthorized ? <Navigate to="/"/> :<Login/> }/>
      <Route path="/signup" element={isAuthorized ? <Navigate to="/"/> :<Signup/>}/>
      <Route path="/" element={isAuthorized ? <Home/>:<Navigate to="/login"/> }/>
    </Routes> 
  </>)
};

export default App