/**
 * 이미지 String 데이터를 File로 변경
 * @param dataURI
 */
export const dataURItoFile = (dataURI: string) => {
  console.log(dataURI);
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeString });
  return new File([blob], "uploadImage", { type: mimeString });
};