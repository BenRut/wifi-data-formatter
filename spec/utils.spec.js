const { expect } = require("chai");
const { it } = require('mocha');
const {
    formatPostcode
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