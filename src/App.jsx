import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(6);
  const [numberAllow, setNumberAllow] = useState(false);
  const [speCharAllow, setSpeCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  //useRef Hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVZXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllow) {
      str += "0123456789";
    }
    if (speCharAllow) {
      str += "!@#$%^&*_+/";
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberAllow, speCharAllow, setPassword]);

  const copyPassword = useCallback(() => {

    //highlight selected password using useRef
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length);
    //copy to clipboard but doesnot work in serveer side
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllow, speCharAllow, passwordGenerator]);
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-6 py-1 text-orange-500
       bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
            value={password}
            className='outline-none bg-white w-full py-1 px-3 text-gray-700'
            placeholder='Password'
            readOnly
            ref={passwordRef}

          ></input>
          <button
            className='outline-none bg-blue-500 text-white px-1 hover:not-focus:bg-blue-400 cursor-pointer '
            onClick={copyPassword}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-3'>
          <div className='flex items-center gap-x-1'>
            <label>Length: {length}</label>
            <input
              type='range'
              min={6}
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}

            >
            </input>

          </div>
          <div className='flex items-center gap-x-1'>
            <label>Numbers </label>
            <input
              type="checkbox"
              defaultChecked={numberAllow}
              id="numberInput"
              onChange={() => {
                setNumberAllow((prev) => !prev);
              }}

            />

          </div>
          <div className='flex items-center gap-x-1'>
            <label>Characters </label>
            <input
              type="checkbox"
              defaultChecked={speCharAllow}
              id="charInput"
              onChange={() => {
                setSpeCharAllow((prev) => !prev);
              }}

            />

          </div>
        </div>
      </div>
    </>
  );
}

export default App
