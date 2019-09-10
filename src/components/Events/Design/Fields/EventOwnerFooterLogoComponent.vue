<template>
  <div>
    <input ref="image" type="file" :accept="acceptImageType" @change="onFileChange" hidden />

    <div class="mb-2">
      <label-component for="event-owner-footer-logo" text="Footer Logo"></label-component>

      <b-tooltip
        placement="right"
        target="btn-tooltip-event-owner-footer-logo"
        title="You may upload an additional logo or image to be added to the footer section of the event page."
      ></b-tooltip>

      <a
        href="#"
        id="btn-tooltip-event-owner-footer-logo"
        class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white"
      >?</a>
    </div>

    <div class="text-center">
      <div class="bg-light mb-4 rounded-standard shadow">
        <div v-show="croppieImage.length > 0">
          <vue-croppie
            class="event-owner-footer-logo-thumbnail"
            ref="croppie"
            :enableOrientation="true"
            :viewport="{ width: 200, height: 200, type: 'square' }"
            @result="result"
            @update="update"
          />

          <div class="btn-group">
            <span class="btn btn-sm btn-dark mb-3" @click="crop()">Save</span>
            <span class="btn btn-sm btn-dark mb-3" @click="rotate(-90)">Rotate Left</span>
            <span class="btn btn-sm btn-dark mb-3" @click="rotate(90)">Rotate Right</span>
          </div>
        </div>

        <div class="footer-logo-image" v-if="hasImage">
          <img :src="image">

          <div class="delete-image align-items-center justify-content-center">
            <button class="btn btn-transparent text-primary" role="button" @click="deleteImage">
              <i class="far fa-trash-alt"></i>
            </button>
          </div>
        </div>

        <div class="p-5" @click="selectImage" v-else-if="croppieImage.length < 1">
          <img src="@/assets/icons/add-image.svg" height="35px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import BaseImageVue from '@/api/core/BaseImageVue';
import ImageUtils from '@/api/util/ImageUtils';
import ApiUtils from '@/api/util/ApiUtils';

@Component({
  components: {
    LabelComponent,
  },
})
export default class EventOwnerFooterLogoComponent extends BaseImageVue {

  protected result(output) {
    this.$emit('input', output);

    this.api.uploadEventFile(this.$route.params.eventId, 'footerLogoImage',
        ImageUtils.dataURItoBlob(output))
        .then((res) => this.handleSuccess(res, '', 'event.update.errors'))
        .catch(this.handleFailure);
  }

  protected get image() {
    return this.value;
  }

  get hasImage() {
    return ApiUtils.hasValue(this.value);
  }

  protected onFileChange(e: any) {
    const file = ImageUtils.onFileChange(e);
    if (file !== null) {
      this.croppieImage = file;

      this.$refs.croppie.bind({
        url: this.croppieImage,
      });
    }
  }

  protected crop() {
    this.$refs.croppie.result({ format: 'jpeg' }, (output) => {
      this.croppieImage = output;

      this.$refs.croppie.bind({
        url: this.croppieImage,
      });

      this.result(this.croppieImage);
      this.croppieImage = '';
    });
  }

  protected deleteImage() {
    this.$emit('input', '');
  }

  protected rotate(angle) {
    this.$refs.croppie.rotate(angle);
  }

  protected selectImage() {
    this.$refs.image.click();
  }

}
</script>

<style lang="scss" scoped>
.footer-logo-image {
  position: relative;
  overflow: hidden;

  .select-image {
    height: 38px;
    width: 38px;
  }

  .delete-image {
    background-color: rgba(0, 0, 0, 0.75);
    display: none;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  }

  &:hover .delete-image {
    display: flex;
  }
}
</style>

<style lang="scss">
.event-owner-footer-logo-thumbnail.croppie-container .cr-boundary {
  min-height: 250px;
}
</style>
