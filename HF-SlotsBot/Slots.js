// ==UserScript==
// @name Hackforum's Slot Bot
// @author Joel 
// @description Get that dice award bro.
// @license MIT
// @match https://hackforums.net/slots.php
// @icon https://i.ibb.co/2ygyT3Z/robot64.png
// @homepageURL https://github.com/gothboiclique/Hackforums-Slots-Bot
// @supportURL https://hackforums.net/member.php?action=profile&uid=3790579
// @contributionURL https://github.com/gothboiclique/Hackforums-Slots-Bot
// @version 0.2
// @updateURL https://raw.githubusercontent.com/gothboiclique/Hackforums-Slots-Bot/master/slots-bot-tm.js
// ==/UserScript==

(function () {
    'use strict';
  
    var starterBytes = document.getElementById("credits").innerHTML;
    var counter = 1;
    var bytesProfit = 0;
    var safetySwitchAmount = 0; // 0 = Infinite, Anything else is what it will stop at :)
    soundManager.mute();
    
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    
    function botSpins() {
        document.getElementById("spinButton").click();
    }
    
    function safetySwitch() {
        if (parseInt(document.getElementById("credits").innerHTML, 10) == safetySwitchAmount  || parseInt(document.getElementById("credits").innerHTML, 10) < safetySwitchAmount) {
            return false;
        } else {
            return true;
        }
    }
    
    function printStats() {
        bytesProfit = document.getElementById("credits").innerHTML - starterBytes;
        console.log("~~~~~~~~~~~~~~~~~~~~");
        console.log("Starting Bytes: " + starterBytes);
        console.log("Current Bytes: " + document.getElementById("credits").innerHTML);
        console.log("Current Profit: " + bytesProfit);
        console.log("You have played " + counter++ + " times.");
        document.title = "Spins: " + counter;
        console.log("Safety Switch Amount: " + safetySwitchAmount)
        console.log("~~~~~~~~~~~~~~~~~~~~");
    }
    
    function doEverything() {
        if (safetySwitch()) {
            botSpins();
            printStats();
        }
    }
    
    function runBot() {
        sleep(4000).then(() => {
            if (document.getElementById("credits").innerHTML >= 1) {
                doEverything();
                runBot();
            }
        })
    }

    runBot();
  })();
