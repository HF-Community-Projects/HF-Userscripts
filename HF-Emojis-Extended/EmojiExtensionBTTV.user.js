// ==UserScript==
// @name         HackForum's Smilies Extended [BTTV]
// @namespace    https://github.com/HF-Community-Projects/HF-Userscripts
// @version      1.0.0
// @description  Extends what Emojis you have access too.
// @author       Joel (UID: 3790579)
// @match        https://hackforums.net/newthread.php*
// @match        https://hackforums.net/newreply.php*
// @match        https://hackforums.net/editpost.php*
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
    function CustomEmojiObject(displaySrc, realSrc, title) {
        this.displaySrc = displaySrc;
        this.realSrc = realSrc;
        this.title = title;
        this.style = "margin: 5px; font-size: 18px; flex: 1 0 calc(25% - 10px); cursor: pointer;";
    }

    // Utility Functions
    function PopulateCustomEmojiArray() {
        customEmojiList.push(new CustomEmojiObject("https://i.ibb.co/ph9Jm7c/nymnCorn.gif", "https://cdn.betterttv.net/emote/56cb56f5500cb4cf51e25b90/1x", "nymnCorn"));
        customEmojiList.push(new CustomEmojiObject("https://i.ibb.co/yWy5RKp/peepo-Dance.gif", "https://cdn.betterttv.net/emote/5a6edb51f730010d194bdd46/1x", "peepoDance"));
        customEmojiList.push(new CustomEmojiObject("https://i.ibb.co/N7rB0vT/peepoSad.png", "https://cdn.betterttv.net/emote/5a16ddca8c22a247ead62ceb/1x", "peepoSad"));
        customEmojiList.push(new CustomEmojiObject("https://i.ibb.co/jfzn4Vk/pepeD.gif", "https://cdn.betterttv.net/emote/5b1740221c5a6065a7bad4b5/1x", "pepeD"));
        customEmojiList.push(new CustomEmojiObject("https://i.ibb.co/rk3hHHs/Pepega.png", "https://cdn.betterttv.net/emote/5aca62163e290877a25481ad/1x", "Pepega"));
        customEmojiList.push(new CustomEmojiObject("https://i.ibb.co/MgNHmhP/Pepe-Hands.png", "https://cdn.betterttv.net/emote/59f27b3f4ebd8047f54dee29/1x", "PepeHands"));
        customEmojiList.push(new CustomEmojiObject("https://i.ibb.co/5M0HWzt/pepeJam.gif", "https://cdn.betterttv.net/emote/5b77ac3af7bddc567b1d5fb2/1x", "pepeJam"));
        customEmojiList.push(new CustomEmojiObject("https://i.ibb.co/X4CZnSp/Pepe-Laugh.gif", "https://cdn.betterttv.net/emote/5c548025009a2e73916b3a37/1x", "PepeLaugh"));
        customEmojiList.push(new CustomEmojiObject("https://i.ibb.co/hVRrB5s/omegalul.png", "https://cdn.betterttv.net/emote/583089f4737a8e61abb0186b/1x", "OMEGALUL"));
        customEmojiList.push(new CustomEmojiObject("https://i.ibb.co/zX0JKKJ/clap.gif", "https://cdn.betterttv.net/emote/55b6f480e66682f576dd94f5/1x", "Clap"));
        customEmojiList.push(new CustomEmojiObject("https://i.ibb.co/JCjQS67/KEKW.png", "https://cdn.betterttv.net/emote/5e9c6c187e090362f8b0b9e8/1x", "KEKW"));
        customEmojiList.push(new CustomEmojiObject("https://i.ibb.co/x1G4kW3/weird-Champ.png", "https://cdn.betterttv.net/emote/5d20a55de1cfde376e532972/1x", "weirdChamp"));
        // Total Extra = 12
    }

    function AddCustomEmoji() {
        customEmojiList.forEach(emoji => {
            let emojiElement = document.createElement('img');
            emojiElement.style = emoji.style;
            emojiElement.src = emoji.displaySrc;
            emojiElement.title = emoji.title;

            emojiElement.onclick = function () {
                MyBBEditor.insertText(`[img]${emoji.realSrc}[/img]`)
            }

            if (document.title.includes("Post Reply")) {
                document.getElementsByClassName("trow1")[2].appendChild(emojiElement);
            } else if (document.title.includes("New Thread")) {
                document.getElementsByClassName("trow1")[4].appendChild(emojiElement);
            } else {
                let threadOrReply = document.querySelector("#editpost > table > tbody > tr:nth-child(8) > td.trow1.mobile-remove > strong");
                if (threadOrReply != null) {
                    document.getElementsByClassName("trow1")[4].appendChild(emojiElement);
                } else {
                    document.getElementsByClassName("trow1")[7].appendChild(emojiElement);
                }
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