const http = require('http');
const { exec } = require('child_process');

const port = 8357;
const serverPath = `http://localhost:${port}`;
const editor = process.env.EDITOR;
const testsDir = 'tests';

let lineNumberPrefix = false;
if(editor.includes('subl') || editor.includes('atom')){
    lineNumberPrefix = ':';
} else if(editor.includes('vi')){
    lineNumberPrefix = ' +';
}
if(!lineNumberPrefix){
    console.log(`WARNING: Can't use line numbers. $EDITOR=${editor}`);
}

http.createServer(function(request, response) {
    console.log(`Request URL: ${serverPath}${request.url}`);
	request.pipe(process.stdout);

    const parts = request.url.split('/').map(decodeURIComponent);
    const moduleName = parts[1];
    const testName = parts[2];

    if(moduleName.startsWith('JSHint - ')){
        //TODO handle when files in app fail jshint that aren't in the tests dir
        openFile(testsDir + '/' + moduleName.replace('JSHint - ', ''));

    } else {
        //find the file with moduleName and testName in it
        const grepCmd = `grep -rl "module.*${moduleName}" "${testsDir}" | xargs grep -Hn "test.*${testName}"`;
        exec(grepCmd, (error, stdout, stderr) => {
            if (error) {
                //TODO on error, grep for just the moduleName only, without testName
                console.error(`exec error: ${error}`); return; 
            }
            const stdoutTrimmed = stdout.trim();
            if(stdoutTrimmed.length > 0){

                const linesObj = stdout.trim().split('\n').map(line=>{
                    const parts = line.split(':');
                    return {file:parts[0], lineNum:parts[1]};
                });

                //open the file and go to the line number where the testName is found
                openFile(linesObj[0].file, linesObj[0].lineNum);
            } else {
                console.log(`No files found in ${testsDir} containing '${moduleName}' and '${testName}'.`)
            }

        });
    }

    response.writeHead(200, {"Content-Type":"text/plain", "Access-Control-Allow-Origin":"*"});
    response.end("");

}).listen(port);

function openFile(filePath, lineNumber){
    const lineNumberStr = (lineNumberPrefix && lineNumber) ? (lineNumberPrefix + lineNumber) : '';
    const finalCommand = `${editor} "${filePath}"${lineNumberStr}`;
    if(editor.includes('vi')){
        console.log(`Run this: ${finalCommand}`);
    } else {
        console.log(`Executing: ${finalCommand}`);
        exec(finalCommand, (error, stdout, stderr) => {
            if (error) {console.error(`exec error: ${error}`); return; }
        });
    }
}

console.log(serverPath);

