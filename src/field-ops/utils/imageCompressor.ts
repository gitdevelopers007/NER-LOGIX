export type CompressionMode = 'EMERGENCY' | 'LOW' | 'NORMAL' | 'ORIGINAL';

export interface CompressedImageResult {
  base64Data: string;
  filename: string;
  mimeType: string;
  originalSize: number;
  compressedSize: number;
  fileSize: number; // backward compatibility
  compressionRatio: string;
  compressionMode: CompressionMode;
  estimatedTransferTimeSecs: number; // based on 12 KB/min 2G link
  width: number;
  height: number;
}

const ALLOWED_MIMES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/jfif', 'image/bmp', 'image/svg+xml'];

interface CompressionPreset {
  maxDimension: number;
  targetMaxBytes: number;
  initialQuality: number;
  minQuality: number;
}

const PRESETS: Record<CompressionMode, CompressionPreset> = {
  EMERGENCY: {
    maxDimension: 720,
    targetMaxBytes: 40 * 1024, // 40 KB
    initialQuality: 0.55,
    minQuality: 0.30
  },
  LOW: {
    maxDimension: 960,
    targetMaxBytes: 100 * 1024, // 100 KB
    initialQuality: 0.70,
    minQuality: 0.45
  },
  NORMAL: {
    maxDimension: 1280,
    targetMaxBytes: 250 * 1024, // 250 KB
    initialQuality: 0.82,
    minQuality: 0.65
  },
  ORIGINAL: {
    maxDimension: 1920,
    targetMaxBytes: 800 * 1024,
    initialQuality: 0.90,
    minQuality: 0.80
  }
};

/**
 * Automatically determines compression mode based on network speed (e.g. navigator.connection)
 */
export const detectOptimalCompressionMode = (): CompressionMode => {
  if (typeof navigator !== 'undefined' && 'connection' in navigator) {
    const conn = (navigator as any).connection;
    if (conn) {
      if (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g' || conn.saveData) {
        return 'EMERGENCY';
      }
      if (conn.effectiveType === '3g') {
        return 'LOW';
      }
    }
  }
  return 'EMERGENCY'; // Default to emergency for remote Northeast hill corridors
};

/**
 * Compresses an image file client-side using progressive canvas re-encoding.
 * Prioritizes actual byte reduction for low-bandwidth 12 KB/min channels.
 */
export const compressImage = async (
  file: File,
  forcedMode?: CompressionMode
): Promise<CompressedImageResult> => {
  const isImageMime = file.type && (file.type.startsWith('image/') || ALLOWED_MIMES.includes(file.type.toLowerCase()));
  const isImageExt = /\.(jpe?g|png|webp|jfif|bmp|heic|heif)$/i.test(file.name);
  if (!isImageMime && !isImageExt) {
    throw new Error(`Unsupported image file '${file.name}'. Please upload a standard photo file.`);
  }

  const mode = forcedMode || detectOptimalCompressionMode();
  const preset = PRESETS[mode];
  const originalSize = file.size;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file from disk/camera.'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Invalid image file format.'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Resize down proportionally if exceeds max dimension
        if (width > preset.maxDimension || height > preset.maxDimension) {
          if (width > height) {
            height = Math.round((height * preset.maxDimension) / width);
            width = preset.maxDimension;
          } else {
            width = Math.round((width * preset.maxDimension) / height);
            height = preset.maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Failed to obtain canvas 2D rendering context.'));
          return;
        }

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Iterative compression to match target size
        let quality = preset.initialQuality;
        let dataUrl = canvas.toDataURL('image/jpeg', quality);
        let base64Content = dataUrl.split(',')[1];
        let estimatedSize = Math.round((base64Content.length * 3) / 4);

        // Progressive reduction if still above target
        let attempts = 0;
        while (estimatedSize > preset.targetMaxBytes && quality > preset.minQuality && attempts < 4) {
          quality -= 0.10;
          attempts++;
          dataUrl = canvas.toDataURL('image/jpeg', quality);
          base64Content = dataUrl.split(',')[1];
          estimatedSize = Math.round((base64Content.length * 3) / 4);
        }

        // 12 KB per minute = 200 bytes per second
        const transferSecs = Math.max(2, Math.round(estimatedSize / 200));
        const savedPct = Math.max(0, Math.round(((originalSize - estimatedSize) / originalSize) * 100));

        resolve({
          base64Data: dataUrl,
          filename: file.name.replace(/\.[^/.]+$/, '') + '.jpg',
          mimeType: 'image/jpeg',
          originalSize,
          compressedSize: estimatedSize,
          fileSize: estimatedSize, // compatibility
          compressionRatio: `${savedPct}%`,
          compressionMode: mode,
          estimatedTransferTimeSecs: transferSecs,
          width,
          height
        });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};
