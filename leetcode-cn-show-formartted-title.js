// ==UserScript==
// @name         Leetcode CN 提取标题
// @namespace    http://tampermonkey.net/
// @version      2025-07-03
// @description  Leetcode CN 提取标题
// @author       cznno
// @match        https://leetcode.cn/problems/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=leetcode.cn
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    const targetElement = document.querySelector('.text-title-large');
    addTitle();

    const observer = new MutationObserver(function (mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'characterData') {
                addTitle();
            }
        }
    });


    const config = {
        characterData: true,
        subtree: true,
        childList: true,
        // characterDataOldValue: true
    };

    observer.observe(document.querySelector('.text-title-large'), config);
})();

function addTitle() {
    const targetElement = document.querySelector('.text-title-large');
    console.log(targetElement)
    const updatedText = !targetElement ? 'Element Not Found' : formatTitle(targetElement);

    const formattedOutput = document.querySelector('.formatted-title') ?? (() => {
        const element = document.createElement('span');
        element.classList.add('formatted-title');
        targetElement.insertAdjacentElement('afterend', element);
        return element;
    })();
    formattedOutput.textContent = updatedText;

}

function formatTitle(target) {
    return ' | q' + extractNumber(target.innerText) + '_' + kebabToPascalCase(extractTitle(window.location.pathname))
}

function extractNumber(str) {
    const matches = str.match(/\d+/g);
    return matches ? matches[0] : null;
}

function extractTitle(str) {
    const matches = str.match(/(?<=\/problems\/).+?(?=\/|$)/);
    return matches ? matches[0] : null;
}

function kebabToPascalCase(str) {
    if (typeof str !== 'string' || str.length === 0) {
        return '';
    }

    return str.split('-')
        .map(word => {
            if (word.length === 0) {
                return '';
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join('');
}s
