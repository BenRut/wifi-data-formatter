const { expect } = require('chai');
const { it } = require('mocha');
const {
	formatPostcode,
	convertUKDateToUS,
	returnExpiryDate,
	getDataByCentre,
	getCentres,
	formatDatum,
	objectKeysToLowerCase,
	filterDataByMonth,
	removeDuplicateEmails,
} = require('../utils');
const testData = [
	{
		'Email Address': '588@gmail.com',
		Title: 'Mr',
		Forename: 'Nile',
		Surname: 'Rogers',
		Postcode: 'MI44 1JZ',
		'Mobile Number': '01219877583',
		'Registration Location ID': 'JLLS-LGGRO-01',
		'Registration Location Name': 'JLLS  Grosvenor Centre Shopping',
		'Marketing Opt In': 'Yes',
		'Expiry Date': '8/2/2024',
	},
	{
		'Email Address': '188@hotmail.com',
		Title: 'Ms',
		Forename: 'Alicia',
		Surname: 'Keys',
		Postcode: 'CM6 1XF',
		'Mobile Number': '01219877583',
		'Registration Location ID': 'JLLS-LGJAC-01',
		'Registration Location Name': 'Jackson Square Shopping Centre',
		'Marketing Opt In': 'Yes',
		'Expiry Date': '8/2/2024',
	},
	{
		'Email Address': '133@outlook.com',
		Title: 'Ms',
		Forename: 'Gladys',
		Surname: 'Knight',
		Postcode: 'BN22 9PA',
		'Mobile Number': '01219877583',
		'Registration Location ID': 'JLLS-LGEAS-01',
		'Registration Location Name': 'Eastbourne Beacon Shopping Centre',
		'Marketing Opt In': 'Yes',
		'Expiry Date': '8/2/2024',
	},
	{
		'Email Address': 'jhij@gmail.com',
		Title: 'Mr',
		Forename: 'R',
		Surname: 'Kelly',
		Postcode: 'CB23 8TL',
		'Mobile Number': 'NOT CAPTURED',
		'Registration Location ID': 'JLLS-LGGRA-01',
		'Registration Location Name': 'JLL Grafton',
		'Marketing Opt In': 'Yes',
		'Expiry Date': '8/2/2024',
	},
	{
		'Email Address': '8365@gmail.com',
		Title: 'Mr',
		Forename: 'Bootsy',
		Surname: 'Collins',
		Postcode: 'CM23 1FL',
		'Mobile Number': '01219877583',
		'Registration Location ID': 'JLLS-LGJAC-01',
		'Registration Location Name': 'Jackson Square Shopping Centre',
		'Marketing Opt In': 'Yes',
		'Expiry Date': '8/2/2024',
	},
	{
		'Email Address': '856@outlook.com',
		Title: 'Mr',
		Forename: 'Rick',
		Surname: 'James',
		Postcode: 'BN22 8JT',
		'Mobile Number': 'NOT CAPTURED',
		'Registration Location ID': 'JLLS-LGEAS-01',
		'Registration Location Name': 'Eastbourne Beacon Shopping Centre',
		'Marketing Opt In': 'Yes',
		'Expiry Date': '8/2/2024',
	},
	{
		'Email Address': 'c846@gmail.com',
		Title: 'Mr',
		Forename: 'James',
		Surname: 'Brown',
		Postcode: 'CM23 3WD',
		'Mobile Number': '01219877583',
		'Registration Location ID': 'JLLS-LGJAC-01',
		'Registration Location Name': 'Jackson Square Shopping Centre',
		'Marketing Opt In': 'Yes',
		'Expiry Date': '8/2/2024',
	},
];

