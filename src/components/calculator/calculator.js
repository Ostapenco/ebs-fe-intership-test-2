import React, { useState } from 'react';

import './calculator.css';

function Calculator() {
    const [inputValue, setInputValue] = useState();
    const [data, setData] = useState('');
    // const [secondOperand, setSecondOperand] = useState();

    const first3Buttons = ['AC', '+/-', '%'];
    const operandButtons = [
        '/',
        '7',
        '8',
        '9',
        '*',
        '4',
        '5',
        '6',
        '-',
        '1',
        '2',
        '3',
        '+',
    ];

    // const setOperand = (value) => {

    //     firstOperand == null ? setFirstOperand(value) : setSecondOperand(value);
    //     console.log("setOperand -> value", value)
    // }

    const handleBtnClick = (value) => {
        // eslint-disable-next-line default-case
        switch (value) {
            case 'AC':
                setData('');
                break;
            case '+/-':
                value < 0 ? setData(Math.abs(eval(value))) : setData(-Math.abs(eval(value)));
                break;
            case '%':
                setData(data / 10);
                break;
            case '=':
                if (data != null) {
                    const newData = eval(data);
                    setData(newData);
                };
                break;
            default:
                setData('');
        }
    };

    console.log('Calculator -> data', data);

    const validateInput = (e) => {
        const ch = String.fromCharCode(e.which);

        if (!/[0-9]/.test(ch)) {
            e.preventDefault();
            setInputValue(e.target.value);
        }
    };

    return (
        <div className='calculatorContainer'>
            <input
                type='text'
                value={data}
                onChange={validateInput}
                placeholder='0'
                className='calculatorScreen'
            ></input>
            <div className='calculatorTopButtons'>
                {first3Buttons.map((btn, i) => (
                    <button
                        key={i}
                        value={btn}
                        onClick={(e) => handleBtnClick(e.target.value)}
                    >
                        {btn}
                    </button>
                ))}

                {operandButtons.map((btn, i) => (
                    <button
                        key={i}
                        value={btn}
                        onClick={(e) => setData(data + e.target.value)}
                    >
                        {btn}
                    </button>
                ))}
            </div>

            <div className='bottomLine'>
                <button value='0' onClick={(e) => setData(data + e.target.value)}>
                    0
        </button>
                <button
                    value='.'
                    className='dotBtn'
                    onClick={(e) => setData(data + e.target.value)}
                >
                    .
        </button>
                <button
                    value='='
                    className='equalToBtn'
                    onClick={(e) => handleBtnClick(e.target.value)}
                >
                    =
        </button>
            </div>
        </div>
    );
}

export default Calculator;
