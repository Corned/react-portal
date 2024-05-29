import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'




const Portalify = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(document.createElement("div"))
  const windowRef = useRef<Window | null>(null)

  useEffect(() => {
    windowRef.current = window.open(
      "", "", `width=400,height=400,left=10,top=10`
    )

    windowRef.current?.document.body.appendChild(
      containerRef.current
    )

    return () => {
      windowRef.current?.close()
    }
  }, [])

  return createPortal(children, containerRef.current)
}


function App() {
  const [isEnabled, setEnabled] = useState<boolean>(false)

  return (
    <>
      <button onMouseDown={() => setEnabled(!isEnabled)}>toggle</button>
      {
        isEnabled && (
          <>
            <Portalify>
              <p>Hello World!</p>
            </Portalify>
            <Portalify>
              <p>What is this?</p>
            </Portalify>
          </>
        )
      }
    </>
  )
}

export default App
