#!/usr/bin/env node

import clipboardy from 'clipboardy';
import {searchProps, queryValueFromPath} from '../index.js';
clipboardy.writeSync(searchProps.toString() + "\n" + queryValueFromPath.toString());