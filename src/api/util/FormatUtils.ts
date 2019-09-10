import ApiUtils from './ApiUtils';
import TypeUtils from './TypeUtils';

export default class FormatUtils {

  public static formatMissing() {
    return 'Missing';
  }

  public static formatId(id: string) {
    return ApiUtils.hasValue(id) && id.length >= 12
        ? id.substring(0, 13).toUpperCase() : id;
  }

  public static isNumber(evt) {
    evt = (evt) ? evt : window.event;
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
      evt.preventDefault();
    } else {
      return true;
    }
  }

  // Slugify Code from: https://hagemann.io
  public static formatSlug(val: string) {
    const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;';
    const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------';
    const p = new RegExp(a.split('').join('|'), 'g');

    return TypeUtils.toString(val).toLowerCase()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(p, (c: any) => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-')   // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-')   // Replace multiple - with single -
        .replace(/^-+/, '')       // Trim - from start of text
        .replace(/-+$/, '');      // Trim - from end of text
  }

}
