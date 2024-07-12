import {useEffect} from "react"
import { useSearchParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { loggedIn as loggedInAction, loadToken, setHandle } from "../features/user/user"
import { Navigate } from "react-router-dom"

const LoginSuccess = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.user.loggedIn)

  useEffect(() => {
    const token = searchParams.get('accessToken')
    const handle = searchParams.get('handle')
    console.log(token)
    dispatch(loggedInAction(true))
    dispatch(loadToken(token))
    dispatch(setHandle(handle))
  }, [])

  if (loggedIn) {
    return <Navigate to="/" replace />
  }

  return (
    <div>
    </div>
  )
}

export default LoginSuccess
