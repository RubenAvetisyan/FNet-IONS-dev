import { defineEventHandler, readBody } from 'h3'
import ExcelJS from 'exceljs'

export default defineEventHandler(async (event) => {
  try {
    const { data, headers } = await readBody(event)
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Data')

    worksheet.columns = headers
    data.forEach((rowData: {}) => {
      worksheet.addRow(rowData)
    })

    workbook.xlsx
      .writeFile('data.xlsx')
      .then(() => {
        console.log('The workbook was written to data.xlsx')
      })
    return 'Done'
  }
  catch (error) {
    console.error('error: ', error)
  }
})
