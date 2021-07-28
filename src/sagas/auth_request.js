import { takeEvery, put } from "redux-saga/effects"

function * auth ({ passwd, login }) {
  if (login !== "admin" || passwd !== "123") {
    yield put({ type: "SET_ERROR", data: "неверный пользователь или пароль" })
    return
  }

  yield put({ type: "AUTH_ADMIN" })
}

export default function * authRequest () {
  yield takeEvery("AUTH_REQUEST", auth)
}
