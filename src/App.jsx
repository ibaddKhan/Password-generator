import { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCircleCheck } from '@fortawesome/free-regular-svg-icons';

function App() {
  let [textInp, setTextInp] = useState('');
  let [tempIcon, setTempIcon] = useState(faCopy);
  let [range, setRange] = useState('');

  useEffect(() => {
    generatePass()
    if (tempIcon === faCircleCheck) {
      setTimeout(() => {
        setTempIcon(faCopy)
      }, 2000);
    }
  }, [tempIcon, range]);
  function copyText(e) {
    setTempIcon(faCircleCheck)
    navigator.clipboard.writeText(textInp);
    e.target.innerText = 'Copied';
    setTextInp("")
  }
  function generatePass() {
    let smallStr = 'abcdefghijklmnopqrstuvwxyz';
    let capStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let numStr = '0123456789'
    let symStr = '!@#$%^&*()_+-=[]{};:"|,.<>/?'
    let pass = ''
    function upperCaseChecked() {
      
      if (document.getElementById('UpperCase').checked) {
        pass += capStr[Math.floor(Math.random() * capStr.length)]
      }
    }
    function (params) {
      
    }
    if (document.getElementById('Symbols').checked) {
      pass+=symStr[Math.floor(Math.random()*numStr.length)]
    }
    for (let i = 0; i < range; i++) {
      pass += smallStr[Math.floor(Math.random() * smallStr.length)]
      setTextInp(pass)
    }
  }
  return (
    <>
      <div className='flex justify-center items-center h-52'>
        <div>
          <div>
            <input value={textInp} onChange={e => setTextInp(e.target.value)} className='pass-inp px-1 border-2 w-[30vw] border-black rounded-lg' type="text" name="" id="" />

            <FontAwesomeIcon onClick={(e) => copyText(e)} className=' ml-2 text-[1.4rem]' icon={tempIcon} />

          </div>
          <div className='flex items-center mt-2'>   <input min={8} max={20} onChange={(e) => setRange(e.target.value)} type="range" id='range' />
            <label className='mr-2' htmlFor="range">{range}

            </label>
          </div>
          <div className=''>
            <label htmlFor="UpperCase">Uppercase</label>
            <input onChange={upperCaseChecked} id='UpperCase' type="checkbox" />
            <label htmlFor="numbers">Numbers</label>
            <input onChange={numbersChecked} id='numbers' type="checkbox" />
            <label onChange={symbolsChecked}  htmlFor="Symbols">Symbols</label>
            <input id='Symbols' type="checkbox" /></div>
        </div>
      </div>
    </>
  )
}

export default App