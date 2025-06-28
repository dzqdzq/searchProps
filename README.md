# searchProps

[English](./README.md) | [中文](./README.zh-CN.md)

A powerful tool for searching JavaScript object properties. During debugging, we often need to find specific properties or values in objects. The searchProps tool allows you to quickly search for all information in objects, including visible properties, invisible properties, and Symbol properties.

## Installation

```bash
npm install search-props -g
```

## Usage

### Command Line Usage

1. Execute the following command in terminal
```bash
searchProps
```

2. Paste the code (Ctrl + V) where you need it:
- In developer tools console
- In debug console
- In third-party libraries or when reverse engineering target third-party applications

## API Documentation

### searchProps

```js
/**
 * Object search tool, supports searching by value, key, type, or all four methods
 * @param {Object|Array} target - The target object or array to search
 * @param {string} searchType - Search type: "value", "key", "type" or "all"
 * @param {*|RegExp|Function} searchValue - Search value, can be a regular value, regular expression or constructor function
 * @param {Object} [options] - Search options
 * @param {Function} [options.filter] - Custom filter function
 * @param {number} [options.maxDepth=0] - Maximum search depth, <=0 means no depth limit
 * @param {number} [options.maxResults=10000] - Maximum number of results limit
 * @returns {Array} - Array containing matching results
 */
function searchProps(target, searchType, searchValue, options = {});
```

#### Parameters

- **target**: The target object or array to search
- **searchType**: Search type
  - `'key'`: Search by property name
  - `'value'`: Search by property value
  - `'type'`: Search by property type
  - `'all'`: Search by key, value, and type simultaneously (default)
- **searchValue**: Search value
  - Can be a regular value (string, number, etc.)
  - Can be a regular expression (for pattern matching)
  - Can be an object (for deep comparison)
  - When searchType is 'type', can be a type string (like 'string', 'number', 'object', 'function', 'array', 'date', 'regexp') or a constructor function
- **options**: Optional configuration
  - **filter**: Custom filter function, receives (obj, key) as parameters, returns a boolean value
  - **maxDepth**: Maximum search depth, <=0 means no depth limit, >0 limits the recursive search depth
  - **maxResults**: Maximum number of results limit

#### Return Value

Returns an array containing matching results, each result object includes the following properties:
- **paths**: The complete path of the property
- **value**: The property value
- **type**: The type of the property value



## Examples

### Search by Property Name

```js
const obj = { name: 'John', age: 30, info: { email: 'john@example.com' } };
const results = searchProps(obj, 'key', 'name');
// Result: [{ paths: 'name', value: 'John', type: 'string' }]
```

### Search Using Regular Expressions

```js
const obj = { name: 'John', username: 'john_doe', email: 'john@example.com' };
const results = searchProps(obj, 'key', /name/);
// Result: Matches all keys containing 'name'
```

### Search by Type

```js
const obj = { name: 'John', age: 30, active: true, tags: ['user', 'admin'] };
const results = searchProps(obj, 'type', Array);
// Result: Matches all properties of array type
```

### Search for Symbol Properties

```js
const sym = Symbol('testSymbol');
const obj = { [sym]: 'Symbol value' };
const results = searchProps(obj, 'key', sym.toString());
// Result: Matches Symbol properties
```

### Using Custom Filters

```js
const obj = { name: 'John', _private: 'secret', age: 30 };
const results = searchProps(obj, 'all', null, {
  filter: (obj, key) => !String(key).startsWith('_')
});
// Result: Excludes all properties starting with an underscore
```



## Features

- Support for searching deeply nested objects
- Support for searching array elements
- Support for searching non-enumerable properties
- Support for searching Symbol properties
- Automatic handling of circular references
- Support for using regular expressions for pattern matching
- Support for deep object comparison
- Provides detailed property path information

![Example](image.jpg)