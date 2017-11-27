// import {
//   param2Obj
// } from '@/utils'

// const List = []
// const count = 100

// function getLocalTime(nows) {
//   var now = new Date(nows);
//   var year = now.getFullYear();
//   var month = now.getMonth() + 1;
//   var date = now.getDate();
//   var hour = now.getHours();
//   var minute = now.getMinutes();
//   var second = now.getSeconds();
//   return year + "/" + month + "/" + date + " " + hour + ":" + minute + ":" + second;
// }
// function timestamp(time) {
//   return Date.parse(new Date(time))
// }
// for (let i = 1; i <= count; i++) {
//   List.push({
//     id: i + '',
//     workNo: parseInt(Math.random() * 9000 + 1000) + '',
//     userName: Math.random().toString(36).substr(2).slice(0, 6),
//     loginName: Math.random().toString(36).substr(2).slice(0, 6),
//     loginPassword: parseInt(999999 * Math.random()) + '',
//     positionName: Math.floor(Math.random() * 2) ? '单位A' : '单位B',
//     email: Math.random().toString(36).substr(2).slice(0, 4) + '@email.com',
//     mobile: '150' + Math.floor(Math.random() * 90000000 + 10000000),
//     photo: parseInt(100 * Math.random()) + '',
//     status: Math.floor(Math.random() * 2) ? '启用' : '禁用',
//     last_login_time: getLocalTime(parseInt(Math.random() * 10000000000 + 1500000000000)),
//     loginFailCount: parseInt(100 * Math.random()) + '',
//     creatorName: parseInt(100 * Math.random()) + '',
//     createTime: getLocalTime(parseInt(Math.random() * 10000000000 + 1500000000000)),
//     modifierName: parseInt(100 * Math.random()) + '',
//     modifyTime: getLocalTime(parseInt(Math.random() * 10000000000 + 1500000000000))
//   })
// }

// export default {
//   getList: config => {
//     const {
//       importance,
//       page = 1,
//       limit = 20,
//       sort,
//       condition,
//       globalFiltering,
//       workNo,
//       userName,
//       loginName,
//       positionName,
//       email,
//       mobile,
//       status,
//       loginFailCount,
//       last_login_timeS,
//       last_login_timeE,
//       creatorName,
//       createTimeS,
//       createTimeE,
//       modifierName,
//       modifyTimeS,
//       modifyTimeE
//     } = param2Obj(config.url)
//     let mockList = List.filter(item => {
//       console.log(workNo)
//       if (globalFiltering) {
//         if (item.workNo.indexOf(globalFiltering) > -1 ||
//           item.userName.indexOf(globalFiltering) > -1 ||
//           item.loginName.indexOf(globalFiltering) > -1 ||
//           item.email.indexOf(globalFiltering) > -1 ||
//           item.mobile.indexOf(globalFiltering) > -1) {
//           return true
//         }
//       } else {
//         if (workNo && item.workNo.indexOf(workNo) < 0) return false
//         if (userName && item.userName.indexOf(userName) < 0) return false
//         if (loginName && item.loginName.indexOf(loginName) < 0) return false
//         if (positionName && item.positionName.indexOf(positionName) < 0) return false
//         if (email && item.email.indexOf(email) < 0) return false
//         if (mobile && item.mobile.indexOf(mobile) < 0) return false
//         if (status && item.status.indexOf(status) < 0) return false
//         if (loginFailCount && item.loginFailCount.indexOf(loginFailCount) < 0) return false
//         else if (last_login_timeS && last_login_timeE) {
//           if (timestamp(item.last_login_time) > timestamp(last_login_timeE)) return false
//           if (timestamp(item.last_login_time) < timestamp(last_login_timeS)) return false
//         }
//         if (creatorName && item.creatorName.indexOf(creatorName) < 0) return false
//         else if (createTimeS && createTimeE) {
//           if (timestamp(item.createTime) > timestamp(createTimeE)) return false
//           if (timestamp(item.createTime) < timestamp(createTimeS)) return false
//         }
//         if (modifierName && item.modifierName.indexOf(modifierName) < 0) return false
//         if (modifyTimeS && modifyTimeE) {
//           if (timestamp(item.modifyTime) > timestamp(modifyTimeE)) return false
//           if (timestamp(item.modifyTime) < timestamp(modifyTimeS)) return false
//         }
//         // if (importance && item.importance !== +importance) return false //数据导出
//         return true
//       }
//     })
//     if (sort === '-id') {
//       mockList = mockList.reverse()
//     }
//     const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
//     return {
//       total: mockList.length,
//       items: pageList
//     }
//   }
// }

