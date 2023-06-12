import { useEffect } from 'react'
import viteLogo from './assets/vite.svg'

function App() {
  console.log(window.electronAPI)

  useEffect(() => {
    // const { fs } = window.electronApi
    // const result = fs.readdirSync('/')
    // console.log(result)
    // setFiles(result)
  }, [])


  function send() {
    window.electronAPI.upload().then(res => {
      console.log(res)
    })
  }

  return (
    <div className='app'>
      <img src={viteLogo} className="logo" alt="Vite logo" />
      <button onClick={() => {
        window.electronAPI.dispatch({
          type: 'set-title',
          payload: 'Hans'
        })

      }}>设置标题</button>
      <button onClick={() => {
        window.electronAPI.dispatch({
          type: 'send-notification',
          payload: { title: '测试标题', body: '测试内容' }
        })
      }}>发送通知</button>
      <button onClick={send}>双向通信</button>
    </div>
  )
}

export default App
