const youtubeIdRegex =
  /(https?:\/\/)?(((m|www)\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i;

export const extractLivestreamId = (url: string) => {
  if (!url) {
    return null;
  }

  const match = url.match(youtubeIdRegex);
  return match && match[8];
};
