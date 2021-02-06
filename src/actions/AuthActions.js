import * as api from "../api"

export const postCredentials = (credentials) => async (dispatch) => {
  try {
    //api post
    const res = await api.postCreds(credentials)

    dispatch({ type: "CREATE_SESSION", payload: res.data })
  } catch (error) {
    dispatch({ type: "AUTH_ERROR", error: "Invalid Credentials" })

    return error.message.split(" ")[error.message.split(" ").length - 1]
  }
}

export const logout = () => async (dispatch) => {
  try {
    //api post
    const res = await api.logout()

    dispatch({ type: "LOGOUT", payload: res })
  } catch (error) {
    dispatch({ type: "AUTH_ERROR", error: "Invalid Credentials" })
  }
}
