var CURRENT_LANG = 'bg'
var CLASS_LIST_ITEM = 'grid-list-tile'
var CLASS_ITEM_TITLE = 'fonts-module-title'
var SEPARATOR = '•'

function updateDocument () {
  document.documentElement.setAttribute('lang', CURRENT_LANG)

  var nodes = document.getElementsByClassName(CLASS_LIST_ITEM)
  for (var i = nodes.length - 1; i >= 0; i--) {
    updateNode(nodes[i])
  }
}

function updateNode (node) {
  var title = node.getElementsByClassName(CLASS_ITEM_TITLE)
  var titleElem = title && title.length && title[0]
  var langElems = node.querySelectorAll('[lang]')

  if (titleElem) {
    if (!titleElem.flgfCode) {
      titleElem.flgfCode = document.createElement('span')
      titleElem.flgfCode.classList = 'flgf-code'
      titleElem.appendChild(titleElem.flgfCode)
    }
    
    titleElem.flgfCode.innerHTML = SEPARATOR + ' ' + CURRENT_LANG.toUpperCase()
  }

  langElems.forEach(function (elem) {
    elem.setAttribute('lang', CURRENT_LANG)
  })
}

var observer = new MutationObserver(function (list, observer) {
  list.forEach(function (mutation) {
    if (mutation.addedNodes) {
      mutation.addedNodes.forEach(function (node) {
        if (node.classList && node.classList.contains(CLASS_LIST_ITEM)) {
          updateNode(node)
        }
      })
    }
  })
})

observer.observe(document.documentElement, {
  childList: true,
  subtree: true
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.language) {
    CURRENT_LANG = request.language
    updateDocument()
  }
})

chrome.storage.local.get(['language'], function (data) {
  if (data.language) {
    CURRENT_LANG = data.language
    updateDocument()
  }
})

window.addEventListener('load', function () {
  updateDocument()
})
