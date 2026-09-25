import { ImageSize } from '@/types/document';

export const getContainFit = (
  originalSize: ImageSize,
  containerSize: ImageSize,
) => {
  const scale = Math.min(
    containerSize.width / originalSize.width,
    containerSize.height / originalSize.height,
  );

  const renderedWidth = originalSize.width * scale;
  const renderedHeight = originalSize.height * scale;

  const offsetX = (containerSize.width - renderedWidth) / 2;
  const offsetY = (containerSize.height - renderedHeight) / 2;

  return { scale, renderedWidth, renderedHeight, offsetX, offsetY };
};
