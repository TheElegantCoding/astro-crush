import path from 'node:path';
import sharp from 'sharp';

type TransformImageParameters = {
  image: string;
  compressFormats?: string[];
  excludedKeywords?: string[];
};

const transformImage = async ({
  image,
  excludedKeywords = [
    'pwa',
    'web-app-manifest',
    'apple-touch',
    'opg',
    'favicon'
  ],
  compressFormats
}: TransformImageParameters) => {
  if (excludedKeywords.some((keyword) => { return image.includes(keyword); })) {
    return { image, width: null, height: null };
  }

  const absolutePath = path.resolve(image);
  const metadata = await sharp(absolutePath).metadata();

  const transformedImages = compressFormats?.map(async (format) => {
    const formatType = format as keyof sharp.FormatEnum;
    const newPath = image.replace(path.extname(image), `.${format}`);

    return sharp(absolutePath)
      .toFormat(formatType, { quality: 80 })
      .toFile(newPath);
  });

  const result = transformedImages ? await Promise.all(transformedImages) : [];

  return {
    image,
    width: metadata.width,
    height: metadata.height,
    transformed: result
  };
};

export { transformImage };