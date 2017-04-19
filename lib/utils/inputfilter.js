var filterMap = {
	"number": isNumber,
	"letter": isLetter,
	"upper": isUpper,
	"lower": isLower,
	"space": isSpace,
	".": isPoint,
	"-": isStrikeThrough,
	"_": isUnderLine,
	"+": isAdd,
	"@": isAt,
	"!": isPlaint,
	"#": isPoundSign,
	"$": isDollar,
	"%": isPercent,
	"^": isXOR,
	"&": isAnd,
	"*": isAsterisk,
	"(": isLeftBracket,
	")": isRightBracket,
	"=": isEqual,
	"{": isLeftBigBracket,
	"}": isRightBigBracket,
	"[": isLeftMidBracket,
	"]": isRightMidBracket,
	"\\": isBackslash,
	"|": isUpright,
	"`": isBackquote,
	"~": isTilde,
	":": isColon,
	";": isSemicolon,
	"\'": isSingleQuote,
	"\"": isDoubleQuote,
	",": isComma,
	"<": isLessThan,
	">": isGreaterThan,
	"/": isForwardSlash,
	"?": isQuestionMark,

	"！": isCNPlaint,
	"￥": isRMB,
	"……": isDots,
	"（": isCNLeftBracket,
	"）": isCNRightBracket,
	"——": isDash,
	"‘": isCNSingleQuote,
	"；": isCNSemicolon,
	"：": isCNColon,
	"“": isCNDoubleQuote,
	"。": isPeriod,
	"，": isCNComma,
	"？": isCNQuestionMark,

	"ip": ipFilter
};

// "0":48 - "9":57
function isNumber(charCode) {
	return charCode > 47 && charCode < 58;
}

// "a":97 - "z":122
function isLower(charCode) {
	return charCode > 96 && charCode < 123;
}

// "A":65 - "Z":90
function isUpper(charCode) {
	return charCode > 64 && charCode < 91;
}

// "-":45
function isStrikeThrough(charCode) {
	return charCode == 45;
}

// "_":95
function isUnderLine(charCode) {
	return charCode == 95;
}

// " ": 32  "\t": 9
function isSpace(charCode) {
	return charCode == 32 || charCode == 9;
}

// ".": 46
function isPoint(charCode) {
	return charCode == 46;
}

// "+": 43
function isAdd(charCode) {
	return charCode == 43;
}

// "@": 64
function isAt(charCode) {
	return charCode == 64;
}

// "!": 33
function isPlaint(charCode) {
	return charCode == 33;
}

// "#".charCodeAt(0) : 35
function isPoundSign(charCode) {
	return charCode == 35;
}

// "$".charCodeAt(0) : 36
function isDollar(charCode) {
	return charCode == 36;
}

// "%".charCodeAt(0) : 37
function isPercent(charCode) {
	return charCode == 37;
}

// "^".charCodeAt(0) : 94
function isXOR(charCode) {
	return charCode == 94;
}

// "&".charCodeAt(0) : 38
function isAnd(charCode) {
	return charCode == 38;
}

// "*".charCodeAt(0) : 42
function isAsterisk(charCode) {
	return charCode == 42;
}

// "(".charCodeAt(0) : 40
function isLeftBracket(charCode) {
	return charCode == 40;
}

// ")".charCodeAt(0) : 41
function isRightBracket(charCode) {
	return charCode == 41;
}

// "=".charCodeAt(0) : 61
function isEqual(charCode) {
	return charCode == 61;
}

// "{".charCodeAt(0) : 123
function isLeftBigBracket(charCode) {
	return charCode == 123;
}

// "}".charCodeAt(0) : 125
function isRightBigBracket(charCode) {
	return charCode == 125;
}

// "[".charCodeAt(0) : 91
function isLeftMidBracket(charCode) {
	return charCode == 91;
}

// "]".charCodeAt(0) : 93
function isRightMidBracket(charCode) {
	return charCode == 93;
}

// "\\".charCodeAt(0) : 92
function isBackslash(charCode) {
	return charCode == 92;
}

// "|".charCodeAt(0) : 124
function isUpright(charCode) {
	return charCode == 124;
}

// "`".charCodeAt(0) : 96
function isBackquote(charCode) {
	return charCode == 96;
}

// "~".charCodeAt(0) : 126
function isTilde(charCode) {
	return charCode == 126;
}

// ":".charCodeAt(0) : 58
function isColon(charCode) {
	return charCode == 58;
}

// ";".charCodeAt(0) : 59
function isSemicolon(charCode) {
	return charCode == 59;
}

// "\'".charCodeAt(0) : 39
function isSingleQuote(charCode) {
	return charCode == 39;
}

// "\"".charCodeAt(0) : 34
function isDoubleQuote(charCode) {
	return charCode == 34;
}

// ",".charCodeAt(0) : 44
function isComma(charCode) {
	return charCode == 44;
}

// "<".charCodeAt(0) : 60
function isLessThan(charCode) {
	return charCode == 60;
}

