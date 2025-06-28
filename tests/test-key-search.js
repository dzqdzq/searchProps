// 测试按key搜索功能
import { searchProps } from '../index.js';
import { complexObject, symbolKey1, symbolKey2, symbolKey3 } from './complex-object.js';

console.log('=== 按key搜索测试 ===\n');

// 测试1: 搜索字符串键
console.log('1. 搜索字符串键 "stringProp":');
const stringKeyResults = searchProps(complexObject, 'key', 'stringProp');
console.log('结果:', stringKeyResults);
console.log('找到', stringKeyResults.length, '个匹配的键\n');

// 测试2: 搜索数字键
console.log('2. 搜索数字键 "numberProp":');
const numberKeyResults = searchProps(complexObject, 'key', 'numberProp');
console.log('结果:', numberKeyResults);
console.log('找到', numberKeyResults.length, '个匹配的键\n');

// 测试3: 搜索嵌套对象的键
console.log('3. 搜索嵌套键 "level1":');
const nestedKeyResults = searchProps(complexObject, 'key', 'level1');
console.log('结果:', nestedKeyResults);
console.log('找到', nestedKeyResults.length, '个匹配的键\n');

// 测试4: 搜索深层嵌套的键
console.log('4. 搜索深层键 "deepValue":');
const deepKeyResults = searchProps(complexObject, 'key', 'deepValue');
console.log('结果:', deepKeyResults);
console.log('找到', deepKeyResults.length, '个匹配的键\n');

// 测试5: 搜索Symbol键
console.log('5. 搜索Symbol键 symbolKey1:');
const symbolKeyResults = searchProps(complexObject, 'key', symbolKey1);
console.log('结果:', symbolKeyResults);
console.log('找到', symbolKeyResults.length, '个匹配的Symbol键\n');

// 测试5.1: 使用Symbol描述字符串搜索（修复后的功能）
console.log('5.1. 使用Symbol描述字符串搜索 "symbolKey1":');
const symbolDescResults = searchProps(complexObject, 'key', 'symbolKey1');
console.log('结果:', symbolDescResults);
console.log('找到', symbolDescResults.length, '个匹配的Symbol键（通过描述）\n');

// 测试5.2: 使用Symbol.toString()搜索
console.log('5.2. 使用Symbol.toString()搜索:');
const symbolToStringResults = searchProps(complexObject, 'key', symbolKey1.toString());
console.log('结果:', symbolToStringResults);
console.log('找到', symbolToStringResults.length, '个匹配的Symbol键（通过toString）\n');

// 测试6: 搜索全局Symbol键
console.log('6. 搜索全局Symbol键 symbolKey3:');
const globalSymbolResults = searchProps(complexObject, 'key', symbolKey3);
console.log('结果:', globalSymbolResults);
console.log('找到', globalSymbolResults.length, '个匹配的全局Symbol键\n');

// 测试7: 搜索隐藏属性键
console.log('7. 搜索隐藏属性键 "hiddenProp":');
const hiddenKeyResults = searchProps(complexObject, 'key', 'hiddenProp');
console.log('结果:', hiddenKeyResults);
console.log('找到', hiddenKeyResults.length, '个匹配的隐藏键\n');

// 测试8: 正则表达式搜索键 - 包含"Prop"的键
console.log('8. 正则表达式搜索包含"Prop"的键 /Prop/:');
const propRegex = /Prop/;
const propKeyResults = searchProps(complexObject, 'key', propRegex);
console.log('结果:', propKeyResults.slice(0, 5)); // 只显示前5个结果
console.log('找到', propKeyResults.length, '个包含"Prop"的键\n');

// 测试9: 正则表达式搜索键 - 以"nested"开头的键
console.log('9. 正则表达式搜索以"nested"开头的键 /^nested/i:');
const nestedRegex = /^nested/i;
const nestedRegexResults = searchProps(complexObject, 'key', nestedRegex);
console.log('结果:', nestedRegexResults);
console.log('找到', nestedRegexResults.length, '个以"nested"开头的键\n');

// 测试10: 正则表达式搜索键 - 包含数字的键
console.log('10. 正则表达式搜索包含数字的键 /\\d/:');
const numberInKeyRegex = /\d/;
const numberInKeyResults = searchProps(complexObject, 'key', numberInKeyRegex);
console.log('结果:', numberInKeyResults);
console.log('找到', numberInKeyResults.length, '个包含数字的键\n');

