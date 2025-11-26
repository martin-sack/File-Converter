import fs from 'fs';
import csvParser from 'csv-parser';
import { Parser } from 'json2csv';

export async function jsonToCsv(
  inputPath: string, 
  outputPath: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const jsonData = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
    const parser = new Parser();
    const csv = parser.parse(jsonData);
    fs.writeFileSync(outputPath, csv);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function csvToJson(
  inputPath: string, 
  outputPath: string
): Promise<{ success: boolean; error?: string }> {
  return new Promise((resolve) => {
    const results: any[] = [];
    
    fs.createReadStream(inputPath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
        resolve({ success: true });
      })
      .on('error', (error) => {
        resolve({ success: false, error: error.message });
      });
  });
}
