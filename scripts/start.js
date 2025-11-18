#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

const port = process.env.PORT || process.env.port || 5000;
let serveBin;
try {
  serveBin = require.resolve('serve/bin/serve');
} catch (e) {
  console.error('`serve` is not installed. Run `npm install` to install dependencies.');
  process.exit(1);
}

const child = spawn(process.execPath, [serveBin, '-s', 'dist', '-l', `tcp:${port}`], { stdio: 'inherit' });
child.on('exit', code => process.exit(code));
