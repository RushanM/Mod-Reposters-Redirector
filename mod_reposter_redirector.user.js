// ==UserScript==
// @name            Mod Reposters Redirector
// @name:ru         Перенаправление с сайтов-репостеров модов
// @author          Deflecta
// @contributionURL https://boosty.to/rushanm
// @description     Allows searching for mods on CurseForge and Modrinth from reposter websites
// @description:ru  Позволяет переходить на официальные источники с сайтов-репостеров
// @downloadURL     
// @grant           none
// @homepageURL     https://rushan.neocities.org/
// @icon            https://ru-minecraft.ru/templates/rework/assets/images/favicon.ico
// @license         MIT
// @match           https://modrinth.com/mods*
// @match           https://ru-minecraft.ru/mody-minecraft*
// @namespace       http://tampermonkey.net/
// @supportURL      
// @updateURL       
// @version         0.1
// ==/UserScript==

(function() {
    'use strict';

    function cleanModName(modName) {
        return modName.split(" - ")[0].trim();
    }

    const modLinks = document.querySelectorAll('.news__title a');

    modLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            const modName = cleanModName(link.textContent);
            const apiUrl = `https://api.modrinth.com/v2/search?query=${encodeURIComponent(modName)}&limit=1`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.hits && data.hits.length > 0) {
                        const modUrl = `https://modrinth.com/mod/${data.hits[0].slug}`;
                        window.location.href = modUrl;
                    } else {
                        alert('Не удалось найти мод на Modrinth!');
                    }
                })
                .catch(error => {
                    console.error('Не удалось получить данные Modrinth:', error);
                    alert('При поиске мода произошла ошибка.');
                });
        });
    });
})();