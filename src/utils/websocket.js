let Socket = ''
let setIntervalWesocketPush = null

/**
 * 建立websocket连接
 * @param {string} url ws地址
 */
export const createSocket = url => {
  Socket && Socket.close()
  if (!Socket) {
    console.log('websocket连接建立成功')
    Socket = new WebSocket(url)

    // 建立连接后
    Socket.onopen = () => {
      sendPing()
    }

    // 接收数据
    Socket.onmessage = e => {
      window.dispatchEvent(new CustomEvent('onmessageWS', {
        detail: {
          data: e.data
        }
      }))
    }

    // 失败重连
    Socket.onerror = () => {
      Socket.close()
      clearInterval(setIntervalWesocketPush)
      console.log('连接失败，重连中...')
      if (Socket.readyState !== 3) {
        Socket = null
        createSocket(url)
      }
    }

    // 断开重连
    Socket.onclose = () => {
      clearInterval(setIntervalWesocketPush)
      console.log('websocket已断开....正在尝试重连')
      if (Socket.readyState !== 2) {
        Socket = null
        createSocket(url)
      }
    }
  } else {
    console.log('websocket已连接')
  }
}

/**
 * 发送数据但连接未建立时进行处理等待重发
 * @param {any} message 需要发送的数据
 */
const connecting = message => {
  setTimeout(() => {
    if (Socket.readyState === 0) {
      connecting(message)
    } else {
      Socket.send(JSON.stringify(message))
    }
  }, 1000)
}

/**
 * 发送数据
 * @param {any} message 需要发送的数据
 */
export const sendWSPush = message => {
  if (Socket !== null && Socket.readyState === 3) {
    Socket.close()
    createSocket()
  } else if (Socket.readyState === 1) {
    Socket.send(JSON.stringify(message))
  } else if (Socket.readyState === 0) {
    connecting(message)
  }
}

/** 发送心跳
 * @param {number} time 心跳间隔毫秒 默认5000
 * @param {string} ping 心跳名称 默认字符串ping
 */
export const sendPing = (time = 5000, ping = 'ping') => {
  clearInterval(setIntervalWesocketPush)
  setIntervalWesocketPush = setInterval(() => {
    Socket.send(ping)
  }, time)
}
