const { expect } = require("chai");
const { it } = require('mocha');
const {
    formatPostcode,
    returnExpiryDate
} = require("../utils");

describe('formatPostcode', () => {
    it('returns a string when passed a string', () => {
        const output = formatPostcode('ls6');
        expect(output).to.be.a('string');
    });
    it('returns a postcode with a space when passed postcode with a space', () => {
        const output = formatPostcode('LS6 2EQ');
        expect(output).to.equal('LS6 2EQ');
    });
    it('returns an uppercase postcode when passed lowercase postcode', () => {
        const output = formatPostcode('ls6 2eq');
        expect(output).to.equal('LS6 2EQ');
    });
    it('returns a postcode with a space when passed postcode without a space', () => {
        const output = formatPostcode('ls62eq');
        expect(output).to.equal('LS6 2EQ');
    });
    it('works for different variations of postcodes', () => {
        const output = formatPostcode('l12eq');
        expect(output).to.equal('L1 2EQ');
        const output2 = formatPostcode('LS28 4ep');
        expect(output2).to.equal('LS28 4EP');
    });
});

describe('', () => {
    it('returns a date when passed a date', () => {
        const input = new Date();
        const output = returnExpiryDate(input);
        expect(output).to.be.a('date');
    });
    it('returns a date when passed no date', () => {
        const output = returnExpiryDate();
        expect(output).to.be.a('date');
    });
    it('returns a date 3 years from date when passed date', () => {
        const output = returnExpiryDate(new Date(2000, 0, 1, 0, 0, 0, 0));
        expect(output).to.eql(new Date(2003, 0, 1, 0, 0, 0, 0));
    });
    it('returns a date 3 years from today\'s date when not passed a date', () => {
        const today = new Date();
        const threeYearsFromTodaysDate = new Date(today.setFullYear(today.getFullYear() + 3));
        const output = returnExpiryDate();
        expect(output.setHours(0,0,0,0)).to.eql(threeYearsFromTodaysDate.setHours(0,0,0,0));
    });
});