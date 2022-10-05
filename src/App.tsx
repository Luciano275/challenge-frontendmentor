import React, { useEffect, useState } from "react";
import "./App.css";
/*
  0000 0000 0000 0000
  Jane Appleseed
  00/00

  000

  Cardholder Name
  e.g. Jane Appleseed

  Card Number
  e.g. 1234 5678 9123 0000

  Exp. Date (MM/YY)
  MM
  YY

  CVC
  e.g. 123

  Confirm

  <!-- Completed state start -->

  Thank you!
  We've added your card details
  Continue
*/
function App() {
  let initial = "0000000000000000";
  let initialName = "Jane Appleseed";
  let initialExpMm = "00";
  let initialExpYy = "00";
  let initialCvc = "000";

  const [numbers, setNumbers] = useState<string>(initial);
  const [name, setName] = useState<string>(initialName);
  const [expDataMM, setExpDataMM] = useState<string>(initialExpMm);
  const [expDataYY, setExpDataYY] = useState<string>(initialExpYy);
  const [cvc, setCvc] = useState<string>(initialCvc);

  const [inputName, setInputName] = useState<string>("");
  const [inputNumber, setInputNumber] = useState<string>("");
  const [inputDateMm, setInputMm] = useState<string>("");
  const [inputDateYy, setInputYy] = useState<string>("");
  const [inputCvc, setInputCvc] = useState<string>("");

  const [errorName, setErrorName] = useState<string>("");
  const [errorNumber, setErrorNumber] = useState<string>("");
  const [errorDate, setErrorDate] = useState<string>("");
  const [errorCvc, setErrorCvc] = useState<string>("");

  const [correctName, setCorrectName] = useState<string>('correct');
  const [correctNumber, setCorrectNumber] = useState<string>('correct');
  const [correctMm, setCorrectMm] = useState<string>('correct');
  const [correctYy, setCorrectYy] = useState<string>('correct');
  const [correctCvc, setCorrectCvc] = useState<string>('correct');

  const [completeState, setCompleteState] = useState<string[]>([
    "active",
    "desactive",
  ]);

  const numbersRegex = /^[0-9]+$/;
  const dateRegex = /([0-9]{1,2}$)/;

  let valName = false;
  let valNum = false;
  let valMm = false;
  let valYy = false;
  let valCvc = false;

  const handleChangeName = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = ev.target;
    setInputName(value);
    if (/[a-z0-9]/i.test(value)) {
      setName(value);
    } else {
      setName(initialName);
    }
  };

  const handleChangeNumbers = (
    ev: React.ChangeEvent<HTMLInputElement>
  ): void => {
    let { value } = ev.target;
    ev.target.maxLength = 16;
    setInputNumber(value);
    setNumbers(value.trim());
    if (!/[0-9]/.test(value.trim())) {
      setNumbers(initial);
    }
  };

  const handleChangeDate = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = ev.target;

    if (name === "yy") {
      ev.target.maxLength = 4;
      setInputYy(value);

      if (/\d{1,4}$/.test(value)) {
        setExpDataYY(value);
      } else {
        setExpDataYY(initialExpYy);
      }
    } else if (name === "mm") {
      ev.target.maxLength = 2;
      setInputMm(value);

      if (dateRegex.test(value)) {
        setExpDataMM(value);
      } else {
        setExpDataMM(initialExpMm);
      }
    }
  };

  const handleChangeCvc = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = ev.target;
    setCvc(value);
    setInputCvc(value);
    if (!/[0-9]/.test(value)) {
      setCvc(initialCvc);
    }
  };

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>): void => {
    ev.preventDefault();

    //Name Card

    if (!/[a-z0-9]/i.test(inputName)) {
      valName = false;
      setCorrectName('incorrect');
      setErrorName("Can't be blank");
    } else {
      valName = true;
      setCorrectName('correct');
      setErrorName("");
    }

    //Number Card

    if (inputNumber === "") {
      valName = false;
      setCorrectNumber('incorrect');
      setErrorNumber("Can't be blank");
    } else if (!(numbersRegex).test(inputNumber)) {
      valName = false;
      setCorrectNumber('incorrect');
      setErrorNumber("Wrong format, numbers only");
    } else {
      valNum = true;
      setCorrectNumber('correct');
      setErrorNumber("");
    }

    //Date Card MM AND YY

    if(inputDateMm === '' || inputDateYy === ''){
      setErrorDate("Can't be blank");
    }else if(!numbersRegex.test(inputDateMm) || !numbersRegex.test(inputDateYy)){
      setErrorDate("Wrong format, numbers only");
    }else{
      setErrorDate('')
    }

    //Date Card MM

    if (inputDateMm === "") {
      valMm = false;
      setCorrectMm('incorrect');
    } else if (!numbersRegex.test(inputDateMm)) {
      valMm = false;
      setCorrectMm('incorrect');
    } else {
      valMm = true;
      setCorrectMm('correct');
    }

    //Date Card YY

    if (inputDateYy === "") {
      valYy = false;
      setCorrectYy('incorrect');
    } else if (!numbersRegex.test(inputDateYy)) {
      valYy = false;
      setCorrectYy('incorrect');
    } else {
      valYy = true;
      setCorrectYy('correct');
    }

    // Cvc Card

    if (inputCvc === "") {
      valCvc = false;
      setCorrectCvc('incorrect');
      setErrorCvc("Can't be blank");
    } else if (!numbersRegex.test(inputCvc)) {
      valCvc = false;
      setCorrectCvc('incorrect');
      setErrorCvc("Wrong format, numbers only");
    } else {
      setCorrectCvc('correct');
      valCvc = true;
      setErrorCvc("");
    }

    if (valName && valNum && valMm && valYy && valCvc) {

      setInputName("");
      setInputNumber("");
      setInputMm("");
      setInputYy("");
      setInputCvc("");

      setCorrectName('correct');
      setCorrectNumber('correct');
      setCorrectMm('correct');
      setCorrectYy('correct');
      setCorrectCvc('correct');

      setCompleteState(["desactive", "active"]);
    }
  };

  const handleReset = () => {
    setCompleteState(["active", "desactive"]);
    setNumbers(initial);
    setName(initialName);
    setExpDataMM(initialExpMm);
    setExpDataYY(initialExpYy);
    setCvc(initialCvc);
  };

  return (
    <>
      <main className="main">
        <div className="card">
          <div className="card-front">
            <img
              src="/images/bg-card-front.png"
              alt=""
              className="card-front-bg"
            />
            <span className="circles">
              <img src="/images/card-logo.svg" alt="" />
            </span>
            <div className="card-numbers">
              <p>
                {numbers
                  .split("")
                  .map((number, index) =>
                    index === 3 || index === 7 || index === 11
                      ? number + " "
                      : number
                  )}
              </p>
            </div>
            <div className="card-row">
              <div className="card-name">
                <p>{name}</p>
              </div>
              <div className="card-expdate">
                <p>
                  {expDataMM}/{expDataYY}
                </p>
              </div>
            </div>
          </div>
          <div className="card-back">
            <img
              src="/images/bg-card-back.png"
              alt=""
              className="card-back-bg"
            />
            <span className="cvc">{cvc}</span>
          </div>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit} className={completeState[0]}>
            <label htmlFor="name">CARDHOLDER NAME</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="e.g. Jane Appleseed"
              onChange={handleChangeName}
              value={inputName}
              className={correctName}
            />
            <p className="error" id="errorName">
              {errorName}
            </p>
            <label htmlFor="number">CARD NUMBER</label>
            <input
              type="text"
              name="number"
              id="number"
              placeholder="e.g. 1234 5678 9123 0000"
              onChange={handleChangeNumbers}
              value={inputNumber}
              className={correctNumber}
            />
            <p className="error" id="errorNumber">
              {errorNumber}
            </p>
            <div className="row">
              <div className="column">
                <label>EXP. DATE (MM/YY)</label>
                <div className="row">
                  <div className="column">
                    <input
                      type="text"
                      name="mm"
                      id="mm"
                      placeholder="MM"
                      onChange={handleChangeDate}
                      value={inputDateMm}
                      className={correctMm}
                    />
                  </div>
                  <div className="column">
                    <input
                      type="text"
                      name="yy"
                      id="yy"
                      placeholder="YY"
                      onChange={handleChangeDate}
                      value={inputDateYy}
                      className={correctYy}
                    />
                  </div>
                </div>
                <p className="error" id="errorDate">
                  {errorDate}
                </p>
              </div>
              <div className="column">
                <label htmlFor="cvc">CVC</label>
                <input
                  type="text"
                  name="cvc"
                  id="cvc"
                  placeholder="e.g. 123"
                  onChange={handleChangeCvc}
                  value={inputCvc}
                  className={correctCvc}
                />
                <p className="error" id="errorCvc">
                  {errorCvc}
                </p>
              </div>
            </div>
            <button>Confirm</button>
            <div className="attribution">
              Challenge by{" "}
              <a
                href="https://www.frontendmentor.io?ref=challenge"
                target="_blank"
              >
                Frontend Mentor
              </a>
              . Coded by <a href="https://www.frontendmentor.io/profile/Luciano275" target='_blank'>Luciano Luna</a>.
            </div>
          </form>
          <div className={`complete-state ${completeState[1]}`}>
            <img src="/challenge-frontendmentor/images/icon-complete.svg" alt="Complete" />
            <h2>THANK YOU!</h2>
            <p>We've added your card details</p>
            <button onClick={handleReset}>Continue</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
