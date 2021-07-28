import { takeEvery, put } from "redux-saga/effects"

function * taskClose ({ data }) {
  // @TODO: запрос к серверу, обработка ответа

  yield put({ type: "TASK_CLOSE", data })
}

export default function * taskCloseRequest () {
  yield takeEvery("TASK_CLOSE_REQUEST", taskClose)
}
