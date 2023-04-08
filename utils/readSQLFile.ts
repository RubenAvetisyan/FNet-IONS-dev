import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import path, { dirname } from 'node:path'
export const getAbsoluteFilePath = (src: string): string => {
  const dir = dirname(fileURLToPath(import.meta.url))
  return path.join(dir, src)
}

const readSingleFile = async (filePath: string): Promise<string> => {
  try {
    const absolutePath = getAbsoluteFilePath(filePath);
    const fileBuffer = await fs.promises.readFile(absolutePath);
    const fileString = fileBuffer.toString();
    const statements = fileString
      .replace(/[\r\n]/g, ' ')
      .replace(/\s+/g, ' ')
      .split(';')
      .map(Function.prototype.call, String.prototype.trim)
      .filter((el: string) => el.length !== 0)
      .join('; ');

    return statements;
  } catch (error) {
    console.error(`Error reading SQL file: ${JSON.stringify(filePath)}`, error);
    throw error;
  }
};

export const readSqlFile = async (...filePaths: string[]): Promise<string | string[]> => {
  if (filePaths.length === 1) {
    return await readSingleFile(filePaths[0]);
  } else {
    const filesContent = await Promise.all(filePaths.map(async (filePath) => await readSingleFile(filePath)));
    return filesContent;
  }
};
