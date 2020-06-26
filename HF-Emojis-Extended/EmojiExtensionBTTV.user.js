// ==UserScript==
// @name         HackForum's Smilies Extended
// @namespace    https://github.com/HF-Community-Projects/HF-Userscripts
// @version      1.0.0
// @description  Extends what Emojis you have access too.
// @author       Joel (UID: 3790579)
// @match        https://hackforums.net/newthread.php*
// @match        https://hackforums.net/newreply.php*
// @updateURL    https://github.com/HF-Community-Projects/HF-Userscripts/raw/master/HF-Emojis-Extended/EmojiExtensionBTTV.user.js
// @downloadURL  https://github.com/HF-Community-Projects/HF-Userscripts/raw/master/HF-Emojis-Extended/EmojiExtensionBTTV.user.js
// @grant        none
// @copyright    2020+
// ==/UserScript==
//
// ------- CHANGE LOG -------
// version 1.0.0: Initial Release
// ---------------------------

(function () {
    'use strict';

    // Vars
    var customEmojiList = [];

    // Objects
    function CustomEmojiObject(src, title) {
        this.src = src;
        this.title = title;
        this.style = "margin: 5px; font-size: 18px; flex: 1 0 calc(25% - 10px); cursor: pointer;";
    }

    // Utility Functions
    function PopulateCustomEmojiArray() {
        customEmojiList.push(new CustomEmojiObject("https://i.ibb.co/ph9Jm7c/nymnCorn.gif", "nymnCorn"));
        customEmojiList.push(new CustomEmojiObject("https://i.ibb.co/yWy5RKp/peepo-Dance.gif", "peepoDance"));
        customEmojiList.push(new CustomEmojiObject("https://i.ibb.co/N7rB0vT/peepoSad.png", "peepoSad"));
        customEmojiList.push(new CustomEmojiObject("https://i.ibb.co/jfzn4Vk/pepeD.gif", "pepeD"));
        customEmojiList.push(new CustomEmojiObject("https://i.ibb.co/rk3hHHs/Pepega.png", "Pepega"));
        customEmojiList.push(new CustomEmojiObject("https://i.ibb.co/MgNHmhP/Pepe-Hands.png", "PepeHands"));
        customEmojiList.push(new CustomEmojiObject("https://i.ibb.co/5M0HWzt/pepeJam.gif", "pepeJam"));
        customEmojiList.push(new CustomEmojiObject("https://i.ibb.co/X4CZnSp/Pepe-Laugh.gif", "PepeLaugh"));
        // Total Extra = 8
    }

    function AddCustomEmoji() {
        customEmojiList.forEach(emoji => {
            let emojiElement = document.createElement('img');
            emojiElement.style = emoji.style;
            emojiElement.src = emoji.src;
            emojiElement.title = emoji.title;

            emojiElement.onclick = function () {
                MyBBEditor.insertText(`[img]${emoji.src}[/img]`)
            }

            if (document.title.includes("Post Reply")) {
                document.getElementsByClassName("trow1")[2].appendChild(emojiElement);
            } else {
                document.getElementsByClassName("trow1")[4].appendChild(emojiElement);
            }
        })
    }

    // Main Functions
    function Main() {
        PopulateCustomEmojiArray();
        AddCustomEmoji();
    }

    Main();
})();