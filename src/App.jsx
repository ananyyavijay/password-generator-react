import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [addNumber, setAddNumber] = useState(false);
  const [addChar, setAddChar] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  //usecallback hook
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (addNumber) str += "0123456789";
    if (addChar) str += "!@#$%^&*()-_=+{}[]:;'<>,.?/|~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, addNumber, addChar, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current.setSelectionRange(0, 50);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  //useEffect hook
  useEffect(() => {
    passwordGenerator();
  }, [length, addNumber, addChar, passwordGenerator]);

  return (
    <>
      <h1 className="text-4xl text-center text-white my-3">
        Password Generator
      </h1>
      <div className="w-full bg-amber-50 text-xl text-grey-500 mx-auto max-w-md p-4 my-10 rounded-2xl">
        Generate your password !
        <div className="flex shadow mb-4 rounded-lg overflow-hidden my-5">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 text-2xl"
            placeholder="password"
            readOnly
            style={{ backgroundColor: "#B8CFCE" }}
            ref={passwordRef}
          />
          <button
            onClick={copyPassword}
            className="outline-none px-3 text-white cursor-pointer py-0.5 text-xl copy"
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={addNumber}
              id="numberInput"
              className="cursor-pointer"
              onChange={(e) => {
                setAddNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={addChar}
              id="charInput"
              className="cursor-pointer"
              onChange={(e) => {
                setAddChar((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