const noDupes = [
	{
		'Email Address': '588@gmail.com',
		Title: 'Mr',
		Forename: 'Nile',
		Surname: 'Rogers',
		Postcode: 'MI44 1JZ',
		'Mobile Number': '01219877583',
		'Registration Location ID': 'JLLS-LGGRO-01',
		'Registration Location Name': 'JLLS  Grosvenor Centre Shopping',
		'Marketing Opt In': 'Yes',
		'Expiry Date': '8/2/2024',
	},
	{
		'Email Address': '188@hotmail.com',
		Title: 'Ms',
		Forename: 'Alicia',
		Surname: 'Keys',
		Postcode: 'CM6 1XF',
		'Mobile Number': '01219877583',
		'Registration Location ID': 'JLLS-LGJAC-01',
		'Registration Location Name': 'Jackson Square Shopping Centre',
		'Marketing Opt In': 'Yes',
		'Expiry Date': '8/2/2024',
	},
	{
		'Email Address': '133@outlook.com',
		Title: 'Ms',
		Forename: 'Gladys',
		Surname: 'Knight',
		Postcode: 'BN22 9PA',
		'Mobile Number': '01219877583',
		'Registration Location ID': 'JLLS-LGEAS-01',
		'Registration Location Name': 'Eastbourne Beacon Shopping Centre',
		'Marketing Opt In': 'Yes',
		'Expiry Date': '8/2/2024',
	},
	{
		'Email Address': 'jhij@gmail.com',
		Title: 'Mr',
		Forename: 'R',
		Surname: 'Kelly',
		Postcode: 'CB23 8TL',
		'Mobile Number': 'NOT CAPTURED',
		'Registration Location ID': 'JLLS-LGGRA-01',
		'Registration Location Name': 'JLL Grafton',
		'Marketing Opt In': 'Yes',
		'Expiry Date': '8/2/2024',
	},
];

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

describe('convertUKDateToUS()', () => {
	it('returns a string', () => {
		const output = convertUKDateToUS();
		expect(output).to.be.a('string');
	});
	it('returns a date which is the same when days and month are the same', () => {
		const output = convertUKDateToUS('01/01/2000');
		expect(output).to.equal('01/01/2000');
	});
	it('returns a date with the days and months switched when passed a date string', () => {
		const output = convertUKDateToUS('02/01/2000');
		expect(output).to.equal('01/02/2000');
	});
});

describe('returnsExpiryDate()', () => {
	it('returns a string when passed a date object', () => {
		const input = new Date();
		const output = returnExpiryDate(input);
		expect(output).to.be.a('string');
	});
	it('returns a string when passed a string', () => {
		const input = '';
		const output = returnExpiryDate(input);
		expect(output).to.be.a('string');
	});
	it('returns a string when passed no date', () => {
		const output = returnExpiryDate();
		expect(output).to.be.a('string');
	});
	it('returns a date with year 3 years from date when passed date object', () => {
		const output = returnExpiryDate(new Date(2000, 0, 1, 0, 0, 0, 0));
		expect(output).to.eql('1/1/2003');
	});
	it('returns a date string 3 years from date when passed a date string', () => {
		const output = returnExpiryDate('01/01/2000');
		expect(output).to.equal('1/1/2003');
	});
	it("returns a date 3 years from today's date on the first of last month when not passed a date", () => {
		const today = new Date();
		const lastMonth = today.getMonth();
		const threeYearsFromNow = today.getFullYear() + 3;
		const output = returnExpiryDate();
		expect(output).to.equal(`1/${lastMonth}/${threeYearsFromNow}`);
	});
});

describe('getDataByCentre()', () => {
	it('returns [] when passed []', () => {
		expect(getDataByCentre([])).to.eql([]);
	});
	it('returns array containing objects of only the centre specified in argument', () => {
		expect(getDataByCentre(testData, 'Jackson Square Shopping Centre')).to.eql([
			{
				'Email Address': '188@hotmail.com',
				Title: 'Ms',
				Forename: 'Alicia',
				Surname: 'Keys',
				Postcode: 'CM6 1XF',
				'Mobile Number': '01219877583',
				'Registration Location ID': 'JLLS-LGJAC-01',
				'Registration Location Name': 'Jackson Square Shopping Centre',
				'Marketing Opt In': 'Yes',
				'Expiry Date': '8/2/2024',
			},
			{
				'Email Address': '8365@gmail.com',
				Title: 'Mr',
				Forename: 'Bootsy',
				Surname: 'Collins',
				Postcode: 'CM23 1FL',
				'Mobile Number': '01219877583',
				'Registration Location ID': 'JLLS-LGJAC-01',
				'Registration Location Name': 'Jackson Square Shopping Centre',
				'Marketing Opt In': 'Yes',
				'Expiry Date': '8/2/2024',
			},
			{
				'Email Address': 'c846@gmail.com',
				Title: 'Mr',
				Forename: 'James',
				Surname: 'Brown',
				Postcode: 'CM23 3WD',
				'Mobile Number': '01219877583',
				'Registration Location ID': 'JLLS-LGJAC-01',
				'Registration Location Name': 'Jackson Square Shopping Centre',
				'Marketing Opt In': 'Yes',
				'Expiry Date': '8/2/2024',
			},
		]);
	});
});

