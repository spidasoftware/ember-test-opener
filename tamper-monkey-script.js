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
            var moduleName = li.find('.module-name').text();
            var testName = li.find('.test-name').text();
            $.ajax({
                url:`http://localhost:${PORT}/${encodeURIComponent(moduleName)}/${encodeURIComponent(testName)}`
            });
        }
    });

})();
