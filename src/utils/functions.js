
import { symbols } from './variables';


const isSymbolClick = (click) => symbols.find(item => item === click);

const oppositeValue = (value) => value < 0 ? Math.abs(value) : -Math.abs(value);


export const handleBtnClick = (value, data, setData, runCalculation) => {
    const { number1, number2, hiddenNumber, grabNumber1, newCalculation } = data;

    if (isSymbolClick(value)) {
        if (!number1.length) {
            setData({ ...data, number1: 0, number2: hiddenNumber, operator: value, grabNumber1: false });
        } else if (newCalculation) {
            setData({ ...data, number1: 0, number2: hiddenNumber, operator: value, grabNumber1: false, newCalculation: false });
        } else {
            setData({ ...data, number2: hiddenNumber, operator: value, grabNumber1: false });
        }

        number2.length && runCalculation();

    } else if (newCalculation && value !== '.') {
        setData({ ...data, number1: value, hiddenNumber: value, grabNumber1: true, newCalculation: false });
    } else if (grabNumber1) {

        if (value === '.') {

            if (newCalculation) {
                setData({ ...data, number1: '0' + value, hiddenNumber: '0' + value, newCalculation: false });
            } else if (number1 === '' || number1 === 0) {
                setData({ ...data, number1: '0' + value, hiddenNumber: '0' + value });
            } else if (number1.toString().indexOf('.') > -1) {
                return;
            } else {
                setData({ ...data, number1: number1 + value, hiddenNumber: number1 + value });
            }
        } else {

            if (number1[0] === '0' && number1[1] !== '.') {
                setData({ ...data, number1: number1.substr(1) + value, hiddenNumber: number1.substr(1) + value });
            } else {
                setData({ ...data, number1: number1 + value, hiddenNumber: number1 + value });
            }
        }
    } else {

        if (hiddenNumber.length) {
            setData({ ...data, number2: value, hiddenNumber: '' });
        } else if (value === '.') {

            if (number2 === '' || number2 === 0) {
                setData({ ...data, number2: '0' + value });
            } else if (number2.toString().indexOf('.') > -1) {
                return;
            } else {
                setData({ ...data, number2: number2 + value });
            }
        } else {

            if (number2[0] === '0' && number2[1] !== '.') {
                setData({ ...data, number2: number2.substr(1) + value });
            } else {
                setData({ ...data, number2: number2 + value });
            }
        }
    }
};

export const handleFirst3Btn = (value, data, setData) => {
    const { number1, number2, grabNumber1, newCalculation } = data;


    switch (value) {
        case 'AC':
            setData({
                number1: '',
                number2: '',
                hiddenNumber: '',
                operator: '',
                grabNumber1: true,
                newCalculation: true
            });
            break;
        case '+/-':

            if (number2.toString().length && !grabNumber1) {
                setData({ ...data, number2: oppositeValue(number2) });
            } else {
                setData({ ...data, number1: oppositeValue(number1) });
            }
            break;
        case '%':

            if (grabNumber1 || newCalculation || !number2.toString().length) {
                setData({ ...data, number1: 0, hiddenNumber: 0 });
            } else {
                setData({ ...data, number2: number1 / 100 * number2 });
            }
            break;
        default:
            return;
    }
};