describe('getCentres', () => {
	it('returns an array when passed an array', () => {
		expect(getCentres([])).to.be.an('array');
	});
	it('returns an array of centre names for list with no duplicates', () => {
		expect(getCentres(noDupes)).to.eql([
			'JLLS  Grosvenor Centre Shopping',
			'Jackson Square Shopping Centre',
			'Eastbourne Beacon Shopping Centre',
			'JLL Grafton',
		]);
	});
	it('returns an array of centre names with no duplicates when passed an array with duplicate centre names', () => {
		expect(getCentres(testData)).to.eql([
			'JLLS  Grosvenor Centre Shopping',
			'Jackson Square Shopping Centre',
			'Eastbourne Beacon Shopping Centre',
			'JLL Grafton',
		]);
	});
});

describe('objectKeysToLowerCase', () => {
	it('returns an object when passed an object', () => {
		expect(objectKeysToLowerCase({})).to.be.an('object');
	});
	it('returns an object with key in lower case when passed an object with key in upper case', () => {
		expect(objectKeysToLowerCase({ A: 1 })).to.eql({ a: 1 });
	});
});

describe('formatDatum', () => {
	it('works for inkspot data', () => {
		const input = {
			username: '83902745032984573209854702394857203987',
			total_downloaded_bytes: '86897021',
			total_uploaded_bytes: '3137211',
			total_sessions: '4',
			online_time_seconds: '2256',
			postcode: 'M67vw',
			gender: '',
			agent_device: 'iPhone',
			email: 'jhlkhlkj@live.co.uk',
		};
		const output = formatDatum(input);
		expect(output).to.eql({
			username: '83902745032984573209854702394857203987',
			total_downloaded_bytes: '86897021',
			total_uploaded_bytes: '3137211',
			total_sessions: '4',
			online_time_seconds: '2256',
			postcode: 'M6 7VW',
			gender: '',
			agent_device: 'iPhone',
			email: 'jhlkhlkj@live.co.uk',
			'sign up source': 'wifi',
			'expiry date': '1/1/2024',
		});
	});
	it('works for freerunner data', () => {
		const input = {
			username: 'gohlkhlk@hotmail.co.uk',
			creationdate: '2020-12-05 11:31:21',
			firstname: 'Super',
			lastname: 'Hanz',
			postcode: 'BS31SN',
			opt_in: '1',
		};
		const output = formatDatum(input);
		expect(output).to.eql({
			username: 'gohlkhlk@hotmail.co.uk',
			creationdate: '2020-12-05 11:31:21',
			firstname: 'Super',
			lastname: 'Hanz',
			postcode: 'BS3 1SN',
			opt_in: '1',
			'sign up source': 'wifi',
			'expiry date': '5/12/2023',
		});
	});
});

