# SearchProps 测试文件说明

本目录包含了 `searchProps` 功能的完整测试套件，涵盖了按值搜索、按类型搜索、按键搜索等各种场景。

## 文件结构

```
tests/
├── README.md                 # 本说明文件
├── complex-object.js          # 复杂测试对象定义
├── data.js                    # 数据导出文件
├── test-value-search.js       # 按值搜索测试
├── test-type-search.js        # 按类型搜索测试
├── test-key-search.js         # 按键搜索测试
└── run-all-tests.js           # 运行所有测试的主文件
```

## 测试对象特性

`complex-object.js` 中定义的测试对象包含了以下复杂特性：

### 基本数据类型
- 字符串、数字、布尔值、null、undefined
- 正则表达式测试用的字符串（邮箱、电话号码等）

### 复杂数据结构
- **嵌套对象**：多层级对象嵌套
- **数组**：简单数组和嵌套数组
- **Map对象**：包含各种类型的键值对
- **Set对象**：包含不同类型的值
- **Date对象**：日期实例

### 特殊属性
- **Symbol属性**：包括普通Symbol和全局Symbol
- **隐藏属性**：不可枚举属性 (`enumerable: false`)
- **只读属性**：不可写属性 (`writable: false`)
- **不可配置属性**：不可配置属性 (`configurable: false`)
- **Getter/Setter属性**：计算属性

### 自定义类
- **CustomClass**：基础自定义类
- **AnotherClass**：继承自CustomClass的子类
- 包含私有属性、方法、getter/setter

### 循环引用
- 对象自引用
- 嵌套对象的反向引用

## 运行测试

### 运行所有测试
```bash
node tests/run-all-tests.js
```

### 运行单个测试
```bash
# 按值搜索测试
node tests/test-value-search.js

# 按类型搜索测试
node tests/test-type-search.js

# 按键搜索测试
node tests/test-key-search.js
```

## 测试覆盖范围

### 按值搜索测试 (`test-value-search.js`)
- ✅ 基本数据类型值搜索
- ✅ 正则表达式搜索
  - 邮箱格式匹配
  - 数字模式匹配
  - 电话号码格式匹配
  - 包含特定单词
  - 以特定字符开头
- ✅ 嵌套对象中的值搜索
- ✅ Map对象中的值搜索
- ✅ 数组中的值搜索
- ✅ 隐藏属性值搜索
- ✅ 搜索选项测试（最大结果数、深度限制）

### 按类型搜索测试 (`test-type-search.js`)
- ✅ 基本类型搜索（string、number、boolean、function、undefined、symbol）
- ✅ 内置对象类型搜索（Date、Map、Set、Array、RegExp、Object）
- ✅ 自定义类类型搜索（CustomClass、AnotherClass）
- ✅ 嵌套结构中的类型搜索
- ✅ Map对象中的类型搜索
- ✅ 自定义过滤器使用
- ✅ 错误处理测试

### 按键搜索测试 (`test-key-search.js`)
- ✅ 字符串键搜索
- ✅ Symbol键搜索（普通Symbol和全局Symbol）
- ✅ 隐藏属性键搜索
- ✅ 正则表达式键搜索
  - 包含特定字符的键
  - 以特定字符开头的键
  - 包含数字的键
  - 私有属性键（以下划线开头）
- ✅ Map对象中的键搜索（字符串、Symbol、数字、布尔值键）
- ✅ 数组索引键搜索
- ✅ Getter/Setter属性键搜索
- ✅ 自定义过滤器使用
- ✅ 深度限制测试

### 综合测试
- ✅ "all"模式搜索测试
- ✅ 性能测试
- ✅ 循环引用处理
- ✅ 错误处理

## 正则表达式测试用例

测试中包含了丰富的正则表达式使用场景：

### 值搜索中的正则表达式
- `/\w+@\w+\.\w+/` - 邮箱格式
- `/\d+/` - 数字模式
- `/\d{3}-\d{3}-\d{4}/` - 电话号码格式
- `/test/i` - 不区分大小写的单词匹配
- `/^deep/` - 以特定字符开头

### 键搜索中的正则表达式
- `/Prop/` - 包含特定字符
- `/^nested/i` - 以特定字符开头（不区分大小写）
- `/\d/` - 包含数字
- `/^level/` - 以"level"开头
- `/Key/` - Map中的键匹配
- `/^\[\d+\]$/` - 数组索引格式
- `/^_/` - 私有属性（以下划线开头）

## 注意事项

1. **循环引用处理**：测试对象包含循环引用，验证了搜索函数的循环引用检测机制
2. **性能考虑**：包含性能测试，监控搜索效率
3. **错误处理**：测试了各种边界情况和错误输入
4. **内存安全**：使用WeakSet防止内存泄漏
5. **类型安全**：测试了各种JavaScript数据类型的处理

## 扩展测试

如需添加新的测试用例，可以：

1. 在 `complex-object.js` 中添加新的测试数据
2. 在相应的测试文件中添加新的测试场景
3. 在 `run-all-tests.js` 中添加新的综合测试

测试框架设计灵活，易于扩展和维护。