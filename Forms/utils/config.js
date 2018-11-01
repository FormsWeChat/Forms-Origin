var host = 'https://miniforms.azurewebsites.net';

module.exports = {

  shopUrl: `${host}/Shops`, //获取商家信息

  titleUrl: `${host}/request/vote/title.js`, //获取投票

  resultUrl: `${host}/Forms(`,//查看投票结果

  submitUrl: `${host}/request/vote/submit.js`, //提交投票
<<<<<<< HEAD
=======

  welcomeBase64: 'data:image/png;base64,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ngRIgASsCVDcrblwKQmQAAl4mgDF3dPVR+NJgARIwJoAxd2aC5eSAAmQgKcJUNw9XX00ngRIgASsCVDcrblwKQmQAAl4mgDF3dPVR+NJgARIwJoAxd2aC5eSAAmQgKcJUNw9XX00ngRIgASsCVDcrblwKQmQAAl4mgDF3dPVR+NJgARIwJoAxd2aC5eSAAmQgKcJUNw9XX00ngRIgASsCVDcrblwKQmQAAl4mgDF3dPVR+NJgARIwJoAxd2aC5eSAAmQgKcJUNw9XX00ngRIgASsCVDcrblwKQmQAAl4mgDF3dPVR+NJgARIwJoAxd2aC5eSAAmQgKcJUNw9XX00ngRIgASsCVDcrblwKQmQAAl4mgDF3dPVR+NJgARIwJoAxd2aC5eSAAmQgKcJUNw9XX00ngRIgASsCVDcrblwKQmQAAl4mgDF3dPVR+NJgARIwJoAxd2aC5eSAAmQgKcJUNw9XX00ngRIgASsCVDcrblwKQmQAAl4mgDF3dPVR+NJgARIwJoAxd2aC5eSAAmQgKcJUNw9XX00ngRIgASsCVDcrblwKQmQAAl4mgDF3dPVR+NJgARIwJoAxd2aC5eSAAmQgKcJUNw9XX00ngRIgASsCVDcrblwKQmQAAl4mgDF3dPVR+NJgARIwJoAxd2aC5eSAAmQgKcJUNw9XX00ngRIgASsCVDcrblwKQmQAAl4mgDF3dPVR+NJgARIwJoAxd2aC5eSAAmQgKcJUNw9XX00ngRIgASsCVDcrblwKQmQAAl4mgDF3dPVR+NJgARIwJoAxd2aC5eSAAmQgKcJUNw9XX00ngRIgASsCVDcrblwKQmQAAl4mgDF3dPVR+NJgARIwJoAxd2aC5eSAAmQgKcJUNw9XX00ngRIgASsCVDcrblwKQmQAAl4mgDF3dPVR+NJgARIwJoAxd2aC5eSAAmQgKcJUNw9XX00ngRIgASsCVDcrblwKQmQAAl4mgDF3dPVR+NJgARIwJoAxd2aC5eSAAmQgKcJUNw9XX00ngRIgASsCVDcrblwKQmQAAl4mgDF3dPVR+NJgARIwJoAxd2aC5eSAAmQgKcJUNw9XX00ngRIgASsCVDcrblwKQmQAAl4mgDF3dPVR+NJgARIwJoAxd2aC5eSAAmQgKcJUNw9XX00ngRIgASsCVDcrblwKQmQAAl4mgDF3dPVR+NJgARIwJoAxd2aC5eSAAmQgKcJUNw9XX00ngRIgASsCVDcrblwKQmQAAl4mgDF3dPVR+NJgARIwJoAxd2aC5eSAAmQgKcJ/P/t1DEJAAAAAsH+rS3wBYRbneQEnfv1fMoTIECgBZx7u0gJECBwLeDcr+dTngABAi3g3NtFSoAAgWsB5349n/IECBBoAefeLlICBAhcCzj36/mUJ0CAQAs493aREiBA4FrAuV/PpzwBAgRawLm3i5QAAQLXAs79ej7lCRAg0ALOvV2kBAgQuBZw7tfzKU+AAIEWcO7tIiVAgMC1gHO/nk95AgQItIBzbxcpAQIErgWc+/V8yhMgQKAFnHu7SAkQIHAt4Nyv51OeAAECLeDc20VKgACBawHnfj2f8gQIEGgB594uUgIECFwLOPfr+ZQnQIBACzj3dpESIEDgWsC5X8+nPAECBFrAubeLlAABAtcCzv16PuUJECDQAs69XaQECBC4FnDu1/MpT4AAgRZw7u0iJUCAwLWAc7+eT3kCBAi0gHNvFykBAgSuBZz79XzKEyBAoAWce7tICRAgcC3g3K/nU54AAQIt4NzbRUqAAIFrAed+PZ/yBAgQaAHn3i5SAgQIXAs49+v5lCdAgEALOPd2kRIgQOBawLlfz6c8AQIEWsC5t4uUAAEC1wLO/Xo+5QkQINACzr1dpAQIELgWcO7X8ylPgACBFnDu7SIlQIDAtYBzv55PeQIECLSAc28XKQECBK4FnPv1fMoTIECgBZx7u0gJECBwLeDcr+dTngABAi3g3NtFSoAAgWsB5349n/IECBBoAefeLlICBAhcCzj36/mUJ0CAQAs493aREiBA4FrAuV/PpzwBAgRawLm3i5QAAQLXAs79ej7lCRAg0ALOvV2kBAgQuBYYCt2HED7noZUAAAAASUVORK5CYII=',
>>>>>>> 1161909ef2f6b0a6f2ef354c9544e4bd067a6b13
}