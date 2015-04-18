//This function Help to download Music With Right click
//Hashimtopaz@gmail.com
chrome.runtime.onMessage.addListener(function(b, a) {
    document.body.innerHTML = b.html;
    document.getElementsByTagName("a")[0].click();

});