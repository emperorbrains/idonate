<template>
  <b-modal :id="id" ref="modal" centered hide-footer hide-header>
    <div>
      <div class="p-3">
        <div class="mb-4 text-center text-success">
          <i class="fas fa-check-circle icon-success"></i>
        </div>

        <h3 class="mb-4 font-weight-semibold text-center">Do you want publish<br>the event?</h3>

        <div class="row">
          <div class="col text-left">
            <button
              type="button"
              class="btn btn-primary btn-lg rounded-pill text-uppercase w-100"
              @click="publishEvent"
            >Yes</button>
          </div>

          <div class="col text-right">
            <button
              type="button"
              class="btn btn-secondary btn-lg rounded-pill text-uppercase w-100"
              @click="cancel"
            >No</button>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import BaseVue from '@/api/core/BaseVue';

@Component
export default class EventPublishConfirmationModalComponent extends BaseVue {
  public $refs!: {
    modal: any;
  };

  @Prop(String) public readonly id!: string;

  private publishEvent() {
    // Do some processing ...
    if (this.api === null) {
      return;
    }
    this.api.publishEvent(this.$route.params.eventId)
    .then((res) => this.handleSuccess(res, '', 'data.event.publish.errors'))
    .catch(this.handleFailure);

    this.$emit('publish-event');
    this.$refs.modal.hide();
  }

  private cancel() {
    this.$refs.modal.hide();
  }
}
</script>

<style lang="scss" scoped>
.icon-success {
    font-size: 72px;
}
</style>
