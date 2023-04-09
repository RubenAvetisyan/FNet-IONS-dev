import { Workbook } from 'exceljs';

type Header = string[];
type Body = any[][];

export default function useExcelDownload(header: Header, body: Body) {
  const downloadExcel = async () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Лист 1');

    // Заполняем заголовки
    worksheet.columns = header;

    // Заполняем данные
    body.forEach((row) => {
      worksheet.addRow(row);
    });

    // Экспортировать файл в браузере
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    return blob;
  };

  return {
    downloadExcel
  };
}
