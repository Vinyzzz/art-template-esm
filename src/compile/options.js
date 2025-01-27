import runtime from "./runtime.js";
import include from "./adapter/include.js";
import onerror from "./adapter/onerror.js";
import loader from "./adapter/loader.js";
import artRule from "./adapter/rule.art.js";
import nativeRule from "./adapter/rule.native.js";
import resolveFilename from "./adapter/resolve-filename.js";

/** @type {Options} 模板编译器默认配置 */
const defaultOptions = {

  // 模板名
  filename: null,

  // 模板语法规则列表
  rules: [nativeRule, artRule],

  // 是否开启对模板输出语句自动编码功能。为 false 则关闭编码输出功能
  // escape 可以防范 XSS 攻击
  escape: true,

  // 启动模板引擎调试模式。如果为 true: {cache:false, minimize:false, compileDebug:true}
  debug: false,

  // bail 如果为 true，编译错误与运行时错误都会抛出异常
  bail: true,

  // 是否开启缓存
  cache: true,

  // 是否开启压缩。它会运行 htmlMinifier，将页面 HTML、CSS、CSS 进行压缩输出
  // 如果模板包含没有闭合的 HTML 标签，请不要打开 minimize，否则可能被 htmlMinifier 修复或过滤
  minimize: true,

  // 是否编译调试版
  compileDebug: false,

  // 模板路径转换器
  resolveFilename: resolveFilename,

  // 子模板编译适配器
  include: include,

  // HTML 压缩器配置。参见 https://github.com/kangax/html-minifier
  htmlMinifierOptions: {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    // 运行时自动合并：rules.map(rule => rule.test)
    ignoreCustomFragments: []
  },

  // 错误事件。仅在 bail 为 false 时生效
  onerror: onerror,

  // 模板文件加载器
  loader: loader,

  // 模板根目录。如果 filename 字段不是本地路径，则在 root 查找模板
  root: '/',

  // 默认后缀名。如果没有后缀名，则会自动添加 extname
  extname: '.art',

  // 忽略的变量。被模板编译器忽略的模板变量列表
  ignore: [],

  // 导入的模板变量
  imports: runtime
};

/**
 * 继承默认配置
 * @param options
 */
function mergeDefault(options) {
  if (options === defaultOptions) {
    return options;
  } else {
    for (let k in defaultOptions) {
      if (options[k] === undefined) {
        options[k] = defaultOptions[k];
      }
    }
  }
}

export {
  defaultOptions as default,
  mergeDefault,
}
