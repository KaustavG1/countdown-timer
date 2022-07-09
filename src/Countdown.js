import { useEffect, useState } from 'react'
import './Countdown.css'

const controls = {
  STARTED: "started",
  ENDED: "ended"
}

let interval = ''
let initialInput = 0

function Countdown() {
  const [ input, setInput ] = useState(0)
  const [ controlState, setcontrolState ] = useState(0)

  const handleChange = event => {
    setcontrolState(controls.ENDED)
    setInput(Math.floor(Number(event.target.value) * 60))
    initialInput = Math.floor(Number(event.target.value) * 60)
  }

  const renderTime = () => {
    const hour = Math.floor(input / 3600)
    const remainingSeconds = Math.floor(input % 3600)
    const minute = Math.floor(remainingSeconds / 60)
    const second = Math.floor(remainingSeconds % 60)

    const date = new Date()

    date.setHours(hour)
    date.setMinutes(minute)
    date.setSeconds(second)

    if(controlState === controls.STARTED) {
      return date.toLocaleString('en-US', {
        hourCycle: 'h23',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }

    return "00:00:00"
  }

  const startTimer = () => {
    if(controlState === controls.STARTED) {
      setInput(initialInput)
    }
    setcontrolState(controls.STARTED)
  }

  useEffect(() => {
    interval = setInterval(function () {
      if(input > 0 && (controlState === controls.STARTED)) {
        setInput(input - 1)
      }

      if(input === 0) {
        setcontrolState(controls.ENDED)
      }

    }, 1000)
    return () => clearInterval(interval)
  }, [ input, controlState ])

  return <div className="countdown">
    <div className="inputContainer">
      <label htmlFor="minutes">Enter Minutes</label>
      <input type="text" id="minutes" onChange={handleChange}/>
    </div>
    <div className="innerContainer">
      <div className="play-circle" onClick={startTimer}>Play</div>
      <div className="time">{renderTime()}</div>
    </div>
  </div>
}

export default Countdown
