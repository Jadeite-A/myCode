export const DownloadStreamFile = (blob: Blob, fileName:string) => {
  let link = document.createElement('a');
  link.style.display = 'none';
  link.href = URL.createObjectURL(new Blob([blob]));
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
};