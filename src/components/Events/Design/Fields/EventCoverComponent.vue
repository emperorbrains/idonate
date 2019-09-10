<template>
  <div>
    <input ref="image" type="file" :accept="acceptImageType" @change="onFileChange" hidden />

    <div class="text-center">
      <div class="bg-light rounded-standard">
        <div v-show="croppieImage.length > 0">
          <vue-croppie
            class="event-cover-thumbnail"
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

        <div class="cover-image" v-if="hasImage">
          <img :src="image">

          <div class="delete-image align-items-center justify-content-center">
            <button class="btn btn-transparent text-primary" role="button" @click="deleteImage">
              <i class="far fa-trash-alt"></i>
            </button>
          </div>
        </div>

        <div class="p-5" @click="selectImage" v-else-if="croppieImage.length < 1">
          <img src="@/assets/icons/add-image.svg" height="35px" />
          <p
            class="mb-1"
            style="font-size: 12px;"
          >Supported formats: (.jpg, &amp; .png). Recommended resolution: (700px x 300px). Maximum file size: {{ maxFileSize }}MB.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BaseImageVue from '@/api/core/BaseImageVue';
import ImageUtils from '@/api/util/ImageUtils';
import ApiUtils from '@/api/util/ApiUtils';
import { cloneDeep, isEmpty } from 'lodash';

@Component
export default class EventCoverComponent extends BaseImageVue {

  protected result(output) {
    this.$emit('input', output);

    this.api.uploadEventFile(this.$route.params.eventId, 'coverImage',
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

<style lang="scss">
.event-cover-thumbnail.croppie-container .cr-boundary {
  min-height: 250px;
}

.cover-image {
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
