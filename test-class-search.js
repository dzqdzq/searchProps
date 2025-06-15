// 测试类类型搜索功能
import { searchProps } from './index.js';

// 定义一个测试类
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  sayHello() {
    return `Hello, my name is ${this.name}`;
  }
}

// 创建测试对象
const testObject = {
  user: new Person('张三', 25),
  admin: new Person('李四', 30),
  data: {
    manager: new Person('王五', 40),
    employees: [
      new Person('赵六', 22),
      { name: '钱七', age: 28 } // 不是Person实例
    ]
  },
  regularObject: { name: '普通对象', type: 'object' }
};

// 使用类类型搜索
console.log('\n搜索所有Person类型的实例:');
const results = searchProps(testObject, 'type', Person);
console.log(JSON.stringify(results, (key, value) => {
  // 处理函数和复杂对象的序列化
  if (typeof value === 'function') {
    return '[Function]';
  }
  return value;
}, 2));

// 验证结果数量
console.log(`\n找到 ${results.length} 个Person实例`);
// 应该找到4个Person实例