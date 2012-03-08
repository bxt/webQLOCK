(function() {
  "use strict";
  
  
  var updateInterval;
  var ffUpdateInterval;
  
  function updateTime(e,now) {
    now = now || new Date();
    var i,l,
      hour = now.getHours(), 
      minute = now.getMinutes(), 
      nums = ["one", "two", "three", "four", "five", "six",
              "seven", "eight", "nine", "ten", "eleven", "twelve",
              "nearly", "to", "past", "three1", "quarter", "half",
              "sixSeven", "twelveFive", "tenNine", "twelveFive", 
              "oneS", "quarter2", "o-clock"
             ],
      numState = {},
      highlights = [];

    if (minute >= 4 && minute < 8) {
      highlights.push("nearly", "past");
    } else if (minute >= 8 && minute < 13) {
      highlights.push("nearly", "to", "quarter");
    } else if (minute >= 13 && minute < 18) {
      highlights.push("quarter");
    } else if (minute >= 18 && minute < 23) {
      highlights.push("nearly", "past", "quarter");
    } else if (minute >= 23 && minute < 27) {
      highlights.push("nearly", "to", "half");
    } else if (minute >= 27 && minute < 34) {
      highlights.push("half");
    } else if (minute >= 34 && minute < 38) {
      highlights.push("nearly", "past", "half");
    } else if (minute >= 38 && minute < 43) {
      highlights.push("nearly", "to", "three1", "quarter");
    } else if (minute >= 43 && minute < 48) {
      highlights.push("three1", "quarter");
    } else if (minute >= 48 && minute < 53) {
      highlights.push("nearly", "past", "three1", "quarter");
    } else if (minute >= 53 && minute < 57) {
      highlights.push("nearly", "to");
    } else {
      highlights.push("o-clock");
    }
    
    var twelveHourClockHour = (hour % 12 !== 0) ? hour % 12 : 12;
    
    if (twelveHourClockHour === 12 && minute >= 8) {
      highlights.push("one");
    } else {
      highlights.push((minute < 8) ? nums[twelveHourClockHour-1] : nums[twelveHourClockHour]);
    }
    
    for (i = 0, l = highlights.length; i < l; i++) {
      numState[highlights[i]] = true;
    }
    
    if(numState["one"] && !numState["o-clock"])
      numState["oneS"] = true;
    
    if(numState["quarter"])
      numState["quarter2"] = true;
    
    if(numState["three"] && numState["o-clock"]) {
      numState["three1"] = true;
      numState["three"] = false;
    }
    
    if(numState["four"] && numState["o-clock"]) {
      numState["quarter"] = true;
      numState["four"] = false;
    }
    
    if(numState["twelve"] || numState["five"])
      numState["twelveFive"] = true;
    
    if(numState["ten"] || numState["nine"])
      numState["tenNine"] = true;
    
    if(numState["six"] || numState["seven"])
      numState["sixSeven"] = true;
    
    
    
    for (i = 0, l = nums.length; i < l; i++) {
      document.getElementById(nums[i]).className =
        numState[nums[i]] ? "word active" : "word";
    }
    
  }
  
  function ready() {
    updateTime();
    updateInterval = setInterval(updateTime, 1000);
  }
  
  function fastForward() {
    if(ffUpdateInterval) {
      window.clearInterval(ffUpdateInterval);
      ready();
      return false;
    }
    
    var now=new Date(),
        i=now.getMinutes(),
        k=now.getHours()%12;
    
    window.clearInterval(updateInterval);
    
    ffUpdateInterval = window.setInterval(function(){
      updateTime(null, new Date(2012,6,3,k,i));
      
      i++;
      if(i >= 60) { k++; i = 0; }
      if(k >= 12) { k = 0; }
    },250);
    return false;
  }
  
  function resize() {
    document.getElementById("qlock").style.marginTop = 
      Math.max(window.innerHeight-464,0)/2+50+"px";
  }
  
  document.getElementById("ff").addEventListener('click', fastForward, false);
  window.addEventListener('load', ready, false);
  window.addEventListener('resize', resize, false);
  resize();
  
})();
