const ORDINAL_NUMBERS_TO_30 = [
	// number, cardinal, ordinal shortened, ordinal full
	[1, "one", "1st", "first"],
	[2, "two", "2nd", "second"],
	[3, "three", "3rd", "third"],
	[4, "four", "4th", "fourth"],
	[5, "five", "5th", "fifth"],
	[6, "six", "6th", "sixth"],
	[7, "seven", "7th", "seventh"],
	[8, "eight", "8th", "eighth"],
	[9, "nine", "9th", "nineth"],
	[10, "ten", "10th", "tenth"],
	[11, "eleven", "11th", "eleventh"],
	[12, "twelve", "12th", "twelfth"],
	[13, "thirteen", "13th", "thirteenth"],
	[14, "fourteen", "14th", "fourteenth"],
	[15, "fifteen", "15th", "fifteenth"],
	[16, "sixteen", "16th", "sixteenth"],
	[17, "seventeen", "17th", "seventeenth"],
	[18, "eighteen", "18th", "eighteenth"],
	[19, "nineteen", "19th", "nineteenth"],
	[20, "twenty", "20th", "twentieth"],
	// [21, "twenty-first", "21st"],
	// [22, "twenty-second", "21st"],
	// [23, "twenty-third", "21st"],
	// [24, "twenty-fourth", "21st"],
	// [25, "twenty-fifth", "21st"],
	// [26, "twenty-sixth", "21st"],
	// [27, "twenty-seventh", "21st"],
	// [28, "twenty-eighth", "21st"],
	// [29, "twenty-nineth", "29th"],
	// [30, "thirtieth", "30th"],
];

const NUMBERS_TENS = [
	[20, "twenty", "20th", "twentieth"],
	[30, "thirty", "30th", "thirtieth"],
	[40, "fourty", "40th", "fourtieth"],
	[50, "fifty", "50th", "fiftieth"],
	[60, "sixty", "60th", "sixtieth"],
	[70, "seventy", "70th", "seventieth"],
	[80, "eighty", "80th", "eightieth"],
	[90, "ninety", "90th", "twentieth"],
	[100, "one-hundred", "100th", "one-hundredth"],
];

const getOrdinal = (num) => {
	if (!num) return null;

	const handleUpToTwenty = (num) => {
		return ORDINAL_NUMBERS_TO_30[num - 1];
	};

	if (num <= 20) {
		return handleUpToTwenty(num);
	}

	const handleUpTo100 = (num) => {
		if (!units) {
			// a mutiple of 10 (starting with 30)
			return NUMBERS_TENS[tens - 2];
		}

		const cardinal = `${NUMBERS_TENS[tens - 2][1]}-${
			ORDINAL_NUMBERS_TO_30[units - 1][1]
		}`;

		const shortened = `${tens}${ORDINAL_NUMBERS_TO_30[units - 1][2]}`;

		const full = `${NUMBERS_TENS[tens - 2][1]}-${
			ORDINAL_NUMBERS_TO_30[units - 1][3]
		}`;

		return [num, cardinal, shortened, full];
	};

	let tens = parseInt(num / 10);
	let units = num % 10;

	if (num <= 100) {
		return handleUpTo100(num);
	}

	// loggError("getOrdinal() supports numbers up to 100 (argument was ", num);
	return null;
};

// logg("getOrdinal(20) === ", getOrdinal(20));
// logg("getOrdinal(21) === ", getOrdinal(21));
// logg("getOrdinal(22) === ", getOrdinal(22));
// logg("getOrdinal(30) === ", getOrdinal(30));
// logg("getOrdinal(31) === ", getOrdinal(31));
// logg("getOrdinal(32) === ", getOrdinal(32));
// logg("getOrdinal(92) === ", getOrdinal(92));
// logg("getOrdinal(100) === ", getOrdinal(100));
// logg("getOrdinal(110) === ", getOrdinal(110));
// logg("getOrdinal(101) === ", getOrdinal(101));

export { getOrdinal };
