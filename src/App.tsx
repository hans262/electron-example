import React, { useState } from 'react'

export default () => {
  const [files, setFiles] = useState([])
  function open() {
    const { fs } = window as any
    try {
      const result = fs.readdirSync('C://')
      setFiles(result)
    } catch (error) {
      console.log(error.message)
    }
  }
  async function click() {
    const { electron } = window as any
    console.log(electron)

    electron.ipcRenderer.send('list', 'huahua')
  }
  return (
    <div>
      <button onClick={open}>C盘</button>
      <div>{files.map((file, index) => <span key={index}>{file}</span>)}</div>
      <button onClick={click}>btn</button>
    </div>
  )
}



// ;(async ()=>{
//   let list = await Query<any>(`SELECT * FROM user ORDER BY create_at DESC`)
//   console.log(list)
  
// })()