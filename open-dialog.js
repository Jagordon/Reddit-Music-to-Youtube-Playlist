/**
 Roni Davelman
 r/Music to Youtube Playlist

 Description:
 This chrome extension scrapes the Reddit page and creates a Youtube playlist with all Youtube links that where found.

 Todo:
 - Multi page support
 - Soundcloud support

 **/

var x = document.getElementsByClassName('usertext-body may-blank') //Stores each post item on the page

var link = ''

//Loop through each post item
for (var i = 0; i < x.length; i++) {
  console.log('Currently on link: ' + i)

  if (checkIfYoutubeLink() > -1) {
    if (getYoutubeIdLength(i) == 11) {
      appendToLink(getYoutubeId(i))
    }
    x.slice(checkIfYoutubeLink())
  }
}

//Create the div, a tag, append them together, and then listen for a click on the a tag
listenForAClick(setupElements())

//Functions
function sendToYoutube () {
  //Pass in the output url parameters
  chrome.runtime.sendMessage({type: '' + link + ''})
}

function checkIfYoutubeLink () {
  return x[i].toString().indexOf('youtube')
}

function getYoutubeIdLength (index) {
  return getYoutubeId(index).length
}

function getYoutubeId (index) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
  var match = x[index].toString().match(regExp)
  return match && match[7]
}

function appendToLink (id) {
  link = link + id + ','
}

function setupElements () {
  //Holder Div
  var holderDiv = document.createElement('DIV')
  holderDiv.className = 'morelink'
  holderDiv.style.marginTop = '1em'

  //A tag
  var aTag = document.createElement('a')
  aTag.innerHTML = 'Create a Youtube playlist'
  aTag.style.cursor = 'pointer'
  holderDiv.appendChild(aTag)

  //Append to the "start a discussion" button
  var PostButton = document.getElementsByClassName('sidebox submit submit-text')
  PostButton[0].appendChild(holderDiv)

  return aTag
}

function listenForAClick (aTag) {
  aTag.addEventListener('click', sendToYoutube)
}