// ">".charCodeAt(0) : 62
function isGreaterThan(charCode) {
	return charCode == 62;
}

// "/".charCodeAt(0) : 47
function isForwardSlash(charCode) {
	return charCode == 47;
}

// "?".charCodeAt(0) : 63
function isQuestionMark(charCode) {
	return charCode == 63;
}


// "！".charCodeAt(0) : 65281
function isCNPlaint(charCode) {
	return charCode == 65281;
}
// "￥".charCodeAt(0) : 65509
function isRMB(charCode) {
	return charCode == 65509;
}
// "……".charCodeAt(0) : 8230
function isDots(charCode) {
	return charCode == 8230;
}
// "（".charCodeAt(0) : 65288
function isCNLeftBracket(charCode) {
	return charCode == 65288;
}
// "）".charCodeAt(0) : 65289
function isCNRightBracket(charCode) {
	return charCode == 65289;
}
// "——".charCodeAt(0) : 8212
function isDash(charCode) {
	return charCode == 8212;
}
// "‘".charCodeAt(0) : 8216
function isCNSingleQuote(charCode) {
	return charCode == 8216;
}
// "；".charCodeAt(0) : 65307
function isCNSemicolon(charCode) {
	return charCode == 65307;
}
// "：".charCodeAt(0) : 65306
function isCNColon(charCode) {
	return charCode == 65306;
}
// "“".charCodeAt(0) : 8220
function isCNDoubleQuote(charCode) {
	return charCode == 8220;
}
// "。".charCodeAt(0) : 12290
function isPeriod(charCode) {
	return charCode == 12290;
}
// "，".charCodeAt(0) : 65292
function isCNComma(charCode) {
	return charCode == 65292;
}
// "？".charCodeAt(0) : 65311
function isCNQuestionMark(charCode) {
	return charCode == 65311;
}

function isLetter(charCode) {
	return isUpper(charCode) || isLower(charCode);
}

function filterCharacter(charCode, filters) {
	for (var i = 0; i < filters.length; i++) {
		var _fitlter = filterMap[filters[i]];
		if (_fitlter && _fitlter(charCode)) {
			return true;
		}
	}
	return false;
}

function excludeFilterCharacter(charCode, filters) {
	for (var i = 0; i < filters.length; i++) {
		var _fitlter = filterMap[filters[i]];
		if (_fitlter && _fitlter(charCode)) {
			return false;
		}
	}
	return true;
}

function filter(str, filters) {
	var ret = "";
	for (var i = 0; i < str.length; i++) {
		if (filterCharacter(str.charCodeAt(i), filters)) {
			ret += str[i];
		}
	}
	return ret;
}

function exclude(str, filters) {
	var ret = "";
	for (var i = 0; i < str.length; i++) {
		if (excludeFilterCharacter(str.charCodeAt(i), filters)) {
			ret += str[i];
		}
	}
	return ret;
}

function maxlength(str, len) {
	return str.substr(0, len);
}

// 常用公用类
function ipFilter(str) {
	var ret = "";
	var filters = ["number", "."];
	for (var i = 0; i < str.length; i++) {
		if (filterCharacter(str.charCodeAt(i), filters)) {
			ret += str[i];
		}
	}
	return maxlength(ret, 15);
}

function passwordFilter(str) {
	var ret = "";
	var filters = ["number", "letter"];
	filters.push(".");
	filters.push("_");
	filters.push("-");
	filters.push("+");
	filters.push("~");
	filters.push("`");
	filters.push("@");
	filters.push("!");
	filters.push("#");
	filters.push("$");
	filters.push("%");
	filters.push("^");
	filters.push("&");
	filters.push("*");
	filters.push("(");
	filters.push(")");
	filters.push("=");
	filters.push("{");
	filters.push("}");
	filters.push("[");
	filters.push("]");
	filters.push("|");
	filters.push("\\");
	filters.push("/");
	filters.push(":");
	filters.push(";");
	filters.push("\"");
	filters.push("'");
	filters.push(",");
	filters.push("<");
	filters.push(">");
	filters.push("/");
	filters.push("?");
	for (var i = 0; i < str.length; i++) {
		if (filterCharacter(str.charCodeAt(i), filters)) {
			ret += str[i];
		}
	}
	return maxlength(ret, 20);
}

function excludeSpecial(str) {
	var filters = [".", "-", "+", "@", "!", "#", "$", "%", "^",
		"&", "*", "=", "{", "}", "[", "]", "\\",
		"|", "`", "~", ":", ";", "\'", "\"", ",", "<", ">",
		"/", "?", "！", "￥", "……", "——", "‘",
		"；", "：", "“", "。", "，", "？",
	];
	var ret = "";
	for (var i = 0; i < str.length; i++) {
		if (excludeFilterCharacter(str.charCodeAt(i), filters)) {
			ret += str[i];
		}
	}
	return ret;
}

module.exports = {
	filter: filter,
	exclude: exclude,
	maxlength: maxlength,
	ipFilter: ipFilter,
	passwordFilter: passwordFilter,
	excludeSpecial: excludeSpecial
};