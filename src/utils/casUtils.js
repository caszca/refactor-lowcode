
// const Base64 = require('js-base64').Base64

/**
 *
 * @returns 是否单点登录已登录
 */
export function isLogin() {
  const isLogin = sessionStorage.getItem('isSupwisdomCasLogin')
  return isLogin
}

/** 判断票据是否存在 */
export function hasTicket() {
  const ticket = getParam('ticket')
  return ticket !== null && ticket !== ''
}

export function getParam(code) {
  const query = window.location.search.substring(1)
  const vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] === code) {
      return pair[1]
    }
  }
  return ''
}

/** 获取校验票据Url */
export function getServiceValidateUrl() {
  // 验证票据时，使用url上的原始的 targetUrl，仅简单的 url encode
  // 获取请求中的targetUrl
  const targetUrl = getParam('targetUrl')
  // String base64TargetUrl = Base64Utils.encodeBase64Str(targetUrl);
  const serviceUrlRoot = getBasePath()
  const serviceUrl = serviceUrlRoot + '?targetUrl' +
  '=' + targetUrl
  const encodeServiceUrl = encodeURIComponent(serviceUrl)
  // String encodeServiceUrl = getURLEncodeServiceUrl(request);
  const ticket = getParam('ticket')

  // System.out.println("ticket = " + ticket);

  return 'https://cas.paas.ahut.edu.cn/cas/serviceValidate?ticket=' + ticket + '&' + 'service=' +
  encodeServiceUrl
}

/** 获取Cas登录Url 登录成功后返回票据 */
export function getLoginUrl() {
  const encodeServiceUrl = getURLEncodeServiceUrl()
  return 'https://cas.paas.ahut.edu.cn/cas/login?service=' +
  encodeServiceUrl
}

export function getURLEncodeServiceUrl() {
  // 编码成系统可识别的加密串
  const targetUrl = getTargetUrl()

  const serviceUrlRoot = getBasePath()
  const serviceUrl = serviceUrlRoot + '?targetUrl=' + encodeURIComponent(targetUrl)
  return encodeURIComponent(serviceUrl)
}

export function getBasePath() {
  // 协议
  const scheme = window.location.protocol
  // 主机名
  const serverName = window.location.hostname
  // 文件/路径名
  const contextPath = window.location.pathname
  const url = scheme + '//' + serverName + contextPath
  console.log(url)
  return url
}

/** 获取TargetUrl */
export function getTargetUrl() {
  const basePath = getBasePath()
  const targetUrl = basePath + 'sso/ahut'
  //   const basePath = getBasePath()

  // 获取请求中的targetUrl
  //   let targetUrl = request.getParameter(Constants.TARGET_URL_KEY)

  //   if (!targetUrl) {
  //     // 若不存在，则使用默认页面作为targetUrl
  //     targetUrl = basePath + CasConstant.DEF_TARGET_URI
  //   } else {
  //     // 判断target是否编码
  //     if (targetUrl.startsWith(CasConstant.BASE64_PREFIX)) {
  //       targetUrl = targetUrl.substring(CasConstant.BASE64_PREFIX
  //         .length())
  //       targetUrl = Base64.decode(targetUrl)
  //     }
  //   }
  return targetUrl
}
