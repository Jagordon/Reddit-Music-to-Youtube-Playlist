// Handle requests for passwords
chrome.runtime.onMessage.addListener(function(request) {
    //request.type === 'request_password'
         chrome.tabs.create({'url': "https://www.youtube.com/watch_videos?video_ids="+request.type});

});