describe('removeDuplicateEmails', () => {
	it('returns an empty array when passed an array', () => {
		expect(removeDuplicateEmails([])).to.eql([]);
	});
	it('returns an array containing 1 object when passed 1 object', () => {
		const input = [
			{
				'Email Address': '8365@gmail.com',
				Title: 'Mr',
				Forename: 'Bootsy',
				Surname: 'Collins',
				Postcode: 'CM23 1FL',
				'Mobile Number': '01219877583',
				'Registration Location ID': 'JLLS-LGJAC-01',
				'Registration Location Name': 'Jackson Square Shopping Centre',
				'Marketing Opt In': 'Yes',
				'Expiry Date': '8/2/2024',
			},
		];
		expect(removeDuplicateEmails(input)).to.eql(input);
	});
	it('returns an array containing 1 object when passed mutiple objects with same email address', () => {
		const input = [
			{
				'Email Address': 'bootsy.collins@gmail.com',
				Title: 'Mr',
				Forename: 'Bootsy',
				Surname: 'Collins',
				Postcode: 'CM23 1FL',
				'Mobile Number': '01219877583',
				'Registration Location ID': 'JLLS-LGJAC-01',
				'Registration Location Name': 'Jackson Square Shopping Centre',
				'Marketing Opt In': 'Yes',
				'Expiry Date': '8/2/2024',
			},
			{
				'Email Address': 'bootsy.collins@gmail.com',
				Title: 'Mr',
				Forename: 'Bootsy',
				Surname: 'Collins',
				Postcode: 'CM23 3WD',
				'Mobile Number': '01219877583',
				'Registration Location ID': 'JLLS-LGJAC-01',
				'Registration Location Name': 'Jackson Square Shopping Centre',
				'Marketing Opt In': 'Yes',
				'Expiry Date': '8/2/2024',
			},
		];
		expect(removeDuplicateEmails(input)).to.eql([
			{
				'Email Address': 'bootsy.collins@gmail.com',
				Title: 'Mr',
				Forename: 'Bootsy',
				Surname: 'Collins',
				Postcode: 'CM23 1FL',
				'Mobile Number': '01219877583',
				'Registration Location ID': 'JLLS-LGJAC-01',
				'Registration Location Name': 'Jackson Square Shopping Centre',
				'Marketing Opt In': 'Yes',
				'Expiry Date': '8/2/2024',
			},
		]);
	});
	it('it returns an array containing 2 objects when passed mutiple objects with only 2 email addresses', () => {
		const input = [
			{
				'Email Address': 'bootsy.collins@gmail.com',
				Title: 'Mr',
				Forename: 'Bootsy',
				Surname: 'Collins',
				Postcode: 'CM23 1FL',
				'Mobile Number': '01219877583',
				'Registration Location ID': 'JLLS-LGJAC-01',
				'Registration Location Name': 'Jackson Square Shopping Centre',
				'Marketing Opt In': 'Yes',
				'Expiry Date': '8/2/2024',
			},
			{
				'Email Address': 'james.brown@gmail.com',
				Title: 'Mr',
				Forename: 'James',
				Surname: 'Brown',
				Postcode: 'CM23 3WD',
				'Mobile Number': '01219877583',
				'Registration Location ID': 'JLLS-LGJAC-01',
				'Registration Location Name': 'Jackson Square Shopping Centre',
				'Marketing Opt In': 'Yes',
				'Expiry Date': '8/2/2024',
			},
			{
				'Email Address': 'bootsy.collins@gmail.com',
				Title: 'Mr',
				Forename: 'Bootsy',
				Surname: 'Collins',
				Postcode: 'CM23 1FL',
				'Mobile Number': '01219877583',
				'Registration Location ID': 'JLLS-LGJAC-01',
				'Registration Location Name': 'Jackson Square Shopping Centre',
				'Marketing Opt In': 'Yes',
				'Expiry Date': '8/2/2024',
			},
			{
				'Email Address': 'james.brown@gmail.com',
				Title: 'Mr',
				Forename: 'James',
				Surname: 'Brown',
				Postcode: 'CM23 3WD',
				'Mobile Number': '01219877583',
				'Registration Location ID': 'JLLS-LGJAC-01',
				'Registration Location Name': 'Jackson Square Shopping Centre',
				'Marketing Opt In': 'Yes',
				'Expiry Date': '8/2/2024',
			},
		];
		expect(removeDuplicateEmails(input)).to.eql([
			{
				'Email Address': 'bootsy.collins@gmail.com',
				Title: 'Mr',
				Forename: 'Bootsy',
				Surname: 'Collins',
				Postcode: 'CM23 1FL',
				'Mobile Number': '01219877583',
				'Registration Location ID': 'JLLS-LGJAC-01',
				'Registration Location Name': 'Jackson Square Shopping Centre',
				'Marketing Opt In': 'Yes',
				'Expiry Date': '8/2/2024',
			},
			{
				'Email Address': 'james.brown@gmail.com',
				Title: 'Mr',
				Forename: 'James',
				Surname: 'Brown',
				Postcode: 'CM23 3WD',
				'Mobile Number': '01219877583',
				'Registration Location ID': 'JLLS-LGJAC-01',
				'Registration Location Name': 'Jackson Square Shopping Centre',
				'Marketing Opt In': 'Yes',
				'Expiry Date': '8/2/2024',
			},
		]);
	});
});

