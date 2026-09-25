import { CPoint, ImageSize } from '@/types/document';

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

export type ContainFit = ReturnType<typeof getContainFit>;

export const toDisplayPoint = (point: CPoint, fit: ContainFit) => {
  return {
    x: fit.scale * point.x + fit.offsetX,
    y: fit.scale * point.y + fit.offsetY,
  };
};
