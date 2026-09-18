export interface CompressedImageResult {
  base64Data: string;
  filename: string;
  mimeType: string;
  fileSize: number;
}

const ALLOWED_MIMES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/jfif', 'image/bmp', 'image/svg+xml'];

/**
 * Compresses an image file client-side before transmission or offline caching.
 * Downscales images larger than max dimension and converts to JPEG at 0.75 quality.
 */
export const compressImage = async (
  file: File,
  maxDimension = 1200,
  quality = 0.75
): Promise<CompressedImageResult> => {
  const isImageMime = file.type && (file.type.startsWith('image/') || ALLOWED_MIMES.includes(file.type.toLowerCase()));
  const isImageExt = /\.(jpe?g|png|webp|jfif|bmp|heic|heif)$/i.test(file.name);
  if (!isImageMime && !isImageExt) {
    throw new Error(`Unsupported image file '${file.name}'. Please upload an image file.`);
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read photo file'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Invalid image file format'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Resize down proportionally if exceeds max dimension
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Failed to obtain canvas rendering context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Determine output format
        const outputMime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(outputMime, quality);
        const base64Content = dataUrl.split(',')[1];
        const estimatedSize = Math.round((base64Content.length * 3) / 4);

        resolve({
          base64Data: dataUrl,
          filename: file.name.replace(/\.[^/.]+$/, '') + (outputMime === 'image/png' ? '.png' : '.jpg'),
          mimeType: outputMime,
          fileSize: estimatedSize,
        });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};
