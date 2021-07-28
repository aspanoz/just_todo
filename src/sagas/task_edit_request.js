import { takeEvery, put } from "redux-saga/effects"


function * taskEdit ({ text }) {
  text = encodeURIComponent(text)

  // @TODO: запрос к серверу, обработка ответа

  yield put({ type: "TASK_EDIT", text })
}

export default function * taskEditRequest () {
  yield takeEvery("TASK_EDIT_REQUEST", taskEdit)
}
