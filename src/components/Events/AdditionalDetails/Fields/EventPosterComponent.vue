<template>
  <div>
    <input ref="image" type="file" :accept="acceptPosterType" @change="onFileChange" hidden>

    <div>
      <label-component for="event-poster" text="Event Poster"></label-component>

      <b-tooltip
        placement="right"
        target="btn-tooltip-event-poster"
        title="Upload an image or video about the event."
      ></b-tooltip>

      <a href="#" id="btn-tooltip-event-poster" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white">?</a>
    </div>

    <div class="text-center">
      <div class="bg-light mb-4 rounded-standard">
        <div v-if="posterMode === 'IMAGE'">
          <div v-show="croppieImage.length > 0">
            <vue-croppie
              class="poster-thumbnail"
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

          <div class="poster-image" v-if="posterURL.length > 0">
            <img :src="posterURL">

            <div class="delete-image align-items-center justify-content-center">
              <button class="btn btn-transparent text-primary" role="button" @click="deletePoster">
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
          </div>

          <div class="cursor-pointer p-5" @click="selectPoster" v-else-if="croppieImage.length < 1">
            <img src="@/assets/icons/add-image.svg" height="35px">

            <p class="lead my-2 text-muted" style="font-size: 14px;">Drag &amp; Drop or Click here to upload poster.</p>

            <div class="tooltip-text text-center">
              <p class="mb-1" style="font-size: 12px;">Supported formats: (.jpg,  &amp; .png). Recommended resolution: (700px x 300px). Maximum file size: {{ maxFileSize }}MB.</p>
            </div>
          </div>
        </div>

        <div class="p-3" v-else-if="posterMode === 'VIDEO_EMBED'">
          <input type="url" class="form-control rounded-pill" placeholder="Enter Vimeo or YouTube URL" v-model="posterURL">
        </div>

        <div class="p-5" v-else>
          <img src="@/assets/icons/add-image.svg" height="35px">

          <p class="lead my-2 text-muted" style="font-size: 14px;">No poster can be selected.</p>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col">
          <div class="custom-control custom-radio">
            <input
              id="poster-image"
              class="custom-control-input"
              name="poster-type"
              type="radio"
              value="IMAGE"
              v-model="posterMode"
            >

            <label-component
              class="custom-control-label"
              for="poster-image"
              text="Image"
              :isBold="false"
            ></label-component>
          </div>
        </div>

        <div class="col">
          <div class="custom-control custom-radio">
            <input
              id="poster-video"
              class="custom-control-input"
              name="poster-type"
              type="radio"
              value="VIDEO_EMBED"
              v-model="posterMode"
            >

            <label-component
              class="custom-control-label"
              for="poster-video"
              text="Video"
              :isBold="false"
            ></label-component>
          </div>
        </div>

        <div class="col">
          <div class="custom-control custom-radio">
            <input
              id="poster-none"
              class="custom-control-input"
              name="poster-type"
              type="radio"
              value="HIDDEN"
              v-model="posterMode"
            >

            <label-component
              class="custom-control-label"
              for="poster-none"
              text="None"
              :isBold="false"
            ></label-component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import IEventPoster from '@/api/interface/IEventPoster';
import BaseImageVue from '@/api/core/BaseImageVue';
import ImageUtils from '@/api/util/ImageUtils';
import ApiUtils from '@/api/util/ApiUtils';
type PosterType = 'IMAGE' | 'VIDEO_EMBED' | 'HIDDEN';

@Component({
  components: {
    LabelComponent,
  },
})
export default class EventPosterComponent extends BaseImageVue {
  @Prop(String) public readonly mode!: string;


  get posterMode() {
    return this.mode;
  }

  set posterMode(type) {
    this.deletePoster();
    this.$emit('mode', type);
  }

  get posterURL() {
    return ApiUtils.hasValue(this.value) ? this.value : '';
  }

  set posterURL(url) {
    this.$emit('input', url);
  }

  get acceptPosterType() {
    if (this.posterMode === 'IMAGE') {
      return this.acceptImageType;
    }

    return ''; // this.value.type + '/*';
  }

  private deletePoster() {
    this.$emit('input', '');
  }

  private onFileChange(e: any) {
    const file = ImageUtils.onFileChange(e);
    if (file !== null) {
      this.croppieImage = file;

      this.$refs.croppie.bind({
        url: this.croppieImage,
      });
    }
  }

  private crop() {
    this.$refs.croppie.result({ format: 'jpeg' }, (output) => {
      this.croppieImage = output;

      this.$refs.croppie.bind({
        url: this.croppieImage,
      });

      this.result(this.croppieImage);
      this.croppieImage = '';
    });
  }

  private result(url) {
    this.$emit('input', url);
    if (this.posterMode === 'IMAGE') {
    this.api.uploadEventFile(this.$route.params.eventId, 'posterImage',
        ImageUtils.dataURItoBlob(url))
        .then((res) => this.handleSuccess(res, '', 'event.update.errors'))
        .catch(this.handleFailure);
    }
  }

  private rotate(angle) {
    this.$refs.croppie.rotate(angle);
  }

  private selectPoster() {
    if (this.posterMode === 'HIDDEN') {
      return;
    }

    this.$refs.image.click();
  }

  get eventPoster() {
    return this.value;
  }

  set eventPoster(value) {
    this.$emit('input', value);
  }
}
</script>

<style lang="scss" scoped>
.poster-thumbnail {
  width: 100%;
}

.tooltip-text p {
  font-size: 12px;
}

.poster-image {
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
.poster-thumbnail.croppie-container .cr-boundary {
  min-height: 250px;
}
</style>
