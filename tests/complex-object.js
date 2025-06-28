// 复杂测试对象，包含各种特殊属性和数据类型

// 自定义类
class CustomClass {
  constructor(name, value) {
    this.name = name;
    this.value = value;
    this._private = 'private data';
  }
  
  method() {
    return 'custom method';
  }
  
  get getter() {
    return 'getter value';
  }
  
  set setter(val) {
    this._setterValue = val;
  }
}

// 另一个自定义类
class AnotherClass extends CustomClass {
  constructor(name, value, extra) {
    super(name, value);
    this.extra = extra;
  }
}

// Symbol 属性
const symbolKey1 = Symbol('symbolKey1');
const symbolKey2 = Symbol('symbolKey2');
const symbolKey3 = Symbol.for('globalSymbol');

// 创建复杂对象
const complexObject = {
  // 基本类型
  stringProp: 'hello world',
  numberProp: 42,
  booleanProp: true,
  nullProp: null,
  undefinedProp: undefined,
  
  // 正则表达式相关
  regexTestString: 'test123',
  emailString: 'user@example.com',
  phoneString: '123-456-7890',
  
  // 数组
  simpleArray: [1, 2, 3, 'array item', true],
  nestedArray: [
    [1, 2, [3, 4]],
    { nested: 'in array' },
    new Date('2023-01-01')
  ],
  
  // 对象嵌套
  nestedObject: {
    level1: {
      level2: {
        level3: {
          deepValue: 'deep nested value',
          deepNumber: 999
        }
      }
    },
    anotherBranch: {
      data: 'branch data'
    }
  },
  
  // Map 对象
  mapObject: new Map([
    ['mapKey1', 'mapValue1'],
    ['mapKey2', { nested: 'in map' }],
    [symbolKey1, 'symbol key in map'],
    [42, 'number key in map'],
    [true, 'boolean key in map']
  ]),
  
  // Set 对象
  setObject: new Set(['set item 1', 'set item 2', 42, true, { inSet: true }]),
  
  // Date 对象
  dateObject: new Date('2023-12-25'),
  
  // 自定义类实例
  customInstance: new CustomClass('instance1', 100),
  anotherInstance: new AnotherClass('instance2', 200, 'extra data'),
  
  // 函数
  functionProp: function namedFunction() { return 'function result'; },
  arrowFunction: () => 'arrow function result',
  
  // Symbol 属性
  [symbolKey1]: 'symbol value 1',
  [symbolKey2]: 'symbol value 2',
  [symbolKey3]: 'global symbol value'
};

// 添加不可枚举属性
Object.defineProperty(complexObject, 'hiddenProp', {
  value: 'hidden value',
  enumerable: false,
  writable: true,
  configurable: true
});

// 添加只读属性
Object.defineProperty(complexObject, 'readOnlyProp', {
  value: 'read only value',
  enumerable: true,
  writable: false,
  configurable: true
});

// 添加不可配置属性
Object.defineProperty(complexObject, 'nonConfigurableProp', {
  value: 'non configurable value',
  enumerable: true,
  writable: true,
  configurable: false
});

// 添加getter/setter属性
Object.defineProperty(complexObject, 'computedProp', {
  get() {
    return 'computed value';
  },
  set(value) {
    this._computedValue = value;
  },
  enumerable: true,
  configurable: true
});

// 创建循环引用
complexObject.circularRef = complexObject;
complexObject.nestedObject.backRef = complexObject;

// 添加更多复杂嵌套
complexObject.deepNesting = {
  maps: new Map([
    ['nestedMap', new Map([['deep', 'very deep']])],
    ['arrayInMap', [1, 2, { inArray: true }]]
  ]),
  arrays: [
    new Map([['inArray', 'map in array']]),
    new Set(['set in array']),
    new CustomClass('in array', 'class in array')
  ],
  classes: {
    instance1: new CustomClass('nested class 1', 'nested value 1'),
    instance2: new AnotherClass('nested class 2', 'nested value 2', 'nested extra')
  }
};

// 添加原型链上的属性
const prototypeObj = {
  prototypeMethod() {
    return 'from prototype';
  },
  prototypeProp: 'prototype property'
};

Object.setPrototypeOf(complexObject.customInstance, prototypeObj);

export { complexObject, CustomClass, AnotherClass, symbolKey1, symbolKey2, symbolKey3 };