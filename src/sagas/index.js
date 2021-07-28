import { all } from "redux-saga/effects"

import authRequest from "./auth_request"
import taskAddRequest from "./task_add_request"
import taskEditRequest from "./task_edit_request"
import taskCloseRequest from "./task_close_request"

export default function* sagasRoot() {
  yield all([
    authRequest(),
    taskCloseRequest(),
    taskAddRequest(),
    taskEditRequest()
  ])
}
