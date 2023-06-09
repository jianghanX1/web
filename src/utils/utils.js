import request from '@/utils/request.js'
// 获取全部游戏列表
export function getGameList (gameType) {
  return request({
    url: '/pmm/game/ranking/list',
    method: 'get',
    params: {
      gameType
    }
  })
}
// 获取游戏详情
export function getGameInfo (gameId) {
  return request({
    url: '/pmm/game/info',
    method: 'get',
    params: {
      gameId
    }
  })
}
// 获取游戏类型
export function getGameType () {
  return  request({
    url: '/pmm/system/dict',
    method: 'get',
    params: {
      dictTypes: 'game_type'
    }
  })
}
// 随机打乱数组
export function shuffle(arr) {
  let length = arr.length,
    randomIndex,
    temp;
  while (length) {
    randomIndex = Math.floor(Math.random() * (length--));
    temp = arr[randomIndex];
    arr[randomIndex] = arr[length];
    arr[length] = temp
  }
  return arr;
}
// 判断pc/移动端
export function determinePcOrMove() {
  if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    //fontsize计算
    document.documentElement.style.fontSize = document.documentElement.clientWidth/320 * 16 +'px'
    return 1
  } else {
    return 2
  }
}
/**
 * 配置 seo
 * @param title 网页标题
 * @param key 关键词
 * @param des 描述
 */
export function setMeta (key,des){
  // let  title_default = "网站名称";
  // if(title){
  //   title_default += title;
  // }
  // document.title = title_default;
  document.querySelector("meta[name='keywords']").setAttribute('content', key);
  document.querySelector("meta[name='description']").setAttribute('content', des);
}

// 常玩游戏列表替换
export function recentGame (element) {
  let recentGame = JSON.parse(localStorage.getItem('recentGame'))
  let index = recentGame.findIndex((item) => item.filterStatus == 0)
  if (recentGame.findIndex((item) => item.gameId == element.gameId) != -1) {
    recentGame.map((item,index)=>{
      if (item.gameId == element.gameId) {
        recentGame.splice(index,1)
        item.filterStatus = 1
        recentGame.unshift(item)
      }
    })
    localStorage.setItem('recentGame',JSON.stringify(recentGame))
    return
  }
  if (index == -1) {
    recentGame.map((item)=>{
      item.filterStatus = 0
    })
    recentGame[0] = {...element,filterStatus: 1}
    localStorage.setItem('recentGame',JSON.stringify(recentGame))
  } else {
    let arr = []
    recentGame.map((item)=>{
      if (item.filterStatus == 0) {
        arr.push(item)
      }
    })
    recentGame.map((item,idx)=>{
      if (item.gameId == arr[arr.length - 1].gameId) {
        recentGame.splice(idx,1)
        recentGame.unshift({...element,filterStatus: 1})
      }
    })
    localStorage.setItem('recentGame',JSON.stringify(recentGame))
  }
}