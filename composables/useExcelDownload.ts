import { Workbook } from 'exceljs';

type Header = string[];
type Body = any[][];

export default function useExcelDownload(header: Header, body: Body) {
  const downloadExcel = async () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Лист 1');

    // Заполняем заголовки
    worksheet.columns = header.map(str => ({
      header: str,
      key: str,
      width: 20,
    }));

    // Заполняем данные
    body.forEach((row, i) => {
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
