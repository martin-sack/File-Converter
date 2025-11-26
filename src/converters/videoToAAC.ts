import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

if (ffmpegStatic) {
  ffmpeg.setFfmpegPath(ffmpegStatic);
}

export async function videoToAAC(
  inputPath: string, 
  outputPath: string
): Promise<{ success: boolean; error?: string }> {
  return new Promise((resolve) => {
    ffmpeg(inputPath)
      .toFormat('aac')
      .audioBitrate(192)
      .on('end', () => {
        resolve({ success: true });
      })
      .on('error', (err) => {
        resolve({ success: false, error: err.message });
      })
      .save(outputPath);
  });
}
