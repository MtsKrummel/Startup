import { auth } from '@/auth'
import React from 'react'

const page = async() => {
  const session = await auth()
  return (
    <div>
      <h1>Perfil de usuario</h1>
      <p>Nombre: {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
    </div>
  )
}

export default page