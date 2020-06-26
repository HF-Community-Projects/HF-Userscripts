// ==UserScript==
// @name         HackForum's Smilies Extended [Standard]
// @namespace    https://github.com/HF-Community-Projects/HF-Userscripts
// @version      1.0.0
// @description  Extends what Emojis you have access too.
// @author       Joel (UID: 3790579)
// @match        https://hackforums.net/newthread.php*
// @match        https://hackforums.net/newreply.php*
// @match        https://hackforums.net/editpost.php*
// @updateURL    https://github.com/HF-Community-Projects/HF-Userscripts/raw/master/HF-Emojis-Extended/EmojiExtensionStandard.user.js
// @downloadURL  https://github.com/HF-Community-Projects/HF-Userscripts/raw/master/HF-Emojis-Extended/EmojiExtensionStandard.user.js
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
    var emojiList = [];

    // Objects
    function EmojiObject(emoji, title) {
        this.emoji = emoji;
        this.title = title;
        this.style = "margin: 5px; font-size: 18px; flex: 1 0 calc(25% - 10px); cursor: pointer;";
    }

    // Utility Functions
    function PopulateEmojiArray() {
        emojiList.push(new EmojiObject("❤", "Red Heart"));
        emojiList.push(new EmojiObject("🔥", "Fire"));
        emojiList.push(new EmojiObject("😂", "Tears of Joy"));
        emojiList.push(new EmojiObject("🥰", "Smiling Face with Hearts"));
        emojiList.push(new EmojiObject("🥺", "Pleading Face"));
        emojiList.push(new EmojiObject("😍", "Heart-Eye'd"));
        emojiList.push(new EmojiObject("👏", "Clapping Hands"));
        emojiList.push(new EmojiObject("🙏", "Folded Hands"));
        // Total Extra = 8
    }

    function AddEmoji() {
        emojiList.forEach(emoji => {
            let emojiElement = document.createElement('span');
            emojiElement.style = emoji.style;
            emojiElement.innerText = emoji.emoji;
            emojiElement.title = emoji.title;
            emojiElement.onclick = function () {
                MyBBEditor.insertText(`${emoji.emoji}`)
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
        PopulateEmojiArray();
        AddEmoji();
    }

    Main();
})();