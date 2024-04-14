import prettyBytes from 'pretty-bytes';

export function getTotalFilesSize(files: File[]) {
  const total = files.reduce((total, file) => total + file.size, 0);
  return prettyBytes(total);
}

export function getTotalFileSize(file: File) {
  return prettyBytes(file.size);
}
