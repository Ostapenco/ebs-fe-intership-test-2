import React, { useState } from 'react';

import './calculator.css';
import { first3Buttons, operandButtons } from '../../utils/variables';
import { handleBtnClick, handleFirst3Btn } from '../../utils/functions';

function Calculator() {
    const [data, setData] = useState({
        number1: '',
        number2: '',
        hiddenNumber: '',
        operator: '',
        grabNumber1: true,
        newCalculation: true,
    });

    const { number1, number2, operator, grabNumber1, newCalculation } = data;


    const runCalculation = () => {

        switch (operator) {
            case '/':
                setData({ ...data, number1: number1 / number2, grabNumber1: true, newCalculation: true });
                break;
            case '*':
                setData({ ...data, number1: number1 * number2, grabNumber1: true, newCalculation: true });
                break;
            case '-':
                setData({ ...data, number1: number1 - number2, grabNumber1: true, newCalculation: true });
                break;
            case '+':
                setData({ ...data, number1: Number(number1) + Number(number2), grabNumber1: true, newCalculation: true });
                break;
            default:
                return;
        }
    };

    const proceedOperation = () => {

        if (!operator.length) {
            return;
        }
        runCalculation();
    };

    const showNumber = () => {

        if (grabNumber1 || newCalculation || !number2.toString().length) {
            return number1;
        } else {
            return number2;
        }
    };

    return (
        <div className='calculatorContainer'>
            <input
                disabled type='text'
                value={showNumber()}
                placeholder='0'
                className='calculatorScreen'
            ></input>
            <div className='calculatorTopButtons'>
                {first3Buttons.map((btn, i) => (
                    <button
                        key={i}
                        value={btn}
                        onClick={(e) => handleFirst3Btn(e.target.value, data, setData)}
                    >
                        {btn}
                    </button>
                ))}

                {operandButtons.map((btn, i) => (
                    <button
                        key={i}
                        value={btn}
                        onClick={(e) => handleBtnClick(e.target.value, data, setData, runCalculation)}
                    >
                        {btn}
                    </button>
                ))}
            </div>

            <div className='bottomLine'>
                <button value='0'
                    onClick={(e) => handleBtnClick(e.target.value, data, setData, runCalculation)}
                >
                    0
        </button>
                <button
                    value='.'
                    className='dotBtn'
                    onClick={(e) => handleBtnClick(e.target.value, data, setData, runCalculation)}
                >
                    .
        </button>
                <button
                    value='='
                    className='equalToBtn'
                    onClick={proceedOperation}
                >
                    =
        </button>
            </div>
        </div >
    );
};

export default Calculator;
