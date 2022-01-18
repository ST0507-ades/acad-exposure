document.addEventListener('DOMContentLoaded', function () {
    const tweetsDom = document.querySelector('#tweets');
    const tweetTemplate = document.querySelector('#tweet-template').content.firstElementChild;
    function addTweet(tweet) {
        const tweetDom = tweetTemplate.cloneNode(true);
        tweetDom.querySelector('.tweet-name').textContent = tweet.name;
        tweetDom.querySelector('.tweet-handle').textContent = `@${tweet.handle}`;
        tweetDom.querySelector('.tweet-tweet').textContent = tweet.tweet;
        tweetDom.querySelector('.tweet-likes').textContent = tweet.likes;
        tweetDom.querySelector('.tweet-img').src = tweet.img;
        tweetsDom.appendChild(tweetDom);
    }
    fetch('/data')
        .then((response) => response.json())
        .then((json) => json.data.forEach(addTweet));
});
