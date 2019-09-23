<template>
    <div class="x-bar">
        <div :id="id" :option="option"></div>
    </div>
</template>
<script>
    import HighCharts from 'highcharts'
    export default {
        // 验证类型
        props: {
            id: {
                type: String
            },
            option: {
                type: Object
            }
        },
       mounted () {
            setTimeout(() => {
                console.info('仪表图展示');
                HighCharts.chart(this.id, this.option);
            }, 500);
        }
    }
</script>
<style>
.container {
  width: 100%;
}
</style>
