# Reddit-Music-to-Youtube-Playlist
This chrome extension creates a button on www.Reddit.com/r/Music, which says "create a youtube playlist". Simply click it, and a Youtube playlist will be created with all of the Youtube links on that page.


Demo: https://chrome.google.com/webstore/detail/eimhignhcniokleddonefnkfkabfjiob

### How does it work?

#### Running this at the right time

Chrome extensions provide "matches" in the manifest. There is no need to use custom JS for this.

```
"matches": ["http://www.reddit.com/r/music/*","https://www.reddit.com/r/Music/*","https://www.reddit.com/r/Music/*", "https://www.reddit.com/r/music/*"],
```

#### Finding links

Select elements on the page using the current selector (this changes)

```
var x = document.getElementsByClassName("title may-blank"); //Stores each post item on the page
```

#### Validating and stripping the ID

```
//Loop through each post item
for(var i = 0; i < x.length; i++){
    console.log("Currently on link: "+i);

    //Check if its a Youtube link
    if(checkIfYoutubeLink() > -1){
        //Check for a valid Youtube ID
        if (getYoutubeIdLength(i) == 11){
            //Append the Youtube ID to our output string
            appendToLink(getYoutubeId(i));
        }
    }
}
```

###### checkIfYoutubeLink()

returns boolean - does this link contain "youtube"

###### getYoutubeId()

return id - regex match to return the youtube ID

###### getYoutubeIdLength(i)

returns int - the length of getYoutubeId()

#### Launch a new tab with the playlist

###### sendToYoutube()

Creates a chrome sendMessage with the prepared link variable, to the background.js file which invokes chrome.tabs.create with the URL
