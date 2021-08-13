import React, { useState } from 'react'

export default () => {
  const [files, setFiles] = useState([])
  function open() {
    const { fs } = window as any
    try {
      const result = fs.readdirSync('/')
      setFiles(result)
    } catch (error) {
      console.log(error.message)
    }
  }
  async function click() {
    const { electron } = window as any
    console.log(electron)
    electron.ipcRenderer.send('message', 'huahua')
  }
  return (
    <div>
      <button onClick={open}>磁盘</button>
      <div>
        {files.map((file, index) =>
          <span style={{ marginRight: 10 }} key={index}>{file}</span>
        )}
      </div>
      <button onClick={click}>send main</button>
    </div>
  )
}