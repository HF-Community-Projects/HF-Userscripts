// ==UserScript==
// @name Hackúman Heal Predictor
// @description Tells you how many bytes you need to fully heal your Hackúman.
// @license MIT
// @match https://hackforums.net/hackuman.php
// @icon https://i.ibb.co/LrYmmtD/4-normal-improved-5.png
// @supportURL https://hackforums.net/member.php?action=profile&uid=3790579
// @contributionURL 
// @version 0.1
// @updateURL 
// @author Joel (UID: 3790579)
// ==/UserScript==

(function () {
    'use strict';

    // Vars
    var hackumans = [];
    var smartHeal = true;
    // Smart Heal Description
    // true = Calculates how much to heal to FULL Hp
    // false = Calculates how much to heal without overspending for little HP. (Won't heal if less than Heal amount will be used.)

    // Objects
    function HackumanStats(currentHealth, totalHealth, level, cost, healamnt) {
        this.currentHealth = currentHealth;
        this.totalHealth = totalHealth;
        this.level = level;
        this.cost = cost;
        this.healamnt = healamnt;
    }

    // Utility Function
    function PrepStats(hp, lvl) {
        let currentHealth = "";
        let maximumHealth = "";
        let level = lvl.replace("Level: ", "");
        let humHP = hp.split('');
        let cost = 0;
        let healAmnt = 0;
        let hpSwitch = false;

        humHP.forEach(char => {
            if (char == "/") {
                hpSwitch = true;
            } else if (!hpSwitch) {
                currentHealth += char;
            } else {
                maximumHealth += char;
            }
        });

        if (level >= 1 && level <= 10) {
            cost = 10;
            healAmnt = 10;
        } else if (level >= 11 && level <= 20) {
            cost = 25;
            healAmnt = 10;
        } else if (level >= 21 && level <= 30) {
            cost = 35;
            healAmnt = 15;
        } else if (level >= 31 && level <= 40) {
            cost = 65;
            healAmnt = 35;
        }

        var hackuman = new HackumanStats(parseInt(currentHealth.trim()), parseInt(maximumHealth.trim()), level.trim(), cost, healAmnt);
        hackumans.push(hackuman);
        console.log(hackumans);
    }

    function GrabHackumen() {
        $(`div.hum-mon-progressbar-container`).parent().each(function (index, parentDiv) {
            let level = "";
            let health = "";
            level = $(parentDiv).children()[0].innerText;
            health = $(parentDiv).children()[1].innerText;
            PrepStats(health, level);
        });
    }

    function SetHackumen() {
        let count = 0;
        $(`div.hum-mon-progressbar-container`).parent().each(function (index, parentDiv) {
            $(parentDiv).children()[0].innerText = `Level: ${hackumans[count].level} \n Heal Cost: β ${hackumans[count].cost}`;
            count++;
        });
    }

    // Main Functions
    function Main() {
        GrabHackumen();
        CalcPrices();
        SetHackumen();
    }

    function CalcPrices() {
        hackumans.forEach(monster => {
            let missingHP = monster.totalHealth - monster.currentHealth;

            if (smartHeal) {
                let cost = Math.ceil(missingHP / monster.healamnt) * monster.cost;
                monster.cost = cost;
            } else {
                let cost = Math.floor(missingHP / monster.healamnt) * monster.cost;
                monster.cost = cost;
            }
        })
    }

    Main();
})();