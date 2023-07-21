import { useEffect, useState } from 'react';
import './App.css';
import moon from "./assets/moon.jpg"
import sun from "./assets/sun.jpg"
import Header from './components/header/Header';
import Keypad from './components/keypad/Keypad';

function App() {

  const [dark, setDark] = useState(JSON.parse(localStorage.getItem("calculator-app-mode"))||false);

  const [expression, setExpression] = useState("")

  const [result, setResult] = useState("")
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem("calculator-app-history"))||[])

  const handleKeyPress = (keyCode, key) => {
    console.log(key)
    if (!keyCode) return
    if (!usedKeyCodes.includes(keyCode)) return;

    if (numbers.includes(key)) {
      console.log("num")
      if (key === "0") {
        if (expression.length === 0) return
      }
      calculateResult(expression+key);
      setExpression(expression + key);

    }

    else if (operators.includes(key)) {
      if (!expression) return;

      const lastChar = expression.slice(-1)
      if (operators.includes(lastChar)) return
      if (lastChar === ".") return;

      setExpression(expression + key)
    }
   
    else if (key === ".") {
      if (!expression) return;
      const lastChar = expression.slice(-1);
      if (!numbers.includes(lastChar)) return;
      setExpression(expression + key)
    }
    else if (keyCode === 8) {
      if (!expression) return
      calculateResult(expression.slice(0,-1))
      setExpression(expression.slice(0, -1))
      
    }
    else if (keyCode === 13) {
      console.log("en")
      if(!expression)return;
      calculateResult(expression);

      const temphist=[...history]
      if(temphist.length>25)
        temphist=temphist.splice(0,1);
      temphist.push(expression)
      setHistory(temphist)

    }

  }

  const calculateResult=(exp)=>{
    if(!exp) {
      setResult("");
      return
    };
    const lastChar = exp.slice(-1);
    if(!numbers.includes(lastChar)) exp=exp.slice(0,-1);

    const ans = eval(exp).toFixed(3)+ "";
    setResult(ans)
  }

  useEffect(()=>{
    localStorage.setItem("calculator-app-mode",JSON.stringify(dark))
  },[dark])

  useEffect(()=>{
    localStorage.setItem("calculator-app-history",JSON.stringify(history))
  },[history])

  const usedKeyCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 8, 13, 190, 187, 191, 56, 111, 106, 107, 109];

  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

  const operators = ["/", "+", "-", "*"]

  return (
    <div className="app"
    tabIndex="0"
      onKeyDown={(event) => handleKeyPress(event.keyCode, event.key)}
      data-theme={dark ? "dark" : ""}>
      <div className='app_calculator'>
        <div className='navbar'>
          <div className='navbar_toggle' onClick={() => setDark(!dark)}>
            <div className={`navbar-circle ${dark ? "navbar-circle_active" : ""}`} >
            </div>
          </div>
          <img src={dark ? moon : sun} alt='sunMoon'></img>
        </div>
        <Header expression={expression} result={result} history={history}/>
        <Keypad handleKeyPress={handleKeyPress} />
      </div>
    </div>
  );
}

export default App;
