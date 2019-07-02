var select = document.getElementById('lang-select')
select.addEventListener('change', function (event) {
  setLanguage(event.target.value)
})

chrome.storage.local.get(['language'], function (data) {
  if (data.language) {
    select.value = data.language
  }
})

function setLanguage (lang) {
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      language: lang
    })
  })

  chrome.storage.local.set({
    language: lang
  })
}


