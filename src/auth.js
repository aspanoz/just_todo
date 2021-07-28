import produce from "immer"
import { useReducer } from "react"
import { connect } from "react-redux"
import { Modal, ModalBody, ModalFooter, ModalButton, ModalHeader } from "baseui/modal"
import { FormControl } from "baseui/form-control"
import { Input } from "baseui/input"

import { authModal, authRequest, errorClean } from "./actions"

const initState = { user: "", password: "", error: "" }

const reducer = (state = {}, { type, value }) => produce(state, draft => {
  switch (type) {
    case "user":
      draft.user = value.trim()
      draft.error = ""
      break
    case "password":
      draft.password = value.trim()
      draft.error = ""
      break
    case "error":
      draft.error = value
      return draft
      break
    case "clear":
      draft = initState
      break
  }
  return draft
})

const Auth = ({ close, errorClean, authRequest, isAuth, error }) => {
  const [state, dispatch] = useReducer(reducer, initState)

  const onChange = (type, value) => {
    if (error.length) {
      errorClean()
    }
    dispatch({ type, value })
  }

  const isDisabled = ["user", "password"].some(k => !state[k].length)

  const onClose = () => {
    dispatch({ type: "clear" })
    close()
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    authRequest(state.user, state.password)
  }

  return (
    <Modal onClose={onClose} isOpen={isAuth} unstable_ModalBackdropScroll>
      <ModalHeader>Введите данные</ModalHeader>
      <ModalBody>
        <FormControl>
          <Input
            placeholder="логин"
            value={state.user}
            onChange={(e) => onChange("user", e.target.value)}
          />
        </FormControl>
        <FormControl error={state.error || error}>
          <Input
            type="password"
            placeholder="пароль"
            value={state.password}
            onChange={(e) => onChange("password", e.target.value)}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton kind="tertiary" onClick={onClose}>Отмена</ModalButton>
        <ModalButton disabled={isDisabled} onClick={onSubmit}>Ок</ModalButton>
      </ModalFooter>
    </Modal>
  )
}

export default connect(
  ({
    isAuthModal: isAuth = false,
    error = ""
  }) => ({ isAuth, error }),
  (dispatch) => ({
    close: () => dispatch(authModal(false)),
    authRequest: (login, passwd) => dispatch(authRequest(login, passwd)),
    errorClean: () => dispatch(errorClean()),
  })
)(Auth)
