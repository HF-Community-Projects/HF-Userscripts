// ==UserScript==
// @name         HF Anti-Caps Lock
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Automatically convert the words in caps lock in thread titles to Title Case.
// @author       James
// @include      https://hackforums.net/search.php?*
// @include      https://hackforums.net/forumdisplay.php?*
// @updateURL    
// @downloadURL  
// @grant        none
// ==/UserScript==
//
// ------- CHANGE LOG -------
// version 1.0.0: Initial Release
// ---------------------------

(function() {
    'use strict';

    let result_rows = document.querySelectorAll("tr.inline_row");

    result_rows.forEach(function(row) {
        try {
            let thread_name = "";
            if (window.location.href.indexOf("search.php") > -1) {
                thread_name = row.querySelector('.subject_new').innerText;
            }
            else {
                thread_name = row.querySelector('.mobile-link > div > span > span > a').innerText;
            }
            //console.log(thread_name);

            let thread_name_titlecase = thread_name.replace(/\w\S*/g, function(txt) {
                if (txt === txt.toUpperCase()) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }
                else {
                    return txt;
                }
            });

            if (window.location.href.indexOf("search.php") > -1) {
                row.querySelector('.subject_new').innerText = thread_name_titlecase;
            }
            else {
                row.querySelector('.mobile-link > div > span > span > a').innerText = thread_name_titlecase;
            }
        }
        catch (err) {

        }
    });
})();
