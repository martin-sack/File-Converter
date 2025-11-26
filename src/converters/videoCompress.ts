import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

if (ffmpegStatic) {
  ffmpeg.setFfmpegPath(ffmpegStatic);
}

interface VideoCompressOptions {
  inputPath: string;
  outputPath: string;
  preset: '1080p' | '720p' | '480p' | 'custom';
  bitrate?: string;
  codec?: 'h264' | 'h265';
}

export async function videoCompress(
  options: VideoCompressOptions,
  onProgress?: (percent: number) => void
): Promise<{ success: boolean; error?: string }> {
  return new Promise((resolve) => {
    const { inputPath, outputPath, preset, bitrate, codec = 'h264' } = options;
    
    let command = ffmpeg(inputPath);
    
    // Apply preset
    switch (preset) {
      case '1080p':
        command = command.size('1920x1080').videoBitrate('4000k');
        break;
      case '720p':
        command = command.size('1280x720').videoBitrate('2500k');
        break;
      case '480p':
        command = command.size('854x480').videoBitrate('1000k');
        break;
      case 'custom':
        if (bitrate) command = command.videoBitrate(bitrate);
        break;
    }
    
    // Apply codec
    command = command.videoCodec(codec === 'h265' ? 'libx265' : 'libx264');
    
    command
      .on('progress', (progress) => {
        if (onProgress && progress.percent) {
          onProgress(Math.round(progress.percent));
        }
      })
      .on('end', () => {
        resolve({ success: true });
      })
      .on('error', (err) => {
        resolve({ success: false, error: err.message });
      })
      .save(outputPath);
  });
}
