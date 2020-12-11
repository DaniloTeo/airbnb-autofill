const sendCurrUrl = () => {
    chrome.tabs.query({active:true, currentWindow:true},
         (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, tabs[0].url)
         }
     )
 }
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('button').addEventListener('click', sendCurrUrl, false)
})