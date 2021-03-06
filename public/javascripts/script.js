let isInitialFetched = false;
let offset = 0;
document.addEventListener('DOMContentLoaded', function () {
    const tweetsDom = document.querySelector('#tweets');
    const tweetTemplate = document.querySelector('#tweet-template').content.firstElementChild;
    const loadingSkeleton = document.querySelector('#skeleton');
    function addItem(tweet) {
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
        .then((json) => json.data.forEach(addItem))
        .finally(() => {
            isInitialFetched = true;
            loadingSkeleton.classList.remove('loading');
        });

    let isFetching = false;
    window.onscroll = function () {
        const isEndOfPage = Math.ceil(window.innerHeight + window.pageYOffset) >= document.body.scrollHeight;
        if (isInitialFetched && isEndOfPage) {
            if (isFetching) return;
            isFetching = true;
            loadingSkeleton.classList.add('loading');
            // Replace the following 3 lines
            setTimeout(() => {
                loadingSkeleton.classList.remove('loading');
            }, 2000);
        }
    };
});
