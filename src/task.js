import produce from "immer"
import { useReducer } from "react"
import { Input } from "baseui/input"
import { connect } from "react-redux"
import { Modal, ModalBody, ModalFooter, ModalButton, ModalHeader } from "baseui/modal"
import { FormControl } from "baseui/form-control"
import { Textarea } from "baseui/textarea"
import isEmail from "email-validator"

import { taskModal, taskAddRequest, errorClean } from "./actions"

const initState = { username: "", email: "", text: "", error: "" }

const reducer = (state = {}, { type, value }) => produce(state, draft => {
  switch (type) {
    case "username":
      draft.username = value
      break
    case "email":
      draft.email = value.trim()
      draft.error = ""
      break
    case "text":
      draft.text = value
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

const isDisabled = (state) => (
  ["username", "text"].some(k => !state[k].trim().length)
  || !isEmail.validate(state.email)
)

const Task = ({ close, addTask, errorClean, isTask, error }) => {
  const [state, dispatch] = useReducer(reducer, initState)

  const onChange = (type, value) => {
    if (error.length) {
      errorClean()
    }
    dispatch({ type, value })
    if (type === "email" && !isEmail.validate(value)) {
      dispatch({ type: "error", value: "введите email" })
    }
  }

  const onClose = () => {
    dispatch({ type: "clear" })
    close()
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    addTask(state.username.trim(), state.email, state.text.trim())
  }

  return (
    <Modal onClose={onClose} isOpen={isTask} unstable_ModalBackdropScroll>
      <ModalHeader>Введите данные</ModalHeader>
      <ModalBody>
        <FormControl>
          <Input
            placeholder="имя пользователя"
            value={state.username}
            onChange={(e) => onChange("username", e.target.value)}
          />
        </FormControl>
        <FormControl error={state.error}>
          <Input
            placeholder="e-mail"
            value={state.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </FormControl>
        <FormControl error={error}>
          <Textarea
            value={state.text}
            onChange={(e) => onChange("text", e.target.value)}
            placeholder="текст задачи"
            clearOnEscape
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton kind="tertiary" onClick={onClose}>Отмена</ModalButton>
        <ModalButton disabled={isDisabled(state)} onClick={onSubmit}>Ок</ModalButton>
      </ModalFooter>
    </Modal>
  )
}

export default connect(
  ({ isTaskModal: isTask = false, error = "" }) => ({ isTask, error }),
  (dispatch) => ({
    close: () => dispatch(taskModal(false)),
    errorClean: () => dispatch(errorClean()),
    addTask: (username, email, body) => dispatch(taskAddRequest(username, email, body))
  })
)(Task)
