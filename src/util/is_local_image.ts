const isLocalImage = (htmlImageSource: string, imageSource: string[], directory: string): boolean => {
  const imageSourceFormat = imageSource.map((source) => {
    return source.replaceAll('\\', '/').replace(directory, '');
  });

  if (htmlImageSource.startsWith('http://') || htmlImageSource.startsWith('https://')) {
    const htmlSourceFormat = new URL(htmlImageSource).pathname;
    return imageSourceFormat.includes(htmlSourceFormat);
  }

  return imageSourceFormat.includes(htmlImageSource);
};

export { isLocalImage };