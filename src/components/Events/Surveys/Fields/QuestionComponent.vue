<template>
  <div class="py-4 px-5">
    <div class="row">
      <div class="col-md">
        <h5 class="font-weight-bold" v-text="questionTitle"></h5>
        <span
          class="font-weight-bold text-muted text-capitalize"
          v-text="questionTypeText"
        ></span>
      </div>

      <div class="col-md d-flex align-items-center justify-content-end">
        <span
          class="btn btn-white btn-sm rounded-circle mr-3"
          v-b-modal="'event-survey-question-delete-modal-' + index"
        >
          <i class="far fa-trash-alt text-primary"></i>
        </span>

        <span class="cursor-pointer" style="font-size: 24px;" @click="isExpanded = !isExpanded">
          <span class="fa" :class="{'fa-chevron-up': isExpanded, 'fa-chevron-down': !isExpanded}"></span>
        </span>
      </div>
    </div>

    <div v-if="isExpanded">
      <div class="row mt-3">
        <div class="col-md">
          <div class="mb-3">
            <div class="d-flex align-item-center justify-content-between">
              <label-component for="event-survey-question" text="Question"></label-component>

              <div>
                <div class="custom-control custom-checkbox">
                  <input
                    id="survey-question-is-required"
                    class="custom-control-input text-muted"
                    name="survey-question-is-required"
                    type="checkbox"
                    v-model="isQuestionRequired"
                  >

                  <label-component
                    class="custom-control-label text-muted"
                    for="survey-question-is-required"
                    text="Required"
                    :isBold="false"
                  ></label-component>
                </div>
              </div>
            </div>

            <input-component
              id="event-survey-question"
              placeholder="Enter Survey Question"
              required
              v-model="questionTitle"
            ></input-component>
          </div>
        </div>

        <div class="col-md">
          <label-component for="event-survey-question-type" text="Question Type"></label-component>

          <select-component
            id="event-survey-question-type"
            defaultOptionText="-- No Question Type --"
            :options="questionTypes"
            v-model="questionType"
            required
          ></select-component>
        </div>
      </div>

      <div class="question-options" v-if="questionOptions.length > 0">
        <div class="mb-3" v-for="(option, index) in questionOptions" :index="index" :key="index">
          <label-component :for="'question-option-' + (index + 1)" :text="'Answer ' + (index + 1 )"></label-component>

          <div class="row">
            <div class="col-md-6">
              <div class="d-flex align-item-center">
                <input-component
                  :id="'question-option-' + (index + 1)"
                  placeholder="Enter answer here"
                  required
                  :value="option.value"
                  @input="value => updateQuestionOption(value, index)"
                ></input-component>

                <span
                  class="btn btn-white icon-action btn-sm rounded-circle mx-3 cursor-pointer"
                  @click="deleteQuestionOption(index)"
                >
                  <i class="fa fa-minus"></i>
                </span>

                <span
                  class="btn btn-white icon-action btn-sm rounded-circle cursor-pointer"
                  @click="addQuestionOption"
                  v-if="(index + 1) == questionOptions.length"
                >
                  <i class="fa fa-plus"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <event-survey-question-delete-modal-component
      :id="'event-survey-question-delete-modal-' + index"
      @form-submitted="deleteQuestion"
    ></event-survey-question-delete-modal-component>
  </div>
</template>

<script lang="ts">
import _ from 'lodash';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import IQuestion from '@/api/interface/IQuestion';
import * as EventConstants from '@/api/EventConstants';
import ApiUtils from '@/api/util/ApiUtils';
import TypeUtils from '@/api/util/TypeUtils';

import EventSurveyQuestionDeleteModalComponent from '@/components/Events/Surveys/EventSurveyQuestionDeleteModalComponent.vue';
import InputComponent from '@/components/FormElements/InputComponent.vue';
import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import SelectComponent from '@/components/FormElements/SelectComponent.vue';

@Component({
  components: {
    EventSurveyQuestionDeleteModalComponent,
    InputComponent,
    LabelComponent,
    SelectComponent,
  },
})
export default class QuestionComponent extends Vue {
  @Prop(Object) public readonly surveyitem!: IQuestion;
  @Prop(Number) public readonly index!: number;

