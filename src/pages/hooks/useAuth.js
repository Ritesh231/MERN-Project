import { useEffect } from "react"
import { useUser } from "./useUser"
import { useLocalStorage } from "./useLocalStorage"

export const useAuth = () => {
  const { user, streams, setNewStreams, addUser, removeUser } = useUser()
  const { getItem } = useLocalStorage()

  useEffect(() => {
    const user = getItem("user")
    const streams = getItem("streams")
    if (user) {
      addUser(JSON.parse(user))
    }
    if (streams) {
      setNewStreams((streams))
    }
  }, [])

  const login = user => {
    addUser(user)
  }

  const logout = () => {
    removeUser()
  }

  const setStreams = (streams) => {
    setNewStreams(streams);
  }


  return { user, streams, setStreams,login, logout }
}
