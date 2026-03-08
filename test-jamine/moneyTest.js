import {formatCurrency} from '../../utils/money.js';

describe('test suite: formatCurrency', () => {
    it('converts cents into dollars', () => {
        expect(formatCurrency(100)).toEqual('1.00');
    });
    it('formats cents with two decimal places', () => {
        expect(formatCurrency(123)).toEqual('1.23');
    });
    it('handles zero cents', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });
    it('handles large amounts of cents', () => {
        expect(formatCurrency(123456)).toEqual('1234.56');
    });
    it('roundes cents correctly', () => {
        expect(formatCurrency(75)).toEqual('0.75');
        expect(formatCurrency(999)).toEqual('9.99');
        expect(formatCurrency(999.9)).toEqual('10.00');
    });
});