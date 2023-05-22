<template>
  <div class="alert_config">
    <ta-echarts :option="option" class="flowChart" ref="flowChart" />
  </div>
</template>

<script>
import API from './api'
export default {
  name: 'alertConfig',
  data() {
    return {
      option: {},
      data: {}, //节点数据
      link: {}, //连线数据
      types: [
        {
          name: '流程'
        },
        { name: '上报' },
        { name: '交办' },
        { name: '呈批' },
        { name: '抄送' }
      ],
      categories: [],
      imgChart: {},

      datas: {
        id: 1,
        eventName: '部门接受事件',
        department: [
          {
            name: '部门名字1',
            id: '1',
            operate: '交办',
            warnLevel: 1,
            scene: '场景1'
          },
          {
            name: '部门名字2',
            id: '2',
            operate: '呈批',
            warnLevel: 1,
            scene: '场景1'
          },
          {
            name: '部门名字3',
            id: '3',
            operate: '抄送',
            warnLevel: 1,
            scene: '场景1'
          },
          {
            name: '部门名字4',
            id: '4',
            operate: '上报',
            warnLevel: 2,
            scene: '场景1'
          },
          {
            name: '部门名字5',
            id: '5',
            operate: '交办',
            warnLevel: 2,
            scene: '场景1'
          },
          {
            name: '部门名字6',
            id: '6',
            operate: '呈批',
            warnLevel: null,
            scene: '场景2'
          },
          {
            name: '部门名字7',
            id: '7',
            operate: '抄送',
            warnLevel: null,
            scene: '场景2'
          },
          {
            name: '部门名字8',
            id: '8',
            operate: '上报',
            warnLevel: '3',
            scene: '场景2'
          },
          {
            name: '部门名字9',
            id: '9',
            operate: '交办',
            warnLevel: '3',
            scene: '场景2'
          },
          {
            name: '部门名字10',
            id: '10',
            operate: '呈批',
            warnLevel: '4',
            scene: '场景2'
          },
          {
            name: '部门名字11',
            id: '11',
            operate: '抄送',
            warnLevel: '4',
            scene: '场景2'
          },
          {
            name: '部门名字12',
            id: '12',
            operate: '上报',
            warnLevel: null,
            scene: '场景3'
          },
          {
            name: '部门名字1',
            id: '13',
            operate: '交办',
            warnLevel: null,
            scene: '场景3'
          },
          {
            name: '部门名字2',
            id: '14',
            operate: '呈批',
            warnLevel: null,
            scene: '场景3'
          },
          {
            name: '部门名字3',
            id: '15',
            operate: '抄送',
            warnLevel: null,
            scene: '场景3'
          }
        ]
      },
      nodeList: [], //动态的点位
      allNodes: [], //固定的点位+动态的点位
      nodeLinks: [] //动态的连线
    }
  },
  mounted() {
    // this.getData()
    this.drawCoordinates()
    this.drawLine()
    this.drawChart()
    // this.setData()
  },
  methods: {
    async getData(successCallback) {
      const params = { preplanId: 'b3c22b6e60cc400a9d8304f1a64727af' }
      const res = await API.getFlowChartData(params)
      successCallback && successCallback({})
    },
    setData(data) {
      // this.exportImg()
      console.log('当前组件的数据', data)
    },
    init() {
      const data1 = [
        {
          name: null,
          id: 'A',
          x: -300,
          y: 0,
          symbol: 'circle', //形状
          symbolSize: 50
        },
        {
          id: 'B',
          name: this.datas.eventName,
          x: 0,
          y: 0,
          symbolSize: [120, 60]
        },
        {
          id: 'C',
          name: '自定义表单',
          x: 0,
          y: 250,
          symbolSize: [120, 60]
        },
        {
          id: 'G',
          name: '',
          x: 3000,
          y: 0,
          symbol: 'circle', //形状
          symbolSize: 50
        }
      ]
      const link1 = [
        {
          source: 'A',
          target: 'B',
          lineStyle: {
            color: '#473C8B',
            width: 3
          }
        },
        {
          source: 'C',
          target: 'B',
          lineStyle: {
            color: '#473C8B',
            width: 3
          }
        },
        {
          source: 'B',
          target: 'D',
          lineStyle: {
            color: '#473C8B',
            width: 3
          }
        },
        {
          source: 'D',
          target: 'E',
          lineStyle: {
            color: '#473C8B',
            width: 3
          }
        }
      ]
      // const data2 = [
      //   {
      //     name: null,
      //     id: 'A',
      //     x: -400,
      //     y: 0,
      //     symbol: 'circle', //形状
      //     symbolSize: 50
      //   },
      //   {
      //     id: 'X',
      //     name: '部门接收事件',
      //     x: -280,
      //     y: 0
      //   },
      //   {
      //     id: 'B',
      //     name: '场景1',
      //     x: -160,
      //     y: 0
      //   },
      //   {
      //     id: 'C',
      //     name: '自定义表单',
      //     x: -280,
      //     y: 100
      //   },
      //   {
      //     id: 'D',
      //     name: '事件预警级别判断',
      //     x: 0,
      //     y: 0,
      //     symbolSize: [200, 100],
      //     symbol: 'diamond' //形状polygon
      //   },
      //   {
      //     id: 'redAlert',
      //     name: '红色预警',
      //     x: 250,
      //     y: -180,
      //     symbol: 'rect' //形状
      //   },
      //   {
      //     id: 'orangeAlert',
      //     name: '橙色预警',
      //     x: 250,
      //     y: -60,
      //     symbol: 'rect' //形状
      //   },
      //   {
      //     id: 'yellowAlert',
      //     name: '黄色预警',
      //     x: 250,
      //     y: 60,
      //     symbol: 'rect' //形状
      //   },
      //   {
      //     id: 'blueAlert',
      //     name: '蓝色预警',
      //     x: 250,
      //     y: 180,
      //     symbol: 'rect' //形状
      //   },
      //   {
      //     id: 'I',
      //     name: '区消防大队',
      //     x: 460,
      //     y: -220,
      //     category: '上报',
      //     label: {
      //       color: '#fff',
      //       fontWeight: '300'
      //     }
      //   },
      //   {
      //     id: 'J',
      //     name: '区城运中心',
      //     x: 460,
      //     y: -180,
      //     category: '交办',
      //     label: {
      //       color: '#fff',
      //       fontWeight: '300'
      //     }
      //   },
      //   {
      //     id: 'K',
      //     name: '区政府',
      //     x: 460,
      //     y: -140,
      //     category: '呈批',
      //     label: {
      //       color: '#fff',
      //       fontWeight: '300'
      //     }
      //   },
      //   {
      //     id: 'L',
      //     name: '街道消防大队',
      //     x: 460,
      //     y: -100,
      //     category: '抄送',
      //     label: {
      //       color: '#fff',
      //       fontWeight: '300'
      //     }
      //   },
      //   {
      //     id: 'M',
      //     name: '区城运中心',
      //     x: 460,
      //     y: -60
      //   },
      //   {
      //     id: 'N',
      //     name: '区政府',
      //     x: 460,
      //     y: -20
      //   },
      //   {
      //     id: 'O',
      //     name: '街道消防大队',
      //     x: 460,
      //     y: 20
      //   },
      //   {
      //     id: 'P',
      //     name: '区城运中心',
      //     x: 460,
      //     y: 60
      //   },
      //   {
      //     id: 'Q',
      //     name: '区政府',
      //     x: 460,
      //     y: 100
      //   },
      //   {
      //     id: 'R',
      //     name: '街道消防大队',
      //     x: 460,
      //     y: 140
      //   },
      //   {
      //     id: 'S',
      //     name: '区城运中心',
      //     x: 460,
      //     y: 180
      //   },
      //   {
      //     id: 'T',
      //     name: '区政府',
      //     x: 460,
      //     y: 220
      //   },
      //   {
      //     id: 'Z',
      //     name: '',
      //     x: 600,
      //     y: 0,
      //     symbol: 'circle', //形状
      //     symbolSize: 50
      //   },

      //   //折线点位
      //   {
      //     id: 'point1',
      //     name: 'point1',
      //     x: 150,
      //     y: 0,
      //     symbol: 'circle', //形状
      //     symbolSize: 0
      //   },
      //   {
      //     id: 'point2',
      //     name: 'point2',
      //     x: 150,
      //     y: -180,
      //     symbol: 'circle', //形状
      //     symbolSize: 0
      //   },
      //   {
      //     id: 'point3',
      //     name: 'point3',
      //     x: 150,
      //     y: -60,
      //     symbol: 'circle', //形状
      //     symbolSize: 0
      //   },
      //   {
      //     id: 'point4',
      //     name: 'point4',
      //     x: 150,
      //     y: 60,
      //     symbol: 'circle', //形状
      //     symbolSize: 0
      //   },
      //   {
      //     id: 'point5',
      //     name: 'point5',
      //     x: 150,
      //     y: 180,
      //     symbol: 'circle', //形状
      //     symbolSize: 0
      //   },
      //   {
      //     id: 'point2_1',
      //     name: 'point2_1',
      //     x: 350,
      //     y: -220,
      //     symbol: 'circle', //形状
      //     symbolSize: 0
      //   },
      //   {
      //     id: 'point2_2',
      //     name: 'point2_2',
      //     x: 350,
      //     y: -180,
      //     symbol: 'circle', //形状
      //     symbolSize: 0
      //   },
      //   {
      //     id: 'point2_3',
      //     name: 'point2_3',
      //     x: 350,
      //     y: -140,
      //     symbol: 'circle', //形状
      //     symbolSize: 0
      //   },
      //   {
      //     id: 'point2_4',
      //     name: 'point2_4',
      //     x: 350,
      //     y: -100,
      //     symbol: 'circle', //形状
      //     symbolSize: 0
      //   },
      //   {
      //     id: 'point2_5',
      //     name: 'point2_5',
      //     x: 350,
      //     y: -60,
      //     symbol: 'circle', //形状
      //     symbolSize: 0
      //   },
      //   {
      //     id: 'point2_6',
      //     name: 'point2_6',
      //     x: 350,
      //     y: -20,
      //     symbol: 'circle', //形状
      //     symbolSize: 0
      //   },
      //   {
      //     id: 'point2_7',
      //     name: 'point2_7',
      //     x: 350,
      //     y: 20,
      //     symbol: 'circle', //形状
      //     symbolSize: 0
      //   },
      //   {
      //     id: 'point2_8',
      //     name: 'point2_8',
      //     x: 350,
      //     y: 60,
      //     symbol: 'circle', //形状
      //     symbolSize: 0
      //   },
      //   {
      //     id: 'point2_9',
      //     name: 'point2_9',
      //     x: 350,
      //     y: 100,
      //     symbol: 'circle', //形状
      //     symbolSize: 0
      //   },
      //   {
      //     id: 'point2_10',
      //     name: 'point2_10',
      //     x: 350,
      //     y: 140,
      //     symbol: 'circle', //形状
      //     symbolSize: 0
      //   },
      //   {
      //     id: 'point2_11',
      //     name: 'point2_11',
      //     x: 350,
      //     y: 180,
      //     symbol: 'circle', //形状
      //     symbolSize: 0
      //   },
      //   {
      //     id: 'point2_12',
      //     name: 'point2_12',
      //     x: 350,
      //     y: 220,
      //     symbol: 'circle', //形状
      //     symbolSize: 0
      //   }
      // ]
      // const link2 = [
      //   //第一层
      //   {
      //     source: 'A',
      //     target: 'X',
      //     symbolOffset: [20, 0], //偏移量
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },

      //   //第二层
      //   {
      //     source: 'X',
      //     target: 'B',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'C',
      //     target: 'X',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3,
      //       type: 'dashed'
      //     }
      //   },
      //   //第三层
      //   {
      //     source: 'B',
      //     target: 'D',
      //     symbol: ['circle', 'circle'],
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'D',
      //     target: 'point1',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point1',
      //     target: 'point2',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point2',
      //     target: 'redAlert',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point1',
      //     target: 'point3',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point3',
      //     target: 'orangeAlert',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point1',
      //     target: 'point4',
      //     symbolOffset: [0, 30],
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point4',
      //     target: 'yellowAlert',
      //     symbolOffset: [0, 30],
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point1',
      //     target: 'point5',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point5',
      //     target: 'blueAlert',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   //第四层
      //   {
      //     source: 'redAlert',
      //     target: 'point2_2',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point2_2',
      //     target: 'point2_1',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point2_2',
      //     target: 'point2_3',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point2_1',
      //     target: 'I',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point2_2',
      //     target: 'J',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point2_3',
      //     target: 'K',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'orangeAlert',
      //     target: 'point2_5',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point2_5',
      //     target: 'point2_4',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point2_5',
      //     target: 'point2_6',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point2_4',
      //     target: 'L',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point2_5',
      //     target: 'M',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point2_6',
      //     target: 'N',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },

      //   {
      //     source: 'yellowAlert',
      //     target: 'point2_8',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point2_8',
      //     target: 'point2_7',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point2_7',
      //     target: 'O',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point2_8',
      //     target: 'P',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point2_9',
      //     target: 'Q',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point2_8',
      //     target: 'point2_9',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'blueAlert',
      //     target: 'point2_11',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point2_11',
      //     target: 'point2_10',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point2_11',
      //     target: 'point2_12',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point2_10',
      //     target: 'R',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point2_11',
      //     target: 'S',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'point2_12',
      //     target: 'T',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   //第五层
      //   {
      //     source: 'I',
      //     target: 'Z',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'L',
      //     target: 'Z',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'O',
      //     target: 'Z',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   },
      //   {
      //     source: 'R',
      //     target: 'Z',
      //     lineStyle: {
      //       color: '#473C8B',
      //       width: 3
      //     }
      //   }
      // ]
      this.allNodes = [...data1, ...this.nodeList]
      const allLinks = [...link1, ...this.nodeLinks]
      this.data = this.allNodes
      this.link = allLinks
    },
    //绘制流程图点位
    drawCoordinates() {
      const departmentList = this.datas.department
      departmentList.forEach(item => {
        this.nodeList.push({
          id: item.id,
          name: item.name,
          x: 0,
          y: 0,
          warnLevel: item.warnLevel,
          category: item.operate,
          scene: item.scene
        })
      })
      //最后一层的坐标 2500是x轴坐标
      const coord = this.arrangePoints(2500, departmentList.length)
      coord.forEach((item, index) => {
        this.nodeList[index].x = item.x
        this.nodeList[index].y = item.y
        this.nodeList[index].label = {
          color: '#fff',
          fontWeight: '300'
        }
      })
      //预警点和部门点之间的折点 倒数第二层折点坐标
      const coord2 = this.getFoldPoints(this.nodeList)
      //预警点坐标alertPonits 和 无预警场景点坐标scenePoints
      const { alertPonits, scenePoints } = this.alertPoints(coord2)
      //预警点和事件等级判断点之间的折点 倒数第四层折点坐标
      const coord4 = this.getFoldPoints(alertPonits)
      //事件级别判断的坐标
      const judgePoints = this.getEventLevelPoints(coord4)
      //有预警的场景点坐标
      const coord6 = this.getScenePoint(judgePoints)
      //场景点折点
      const coord8 = this.getFoldPoints([...scenePoints, ...coord6])
      //初始点折点
      this.getInitPoint(coord8)
      this.nodeList = [
        ...this.nodeList,
        ...coord2,
        ...alertPonits,
        ...coord4,
        ...coord6,
        ...judgePoints,
        ...scenePoints,
        ...coord8
      ]
    },
    /**
     * @description: 计算最后一层的坐标
     * @param {*} x x的轴坐标
     * @param {*} n 所有部门的数量
     * @return {*} 返回计算后的坐标数组
     */
    arrangePoints(x, n) {
      const spacing = 100 //偏移量
      const points = []
      let y = null
      if (n % 2 === 1) {
        for (let i = 0; i < n; i++) {
          y = (i - Math.floor(n / 2)) * spacing
          points.push({ x, y })
        }
      } else {
        for (let i = 0; i < n; i++) {
          y = (i - Math.floor(n / 2) + 1) * spacing + spacing / 2 // 计算后半部分点的 y 坐标
          points.push({ x, y })
        }
      }
      return points
    },
    /**
     * @description: 计算折点坐标
     * @param {*} coord 上一层的坐标
     * @return {*} 返回折点坐标
     */
    getFoldPoints(coord) {
      const point = coord.map((item, index) => ({
        id: item.id + index + 300,
        name: null,
        x: item.x - 300,
        y: item.y,
        next: [item.id],
        scene: item.scene,
        warnLevel: item.warnLevel || null,
        symbol: 'circle', //形状
        symbolSize: 0
      }))
      return point
    },
    //如果事件预警判断或预警等级后没有对应的折点则添加折点
    // addMissingCoordinates(arr1, arr2, id) {
    //   const arr1YCoordinates = arr1.map(item => item.y)
    //   const arr2YCoordinates = arr2.map(item => item.y)

    //   const yCoordinatesIncluded = arr1YCoordinates.every(y =>
    //     arr2YCoordinates.includes(y)
    //   )
    //   if (!yCoordinatesIncluded) {
    //     arr1.forEach(item => {
    //       if (!arr2YCoordinates.includes(item.y)) {
    //         arr2.push({
    //           id: id + item.id,
    //           name: null,
    //           x: arr2[0].x,
    //           y: item.y,
    //           scene: item.scene,
    //           symbol: 'circle', //形状
    //          symbolSize: 0
    //         })
    //       }
    //     })
    //   }
    //   return arr2
    // },

    // sortData() {
    //   const data = [
    //     { area: 'government', level: null },
    //     { area: 'government', level: 2 },
    //     { area: 'school', level: null },
    //     { area: 'government', level: 1 },
    //     { area: 'government', level: null },
    //     { area: 'government', level: 4 },
    //     { area: 'company', level: 4 },
    //     { area: 'company', level: 4 },
    //     { area: 'company', level: 3 },
    //     { area: 'company', level: null },
    //     { area: 'school', level: 2 },
    //     { area: 'school', level: 2 },
    //     { area: 'school', level: 1 },
    //     { area: 'school', level: 2 }
    //   ]
    //   // Grouping by area
    //   const groupedData = {}
    //   data.forEach(item => {
    //     const area = item.area
    //     if (!groupedData[area]) {
    //       groupedData[area] = []
    //     }
    //     groupedData[area].push(item)
    //   })
    //   // Sorting within each group based on level
    //   for (const area in groupedData) {
    //     groupedData[area].sort((a, b) => {
    //       if (a.level === null) return -1
    //       if (b.level === null) return 1
    //       return a.level - b.level
    //     })
    //   }

    //   console.log(groupedData)
    // },

    //获得所有场景的预警点和事件级别判断点位
    alertPoints(coord) {
      //切割不同场景的数组
      const sceneArrays = this.splitArray(coord)
      let points = [] //根据场景分割开的点位集合
      let alertPonits = [] //所有场景的预警点,
      let scenePoints = [] //若预警等级为0,则直接生成场景点坐标
      let result = {}
      for (let i = 0; i < sceneArrays.length; i++) {
        points[i] = this.getWarnPoints(sceneArrays[i])
        if (!points[i].length) {
          scenePoints.push(this.getSencePointsNoAlert(sceneArrays[i]))
        }
        alertPonits = alertPonits.concat(points[i])
      }
      result = {
        alertPonits,
        scenePoints
      }
      return result
    },
    //获得事件级别判断点位
    getEventLevelPoints(coord) {
      const splitPoints = this.splitArray(coord)
      let judgePoints = []
      splitPoints.forEach(item => {
        if (item.length) {
          judgePoints.push(this.warnJudgment(item))
        }
      })
      return judgePoints
    },
    /**
     * 根据不同场景将数组分割成n个数组
     * @param {arr} coord 所有数据的数组
     */
    splitArray(coord) {
      const sceneMap = {}
      coord.forEach(item => {
        const scene = item.scene
        if (!sceneMap[scene]) {
          sceneMap[scene] = []
        }
        sceneMap[scene].push(item)
      })
      // 输出切割后的数组
      const sceneArrays = Object.values(sceneMap)
      return sceneArrays
    },
    //获取中间点坐标
    getMidpoint(coord) {
      const sum = coord.reduce((sum, item) => sum + item.y, 0)
      const midpoint = sum / coord.length
      return midpoint
    },
    //计算预警点坐标
    getWarnPoints(coord) {
      const scene = coord[0].scene || null
      const x = 1800
      const redAlertList = coord.filter(item => item.warnLevel == 1)
      const redY = this.getMidpoint(redAlertList)

      const orangeAlertList = coord.filter(item => item.warnLevel == 2)
      const orangeY = this.getMidpoint(orangeAlertList)

      const yellowAlertList = coord.filter(item => item.warnLevel == 3)
      const yellowY = this.getMidpoint(yellowAlertList)

      const blueAlertList = coord.filter(item => item.warnLevel == 4)
      const blueY = this.getMidpoint(blueAlertList)

      const noAlertList = coord.filter(item => item.warnLevel === null)
      const noAlertY = this.getMidpoint(noAlertList)

      const points = []
      if (redY) {
        let redFlod = this.getFlodPoints(redAlertList, 'redAlert', 2200)
        let midPoint = (redAlertList.length - 1) / 2
        if (redFlod) {
          this.nodeList.push(redFlod)
        } else {
          redFlod = redAlertList[midPoint]
        }
        points.push({
          id: 'redAlert' + scene,
          name: '红色预警',
          x,
          y: redY,
          scene,
          next: [redFlod.id],
          symbol: 'rect', //形状
          color: 'red'
        })
      }
      if (orangeY) {
        let orangeFlod = this.getFlodPoints(
          orangeAlertList,
          'orangeAlert',
          2200
        )
        let midPoint = (orangeAlertList.length - 1) / 2
        if (orangeFlod) {
          this.nodeList.push(orangeFlod)
        } else {
          orangeFlod = orangeAlertList[midPoint]
        }
        points.push({
          id: 'orangeAlert' + scene,
          name: '橙色预警',
          x,
          scene,
          next: [orangeFlod.id],
          y: orangeY,
          symbol: 'rect' //形状
        })
      }
      if (yellowY) {
        const yellowFlod = this.getFlodPoints(
          yellowAlertList,
          'yellowAlert',
          2200
        )
        let midPoint = (yellowAlertList.length - 1) / 2
        if (yellowFlod) {
          this.nodeList.push(yellowFlod)
        } else {
          yellowFlod = yellowAlertList[midPoint]
        }
        points.push({
          id: 'yellowAlert' + scene,
          name: '黄色预警',
          x,
          scene,
          next: [yellowFlod.id],
          y: yellowY,
          symbol: 'rect' //形状
        })
      }
      if (blueY) {
        const blueFlod = this.getFlodPoints(blueAlertList, 'blueAlert', 2200)
        let midPoint = (blueAlertList.length - 1) / 2
        if (blueFlod) {
          this.nodeList.push(blueFlod)
        } else {
          blueFlod = blueAlertList[midPoint]
        }
        points.push({
          id: 'blueAlert' + scene,
          name: '蓝色预警',
          x,
          y: blueY,
          scene,
          next: [blueFlod.id],
          symbol: 'rect' //形状
        })
      }
      if (
        noAlertList.length &&
        noAlertY &&
        (redY || orangeY || yellowY || blueY)
      ) {
        let noAlertFlod = this.getFlodPoints(
          noAlertList,
          `noAlert${noAlertY}`,
          2200
        )
        let midPoint = (noAlertList.length - 1) / 2
        if (noAlertFlod) {
          this.nodeList.push(noAlertFlod)
        } else {
          noAlertFlod = noAlertList[midPoint]
        }
        this.nodeList.push({
          id: 'noAlert' + scene + noAlertY,
          name: null,
          x: 700,
          y: noAlertY,
          scene,
          next: [noAlertFlod.id],
          symbol: 'circle', //形状
          symbolSize: 0
        })
      }
      return points
    },
    /**
     * 获得折点坐标 如果传进来的数组为奇数则中间点作为折点,如果为偶数则生成折点
     * @param {*} coord 需要计算折点的数组
     * @param {*} name 传进来数组的名字
     * @param {*} x X轴的坐标
     */
    getFlodPoints(coord, name, x) {
      const y = this.getMidpoint(coord)
      let pFoldNexts = []
      let pFold = null
      let midPoint = (coord.length - 1) / 2
      coord.forEach(item => {
        if (item.y !== y) {
          pFoldNexts.push(item.id)
        }
      })
      if (coord.length % 2 === 0) {
        pFold = {
          id: name + y + x + coord[0].id,
          name: null,
          x,
          y,
          next: pFoldNexts,
          symbolSize: 0,
          symbol: 'circle' //形状polygon
        }
      } else {
        coord[midPoint].next = coord[midPoint].next.concat(pFoldNexts)
      }

      return pFold
    },
    //计算事件预警级别判断坐标和他的折点
    warnJudgment(coord) {
      const scene = coord[0].scene || null
      const y = coord.reduce((sum, item) => sum + item.y, 0) / coord.length
      // let pFold = null
      let midPoint = (coord.length - 1) / 2
      const pFold = this.getFlodPoints(coord, 'warnJudgmentFold', 1500)
      const point = {
        id: 'warnJudgment' + scene,
        name: '事件预警级别判断',
        x: 1200,
        y,
        scene,
        next: pFold ? pFold.id : coord[midPoint].id,
        symbolSize: [160, 80],
        symbol: 'diamond' //形状polygon
      }
      if (pFold) {
        this.nodeList.push(pFold)
      }
      return point
    },

    /**
     * 计算场景点位坐标
     * @param {arr} coord 事件预警级别判断坐标
     */
    getScenePoint(coord) {
      if (coord.length) {
        const points = coord.map(item => ({
          id: item.scene,
          name: item.scene,
          next: [item.id],
          x: item.x - 500,
          y: item.y,
          scene: item.scene
        }))
        //链接无预警点的折点坐标
        for (let i = 0; i < points.length; i++) {
          this.nodeList.map(item => {
            if (item.x === points[i].x && item.scene === points[i].scene) {
              points[i].next.push(item.id)
            }
          })
        }
        return points
      } else {
        return []
      }
    },
    //计算预警等级为零的场景点坐标
    getSencePointsNoAlert(coord) {
      const y = this.getMidpoint(coord)
      const scene = coord[0].scene
      let midPoint = (coord.length - 1) / 2
      let pFlod = this.getFlodPoints(coord, 'noAlert', coord[0].x)
      if (pFlod) {
        this.nodeList.push(pFlod)
      } else {
        pFlod = coord[midPoint]
      }
      const point = {
        id: scene,
        name: scene,
        x: 700,
        y,
        scene,
        next: [pFlod.id]
      }
      return point
    },
    //计算场景点与部门接收事件的折点 初始点折点
    getInitPoint(coord) {
      let next = []
      coord.forEach(item => {
        if (item.y !== 0) {
          next.push(item.id)
        }
      })
      let initNode = {
        id: 'D',
        name: null,
        x: 400,
        y: 0,
        next,
        symbol: 'circle', //形状
        symbolSize: 0
      }
      this.nodeList.push(initNode)
    },
    //绘制连线
    drawLine() {
      const links = []
      console.log('点位总数', this.nodeList)
      //给所有的折点加一个next属性来标记他到哪去
      this.nodeList.map(item => {
        if (Object.hasOwn(item, 'next')) {
          if (item.next instanceof Array) {
            item.next.forEach(current => {
              links.push({
                source: item.id,
                target: current,
                lineStyle: {
                  color: '#473C8B',
                  width: 3
                }
              })
            })
          } else {
            links.push({
              source: item.id,
              target: item.next,
              lineStyle: {
                color: '#473C8B',
                width: 3
              }
            })
          }
        }
      })
      this.nodeLinks = links
    },
    //绘制ecahrts
    drawChart() {
      this.init()
      const option = {
        title: {
          text: '颜色图例',
          right: '20px',
          top: '20px',
          textStyle: {
            fontSize: 16,
            color: '#666'
          }
        },
        legend: {
          icon: 'roundRect', //图例样式
          show: true,
          itemWidth: 35,
          itemHeight: 30,
          itemGap: 15,
          orient: 'vertical',
          top: '60px',
          right: '20px',
          itemStyle: {},
          data: this.types.map(function (a) {
            return a.name
          })
        },
        series: [
          {
            type: 'graph', //关系图
            layout: 'none', // 图的布局 'none' 不采用任何布局，使用节点中提供的 x， y 作为节点的位置。
            // 'circular' 采用环形布局;'force' 采用力引导布局.
            symbolSize: [100, 40],
            categories: this.types,
            roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
            // move: true,
            color: [
              '#F0F0F0',
              'rgba(245, 154, 35, 1)',
              'rgba(112, 173, 71, 1)',
              'rgba(61, 100, 172, 1)',
              '#0071BC'
            ],
            label: {
              // 关系对象上的标签
              show: true, // 是否显示标签
              fontSize: 16, // 文本样式
              color: 'rgba(70, 114, 196, 1)',
              fontWeight: '500'
              // borderColor: 'rgba(70, 114, 196, 1)'
              //backgroundColor:'white'
            },
            symbol: 'roundRect', //形状
            edgeSymbol: ['circle', null],
            edgeSymbolSize: [4, 10], // 关系图节点标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [4, 10] 表示标记宽为4，高为10。
            edgeLabel: {
              // 连接两个关系对象的线上的标签
              fontSize: 25
            },
            itemStyle: {
              borderColor: 'rgba(70, 114, 196, 1)'
            },
            // 图
            data: this.data,
            links: this.link
          }
        ]
      }
      this.$refs.flowChart.updateOptions(option)
    },

    /**
     * @description: 导出echarts为图片
     * @return {*}
     */
    exportImg() {
      setTimeout(() => {
        this.imgChart = this.$refs.flowChart.myChart.getDataURL()
        const data = {
          base64Str: this.imgChart,
          preplanId: 'b3c22b6e60cc400a9d8304f1a64727af',
          json: JSON.stringify(this.datas)
        }
        const res = API.uploadFlowChart(data)
        console.log(this.imgChart)
      }, 2000)
    }
  }
}
</script>

<style scoped lang="less">
.alert_config {
  width: 100%;
  height: 100%;
  .flowChart {
    height: 580px;
    width: 1580px;
  }
}
</style>
