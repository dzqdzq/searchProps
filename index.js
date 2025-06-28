/**
 * 对象搜索工具，支持按值、键、类型和全部四种方式搜索对象
 * @param {Object|Array} target - 要搜索的目标对象或数组
 * @param {string} searchType - 搜索类型："value"、"key"、"type" 或 "all"
 * @param {*|RegExp|Function} searchValue - 搜索值，可以是普通值、正则表达式或构造函数
 * @param {Object} [options] - 搜索选项
 * @param {Function} [options.filter] - 自定义过滤函数
 * @param {number} [options.maxDepth=0] - 最大搜索深度，<=0表示不限制深度
 * @param {number} [options.maxResults=10000] - 最大结果数量限制
 * @returns {Array} - 包含匹配结果的数组
 */
function searchProps(target, searchType, searchValue, options = {}) {
  // 输入验证
  if (target === null || target === undefined) {
    return [];
  }
  
  const {
    filter: customFilter = () => true,
    maxDepth = 0,
    maxResults = 10000
  } = options;
  
  if (!searchType) {
    searchType = 'all';
  }
  
  // 验证搜索类型
  const validTypes = ['value', 'key', 'type', 'all'];
  if (!validTypes.includes(searchType)) {
    throw new Error(`Invalid searchType: ${searchType}. Must be one of: ${validTypes.join(', ')}`);
  }

  const results = [];
  const isRegExp = searchValue instanceof RegExp;
  const visited = new WeakSet(); // 防止循环引用
  
  // 提取公共匹配逻辑
  const matchValue = (value) => {
    if (isRegExp && typeof value === 'string') {
      return searchValue.test(value);
    }
    return value === searchValue;
  };
  
  const matchType = (value) => {
    if (typeof searchValue === 'string') {
      return typeof value === searchValue;
    }
    if (typeof searchValue === 'function') {
      try {
        return value instanceof searchValue;
      } catch (e) {
        return false;
      }
    }
    return false;
  };
  
  const matchKey = (key) => {
    if (typeof key === 'symbol') {
      // 如果searchValue是字符串，比较Symbol的描述
      if (typeof searchValue === 'string') {
        const symbolDescription = key.description || '';
        return symbolDescription === searchValue || key.toString() === searchValue;
      }
      // 如果searchValue是正则表达式，测试Symbol的描述和toString
      if (isRegExp) {
        const symbolDescription = key.description || '';
        const symbolString = key.toString();
        return searchValue.test(symbolDescription) || searchValue.test(symbolString);
      }
      // 直接比较Symbol对象
      return key === searchValue;
    }
    if (isRegExp && typeof key === 'string') {
      return searchValue.test(key);
    }
    return key === searchValue;
  };
  
  const addResult = (paths, value) => {
    if (results.length >= maxResults) {
      return false; // 达到最大结果数量
    }
    results.push({
      paths: [...paths],
      value,
      type: typeof value
    });
    return true;
  };
  
  const formatPath = (parentPaths, key, isMapKey = false) => {
    const newPaths = [...parentPaths];
    if (isMapKey) {
      if (typeof key === 'symbol') {
        newPaths.push(`get(Symbol(${key.description || ''}))`);
      } else {
        newPaths.push(`get("${key}")`);
      }
    } else if (typeof key === 'symbol') {
      newPaths.push(key);
    } else {
      newPaths.push(String(key));
    }
    return newPaths;
  };

  // 递归搜索函数
  function traverse(obj, parentPaths = [], currentDepth = 1) {
    // 检查深度限制和结果数量限制
    if ((maxDepth > 0 && currentDepth > maxDepth) || results.length >= maxResults) {
      return;
    }
    
    // 检查类型匹配
    if ((searchType === 'type' || searchType === 'all') && matchType(obj)) {
      if (!addResult(parentPaths, obj)) return;
    }
    
    // 处理Map类型
    if (obj instanceof Map) {
      if (visited.has(obj)) {
        return;
      }
      visited.add(obj);
      
      // 遍历Map的所有键值对
      for (const [mapKey, mapValue] of obj.entries()) {
        if (results.length >= maxResults) break;
        
        // 应用自定义过滤器
        if (!customFilter(obj, mapKey)) {
          continue;
        }
        
        const newPaths = formatPath(parentPaths, mapKey, true);
        
        // 检查键匹配
        if ((searchType === 'key' || searchType === 'all') && matchKey(mapKey)) {
          if (!addResult(newPaths, mapValue)) return;
        }
        
        // 检查值匹配
        if ((searchType === 'value' || searchType === 'all') && matchValue(mapValue)) {
          if (!addResult(newPaths, mapValue)) return;
        }
        
        // 检查类型匹配（只对非对象类型检查）
        if ((searchType === 'type' || searchType === 'all') && 
            (typeof mapValue !== 'object' || mapValue === null) && 
            matchType(mapValue)) {
          if (!addResult(newPaths, mapValue)) return;
        }
        
        // 递归处理Map的值
        if (typeof mapValue === 'object' && mapValue !== null) {
          traverse(mapValue, newPaths, currentDepth + 1);
        }
      }
      return;
    }
    
    // 处理数组
    if (Array.isArray(obj)) {
      for (let index = 0; index < obj.length; index++) {
        if (results.length >= maxResults) break;
        
        const item = obj[index];
        const newPaths = [...parentPaths, `[${index}]`];
        
        // 检查值匹配
        if ((searchType === 'value' || searchType === 'all') && matchValue(item)) {
          if (!addResult(newPaths, item)) return;
        }
        
        // 检查类型匹配（只对非对象类型检查）
        if ((searchType === 'type' || searchType === 'all') && 
            (typeof item !== 'object' || item === null) && 
            matchType(item)) {
          if (!addResult(newPaths, item)) return;
        }
        
        // 递归处理子对象
        if (typeof item === 'object' && item !== null) {
          traverse(item, newPaths, currentDepth + 1);
        }
      }
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
        if (results.length >= maxResults) break;
        
        // 应用自定义过滤器
        if (!customFilter(obj, key)) {
          continue;
        }
        
        const newPaths = formatPath(parentPaths, key, false);
        let value;
        try {
          value = Reflect.get(obj, key);
        } catch (error) {
          // 记录异常路径，修复变量名错误
          console.error('访问异常：', newPaths, error);
          continue;
        }

        // 检查键匹配
        if ((searchType === 'key' || searchType === 'all') && matchKey(key)) {
          if (!addResult(newPaths, value)) return;
        }

        // 检查值匹配
        if ((searchType === 'value' || searchType === 'all') && matchValue(value)) {
          if (!addResult(newPaths, value)) return;
        }

        // 检查类型匹配（只对非对象类型检查）
        if ((searchType === 'type' || searchType === 'all') && 
            (typeof value !== 'object' || value === null) && 
            matchType(value)) {
          if (!addResult(newPaths, value)) return;
        }

        // 递归处理子对象
        if (typeof value === 'object' && value !== null) {
          traverse(value, newPaths, currentDepth + 1);
        }
      }
    }
  }

  traverse(target);
  return results;
}

// 导出searchObj函数
export { searchProps };