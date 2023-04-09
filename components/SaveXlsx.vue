<script setup lang="ts">
import useExcelDownload from '../composables/useExcelDownload';

const props = defineProps({
  header: {
    type: Array as () => string[],
    default: () => ['Заголовок 1', 'Заголовок 2', 'Заголовок 3'],
  },
  body: {
    type: Array as () => string[][],
    default: () => [
      ['Данные 1', 'Данные 2', 'Данные 3'],
      ['Данные 4', 'Данные 5', 'Данные 6'],
    ],
  },
});

const { header, body } = toRefs(props as {
  header: string[],
  body: string[][]
});


const saveFile = async () => {
  const { downloadExcel } = useExcelDownload(header.value, body.value);
  const blob = await downloadExcel();

  if (typeof (window as any).showSaveFilePicker === 'function') {
    // Сохранение файла через File System Access API
    try {
      const file = new File([blob], 'customExcelFile.xlsx', {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: file.name,
        types: [
          {
            description: 'Файлы Excel',
            accept: {
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            },
          },
        ],
      });

      const writableStream = await handle.createWritable();
      await writableStream.write(file);
      await writableStream.close();
    } catch (error) {
      console.error('Ошибка при сохранении файла:', error);
    }
  } else {
    // Сохранение файла через создание ссылки на скачивание
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'customExcelFile.xlsx';
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  }
};
</script>

<template>
  <button f-btn @click="saveFile">
    <slot>Պահպանել (Excel)</slot>
  </button>
</template>
