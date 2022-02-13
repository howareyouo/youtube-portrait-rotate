['height', 'theme', 'header'].forEach(name => {
  document.querySelector(`#${name}-check`).addEventListener('change', e => {
    var checked = e.target.checked
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {name, checked})
    })
  })
})
