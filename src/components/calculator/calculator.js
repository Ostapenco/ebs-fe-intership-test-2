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
    const symbols = [
        '/',
        '*',
        '-',
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
                const oppositeValue = data < 0 ? Math.abs(eval(data)) : -Math.abs(eval(data));
                setData(oppositeValue);
                break;
            case '%':
                const usedSymbol = symbols.filter(element => data.indexOf(element) > 0);
                if (usedSymbol) {
                    const ind = data.indexOf(usedSymbol);
                    const influenced = data.slice(ind + 1)
                    const value1 = data.slice(0, ind);
                    const value2 = value1 / 100 * influenced;
                    const sym = data.slice(ind, ind + 1);
                    const result = `${value1}${sym}${value2}`;
                    setData(result);

                } else {
                    setData('');
                }
                break;
            case '=':
                const lastClick = data[data.length - 1];
                if (data != null && !symbols.find(item => item === lastClick)) {
                    const newData = eval(data);
                    setData(newData);
                };
                break;
            default:
                setData('');
        }
    };

    const handleOperandClick = (value) => {
        if (data[0] === '0') {
            setData(data.substr(1) + value);
        } else {
            setData(data + value);
        }

    }



    console.log('Calculator -> data', data);
    console.log('Calculator -> data', data[data.length - 1]);
    console.log('Calculator -> data', typeof (+data[data.length - 1]));



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
                disabled type='text'
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
                        onClick={(e) =>
                            handleOperandClick(e.target.value)}
                    >
                        {btn}
                    </button>
                ))}
            </div>

            <div className='bottomLine'>
                <button value='0' onClick={(e) => handleOperandClick(e.target.value)}>
                    0
        </button>
                <button
                    value='.'
                    className='dotBtn'
                    onClick={(e) => handleOperandClick(e.target.value)}
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