  private isExpanded: boolean = false;
  private questionTypes = EventConstants.SURVEY_QUESTION_TYPES;

  @Watch('questionType', { immediate: true })
  public monitorQuestionType(questionType: string) {
    const choices: string[] = [];

    if (
      questionType === 'MULTIPLE_CHOICE' ||
      questionType === 'MULTIPLE_CHOICE_DROPDOWN' ||
      questionType === 'MULTIPLE_ANSWER'
    ) {
      choices.push('');
      choices.push('');
    }

    const question: IQuestion = {
      id: this.surveyitem.id,
      question: this.surveyitem.question,
      isResponseRequired: this.surveyitem.isResponseRequired,
      choices: this.surveyitem.choices,
      questionType: this.surveyitem.questionType,
    };

    this.$emit('input', question);
  }

  get isQuestionRequired() {
    return this.surveyitem.isResponseRequired === undefined ? false : this.surveyitem.isResponseRequired;
  }

  set isQuestionRequired(value: boolean) {
    const question: IQuestion = {
      id: this.surveyitem.id,
      question: this.surveyitem.question,
      isResponseRequired: value,
      choices: this.surveyitem.choices,
      questionType: this.surveyitem.questionType,
    };

    this.$emit('input', question);
  }

  get questionOptions() {
    return this.surveyitem.choices;
  }

  get questionTitle() {
    return this.surveyitem.question;
  }

  set questionTitle(value: string) {
    const question: IQuestion = {
      id: this.surveyitem.id,
      question: value,
      isResponseRequired: this.surveyitem.isResponseRequired,
      choices: this.surveyitem.choices,
      questionType: this.surveyitem.questionType,
    };

    this.$emit('input', question);
  }

  get questionTypeText() {
    const type = TypeUtils.toString(this.surveyitem.questionType, '');
    if (ApiUtils.hasValue(type)) {
      const obj = EventConstants.SURVEY_QUESTION_TYPES.find((element) => element.value === type );
      return ApiUtils.getValue(obj, 'text');
    } else {
      return '(no type)';
    }
  }

  get questionType() {
    return TypeUtils.toString(this.surveyitem.questionType, '');
  }

  set questionType(questionType: string) {
    const question: IQuestion = {
      id: this.surveyitem.id,
      question: this.surveyitem.question,
      isResponseRequired: this.surveyitem.isResponseRequired,
      choices: this.surveyitem.choices,
      questionType,
    };

    this.$emit('input', question);
  }

  private addQuestionOption() {
    const choices = _.cloneDeep(this.surveyitem.choices);

    choices.push('');

    const question: IQuestion = {
      id: this.surveyitem.id,
      question: this.surveyitem.question,
      isResponseRequired: this.surveyitem.isResponseRequired,
      choices,
      questionType: this.surveyitem.questionType,
    };

    this.$emit('input', question);
  }

  private deleteQuestionOption(index: number) {
    if (
      this.surveyitem.questionType === 'MULTIPLE_CHOICE' ||
      this.surveyitem.questionType === 'MULTIPLE_CHOICE_DROPDOWN' ||
      this.surveyitem.questionType === 'MULTIPLE_ANSWER'
    ) {
      if (this.surveyitem.choices.length <= 2) {
        return;
      }
    }

    const choices = _.cloneDeep(this.surveyitem.choices);

    choices.splice(index, 1);

    const question: IQuestion = {
      id: this.surveyitem.id,
      question: this.surveyitem.question,
      isResponseRequired: this.surveyitem.isResponseRequired,
      choices,
      questionType: this.surveyitem.questionType,
    };

    this.$emit('input', question);
  }

  private deleteQuestion() {
    this.$emit('delete-question');
  }

  private updateQuestionOption(value: string, index: number) {
    const choices = _.cloneDeep(this.surveyitem.choices);

    choices[index].value = value;

    const question: IQuestion = {
      id: this.surveyitem.id,
      question: this.surveyitem.question,
      isResponseRequired: this.surveyitem.isResponseRequired,
      choices,
      questionType: this.surveyitem.questionType,
    };

    this.$emit('input', question);
  }
}
</script>

<style lang="scss" scoped>
.icon-action {
  align-items: center;
  border: 2px solid;
  display: flex;
  justify-content: center;
  padding: 0px 13px;
}
</style>
