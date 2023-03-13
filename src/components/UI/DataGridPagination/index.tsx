import React, { useState, useEffect } from 'react'

import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import type { DataGridProps } from '@mui/x-data-grid'

import NoData from '@/pages/error/NoData'

interface IDataGridPaginationProps<T> {
  data: T
  isLoading: boolean
  columns: DataGridProps['columns']
  optionSize?: number[]
}

const DataGridPagination = <T extends unknown>({
  data,
  columns,
  isLoading,
  optionSize = [10, 20, 30],
}: IDataGridPaginationProps<T>) => {
  const [page, setPage] = useState(0)
  const [rows, setRows] = useState([])
  const [size, setSize] = useState(10)
  const [rowCount, setRowCount] = useState(0)
  const [selected, setSelected] = useState({})
  const [selectionModel, setSelectionModel] = useState([])

  const onPageChange = (page: number) => {
    setPage(page)
  }

  const onPageSizeChange = (newPage: number) => {
    setSize(newPage)
  }

  const onSelectionModelChange = (selection) => {
    const last = selection.slice(-1)
    setSelectionModel(last)
    const data = last.length >= 1 ? rows.find((value) => value.id === last[0]) : {}
    setSelected(data)
  }

  useEffect(() => {
    if (data != null) {
      const { totalRecords, data: records } = data
      setRows(records)
      setRowCount(totalRecords)
    }
  }, [data])

  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        rowCount={rowCount}
        pagination={true}
        loading={isLoading}
        paginationMode='server'
        slots={{
          noResultsOverlay: NoData,
        }}
        {...{
          labelRowsPerPage: 'mpp',
          rowsPerPageOptions: optionSize,
          page,
          onPageChange,
          onPageSizeChange,
          density: 'standard',

          selectionModel: selectionModel,
          onSelectionModelChange,
          // checkboxSelection: true,
          //disableMultipleSelection: true,
          sx: {
            borderLeft: '1px solid #e0e0e0',
            borderRight: '1px solid #e0e0e0',
            border: 'none',
            px: 2,
            '& .MuiDataGrid-columnHeaders ': {
              borderRadius: 2,
              backgroundColor: 'rgb(244, 246, 248)',
            },
            '& .MuiDataGrid-columnHeader': {
              color: 'rgb(99, 115, 129)',
            },
            '& .MuiDataGrid-footerContainer': {
              mx: -2,
            },
            '& .MuiDataGrid-main': {
              mb: 2,
              //border: '1px solid #e0e0e0',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
          },
        }}
      />
    </div>
  )
}

export default DataGridPagination
