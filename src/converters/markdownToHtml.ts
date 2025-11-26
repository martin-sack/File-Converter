import showdown from 'showdown';
import fs from 'fs/promises';

export async function markdownToHtml(
  inputPath: string, 
  outputPath: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const markdown = await fs.readFile(inputPath, 'utf-8');
    const converter = new showdown.Converter();
    const html = converter.makeHtml(markdown);
    
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Converted Document</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
    code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; }
    pre { background: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; }
  </style>
</head>
<body>
${html}
</body>
</html>`;
    
    await fs.writeFile(outputPath, fullHtml);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
