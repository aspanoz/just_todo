import { takeEvery, put } from "redux-saga/effects"

function * taskAdd ({ username, email, text }) {
  text = encodeURIComponent(text)

  // @TODO: запрос к серверу, обработка ответа

  yield put({ type: "TASK_ADD", username, email, text })
}

export default function * taskAddRequest () {
  yield takeEvery("TASK_ADD_REQUEST", taskAdd)
}
