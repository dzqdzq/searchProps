// 测试按值搜索功能
import { searchProps } from '../index.js';
import { complexObject } from './complex-object.js';

console.log('=== 按值搜索测试 ===\n');

// 测试1: 搜索字符串值
console.log('1. 搜索字符串值 "hello world":');
const stringResults = searchProps(complexObject, 'value', 'hello world');
console.log('结果:', stringResults);
console.log('找到', stringResults.length, '个匹配项\n');

// 测试2: 搜索数字值
console.log('2. 搜索数字值 42:');
const numberResults = searchProps(complexObject, 'value', 42);
console.log('结果:', numberResults);
console.log('找到', numberResults.length, '个匹配项\n');

// 测试3: 搜索布尔值
console.log('3. 搜索布尔值 true:');
const booleanResults = searchProps(complexObject, 'value', true);
console.log('结果:', booleanResults);
console.log('找到', booleanResults.length, '个匹配项\n');

// 测试4: 搜索null值
console.log('4. 搜索null值:');
const nullResults = searchProps(complexObject, 'value', null);
console.log('结果:', nullResults);
console.log('找到', nullResults.length, '个匹配项\n');

// 测试5: 搜索undefined值
console.log('5. 搜索undefined值:');
const undefinedResults = searchProps(complexObject, 'value', undefined);
console.log('结果:', undefinedResults);
console.log('找到', undefinedResults.length, '个匹配项\n');

// 测试6: 正则表达式搜索 - 邮箱格式
console.log('6. 正则表达式搜索邮箱格式 /\\w+@\\w+\\.\\w+/:');
const emailRegex = /\w+@\w+\.\w+/;
const emailResults = searchProps(complexObject, 'value', emailRegex);
console.log('结果:', emailResults);
console.log('找到', emailResults.length, '个匹配项\n');

// 测试7: 正则表达式搜索 - 数字模式
console.log('7. 正则表达式搜索数字模式 /\\d+/:');
const numberRegex = /\d+/;
const numberPatternResults = searchProps(complexObject, 'value', numberRegex);
console.log('结果:', numberPatternResults);
console.log('找到', numberPatternResults.length, '个匹配项\n');

// 测试8: 正则表达式搜索 - 电话号码格式
console.log('8. 正则表达式搜索电话号码格式 /\\d{3}-\\d{3}-\\d{4}/:');
const phoneRegex = /\d{3}-\d{3}-\d{4}/;
const phoneResults = searchProps(complexObject, 'value', phoneRegex);
console.log('结果:', phoneResults);
console.log('找到', phoneResults.length, '个匹配项\n');

// 测试9: 正则表达式搜索 - 包含特定单词
console.log('9. 正则表达式搜索包含"test"的字符串 /test/i:');
const testRegex = /test/i;
const testResults = searchProps(complexObject, 'value', testRegex);
console.log('结果:', testResults);
console.log('找到', testResults.length, '个匹配项\n');

// 测试10: 正则表达式搜索 - 以特定字符开头
console.log('10. 正则表达式搜索以"deep"开头的字符串 /^deep/:');
const deepRegex = /^deep/;
const deepResults = searchProps(complexObject, 'value', deepRegex);
console.log('结果:', deepResults);
console.log('找到', deepResults.length, '个匹配项\n');

// 测试11: 搜索嵌套对象中的值
console.log('11. 搜索深层嵌套的值 "deep nested value":');
const deepNestedResults = searchProps(complexObject, 'value', 'deep nested value');
console.log('结果:', deepNestedResults);
console.log('找到', deepNestedResults.length, '个匹配项\n');

// 测试12: 搜索Map中的值
console.log('12. 搜索Map中的值 "mapValue1":');
const mapValueResults = searchProps(complexObject, 'value', 'mapValue1');
console.log('结果:', mapValueResults);
console.log('找到', mapValueResults.length, '个匹配项\n');

// 测试13: 搜索数组中的值
console.log('13. 搜索数组中的值 "array item":');
const arrayItemResults = searchProps(complexObject, 'value', 'array item');
console.log('结果:', arrayItemResults);
console.log('找到', arrayItemResults.length, '个匹配项\n');

// 测试14: 搜索隐藏属性的值
console.log('14. 搜索隐藏属性的值 "hidden value":');
const hiddenResults = searchProps(complexObject, 'value', 'hidden value');
console.log('结果:', hiddenResults);
console.log('找到', hiddenResults.length, '个匹配项\n');

// 测试15: 使用限制选项搜索
console.log('15. 限制最大结果数量为3个，搜索所有包含"value"的字符串:');
const valueRegex = /value/;
const limitedResults = searchProps(complexObject, 'value', valueRegex, { maxResults: 3 });
console.log('结果:', limitedResults);
console.log('找到', limitedResults.length, '个匹配项（限制为3个）\n');

// 测试16: 使用深度限制搜索
console.log('16. 限制搜索深度为2，搜索数字999:');
const depthLimitedResults = searchProps(complexObject, 'value', 999, { maxDepth: 2 });
console.log('结果:', depthLimitedResults);
console.log('找到', depthLimitedResults.length, '个匹配项（深度限制为2）\n');

console.log('=== 按值搜索测试完成 ===');