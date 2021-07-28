import { useState, useEffect } from "react"
import { Input } from "baseui/input"
import { connect } from "react-redux"
import { Modal, ModalBody, ModalFooter, ModalButton, ModalHeader } from "baseui/modal"
import { FormControl } from "baseui/form-control"
import { Textarea } from "baseui/textarea"

import { editModal, taskEditRequest, errorClean } from "./actions"

const Edit = ({
  close, editTask, errorClean,
  editId, error, username, email, raw_text
}) => {
  const [text, setText] = useState("")

  useEffect(() => {
    if (editId !== null) {
      setText(decodeURIComponent(raw_text))
    }
  }, [editId])

  const onChange = (value) => {
    setText(value)
    if (error.length) {
      errorClean()
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    editTask(text.trim())
  }

  return (
    <Modal onClose={close} isOpen={editId !== null} unstable_ModalBackdropScroll>
      <ModalHeader>Редактирование данных</ModalHeader>
      <ModalBody>
        <FormControl caption="имя пользователя">
          <Input value={username} disabled />
        </FormControl>
        <FormControl caption="e-mail">
          <Input value={email} disabled />
        </FormControl>
        <FormControl error={error}>
          <Textarea
            value={text}
            onChange={(e) => onChange(e.target.value)}
            placeholder="текст задачи"
            clearOnEscape
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton kind="tertiary" onClick={close}>Отмена</ModalButton>
        <ModalButton disabled={!text.trim().length} onClick={onSubmit}>Ок</ModalButton>
      </ModalFooter>
    </Modal>
  )
}

export default connect(
  ({ data, editId, error = "" }) => ({
    error, editId,
    username: editId ? data[editId].username : "",
    email: editId ? data[editId].email : "",
    raw_text: editId ? data[editId].text : ""
  }),
  (dispatch) => ({
    close: () => dispatch(editModal(null)),
    errorClean: () => dispatch(errorClean()),
    editTask: (body) => dispatch(taskEditRequest(body))
  })
)(Edit)
