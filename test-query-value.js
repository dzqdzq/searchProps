// 测试queryValue函数
import { queryValueFromPath } from './index.js';

// 创建测试对象
const testObject = {
  name: "John",
  age: 30,
  contact: {
    email: "john@example.com",
    phone: "1234567890"
  },
  hobbies: ["reading", "swimming", "coding"],
  nested: {
    level1: {
      level2: {
        level3: "深层嵌套值"
      }
    }
  },
  items: [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" }
  ],
  mixedArray: [
    "字符串",
    123,
    { key: "对象在数组中" },
    ["嵌套", "数组"]
  ]
};

// 定义一个不可枚举属性
Object.defineProperty(testObject, 'secretId', {
  value: 'hidden-123',
  enumerable: false
});

// 定义Symbol属性
const symbolKey = Symbol('symbolProp');
testObject[symbolKey] = 'symbol-value';

// 嵌套Symbol
testObject.withSymbol = {};
const nestedSymbol = Symbol('nestedSymbol');
testObject.withSymbol[nestedSymbol] = "嵌套Symbol值";

// 测试各种路径
console.log('\n基本属性访问:');
console.log(`name: ${queryValueFromPath(testObject, 'name')}`);
console.log(`age: ${queryValueFromPath(testObject, 'age')}`);

console.log('\n嵌套属性访问:');
console.log(`email: ${queryValueFromPath(testObject, 'contact.email')}`);
console.log(`phone: ${queryValueFromPath(testObject, 'contact.phone')}`);

console.log('\n数组访问:');
console.log(`第一个爱好: ${queryValueFromPath(testObject, 'hobbies[0]')}`);
console.log(`第三个爱好: ${queryValueFromPath(testObject, 'hobbies[2]')}`);

console.log('\n数组中的对象:');
console.log(`第二个项目名称: ${queryValueFromPath(testObject, 'items[1].name')}`);

console.log('\n深层嵌套:');
console.log(`三层嵌套: ${queryValueFromPath(testObject, 'nested.level1.level2.level3')}`);

console.log('\n混合数组:');
console.log(`数组中的对象: ${queryValueFromPath(testObject, 'mixedArray[2].key')}`);
console.log(`嵌套数组: ${queryValueFromPath(testObject, 'mixedArray[3][1]')}`);

console.log('\nSymbol属性:');
console.log(`Symbol属性: ${queryValueFromPath(testObject, '[Symbol(symbolProp)]')}`);
console.log(`嵌套Symbol: ${queryValueFromPath(testObject, 'withSymbol[Symbol(nestedSymbol)]')}`);

console.log('\n不可枚举属性:');
console.log(`secretId: ${queryValueFromPath(testObject, 'secretId')}`);

console.log('\n无效路径:');
console.log(`不存在的属性: ${queryValueFromPath(testObject, 'notExist')}`);
console.log(`无效的嵌套: ${queryValueFromPath(testObject, 'contact.notExist')}`);
console.log(`越界的数组索引: ${queryValueFromPath(testObject, 'hobbies[10]')}`);
console.log(`不存在的Symbol: ${queryValueFromPath(testObject, '[Symbol(notExist)]')}`);