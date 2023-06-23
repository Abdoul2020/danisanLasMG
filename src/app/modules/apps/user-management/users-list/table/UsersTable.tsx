import { useMemo, useState } from 'react'
import { useTable, ColumnInstance, Row } from 'react-table'
import { CustomHeaderColumn } from '../table/columns/CustomHeaderColumn'
import { CustomRow } from '../table/columns/CustomRow'
import { useQueryResponseData, useQueryResponseLoading } from '../core/QueryResponseProvider'
import { usersColumns } from './columns/_columns'
import { User } from '../core/_models'
import { UsersListLoading } from '../components/loading/UsersListLoading'
import { UsersListPagination } from '../components/pagination/UsersListPagination'
import { KTCardBody } from '../../../../../../_metronic/helpers'

const UsersTable = () => {
  const users = useQueryResponseData()


  const [usersData, setUserData] = useState<any>([
    {
      avatar: "avatars/300-6.jpg",
      email: "smith@kpmg.com",
      id: 1,
      joined_day: "10 Nov 2022, 9:23 pm",
      last_login: "Online",
      name: "Emma Smith",
      online: false,
      position: "Art Director",
      role: "Administrator",
      two_steps: true
    },
    {
      avatar: "avatars/300-6.jpg",
      email: "smith@kpmg.com",
      id: 2,
      joined_day: "10 Nov 2022, 9:23 pm",
      last_login: "Yesterday",
      name: "Emma Smith",
      online: false,
      position: "Art Director",
      role: "Administrator",
      two_steps: false
    }
  ]);



  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => usersData, [usersData])


  const columns = useMemo(() => usersColumns, [])

  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
    columns,
    data,
  })

  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          id='kt_table_users'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<User>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>


            {rows.length > 0 ? (
              rows.map((row: Row<User>, i) => {
                prepareRow(row)
                return <CustomRow row={row} key={`row-${i}-${row.id}`} />
              })
            )

              : (
                <tr>
                  <td colSpan={7}>
                    <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                      Hiçbir eşleşen kayıt bulunamadı
                    </div>
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
      <UsersListPagination />
      {isLoading && <UsersListLoading />}
    </KTCardBody>
  )
}

export { UsersTable }
