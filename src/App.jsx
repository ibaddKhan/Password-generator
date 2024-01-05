import { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCircleCheck } from '@fortawesome/free-regular-svg-icons';

function App() {
  let [textInp, setTextInp] = useState('');
  let [tempIcon, setTempIcon] = useState(faCopy);
  let [range, setRange] = useState(8);
  let [UpperCase, upperCaseChecked] = useState('');
  let [numbers, numbersChecked] = useState('');
  let [symbols, symbolsChecked] = useState('');

  useEffect(() => {
    generatePass()
    if (tempIcon === faCircleCheck) {
      setTimeout(() => {
        setTempIcon(faCopy)
      }, 2000);
    }
  }, [tempIcon, range, symbols, UpperCase, numbers]);
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
    const getRandomChar = (randomChar) => {
      return randomChar[Math.floor(Math.random() * randomChar.length)];
    };


    for (let i = 0; i < range; i++) {
      pass += smallStr[Math.floor(Math.random() * smallStr.length)]
      setTextInp(pass)
      if (UpperCase) {
        pass += getRandomChar(capStr)
        setTextInp(pass)
      }
      if (numbers) {
        pass += getRandomChar(numStr)
        setTextInp(pass)
      }
      if (symbols) {
        pass += getRandomChar(symStr)
        setTextInp(pass)
      }
    }
    setTextInp(pass.slice(0,range))
  }
  useEffect(() => {
    generatePass();
  }, []);
  return (
    <>
        <h1 className='text-center text-4xl mt-10 '>Password-Generator</h1>
      <div className='flex justify-center items-center h-52'>
        <div>
          <div>
            <input value={textInp} onChange={e => setTextInp(e.target.value)} className='pass-inp px-1 border-2 w-[30vw] border-black rounded-lg' type="text" name="" id="" />

            <FontAwesomeIcon onClick={(e) => copyText(e)} className=' cursor-pointer ml-2 text-[1.4rem]' icon={tempIcon} />

          </div>
          <div className='flex items-center mt-2'>   <input min={0} max={20} onChange={(e) => setRange(e.target.value)} type="range" id='range' />
            <label className='mr-2' htmlFor="range">{range}

            </label>
          </div>
          <div className='space-x-2'>
            <label htmlFor="UpperCase">Uppercase</label>
            <input onChange={e => upperCaseChecked(e.target.checked)} id='UpperCase' type="checkbox" />
            <label htmlFor="numbers">Numbers</label>
            <input onChange={e => numbersChecked(e.target.checked)} id='numbers' type="checkbox" />
            <label htmlFor="Symbols">Symbols</label>
            <input onChange={e => symbolsChecked(e.target.checked)} id='Symbols' type="checkbox" /></div>
        </div>
      </div>
    </>
  )
}

export default App
