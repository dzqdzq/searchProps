/**
 * 对象搜索工具，支持按值、键、类型和全部四种方式搜索对象
 * @param {Object|Array} target - 要搜索的目标对象或数组
 * @param {string} searchType - 搜索类型："value"、"key"、"type" 或 "all"
 * @param {*|RegExp|Object} searchValue - 搜索值，可以是普通值、正则表达式或对象
 * @param {Object} [options] - 搜索选项
 * @param {Function} [options.customFilter] - 自定义过滤函数
 * @returns {Array} - 包含匹配结果的数组
 */
function searchProps(target, searchType, searchValue, options = {}) {
  const {
    customFilter = () => true
  } = options;
  
  if(!searchType){
    searchType = 'all';
  }

  const results = [];
  const isRegExp = searchValue instanceof RegExp;
  const visited = new WeakSet(); // 防止循环引用

  // 递归搜索函数
  function traverse(obj, parentKey = null) {
    // 检查当前对象是否为搜索的类型实例
    if (searchType === 'type' && typeof searchValue === 'function' && obj instanceof searchValue) {
      const path = parentKey || 'root';
      results.push({
        path,
        key: path.split('.').pop() || path,
        value: obj,
        type: searchValue.name || 'class'
      });
    }
    
    // 处理数组
    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        traverse(item, parentKey !== null ? `${parentKey}[${index}]` : `[${index}]`);
      });
      return;
    }

    // 处理对象
    if (typeof obj === 'object' && obj !== null) {
      if (visited.has(obj)) {
        return;
      }
      visited.add(obj);

      // 使用Reflect.ownKeys获取所有属性（包括不可枚举和Symbol属性）
      const keys = Reflect.ownKeys(obj);
      
      // 遍历所有属性
      for (const key of keys) {
        // 应用自定义过滤器
        if (!customFilter(obj, key)) {
          continue;
        }
        
        const keyStr = typeof key === 'symbol' ? key.toString() : String(key);
        
        const path = parentKey !== null ? 
          (typeof key === 'symbol' ? `${parentKey}[${keyStr}]` : 
           `${parentKey}.${keyStr}`) : keyStr;
        let value;
        try {
          value = Reflect.get(obj, key);
        } catch (error) {
          // 记录异常路径
          console.error('访问异常：',path);
          continue;
        }

        // 检查键匹配
        if (searchType === 'key' || searchType === 'all') {
          if (isRegExp && searchValue.test(keyStr)) {
            results.push({
              path,
              key: keyStr,
              value,
              type: typeof value
            });
          } else if (keyStr === searchValue || (typeof key === 'symbol' && key.toString() === searchValue)) {
            results.push({
              path,
              key: keyStr,
              value,
              type: typeof value
            });
          }
        }

        // 检查值匹配
        if (searchType === 'value' || searchType === 'all') {
          if (isRegExp && typeof value === 'string' && searchValue.test(value)) {
            results.push({
              path,
              key: keyStr,
              value,
              type: typeof value
            });
          } if (value === searchValue) {
            results.push({
              path,
              key: keyStr,
              value,
              type: typeof value
            });
          }
        }

        // 检查类型匹配
        if ((searchType === 'type' || searchType === 'all') && searchType !== 'type') {
          // 只在searchType不是'type'时才在这里检查类型，避免重复添加
          const typeStr = typeof value;
          if (typeStr === searchValue) {
            results.push({
              path,
              key: keyStr,
              value,
              type: typeStr
            });
          } else if (typeStr === 'object' && value !== null) {
            if (Array.isArray(value) && searchValue === 'array') {
              results.push({
                path,
                key: keyStr,
                value,
                type: 'array'
              });
            } else if (value instanceof Date && searchValue === 'date') {
              results.push({
                path,
                key: keyStr,
                value,
                type: 'date'
              });
            } else if (value instanceof RegExp && searchValue === 'regexp') {
              results.push({
                path,
                key: keyStr,
                value,
                type: 'regexp'
              });
            }
          }
        }

        // 递归处理子对象
        if (typeof value === 'object' && value !== null) {
          traverse(value, path);
        }
      }
    }
  }

  traverse(target);
  return results;
}

/**
 * 根据路径字符串查询对象中的值
 * @param {Object|Array} target - 要查询的目标对象或数组
 * @param {string} path - 属性路径，例如 "obj.prop[0][Symbol(name)]"
 * @returns {*} - 查询到的值，如果路径无效则返回undefined
 */
function queryValueFromPath(target, path) {
  if (!target || typeof target !== 'object' || !path) {
    return undefined;
  }

  // 解析路径字符串
  const segments = [];
  let currentSegment = '';
  let inBracket = false;
  let symbolName = '';
  let inSymbol = false;

  // 解析路径字符串为路径段数组
  for (let i = 0; i < path.length; i++) {
    const char = path[i];
    
    if (char === '.' && !inBracket) {
      if (currentSegment) {
        segments.push({ type: 'property', value: currentSegment });
        currentSegment = '';
      }
    } else if (char === '[') {
      if (currentSegment) {
        segments.push({ type: 'property', value: currentSegment });
        currentSegment = '';
      }
      inBracket = true;
    } else if (char === ']' && inBracket) {
      if (inSymbol) {
        segments.push({ type: 'symbol', value: symbolName.trim() });
        symbolName = '';
        inSymbol = false;
      } else if (currentSegment) {
        // 检查是否为数字（数组索引）
        if (/^\d+$/.test(currentSegment)) {
          segments.push({ type: 'index', value: parseInt(currentSegment, 10) });
        } else {
          segments.push({ type: 'property', value: currentSegment });
        }
        currentSegment = '';
      }
      inBracket = false;
    } else if (inBracket && path.substring(i, i + 7) === 'Symbol(' && !inSymbol) {
      inSymbol = true;
      i += 6; // 跳过 'Symbol('
    } else if (inSymbol && char === ')') {
      // 不做任何处理，等待下一个 ']' 来结束符号处理
    } else if (inSymbol) {
      symbolName += char;
    } else if (inBracket || char !== ' ') { // 忽略空格，除非在括号内
      currentSegment += char;
    }
  }

  // 处理最后一个段
  if (currentSegment) {
    segments.push({ type: 'property', value: currentSegment });
  }

  // 根据路径段查找值
  let current = target;
  try {
    for (const segment of segments) {
      if (current === null || current === undefined) {
        return undefined;
      }

      if (segment.type === 'property') {
        current = current[segment.value];
      } else if (segment.type === 'index') {
        if (Array.isArray(current)) {
          current = current[segment.value];
        } else {
          return undefined; // 不是数组但尝试用索引访问
        }
      } else if (segment.type === 'symbol') {
        // 查找匹配的Symbol
        const symbols = Object.getOwnPropertySymbols(current);
        const targetSymbol = symbols.find(sym => sym.toString() === `Symbol(${segment.value})`);
        
        if (targetSymbol) {
          current = current[targetSymbol];
        } else {
          return undefined; // 找不到匹配的Symbol
        }
      }
    }
    return current;
  } catch (error) {
    console.error(`访问路径 "${path}" 时出错:`, error.message);
    return undefined;
  }
}

// 导出searchObj函数
export { searchProps, queryValueFromPath  };