// 测试11: 正则表达式搜索键 - 以"level"开头的键
console.log('11. 正则表达式搜索以"level"开头的键 /^level/:');
const levelRegex = /^level/;
const levelKeyResults = searchProps(complexObject, 'key', levelRegex);
console.log('结果:', levelKeyResults);
console.log('找到', levelKeyResults.length, '个以"level"开头的键\n');

// 测试12: 搜索Map中的键
console.log('12. 搜索Map中的字符串键 "mapKey1":');
const mapKeyResults = searchProps(complexObject.mapObject, 'key', 'mapKey1');
console.log('结果:', mapKeyResults);
console.log('找到', mapKeyResults.length, '个Map中的匹配键\n');

// 测试13: 搜索Map中的Symbol键
console.log('13. 搜索Map中的Symbol键 symbolKey1:');
const mapSymbolKeyResults = searchProps(complexObject.mapObject, 'key', symbolKey1);
console.log('结果:', mapSymbolKeyResults);
console.log('找到', mapSymbolKeyResults.length, '个Map中的Symbol键\n');

// 测试14: 搜索Map中的数字键
console.log('14. 搜索Map中的数字键 42:');
const mapNumberKeyResults = searchProps(complexObject.mapObject, 'key', 42);
console.log('结果:', mapNumberKeyResults);
console.log('找到', mapNumberKeyResults.length, '个Map中的数字键\n');

// 测试15: 搜索Map中的布尔键
console.log('15. 搜索Map中的布尔键 true:');
const mapBooleanKeyResults = searchProps(complexObject.mapObject, 'key', true);
console.log('结果:', mapBooleanKeyResults);
console.log('找到', mapBooleanKeyResults.length, '个Map中的布尔键\n');

// 测试16: 正则表达式搜索Map中的键
console.log('16. 正则表达式搜索Map中包含"Key"的键 /Key/:');
const mapKeyRegex = /Key/;
const mapKeyRegexResults = searchProps(complexObject.mapObject, 'key', mapKeyRegex);
console.log('结果:', mapKeyRegexResults);
console.log('找到', mapKeyRegexResults.length, '个Map中包含"Key"的键\n');

// 测试17: 搜索数组索引（数组的键是索引）
console.log('17. 搜索数组索引键 "0":');
const arrayIndexResults = searchProps(complexObject.simpleArray, 'key', '0');
console.log('结果:', arrayIndexResults);
console.log('找到', arrayIndexResults.length, '个数组索引键\n');

// 测试18: 正则表达式搜索数组索引
console.log('18. 正则表达式搜索数组索引 /^\\[\\d+\\]$/:');
const arrayIndexRegex = /^\[\d+\]$/;
const arrayIndexRegexResults = searchProps(complexObject, 'key', arrayIndexRegex);
console.log('结果:', arrayIndexRegexResults.slice(0, 5)); // 只显示前5个结果
console.log('找到', arrayIndexRegexResults.length, '个数组索引键\n');

// 测试19: 使用深度限制搜索键
console.log('19. 限制深度为2搜索键 "level3":');
const depthLimitedKeyResults = searchProps(complexObject, 'key', 'level3', { maxDepth: 2 });
console.log('结果:', depthLimitedKeyResults);
console.log('找到', depthLimitedKeyResults.length, '个匹配键（深度限制为2）\n');

// 测试20: 使用自定义过滤器搜索键
console.log('20. 使用自定义过滤器，只搜索字符串类型的键:');
const stringKeyFilterResults = searchProps(complexObject, 'key', propRegex, {
  filter: (obj, key) => typeof key === 'string',
  maxResults: 5
});
console.log('结果:', stringKeyFilterResults);
console.log('找到', stringKeyFilterResults.length, '个字符串类型的键\n');

// 测试21: 搜索getter/setter属性键
console.log('21. 搜索计算属性键 "computedProp":');
const computedKeyResults = searchProps(complexObject, 'key', 'computedProp');
console.log('结果:', computedKeyResults);
console.log('找到', computedKeyResults.length, '个计算属性键\n');

// 测试22: 正则表达式搜索私有属性键（以下划线开头）
console.log('22. 正则表达式搜索私有属性键 /^_/:');
const privateKeyRegex = /^_/;
const privateKeyResults = searchProps(complexObject, 'key', privateKeyRegex);
console.log('结果:', privateKeyResults);
console.log('找到', privateKeyResults.length, '个私有属性键\n');

console.log('=== 按key搜索测试完成 ===');