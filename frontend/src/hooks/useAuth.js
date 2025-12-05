import { useState, useEffect } from 'react'


export default function useAuth(){
const [user, setUser] = useState(null)
useEffect(()=>{
// placeholder: load user from localStorage
const raw = localStorage.getItem('tiny_user')
if(raw) setUser(JSON.parse(raw))
},[])


function login(userObj){
localStorage.setItem('tiny_user', JSON.stringify(userObj))
setUser(userObj)
}
function logout(){
localStorage.removeItem('tiny_user')
setUser(null)
}
return { user, login, logout }
}