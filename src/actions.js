export const authModal = (data) => ({ type: "AUTH_MODAL", data })
export const taskModal = (data) => ({ type: "TASK_MODAL", data })
export const editModal = (data) => ({ type: "EDIT_MODAL", data })

export const authRequest = (login, passwd) => ({ type: "AUTH_REQUEST", login, passwd })

export const cleanError = (data) => ({ type: "SET_ERROR", data })
export const setError = () => ({ type: "SET_ERROR", data: "" })

export const taskAddRequest = (username, email, text) => ({
  type: "TASK_ADD_REQUEST", username, email, text
})

export const taskCloseRequest = (data) => ({ type: "TASK_CLOSE_REQUEST", data })

export const taskEditRequest = (text) => ({ type: "TASK_EDIT_REQUEST", text })
