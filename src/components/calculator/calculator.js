import React, { useState } from 'react';

import './calculator.css';
import { first3Buttons, operandButtons } from '../../utils/variables';

import { handleBtnClick, handleOperandClick } from '../../utils/functions';

function Calculator() {
    const [data, setData] = useState('');
    const [resultValue, setResultValue] = useState('');

    return (
        <div className='calculatorContainer'>
            <input
                disabled type='text'
                value={data}
                // onChange={validateInput}
                placeholder='0'
                className='calculatorScreen'
            ></input>
            <div className='calculatorTopButtons'>
                {first3Buttons.map((btn, i) => (
                    <button
                        key={i}
                        value={btn}
                        onClick={(e) => handleBtnClick(data, setData, resultValue, setResultValue, e.target.value)}
                    >
                        {btn}
                    </button>
                ))}

                {operandButtons.map((btn, i) => (
                    <button
                        key={i}
                        value={btn}
                        onClick={(e) =>
                            handleOperandClick(data, setData, e.target.value)}
                    >
                        {btn}
                    </button>
                ))}
            </div>

            <div className='bottomLine'>
                <button value='0' onClick={(e) => handleOperandClick(data, setData, e.target.value)}>
                    0
        </button>
                <button
                    value='.'
                    className='dotBtn'
                    onClick={(e) => handleOperandClick(data, setData, e.target.value)}
                >
                    .
        </button>
                <button
                    value='='
                    className='equalToBtn'
                    onClick={(e) => handleBtnClick(data, setData, resultValue, setResultValue, e.target.value)}
                >
                    =
        </button>
            </div>
        </div>
    );
}

export default Calculator;
