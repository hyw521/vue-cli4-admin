<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

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
        backgroundColor: '#050038',
        title: {
          text: '',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 25,
            color: 'rgb(97, 142, 205)'
          }
        },
        series: [
          {
            type: 'liquidFill',
            radius: '45%',
            center: ['50%', '50%'],
            data: [0.5, 0.5, 0.5], // data个数代表波浪数
            backgroundStyle: {
              borderWidth: 1,
              color: 'rgb(255,0,255,0.1)'
            },
            label: {
              normal: {
                formatter: (0.5 * 100).toFixed(2) + '%',
                textStyle: {
                  fontSize: 50
                }
              }
            },
            outline: {
              show: false
            }
          },
          {
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['50%', '52%'],
            hoverAnimation: false,
            data: [
              {
                name: '',
                value: 500,
                labelLine: {
                  show: false
                },
                itemStyle: {
                  color: '#5886f0'
                },
                emphasis: {
                  labelLine: {
                    show: false
                  },
                  itemStyle: {
                    color: '#5886f0'
                  }
                }
              },
              {
                // 画中间的图标
                name: '',
                value: 4,
                labelLine: {
                  show: false
                },
                itemStyle: {
                  color: '#ffffff',
                  normal: {
                    color: '#5886f0',
                    borderColor: '#5886f0',
                    borderWidth: 20
                    // borderRadius: '100%'
                  }
                },
                label: {
                  borderRadius: '100%'
                },
                emphasis: {
                  labelLine: {
                    show: false
                  },
                  itemStyle: {
                    color: '#5886f0'
                  }
                }
              },
              {
                // 解决圆点过大后续部分显示明显的问题
                name: '',
                value: 4,
                labelLine: {
                  show: false
                },
                itemStyle: {
                  color: '#5886f0'
                },
                emphasis: {
                  labelLine: {
                    show: false
                  },
                  itemStyle: {
                    color: '#5886f0'
                  }
                }
              },
              {
                // 画剩余的刻度圆环
                name: '',
                value: 88,
                itemStyle: {
                  color: '#050038'
                },
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                emphasis: {
                  labelLine: {
                    show: false
                  },
                  itemStyle: {
                    color: 'rgba(255,255,255,0)'
                  }
                }
              }
            ]
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
