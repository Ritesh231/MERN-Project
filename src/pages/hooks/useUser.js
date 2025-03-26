import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useLocalStorage } from "./useLocalStorage"

export const useUser = () => {
  const { user, setUser, streams, setStreams } = useContext(AuthContext)
  const { setItem } = useLocalStorage()

  const addUser = user => {
    setUser(user)
    setItem("user", JSON.stringify(user))
  }
  const setNewStreams = streams => {
    setStreams(streams)
    setItem("streams", streams)
  }

  const removeUser = () => {
    setUser(null)
    setItem("user", "")
  }


  return { user, setNewStreams, addUser, removeUser }
}
