// 测试按类型搜索功能
import { searchProps } from '../index.js';
import { complexObject, CustomClass, AnotherClass } from './complex-object.js';

console.log('=== 按类型搜索测试 ===\n');

// 测试1: 搜索字符串类型
console.log('1. 搜索字符串类型 "string":');
const stringTypeResults = searchProps(complexObject, 'type', 'string');
console.log('结果:', stringTypeResults.slice(0, 5)); // 只显示前5个结果
console.log('找到', stringTypeResults.length, '个字符串类型的属性\n');

// 测试2: 搜索数字类型
console.log('2. 搜索数字类型 "number":');
const numberTypeResults = searchProps(complexObject, 'type', 'number');
console.log('结果:', numberTypeResults);
console.log('找到', numberTypeResults.length, '个数字类型的属性\n');

// 测试3: 搜索布尔类型
console.log('3. 搜索布尔类型 "boolean":');
const booleanTypeResults = searchProps(complexObject, 'type', 'boolean');
console.log('结果:', booleanTypeResults);
console.log('找到', booleanTypeResults.length, '个布尔类型的属性\n');

// 测试4: 搜索函数类型
console.log('4. 搜索函数类型 "function":');
const functionTypeResults = searchProps(complexObject, 'type', 'function');
console.log('结果:', functionTypeResults);
console.log('找到', functionTypeResults.length, '个函数类型的属性\n');

// 测试5: 搜索undefined类型
console.log('5. 搜索undefined类型 "undefined":');
const undefinedTypeResults = searchProps(complexObject, 'type', 'undefined');
console.log('结果:', undefinedTypeResults);
console.log('找到', undefinedTypeResults.length, '个undefined类型的属性\n');

// 测试6: 搜索symbol类型
console.log('6. 搜索symbol类型 "symbol":');
const symbolTypeResults = searchProps(complexObject, 'type', 'symbol');
console.log('结果:', symbolTypeResults);
console.log('找到', symbolTypeResults.length, '个symbol类型的属性\n');

// 测试7: 搜索Date类型实例
console.log('7. 搜索Date类型实例:');
const dateTypeResults = searchProps(complexObject, 'type', Date);
console.log('结果:', dateTypeResults);
console.log('找到', dateTypeResults.length, '个Date类型的实例\n');

// 测试8: 搜索Map类型实例
console.log('8. 搜索Map类型实例:');
const mapTypeResults = searchProps(complexObject, 'type', Map);
console.log('结果:', mapTypeResults);
console.log('找到', mapTypeResults.length, '个Map类型的实例\n');

// 测试9: 搜索Set类型实例
console.log('9. 搜索Set类型实例:');
const setTypeResults = searchProps(complexObject, 'type', Set);
console.log('结果:', setTypeResults);
console.log('找到', setTypeResults.length, '个Set类型的实例\n');

// 测试10: 搜索Array类型实例
console.log('10. 搜索Array类型实例:');
const arrayTypeResults = searchProps(complexObject, 'type', Array);
console.log('结果:', arrayTypeResults.slice(0, 3)); // 只显示前3个结果
console.log('找到', arrayTypeResults.length, '个Array类型的实例\n');

// 测试11: 搜索自定义类CustomClass实例
console.log('11. 搜索CustomClass类型实例:');
const customClassResults = searchProps(complexObject, 'type', CustomClass);
console.log('结果:', customClassResults);
console.log('找到', customClassResults.length, '个CustomClass类型的实例\n');

// 测试12: 搜索自定义类AnotherClass实例
console.log('12. 搜索AnotherClass类型实例:');
const anotherClassResults = searchProps(complexObject, 'type', AnotherClass);
console.log('结果:', anotherClassResults);
console.log('找到', anotherClassResults.length, '个AnotherClass类型的实例\n');

// 测试13: 搜索RegExp类型实例
console.log('13. 搜索RegExp类型实例:');
const regexpTypeResults = searchProps(complexObject, 'type', RegExp);
console.log('结果:', regexpTypeResults);
console.log('找到', regexpTypeResults.length, '个RegExp类型的实例\n');

// 测试14: 搜索Object类型实例（会匹配所有对象）
console.log('14. 搜索Object类型实例（限制前5个结果）:');
const objectTypeResults = searchProps(complexObject, 'type', Object, { maxResults: 5 });
console.log('结果:', objectTypeResults);
console.log('找到', objectTypeResults.length, '个Object类型的实例（限制为5个）\n');

// 测试15: 在嵌套结构中搜索特定类型
console.log('15. 在深层嵌套中搜索字符串类型（限制深度为3）:');
const nestedStringResults = searchProps(complexObject.deepNesting, 'type', 'string', { maxDepth: 3 });
console.log('结果:', nestedStringResults);
console.log('找到', nestedStringResults.length, '个字符串类型的属性\n');

// 测试16: 搜索Map中的特定类型
console.log('16. 在Map对象中搜索字符串类型:');
const mapStringResults = searchProps(complexObject.mapObject, 'type', 'string');
console.log('结果:', mapStringResults);
console.log('找到', mapStringResults.length, '个字符串类型的值\n');

// 测试17: 使用自定义过滤器搜索类型
console.log('17. 使用自定义过滤器，只搜索可枚举属性的字符串类型:');
const filterResults = searchProps(complexObject, 'type', 'string', {
  filter: (obj, key) => {
    // 只包含可枚举属性
    const descriptor = Object.getOwnPropertyDescriptor(obj, key);
    return !descriptor || descriptor.enumerable !== false;
  },
  maxResults: 5
});
console.log('结果:', filterResults);
console.log('找到', filterResults.length, '个可枚举的字符串类型属性\n');

// 测试18: 错误处理 - 无效的类型
console.log('18. 测试无效类型搜索:');
try {
  const invalidResults = searchProps(complexObject, 'type', 'invalidType');
  console.log('结果:', invalidResults);
  console.log('找到', invalidResults.length, '个匹配项\n');
} catch (error) {
  console.log('捕获到错误:', error.message, '\n');
}

console.log('=== 按类型搜索测试完成 ===');