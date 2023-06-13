
const serviceName = 'react-app'
const serverUrl = `${process.env.REACT_APP_API_URL}/api/apm`

/* eslint-disable no-undef */
/* eslint-disable import/first */
import './elastic-apm-rum.umd.min.js'

;(function(d, s, c) {
  var j = d.createElement(s),
    t = d.getElementsByTagName(s)[0]

  j.src = './elastic-apm-rum.umd.min.js'
  j.onload = function() {elasticApm.init(c)}
  t.parentNode.insertBefore(j, t)
})(document, 'script', {serviceName, serverUrl})
