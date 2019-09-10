import ApiUtils from './ApiUtils';

export default class ImageUtils {

  public static MAX_FILE_SIZE: number = 4; // MB

  public static onFileChange(e: any) {
    const files = e.target.files || e.dataTransfer.files;

    if (!files.length) {
      return null;
    }

    const file = files[0];
    const fileType = file.type.split('/')[0];

    if (file.size > ImageUtils.MAX_FILE_SIZE * 1024 * 1024) {
      alert('The selected file is too large.');
      return null;
    }

    return URL.createObjectURL(file);
  }

  public static dataURItoBlob(dataURI) {
    /* let prefix, b64Data = dataURI.split(',', 2) */
    const b64Data = dataURI.split(',')[1];

    const byteString = atob(b64Data);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
  }


}
