import { createContext, useEffect, useState } from "react"
import { useLocalStorage } from "../hook/useLocalStorage"

export const AppContext = createContext()

const AppProvider = ({children}) => {
  const [ localUser , setLocalUser ] = useLocalStorage('user')
  const [user, setUser] = useState(localUser || {})

  useEffect(()=> setLocalUser(user),[user])

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider