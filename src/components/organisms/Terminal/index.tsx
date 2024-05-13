/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react'
import { XTerm } from 'xterm-for-react'

export function Terminal() {
  const xtermRef = useRef<any>(null)
  // const socketRef = useRef<any>(null)

  // useEffect(() => {
  //   connectToSocket()
  //     .then((socket) => {
  //       socketRef.current = socket
  //       xtermRef.current.terminal.write(`\r\n$ `)
  //       socketRef.current.on('output', (data) => {
  //         xtermRef.current.terminal.write(data)
  //       })
  //     })
  //     .catch((e) => {
  //       console.log('Error Failed to connect to server: ', e)
  //     })
  //   return function cleanup() {
  //     socketRef.current.disconnect()
  //   }
  // }, [])

  // const onDataCallback = (data) => {
  //   if (socketRef.current) {
  //     socketRef.current.emit('input', data)
  //   }
  // }

  // const connectToSocket = () => {
  //   return new Promise((res) => {
  //     const socket = io(connectAddress)
  //     res(socket)
  //   })
  // }

  return (
    <XTerm
      ref={xtermRef}
      onKey={(e) => {
        console.log('e key', e)
        xtermRef.current.terminal.write(e)
      }}
    />
  )
}
