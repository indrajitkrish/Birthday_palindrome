function reverse_string(str) {
  return str.split('').reverse().join('');
}
//console.log(reverse_string('hello'));
function ispalindrome(s) {
  var reverse = reverse_string(s);
  if (reverse === s)
    return true;
  else
    return false;
}
//console.log(ispalindrome('racecar'));
function datetostring(date) {
  var datestr = { day: '', month: '', year: '' };
  if (date.day < 10) {
    datestr.day = "0" + date.day;
  }
  else {
    datestr.day = date.day.toString();
  }
  if (date.month < 10) {
    datestr.month = "0" + date.month;
  }
  else {
    datestr.month = date.month.toString();
  }
  datestr.year = date.year.toString();
  return datestr;
}
//console.log(datetostring(Date));
function alldatevariation(date) {
  var strdate = datetostring(date);

  var ddmmyyyy = strdate.day + strdate.month + strdate.year;
  var mmddyyyy = strdate.month + strdate.day + strdate.year;
  var yyyymmdd = strdate.year + strdate.month + strdate.day;
  var ddmmyy = strdate.day + strdate.month + strdate.year.slice(-2);
  var mmddyy = strdate.month + strdate.day + strdate.year.slice(-2);
  var yymmdd = strdate.year.slice(-2) + strdate.month + strdate.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}
//console.log(alldatevariation(Date));
function checkpalindrome(date) {
  var listofdates = alldatevariation(date);
  var flag = false;

  for (var i = 0; i < listofdates.length; i++) {
    if (ispalindrome(listofdates[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}
//console.log(checkpalindrome(Date));

function isleapyear(y) {
  if (y % 400 == 0)
    return true;
  else if (y % 100 == 0)
    return false;
  else if (y % 4 == 0)
    return true;
  else
    return false;
}
function getnextdate(date) {
  //console.log(typeof (date.day));
  var day = Number(date.day) + 1;
  var month = date.month;
  var year = date.year;

  var daysinmonth = ['31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'];

  if (month == 2) {
    if (isleapyear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    }
    else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  }
  else {

    if (day > daysinmonth[month - 1]) {
      day = 1;
      month++;
    }
    if (month > 12) {
      month = 1;
      year++;
    }
  }
  day = day.toString();
  return {
    day: day,
    month: month,
    year: year
  };
}
//console.log(getnextdate(Date));
function nextpalindrome(date) {
  var missingdate = 0;
  var nextdate = getnextdate(date);
  //console.log(nextdate);

  while (1) {
    missingdate++;
    var checkthenextdate = checkpalindrome(nextdate);
    if (checkthenextdate) {
      break;
    }
    nextdate = getnextdate(nextdate);
  }
  return [missingdate, nextdate];
}
Date = {
  day: '1',
  month: '1',
  year: '2021'
};
function getprevdate(date) {
  //console.log(typeof (date.day));
  var day = Number(date.day) - 1;
  var month = date.month;
  var year = date.year;

  var daysinmonth = ['31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'];

  if (month == 3) {
    if (isleapyear(year)) {
      if (day < 1) {
        day = 29;
        month--;
      }
    }
    else {
      if (day < 1) {
        day = 28;
        month--;
      }
    }
  }
  else {

    if (day < 1) {
      day = daysinmonth[month - 1];
      month--;
    }
    if (month < 1) {
      month = 12;
      year--;
    }

  }
  day = day.toString();
  return {
    day: day,
    month: month,
    year: year
  };
}
function prevpalindrome(date) {
  var missingdate = 0;
  var prevdate = getprevdate(date);
  //console.log(nextdate);

  while (1) {
    missingdate++;
    var checktheprevdate = checkpalindrome(prevdate);
    if (checktheprevdate) {
      break;
    }
    prevdate = getprevdate(prevdate);
  }
  return [missingdate, prevdate];
}
var input = document.querySelector("#input");
var button = document.querySelector("#btn");
var output = document.querySelector("#output");
output.style.display = "none";
button.addEventListener('click',timeout);

function timeout(){
  setTimeout(checker,2000);
}
function checker()
{
  output.style.display = "block";
  if(input.value != '')
  {
  var inp = input.value.split("-");
  var Date={
    day: Number(inp[2]),
    month: Number(inp[1]),
    year: Number(inp[0])
  };
  console.log(checkpalindrome(Date));
  if(checkpalindrome(Date))
  {
    output.innerText = "Yah, Your Birthday is a palindrome! 🎈🎈"
  }
  else{
    var next = nextpalindrome(Date);
var prev = prevpalindrome(Date);
if (next[0] >= prev[0])
  output.innerText = "The nearest palindrome is "+ prev[1].day + "-" + prev[1].month + "-" + prev[1].year + ", you missed is by " + prev[0] + "days 😢";
else
output.innerText = "The nearest palindrome is "+ next[1].day + "-" + next[1].month + "-" + next[1].year + ", you missed is by " + next[0] + "days 😢";
  }
}
else
  output.innerText = "Please select a Date..."
}
