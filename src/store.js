import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import produce from "immer"

import sagas from "./sagas"

const initState = {
  isAuthModal: false,
  isAdmin: false,
  authError: "",
  isTaskModal: false,
  editId: null,
  data : [
    { "id": 1, "username": "Test User", "email": "test_user_1@example.com", "text": "id 1", "status": 10, },
    { "id": 3, "username": "Test User 2", "email": "test_user_2@example.com", "text": "id 3", "status": 0, },
    { "id": 9, "username": "Test User 2", "email": "test_user_2@example.com", "text": "id 9", "status": 0, },
    { "id": 10, "username": "Test User 2", "email": "test_user_2@example.com", "text": "id 10", "status": 0, },
    { "id": 11, "username": "Test User 2", "email": "test_user_2@example.com", "text": "id 11", "status": 0, },
    { "id": 8, "username": "Test User 3", "email": "test_user_3@example.com", "text": "id 8", "status": 11, },
    { "id": 5, "username": "User", "email": "test_user@example.com", "text": "id 5", "status": 0, }
  ]
};

const reducer = (state = {}, a) => produce(state, draft => {
  let idx
  switch (a.type) {
    case "AUTH_MODAL":
      draft.isAuthModal = a.data
      return draft

    case "AUTH_ADMIN":
      draft.isAuthModal = false
      draft.isAdmin = true
      return draft

    case "TASK_MODAL":
      draft.isTaskModal = a.data
      return draft

    case "EDIT_MODAL":
      draft.editId = a.data !== null
        ? draft.data.findIndex(({ id }) => id === a.data)
        : null
      return draft

    case "TASK_ADD":
      draft.isTaskModal = false
      draft.data.push(
        { id: 6, username: a.username, email: a.email, status: 0, text: a.text }
      )
      return draft

    case "TASK_CLOSE":
      idx = draft.data.findIndex(({ id }) => id === a.data)
      draft.data[idx].status = draft.data[idx].status + 10
      return draft

    case "TASK_EDIT":
      draft.data[draft.editId].status = 1
      draft.data[draft.editId].text = a.text
      draft.editId = null
      return draft

    case "SET_ERROR":
      draft.error = a.data
      return draft

    default:
      return draft
  }
})

const sagaMiddleware = createSagaMiddleware()

// @TODO: убрать из кода
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initState,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(sagas)

export default store
