import { useState, useMemo } from "react"
import { connect } from "react-redux"
import { Block } from "baseui/block"
import { Button } from "baseui/button"
import { Pagination } from "baseui/pagination"
import { TableBuilder, TableBuilderColumn } from "baseui/table-semantic"
import { Label1 } from "baseui/typography"
import { StyledLink as Link } from "baseui/link"
import { Checkbox } from "baseui/checkbox"

import { authModal, taskModal, editModal, taskCloseRequest } from "./actions"

const limit = 3

function PaginatedTable({ openAuth, openTask, closeTask, editTask, isAdmin, data }) {
  const [page, setPage] = useState(1)
  const [sortColumn, setSortColumn] = useState("username")
  const [sortAsc, setSortAsc] = useState(true)

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > Math.ceil(data.length / limit)) {
      return
    }
    setPage(nextPage)
  }

  const sortedData = useMemo(() => {
    return data.slice().sort((a, b) => {
      const left = sortAsc ? a : b
      const right = sortAsc ? b : a
      const leftValue = String(left[sortColumn])
      const rightValue = String(right[sortColumn])
      return leftValue.localeCompare(rightValue, "en", {
        numeric: true,
        sensitivity: "base",
      })
    })
  }, [sortColumn, sortAsc, data])

  const min = (page - 1) * limit
  const pageData = sortedData.slice(min, min + limit)

  const handleSort = (id) => {
    if (id === sortColumn) {
      setSortAsc(asc => !asc)
    } else {
      setSortColumn(id)
      setSortAsc(true)
    }
  }

  return (
    <>
      <Block
        display="grid" gridGap="1em" marginBottom="1em"
        gridTemplateColumns="auto max-content min-content"
      >
        <Pagination
          currentPage={page}
          numPages={Math.ceil(data.length / limit)}
          onPageChange={({ nextPage }) => handlePageChange(nextPage)}
        />
        <Button onClick={openTask} disabled={isAdmin}>Добавить задачу</Button>
        <Button onClick={openAuth}>Admin</Button>
      </Block>

      <TableBuilder
        data={pageData}
        sortColumn={sortColumn}
        sortOrder={sortAsc ? "ASC" : "DESC"}
        onSort={handleSort}
      >
        <TableBuilderColumn id="username" header="пользователь" sortable>
          {r => r.username}
        </TableBuilderColumn>
        <TableBuilderColumn id="email" header="e-mail" sortable>
          {r => r.email}
        </TableBuilderColumn>
        <TableBuilderColumn id="text" header="текст задачи">
          {r => isAdmin && r.status < 10
            ? <Link onClick={editTask(r.id)}>{decodeURIComponent(r.text)}</Link>
            : decodeURIComponent(r.text)
          }
        </TableBuilderColumn>
        <TableBuilderColumn id="status" header="статус" numeric sortable>
          {r => <Checkbox
            onChange={() => closeTask(r.id)}
            checked={r.status >= 10} disabled={!isAdmin || r.status >= 10}
          />}
        </TableBuilderColumn>
      </TableBuilder>
    </>
  )
}

const withProps = ({
  data = [], isAdmin
}) => ({
  data, isAdmin
})

const withActions = (dispatch) => ({
  openAuth: () => dispatch(authModal(true)),
  openTask: () => dispatch(taskModal(true)),
  editTask: (id) => () => dispatch(editModal(id)),
  closeTask: (data) => dispatch(taskCloseRequest(data)),
})

export default connect(withProps, withActions)(PaginatedTable)
