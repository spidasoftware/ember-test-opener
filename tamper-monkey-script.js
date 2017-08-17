// ==UserScript==
// @name         modify ember testem results
// @description  tampermonkey script to call ember-test-opener server
// @match        http://localhost:7357/*/tests/index.html*
// ==/UserScript==

const PORT = 8357;

(function() {
    'use strict';

    $('body').on('click', '#qunit-tests > li', function(e){
        if(e.ctrlKey || e.metaKey) {//command or control click
            var li = $(this);
            var parts = [
                li.find('.module-name').text(), 
                li.find('.test-name').text()
            ].map(encodeURIComponent);
            $.ajax({
                url:`http://localhost:${PORT}/${parts.join('/')}`
            });
        }
    });

})();
