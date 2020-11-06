<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import 'echarts-liquidfill/src/liquidFill.js'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      const value = 0.2
      const data = [value, value, value]

      const options = {
        backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
          {
            offset: 0,
            color: '#431ab8'
          },
          {
            offset: 1,
            color: '#471bba'
          }
        ]),
        title: {
          text: (value * 100).toFixed(0) + '{a|%}',
          textStyle: {
            fontSize: 50,
            fontFamily: 'Microsoft Yahei',
            fontWeight: 'normal',
            color: '#bcb8fb',
            rich: {
              a: {
                fontSize: 28
              }
            }
          },
          x: 'center',
          y: '35%'
        },
        graphic: [
          {
            type: 'group',
            left: 'center',
            top: '60%',
            children: [
              {
                type: 'text',
                z: 100,
                left: '10',
                top: 'middle',
                style: {
                  fill: '#aab2fa',
                  text: '流量统计',
                  font: '20px Microsoft YaHei'
                }
              }
            ]
          }
        ],
        series: [
          {
            type: 'liquidFill',
            radius: '80%',
            center: ['50%', '50%'],
            //  shape: 'roundRect',
            data: data,
            backgroundStyle: {
              color: {
                type: 'linear',
                x: 1,
                y: 0,
                x2: 0.5,
                y2: 1,
                colorStops: [
                  {
                    offset: 1,
                    color: 'rgba(68, 145, 253, 0)'
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(68, 145, 253, .25)'
                  },
                  {
                    offset: 0,
                    color: 'rgba(68, 145, 253, 1)'
                  }
                ],
                globalCoord: false
              },
              itemStyle: {}
            },
            outline: {
              borderDistance: 0,
              itemStyle: {
                borderWidth: 20,
                borderColor: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(69, 73, 240, 0)'
                    },
                    {
                      offset: 0.5,
                      color: 'rgba(69, 73, 240, .25)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(69, 73, 240, 1)'
                    }
                  ],
                  globalCoord: false
                },
                shadowBlur: 10,
                shadowColor: '#000'
              }
            },
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 1,
                    color: 'rgba(58, 71, 212, 0)'
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(31, 222, 225, .2)'
                  },
                  {
                    offset: 0,
                    color: 'rgba(31, 222, 225, 1)'
                  }
                ],
                globalCoord: false
              }
            },

            label: {
              normal: {
                formatter: ''
              }
            }
          }
        ]
      }
      this.chart.setOption(options)
      this.chart.on('click', function(params) {
        console.log(params, 'params')
        window.open('https://www.baidu.com/')
      })
    }
  }
}
</script>
