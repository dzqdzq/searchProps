#!/usr/bin/env node

import clipboardy from 'clipboardy';
import {searchProps} from '../index.js';
clipboardy.writeSync(searchProps.toString());
console.log("searchProps copy success");