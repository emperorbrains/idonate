<script>
import { HorizontalBar } from 'vue-chartjs';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

export default {
  extends: HorizontalBar,
  props: {
      chartdata: {
          type: Object,
      },
      options: {
          type: Object,
      },
  },
  watch: {
    chartdata: {
      handler: function(val, oldVal) { this.renderChart(val, this.options); },
      deep: true,
    },
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
  updated() {
    this.renderChart(this.chartdata, this.options);
  },

};
</script>