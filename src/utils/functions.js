
import { symbols } from './variables';



export const handleBtnClick = (data, setData, resultValue, setResultValue, value) => {
    const isSymbol = (click) => symbols.find(item => item === click);
    const lastClick = data[data.length - 1];
    const firstClick = data[0];

    switch (value) {
        case 'AC':
            setData('');
            setResultValue('');
            break;
        case '+/-':
            if (data && data != null && !isSymbol(lastClick)) {
                const oppositeValue = data < 0 ? Math.abs(eval(data)) : -Math.abs(eval(data));
                setData(oppositeValue);
            }
            break;
        case '%':
            const stringData = data.toString();
            const usedSymbol = symbols.filter(element => stringData.indexOf(element) > 0);

            if (usedSymbol && data && data != null) {
                const ind = stringData.indexOf(usedSymbol);
                const sym = stringData.slice(ind, ind + 1);

                if (symbols.find(item => item === sym)) {
                    const influenced = stringData.slice(ind + 1);
                    const value1 = stringData.slice(0, ind);
                    const value2 = value1 / 100 * influenced;
                    const result = `${value1}${sym}${value2}`;
                    setData(result);
                } else {
                    setData('');
                }
            }
            break;
        case '=':
            let newData;
            if (data != null && !isSymbol(lastClick)) {
                newData = eval(data);
                setData(newData);
                setResultValue(newData ? newData : '');
            } else if (resultValue && !isSymbol(firstClick)) {
                newData = eval(...resultValue, data);
                setData(newData);
                setResultValue(newData);
            }
            ;
            break;
        default:
            setData('');
    }
};


export const handleOperandClick = (data, setData, value) => {
    if (!data) {
        setData(value);
    } else if (data[0] === '0') {
        setData(data.substr(1) + value);
    } else {
        setData(data + value);
    }
};