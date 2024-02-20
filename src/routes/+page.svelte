<script lang="ts">
  import ApexCharts from 'apexcharts';
  import { onMount } from 'svelte';
  import data from '../../db/data.json';

  onMount(() => {
    new ApexCharts(document.getElementById('chart'), {
      series: [{ name: 'Diamonds', data }],
      chart: {
        type: 'area',
        height: 869,
        zoom: { type: 'x', enabled: true, autoScaleYaxis: true },
        toolbar: { autoSelected: 'zoom' },
      },
      dataLabels: { enabled: false },
      xaxis: { type: 'datetime' },
      tooltip: { x: { format: 'dd MMM yyyy' } },
      stroke: { width: 1 },
    }).render();
  });
</script>

<div id="chart" />
