import Mock from 'mockjs'

const List = []
const count = 26
let order = []

// 规则参考：https://github.com/nuysoft/Mock/wiki/Syntax-Specification
for (let i = 0; i < count; i++) {
  if (i % 2 === 0) {
    if (i === 4) {
      let dupOrder = []
      for (var index = 0; index < 3; index++) {
        dupOrder.push(Mock.mock({
          id: Mock.Random.integer(1, 50),
          orderNum: '@guid()',
          name: Mock.Random.cname(),
          fieldName: Mock.Random.ctitle(),
          bookDate: i > 3 ? `2018-09-${(2 + i > 9 ? 2 + i : '0' + (2 + i))}` : `2018-08-${25 + i}`,
          bookStartTime: Mock.Random.time(),
          bookEndTime: Mock.Random.time(),
          bookStartDate: Mock.Random.date(),
          bookEndDate: Mock.Random.date(),
          'type|1': [1, 2, 3, 4, 6, 7],
          spaceLogo: 'http://shared-office.oss-cn-shenzhen.aliyuncs.com/shared-office/img/20180725/20180725161020862mxD.jpeg'
        }))
      }
      List.push({
        bookDate: i > 3 ? `2018-09-${(2 + i > 9 ? 2 + i : '0' + (2 + i))}` : `2018-08-${25 + i}`,
        orderList: dupOrder
      })
    } else if (i === 8 || i === 10 || i === 14) {
      let dupOrder = []
      for (var idx = 0; idx < 1; idx++) {
        dupOrder.push(Mock.mock({
          id: Mock.Random.integer(1, 50),
          orderNum: '@guid()',
          name: Mock.Random.cname(),
          fieldName: Mock.Random.ctitle(),
          bookDate: i > 3 ? `2018-09-${(2 + i > 9 ? 2 + i : '0' + (2 + i))}` : `2018-08-${25 + i}`,
          bookStartTime: Mock.Random.time(),
          bookEndTime: Mock.Random.time(),
          bookStartDate: Mock.Random.date(),
          bookEndDate: Mock.Random.date(),
          'type|1': [1, 2, 3, 4, 6, 7],
          spaceLogo: 'http://shared-office.oss-cn-shenzhen.aliyuncs.com/shared-office/img/20180725/20180725161020862mxD.jpeg'
        }))
      }
      List.push({
        bookDate: i > 3 ? `2018-09-${(2 + i > 9 ? 2 + i : '0' + (2 + i))}` : `2018-08-${25 + i}`,
        orderList: dupOrder
      })
    } else {
      order.push(Mock.mock({
        id: Mock.Random.integer(1, 50),
        orderNum: '@guid()',
        name: Mock.Random.cname(),
        fieldName: Mock.Random.ctitle(),
        bookDate: i > 3 ? `2018-09-${(2 + i > 9 ? 2 + i : '0' + (2 + i))}` : `2018-08-${25 + i}`,
        bookStartTime: Mock.Random.time(),
        bookEndTime: Mock.Random.time(),
        bookStartDate: Mock.Random.date(),
        bookEndDate: Mock.Random.date(),
        'type|1': [1, 2, 3, 4, 6, 7],
        spaceLogo: 'http://shared-office.oss-cn-shenzhen.aliyuncs.com/shared-office/img/20180725/20180725161020862mxD.jpeg'
      }))
      List.push({
        bookDate: i > 3 ? `2018-09-${(2 + i > 9 ? 2 + i : '0' + (2 + i))}` : `2018-08-${25 + i}`,
        orderList: []
      })
    }
  }
}

export const getScheduleList = () => {
  return {
    'status': 'true',
    'code': '200',
    'msg': null,
    'info': {
      'currentDate': '2018-09-02',
      'result': List
    }
  }
}

let spaceList = []
for (let i = 0; i < count; i++) {
  spaceList.push(Mock.mock({
    storeId: i + 4,
    storeName: Mock.Random.csentence(5, 30),
    storeImg: 'http://shared-office.oss-cn-shenzhen.aliyuncs.com/shared-office/img/20180725/20180725161020862mxD.jpeg',
    orderCount: Mock.Random.integer(1, 1220)
  }))
}

export const getSpaceList = () => {
  return {
    'status': 'true',
    'code': '200',
    'msg': null,
    'info': spaceList
  }
}