describe('filterDataByMonth', () => {
	it('returns an empty array when passed an empty array', () => {
		expect(filterDataByMonth([])).to.eql([]);
	});
	it('returns an array containing 1 object with dated last month when passed object dated last month and no month', () => {
		const testData = [
			{
				username: 'uhfgkjg@gmail.com',
				creationdate: '2021-02-01 15:09:46',
				firstname: 'Chris',
				lastname: 'Morris',
				postcode: 'Tu20 7TW',
				opt_in: '1',
			},
			{
				username: 'jkjvk@yahoo.co.uk',
				creationdate: '2021-01-30 17:14:01',
				firstname: 'Sylvester',
				lastname: 'Stuart',
				postcode: 'Ty7 6UV',
				opt_in: '1',
			},
		];
		expect(filterDataByMonth(testData)).to.eql([
			{
				username: 'jkjvk@yahoo.co.uk',
				creationdate: '2021-01-30 17:14:01',
				firstname: 'Sylvester',
				lastname: 'Stuart',
				postcode: 'Ty7 6UV',
				opt_in: '1',
			},
		]);
	});
	it("returns an array containing only objects with last month's date when passed multiple objects and no month", () => {
		const testData = [
			{
				username: 'uhfgkjg@gmail.com',
				creationdate: '2021-02-01 15:09:46',
				firstname: 'Chris',
				lastname: 'Morris',
				postcode: 'Tu20 7TW',
				opt_in: '1',
			},
			{
				username: 'jkjvk@yahoo.co.uk',
				creationdate: '2021-01-30 17:14:01',
				firstname: 'Sylvester',
				lastname: 'Stuart',
				postcode: 'Ty7 6UV',
				opt_in: '1',
			},
			{
				username: 'ijgkjvko@jbkjbk.uk',
				creationdate: '2021-01-29 14:14:56',
				firstname: 'Alan',
				lastname: 'Partridge',
				postcode: 'Bd79zy',
				opt_in: '1',
			},
			{
				username: 'ugkjgkj942@gmail.com',
				creationdate: '2021-01-29 13:18:52',
				firstname: 'Ted',
				lastname: 'Maul',
				postcode: 'Hs167QM',
				opt_in: '1',
			},
			{
				username: 'jhglkl@gmail.com',
				creationdate: '2020-12-05 15:32:27',
				firstname: 'Ali',
				lastname: 'G',
				postcode: 'BS1 5JZ',
				opt_in: '1',
			},
			{
				username: 'igkjhlkhlkhl@gmail.com',
				creationdate: '2020-12-05 14:22:54',
				firstname: 'Bernard',
				lastname: 'Black',
				postcode: 'JW307MW',
				opt_in: '1',
			},
			{
				username: 'kjhgkj@icloud.com',
				creationdate: '2020-12-05 14:18:35',
				firstname: 'Jeremy',
				lastname: 'Usbourne',
				postcode: 'HR75 9JW',
				opt_in: '1',
			},
			{
				username: 'khlkhl@gmail.com',
				creationdate: '2020-12-05 12:13:04',
				firstname: 'Mark',
				lastname: 'Corrigan',
				postcode: 'hg5 3nm',
				opt_in: '1',
			},
			{
				username: 'gohlkhlk@hotmail.co.uk',
				creationdate: '2020-12-05 11:31:21',
				firstname: 'Super',
				lastname: 'Hanz',
				postcode: 'BS31SN',
				opt_in: '1',
			},
		];
		expect(filterDataByMonth(testData)).to.eql([
			{
				username: 'jkjvk@yahoo.co.uk',
				creationdate: '2021-01-30 17:14:01',
				firstname: 'Sylvester',
				lastname: 'Stuart',
				postcode: 'Ty7 6UV',
				opt_in: '1',
			},
			{
				username: 'ijgkjvko@jbkjbk.uk',
				creationdate: '2021-01-29 14:14:56',
				firstname: 'Alan',
				lastname: 'Partridge',
				postcode: 'Bd79zy',
				opt_in: '1',
			},
			{
				username: 'ugkjgkj942@gmail.com',
				creationdate: '2021-01-29 13:18:52',
				firstname: 'Ted',
				lastname: 'Maul',
				postcode: 'Hs167QM',
				opt_in: '1',
			},
		]);
	});
	it('returns an array containing only the data of a given month', () => {
		const testData = [
			{
				username: 'uhfgkjg@gmail.com',
				creationdate: '2021-02-01 15:09:46',
				firstname: 'Chris',
				lastname: 'Morris',
				postcode: 'Tu20 7TW',
				opt_in: '1',
			},
			{
				username: 'jkjvk@yahoo.co.uk',
				creationdate: '2021-01-30 17:14:01',
				firstname: 'Sylvester',
				lastname: 'Stuart',
				postcode: 'Ty7 6UV',
				opt_in: '1',
			},
			{
				username: 'ijgkjvko@jbkjbk.uk',
				creationdate: '2021-01-29 14:14:56',
				firstname: 'Alan',
				lastname: 'Partridge',
				postcode: 'Bd79zy',
				opt_in: '1',
			},
			{
				username: 'ugkjgkj942@gmail.com',
				creationdate: '2021-01-29 13:18:52',
				firstname: 'Ted',
				lastname: 'Maul',
				postcode: 'Hs167QM',
				opt_in: '1',
			},
			{
				username: 'jhglkl@gmail.com',
				creationdate: '2020-12-05 15:32:27',
				firstname: 'Ali',
				lastname: 'G',
				postcode: 'BS1 5JZ',
				opt_in: '1',
			},
			{
				username: 'igkjhlkhlkhl@gmail.com',
				creationdate: '2020-12-05 14:22:54',
				firstname: 'Bernard',
				lastname: 'Black',
				postcode: 'JW307MW',
				opt_in: '1',
			},
			{
				username: 'kjhgkj@icloud.com',
				creationdate: '2020-12-05 14:18:35',
				firstname: 'Jeremy',
				lastname: 'Usbourne',
				postcode: 'HR75 9JW',
				opt_in: '1',
			},
			{
				username: 'khlkhl@gmail.com',
				creationdate: '2020-12-05 12:13:04',
				firstname: 'Mark',
				lastname: 'Corrigan',
				postcode: 'hg5 3nm',
				opt_in: '1',
			},
			{
				username: 'gohlkhlk@hotmail.co.uk',
				creationdate: '2020-12-05 11:31:21',
				firstname: 'Super',
				lastname: 'Hanz',
				postcode: 'BS31SN',
				opt_in: '1',
			},
		];
		expect(filterDataByMonth(testData, 12)).to.eql([
			{
				username: 'jhglkl@gmail.com',
				creationdate: '2020-12-05 15:32:27',
				firstname: 'Ali',
				lastname: 'G',
				postcode: 'BS1 5JZ',
				opt_in: '1',
			},
			{
				username: 'igkjhlkhlkhl@gmail.com',
				creationdate: '2020-12-05 14:22:54',
				firstname: 'Bernard',
				lastname: 'Black',
				postcode: 'JW307MW',
				opt_in: '1',
			},
			{
				username: 'kjhgkj@icloud.com',
				creationdate: '2020-12-05 14:18:35',
				firstname: 'Jeremy',
				lastname: 'Usbourne',
				postcode: 'HR75 9JW',
				opt_in: '1',
			},
			{
				username: 'khlkhl@gmail.com',
				creationdate: '2020-12-05 12:13:04',
				firstname: 'Mark',
				lastname: 'Corrigan',
				postcode: 'hg5 3nm',
				opt_in: '1',
			},
			{
				username: 'gohlkhlk@hotmail.co.uk',
				creationdate: '2020-12-05 11:31:21',
				firstname: 'Super',
				lastname: 'Hanz',
				postcode: 'BS31SN',
				opt_in: '1',
			},
		]);
		expect(filterDataByMonth(testData, 2)).to.eql([
			{
				username: 'uhfgkjg@gmail.com',
				creationdate: '2021-02-01 15:09:46',
				firstname: 'Chris',
				lastname: 'Morris',
				postcode: 'Tu20 7TW',
				opt_in: '1',
			},
		]);
		expect(filterDataByMonth(testData, '2')).to.eql([
			{
				username: 'uhfgkjg@gmail.com',
				creationdate: '2021-02-01 15:09:46',
				firstname: 'Chris',
				lastname: 'Morris',
				postcode: 'Tu20 7TW',
				opt_in: '1',
			},
		]);
		expect(filterDataByMonth(testData, '02')).to.eql([
			{
				username: 'uhfgkjg@gmail.com',
				creationdate: '2021-02-01 15:09:46',
				firstname: 'Chris',
				lastname: 'Morris',
				postcode: 'Tu20 7TW',
				opt_in: '1',
			},
		]);
	});
});
