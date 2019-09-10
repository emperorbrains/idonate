<template>
  <div>
    <div class="px-5 py-4 border-bottom">
      <div class="row">
        <div class="col-md">
          <div>
            <label-component for="survey-name" text="Survey Name"></label-component>
            
            <input-component
              id="survey-name"
              placeholder="Enter your survey name"
              v-model="surveyName"
              required
            ></input-component>
          </div>
        </div>

        <div class="col-md d-flex align-items-center justify-content-end">
          <button class="btn btn-primary rounded-pill text-uppercase" @click="addQuestion">Add Question</button>
        </div>
      </div>
    </div>

    <div class="questions" v-if="questions.length > 0">
      <question-component
        class="border-bottom"
        v-for="(question, index) in questions"
        :index="index"
        :key="index"
        :surveyitem="question"
        @input="data => updateQuestion(data, index)"
        @delete-question="deleteQuestion(index)"
      ></question-component>
    </div>

    <div class="row">
      <div class="col-md">
        <div class="px-5 py-3">
          <a
            href="#"
            class="btn btn-light btn-back btn-lg border font-weight-semibold rounded-pill shadow-sm text-uppercase"
            @click="$router.go(-1)"
          >Back</a>
        </div>
      </div>

      <div class="col-md text-right">
        <div class="px-5 py-3">
          <button
            type="submit"
            class="btn btn-secondary btn-save btn-sky-blue btn-lg border font-weight-semibold rounded-pill shadow-sm text-uppercase w-100"
            @click="updateSurveyAndContinue"
          >Save &amp; Continue</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import IQuestionData from '@/api/interface/IQuestionData';

import InputComponent from '@/components/FormElements/InputComponent.vue';
import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import QuestionComponent from '@/components/Events/Surveys/Fields/QuestionComponent.vue';
import BaseEventVue from '@/api/core/BaseEventVue';
import ApiUtils from '@/api/util/ApiUtils';

@Component({
  components: {
    InputComponent,
    LabelComponent,
    QuestionComponent,
  },
})
export default class EditEventSurvey extends BaseEventVue {
  private readonly PAGE: number = 4;  // Same as parent
  private surveyId: string = '';
  private eventId: string = '';
  private surveyName: string = '';
  private prevSurveyName: string = '';
  private questions: IQuestionData[] = [];
  private previousCount: number = 0;
  private updatedIndexes: number[] = [];

  get isSurveyEditing() {
    return this.$route.name === 'edit-event-survey';
  }

  private mounted() {
    if (this.api === null) {
      return;
    }
    this.eventId = this.$route.params.eventId;

    if (this.isSurveyEditing) {
      this.surveyId = this.$route.params.surveyId;
      if (this.surveyId) {
        this.api.getSurvey(this.eventId, this.surveyId)
        .then((res) => {
          this.surveyName = ApiUtils.getValue(res, 'data.event.survey.name');
          this.questions = ApiUtils.getValue(res, 'data.event.survey.questions');
          this.prevSurveyName = this.surveyName;
          this.previousCount = this.questions.length;
          console.log(JSON.stringify(this.questions));
          })
        .catch(this.handleFailure);
      }
    }
  }

  private async addQuestion() {
    // tslint:disable-next-line: no-console
    console.log('Add a question');
    if (this.api === null) {
      return;
    }
    if (!this.isSurveyEditing) {
      if (!this.surveyName) {
        this.surveyName = 'Validate Name';
      }
      if (this.questions.length === 0) {
        try {
          const res = await this.api.createSurvey(this.eventId, this.surveyName);
          this.surveyId = ApiUtils.getValue(res, 'data.event.createSurvey.survey.id');
        } catch (e) {
          this.handleFailure(e);
        }
      } else {
        this.surveyId = this.$route.params.surveyId || this.surveyId;
      }
    }
    const question: IQuestionData = {
      choices: [],
      question: 'New Question',
      questionType: 'MULTIPLE_CHOICE',
      isResponseRequired: false,
    };

    this.api.createSurveyQuestion(this.eventId, this.surveyId, question)
      .then((res) => {
        question.id = ApiUtils.getValue(res, 'data.event.createSurveyQuestion.question.id');
        this.questions.push(question);
      }).catch(this.handleFailure);
  }

  private deleteQuestion(index: number) {
    // LOG
    console.log('deleteQuestion', JSON.stringify(this.questions[index]));

    // DELETE
    if (ApiUtils.hasValue(this.questions[index].id)) {
      this.api.deleteSurveyQuestion(this.eventId, this.questions[index].id)
        .then(this.handleMessage).catch(this.handleFailure);
    }
    // HIDE
    this.questions.splice(index, 1);
  }

  private updateQuestion(question: any, index: number) {
    // What index was changed?
    this.updatedIndexes.push(index);
    this.$set(this.questions, index, question);
  }


  private updateSurveyAndContinue() {
    // Remove first several used to initially set the questions
    this.updatedIndexes = this.updatedIndexes.slice(this.previousCount);
    const indexesToUpdate = this.updatedIndexes.filter((v, i, a) => a.indexOf(v) === i);

    if (this.prevSurveyName !== this.surveyName) {
      const mutation = {
        name: this.surveyName,
      };

      this.api.updateSurvey(this.$route.params.eventId, this.$route.params.surveyId || this.surveyId, mutation)
        .then((res) => this.updateEventAndProceed('event-surveys', res))
        .catch(this.handleFailure);
    } else if (indexesToUpdate.length > 0) {
        for (const index of indexesToUpdate) {
          const mutation = {
            choices: this.questions[index].choices,
            question: this.questions[index].question,
            questionType: this.questions[index].questionType,
            isResponseRequired: this.questions[index].isResponseRequired,
          };
          this.api.updateSurveyQuestion(this.$route.params.eventId, this.questions[index].id, mutation)
            .then(this.handleMessage).catch(this.handleFailure);
          console.log('updateSurveyAndContinue', this.questions[index].id);
        }
        this.updateEventStepAndProceed(this.eventId, this.PAGE, 'event-surveys');
      } else {
        this.updateEventStepAndProceed(this.eventId, this.PAGE, 'event-surveys');
    }


   }
}
</script>



