// ==UserScript==
// @name         HackForum's Smilies Extended
// @namespace    https://github.com/HF-Community-Projects/HF-Userscripts
// @version      1.0.0
// @description  Extends what Emojis you can use.
// @author       Joel (UID: 3790579)
// @match        https://hackforums.net/newthread.php*
// @match        https://hackforums.net/newreply.php*
// @match        https://hackforums.net/editpost.php*
// @match        https://hackforums.net/private.php*
// @updateURL    https://github.com/HF-Community-Projects/HF-Userscripts/raw/master/HF-Emojis-Extended/EmojiExtension.user.js
// @downloadURL  https://github.com/HF-Community-Projects/HF-Userscripts/raw/master/HF-Emojis-Extended/EmojiExtension.user.js
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
    var customEmojiList = [];
    var emojiPack = 0;
    // 0 = Both Packs, 1 = Smilies Only, 2 = Better Twitch.tv Emotes

    // Objects
    function EmojiObject(emoji, title) {
        this.emoji = emoji;
        this.title = title;
        this.style = "margin: 5px; font-size: 18px; flex: 1 0 calc(25% - 10px); cursor: pointer;";
    }

    function CustomEmojiObject(imgSrc, title) {
        this.imgSrc = imgSrc;
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

            // This abomination handles different pages
            // Currently Supported: New Thread, New Post, Editing a Thread, Editing a Post,
            // Replying to a PM, Creating a PM
            if (document.title.includes("Post Reply")) {
                document.getElementsByClassName("trow1")[2].appendChild(emojiElement);
            } else if (document.title.includes("New Thread")) {
                document.getElementsByClassName("trow1")[4].appendChild(emojiElement);
            } else if (document.title.includes("Compose a Private Message")) {
                document.getElementsByClassName("trow1")[31].appendChild(emojiElement);
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

    // Utility Functions
    function PopulateCustomEmojiArray() {
        // Update this with new Emotes
        customEmojiList.push(new CustomEmojiObject("https://cdn.betterttv.net/emote/56cb56f5500cb4cf51e25b90/1x", "nymnCorn"));
        customEmojiList.push(new CustomEmojiObject("https://cdn.betterttv.net/emote/5a6edb51f730010d194bdd46/1x", "peepoDance"));
        customEmojiList.push(new CustomEmojiObject("https://cdn.betterttv.net/emote/5a16ddca8c22a247ead62ceb/1x", "peepoSad"));
        customEmojiList.push(new CustomEmojiObject("https://cdn.betterttv.net/emote/5b1740221c5a6065a7bad4b5/1x", "pepeD"));
        customEmojiList.push(new CustomEmojiObject("https://cdn.betterttv.net/emote/5aca62163e290877a25481ad/1x", "Pepega"));
        customEmojiList.push(new CustomEmojiObject("https://cdn.betterttv.net/emote/59f27b3f4ebd8047f54dee29/1x", "PepeHands"));
        customEmojiList.push(new CustomEmojiObject("https://cdn.betterttv.net/emote/5b77ac3af7bddc567b1d5fb2/1x", "pepeJam"));
        customEmojiList.push(new CustomEmojiObject("https://cdn.betterttv.net/emote/5c548025009a2e73916b3a37/1x", "PepeLaugh"));
        customEmojiList.push(new CustomEmojiObject("https://cdn.betterttv.net/emote/583089f4737a8e61abb0186b/1x", "OMEGALUL"));
        customEmojiList.push(new CustomEmojiObject("https://cdn.betterttv.net/emote/55b6f480e66682f576dd94f5/1x", "Clap"));
        customEmojiList.push(new CustomEmojiObject("https://cdn.betterttv.net/emote/5e9c6c187e090362f8b0b9e8/1x", "KEKW"));
        customEmojiList.push(new CustomEmojiObject("https://cdn.betterttv.net/emote/5d20a55de1cfde376e532972/1x", "weirdChamp"));
        // Total Extra = 12
    }


    function AddCustomEmoji() {
        customEmojiList.forEach(emoji => {
            // Creates Element and Decorates it.
            let emojiElement = document.createElement('img');
            emojiElement.style = emoji.style;
            emojiElement.width = 25;
            emojiElement.height = 25;
            emojiElement.src = emoji.imgSrc;
            emojiElement.title = emoji.title;

            emojiElement.onclick = function () {
                MyBBEditor.insertText(`[img]${emoji.imgSrc}[/img]`)
            }

            // This abomination handles different pages (I really don't know how to make this neater, maybe a switch? Idk)
            // Currently Supported: New Thread, New Post, Editing a Thread, Editing a Post,
            // Replying to a PM, Creating a PM [If you find a page not supported, message me please.]
            if (document.title.includes("Post Reply")) {
                document.getElementsByClassName("trow1")[2].appendChild(emojiElement);
            } else if (document.title.includes("New Thread")) {
                document.getElementsByClassName("trow1")[4].appendChild(emojiElement);
            } else if (document.title.includes("Compose a Private Message")) {
                document.getElementsByClassName("trow1")[31].appendChild(emojiElement);
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
        switch (emojiPack) {
            case 0:
                PopulateEmojiArray();
                PopulateCustomEmojiArray();
                AddEmoji();
                AddCustomEmoji();
                break;
            case 1:
                PopulateEmojiArray();
                AddEmoji();
                break;
            case 2:
                PopulateCustomEmojiArray();
                AddCustomEmoji();
                break;
        }
    }

    Main();
})();