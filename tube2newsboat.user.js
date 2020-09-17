// ==UserScript==
// @name         tube2newsboat
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       znedw
// @match        https://www.youtube.com/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
  'use strict'

  var cssObj = { position: 'absolute', top: '7%', left: '4%', 'z-index': 1000, 'background-color': '#f44336', 'border-radius': '12px' }
  var button = document.createElement('button'); var btnStyle = button.style
  document.body.appendChild(button)
  button.innerHTML = 'Add to NewsBoat'
  button.onclick = add
  btnStyle.position = 'absolute'
  Object.keys(cssObj).map(key => { btnStyle[key] = cssObj[key] })

  function add () {
    var channelPos = document.body.textContent.search(/channelId/i)
    // If channel ids stop being 24 chars then this will break...
    var channelId = document.body.textContent.substring(channelPos + 14, channelPos + 38)
    var apiURL = 'http://localhost:3000/sub/add'

    console.log(`[tube2newsboat] - [Info] - Sending ${'{"channelId": "' + channelId + '"}'}`)

    // eslint-disable-next-line
    GM_xmlhttpRequest({
      method: 'PUT',
      url: apiURL,
      data: '{"channelId": "' + channelId + '"}',
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
      onload: handleRes,
      onabort: logError,
      onerror: logError,
      ontimeout: logError
    })
  }

  function handleRes (res) {
    if (res.status !== 200 && res.status !== 304) {
      logError(res)
      return
    }

    alert(JSON.stringify(res.response))
  }

  function logError (res) {
    console.error(`[tube2newsboat] - [Error] - [${res.status}]: ${res.statusText}`)
  }
})()
