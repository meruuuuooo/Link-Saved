const inputEl = document.getElementById("input-el");
const saveInputBtnEl = document.querySelector(".save-input-btn");
const saveTabBtnEl = document.querySelector(".save-tab-btn");
const clearBtnEl = document.querySelector(".clear-btn-el")
const ulEl = document.getElementById("ul-el");
const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinkList"))
let myLinkList = []

if (linksFromLocalStorage) {
  myLinkList = linksFromLocalStorage
  render(myLinkList)
}

saveInputBtnEl.addEventListener("click", function () {
  if (inputEl.value !== "") {
    myLinkList.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLinkList", JSON.stringify(myLinkList))
    render(myLinkList)
  }
})

saveTabBtnEl.addEventListener('click', function () {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    myLinkList.push(tabs[0].url)
    localStorage.setItem("myLinkList", JSON.stringify(myLinkList))
    render(myLinkList)
  })
})

clearBtnEl.addEventListener('click', function() {
  localStorage.clear()
  myLinkList = []
  render(myLinkList)
})


function render(links) {
  let listItem = ""
  for (let index = 0; index < links.length; index++) {
    listItem += `
      <li>
        <a href="${links[index]}" target="_blank">${links[index]}</a>
      </li>
    `
  }
  ulEl.innerHTML = listItem
}
