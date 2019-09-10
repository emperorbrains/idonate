<script>
import { Bar } from 'vue-chartjs';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

const OPTIONS = {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                color: 'transparent',
              },
            },
          ],
        },
      };

export default {
  extends: Bar,
  mounted() {
    this.renderChart(
      {
        labels: this.labels,
        datasets: this.datasets,
      },
      {
        legend: {
          fullWidth: true,
          labels: {
            fontColor: '#344349',
            fontFamily: 'Montserrat',
            fontSize: 13,
            usePointStyle: true,
            padding: 20,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                color: 'transparent',
                drawBorder: false,
              },
              barPercentage: 0.7,
            },
          ],
          yAxes: [{
            gridLines: {
              drawBorder: false,
              borderDash: [5, 5],
              color: "#BBBBBB",
              
            },
            ticks: {
              beginAtZero: true,
              padding: 15
            }
          }]
        },
      },
    );
  },
  props: {
    datasets: {
      type: Array,
      default: null,
    },
    labels: {
      type: Array,
      default: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
  },
  watch: {
    datasets: {
      handler: function(val, oldVal) {
          this.renderChart(
              {
                labels: this.labels,
                datasets: val,
              },
              {
                legend: {
                  labels: {
                    usePointStyle: true,
                  },
                },
                responsive: true,
                maintainAspectRatio: false,
                tooltips: {
                  enabled: true,
                },
                scales: {
                  xAxes: [
                    {
                      gridLines: {
                        color: 'transparent',
                      },
                    },
                  ],
                },
              },
            );
      },
      deep: false,
    },
  },
};
</script>
