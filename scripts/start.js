#!/usr/bin/env node
const { spawn } = require('child_process');

const port = process.env.PORT || process.env.port || 5000;
const buildDir = process.env.BUILD_DIR || 'build';
const candidates = [
  'serve/build/main.js', // current versions
  'serve/bin/serve' // older versions
];

let serveBin = null;
for (const c of candidates) {
  try {
    serveBin = require.resolve(c);
    break;
  } catch (e) {
    // continue
  }
}

if (!serveBin) {
  console.error('`serve` is not installed or an unexpected version is present. Run `npm install` to install dependencies.');
  process.exit(1);
}

const useListenFlag = process.platform !== 'win32';
// Build the argument list: place options first, then the directory as the last positional argument.
const args = ['-s'];
if (useListenFlag) {
  // Bind explicitly to all interfaces on non-Windows (Render requires a network binding)
  args.push('-l', `tcp://0.0.0.0:${port}`);
} else {
  // On Windows, use -p <port> to avoid DNS lookup issues
  args.push('-p', String(port));
}
// Finally, add the directory to serve as the last argument
args.push(buildDir);

const child = spawn(process.execPath, [serveBin, ...args], { stdio: 'inherit' });
child.on('exit', code => process.exit(code));
