import { Component, Prop, Vue } from 'vue-property-decorator';
import { EventApi } from '@/api/EventApi';
import ApiUtils from '@/api/util/ApiUtils';
import ImageUtils from '@/api/util/ImageUtils';
import BaseVue from './BaseVue';


export default abstract class BaseImageVue extends BaseVue {
    public $refs!: {
        croppie: any;
        image: HTMLElement;
    };

    @Prop(String) public readonly value!: string;

    protected croppieImage: string = '';

    constructor() {
        super();
    }

    get acceptImageType() {
      return 'image/*';
    }

    public get maxFileSize() {
      return ImageUtils.MAX_FILE_SIZE;
    }

  protected update(val) {
    // Update the image ...
  }

}
