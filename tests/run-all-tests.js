// 运行所有测试的主文件
import { searchProps } from '../index.js';
import { complexObject } from './complex-object.js';

console.log('🚀 开始运行所有搜索测试...\n');
console.log('=' .repeat(60));

// 显示复杂对象的基本信息
console.log('📊 复杂测试对象信息:');
console.log('- 顶层属性数量:', Object.keys(complexObject).length);
console.log('- 包含Symbol属性数量:', Object.getOwnPropertySymbols(complexObject).length);
console.log('- 总属性数量（包括不可枚举）:', Reflect.ownKeys(complexObject).length);
console.log('- 包含Map对象:', complexObject.mapObject instanceof Map);
console.log('- 包含Set对象:', complexObject.setObject instanceof Set);
console.log('- 包含自定义类实例:', complexObject.customInstance.constructor.name);
console.log('- 包含循环引用:', complexObject.circularRef === complexObject);
console.log('\n' + '=' .repeat(60) + '\n');

// 运行按值搜索测试
console.log('🔍 运行按值搜索测试...');
try {
  await import('./test-value-search.js');
  console.log('✅ 按值搜索测试完成\n');
} catch (error) {
  console.error('❌ 按值搜索测试失败:', error.message, '\n');
}

console.log('=' .repeat(60) + '\n');

// 运行按类型搜索测试
console.log('🏷️  运行按类型搜索测试...');
try {
  await import('./test-type-search.js');
  console.log('✅ 按类型搜索测试完成\n');
} catch (error) {
  console.error('❌ 按类型搜索测试失败:', error.message, '\n');
}

console.log('=' .repeat(60) + '\n');

// 运行按键搜索测试
console.log('🔑 运行按键搜索测试...');
try {
  await import('./test-key-search.js');
  console.log('✅ 按键搜索测试完成\n');
} catch (error) {
  console.error('❌ 按键搜索测试失败:', error.message, '\n');
}

console.log('=' .repeat(60) + '\n');

// 综合测试 - 使用"all"模式
console.log('🌟 运行综合搜索测试（all模式）...');

console.log('\n1. 搜索所有包含"test"的内容（值、键、类型）:');
const allTestResults = searchProps(complexObject, 'all', /test/i, { maxResults: 10 });
console.log('结果数量:', allTestResults.length);
console.log('前5个结果:', allTestResults.slice(0, 5));

console.log('\n2. 搜索所有字符串类型:');
const allStringResults = searchProps(complexObject, 'all', 'string', { maxResults: 8 });
console.log('结果数量:', allStringResults.length);
console.log('前3个结果:', allStringResults.slice(0, 3));

console.log('\n3. 搜索所有值为42的内容:');
const all42Results = searchProps(complexObject, 'all', 42);
console.log('结果数量:', all42Results.length);
console.log('结果:', all42Results);

console.log('\n✅ 综合搜索测试完成\n');

console.log('=' .repeat(60));
console.log('🎉 所有测试运行完成！');
console.log('=' .repeat(60));

// 性能测试
console.log('\n⚡ 性能测试:');
const startTime = performance.now();
const performanceResults = searchProps(complexObject, 'all', /value/i, { maxResults: 100 });
const endTime = performance.now();
console.log(`搜索耗时: ${(endTime - startTime).toFixed(2)}ms`);
console.log(`找到结果: ${performanceResults.length}个`);
console.log('性能测试完成\n');