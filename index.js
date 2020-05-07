// loader-utils工具包
var utils = require('loader-utils');

module.exports = function (source) {
    // source是compile传递给Loader的文件原内容
    // 缓存数据
    if (this.cacheable) this.cacheable();
    // 获取配置参数
    const options = utils.getOptions(this);
    const opts = options || {};
    // 设计稿尺寸（默认750）
    const width = opts.width || 750,
        // 设计稿单位（默认rpx）
        unit = opts.unit || 'rpx';
    if (width < 375 || width > 2160 || isNaN(width)) {
        console.error('Please check the width parameter. It should be a number between 375 and 2160')
        return
    }
    const scale = 100 / width;
    // 正则表达式 /\b\d+(\.\d+)?rpx\b/g
    // ？表示(\.\d+)出现0次或者1次，即小数点出现0次数或者1次
    const matchPXExp = new RegExp("\\b\\d+(\\.\\d+)?" + unit + "\\b", 'g');

    // 返回处理后的内容
    return source.replace(matchPXExp, function (match) {
        // 获取rpx前面的数值
        var pxValue = parseFloat(match.slice(0, match.length - 3));
        return (pxValue * scale).toFixed(2) + 'vw';
    });

};