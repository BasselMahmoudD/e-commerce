import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ClearData({children}) {
    localStorage.clear()
  return ( 
    <>
      {children}
      <Navigate to={'/signIn'}/>
      
    </>
  )
}
