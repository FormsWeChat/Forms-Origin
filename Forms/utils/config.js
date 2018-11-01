var host = 'https://miniforms.azurewebsites.net';

module.exports = {

  shopUrl: `${host}/Shops`, //获取商家信息

  titleUrl: `${host}/request/vote/title.js`, //获取投票

  resultUrl: `${host}/Forms(`,//查看投票结果

  submitUrl: `${host}/request/vote/submit.js`, //提交投票

}