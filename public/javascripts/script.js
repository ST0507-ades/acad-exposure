const tweets = [
    {
        id: 1,
        name: 'James',
        handle: '@jokerjames',
        img: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
        tweet: "If you don't succeed, dust yourself off and try again.",
        likes: 10,
    },
    {
        id: 2,
        name: 'Fatima',
        handle: '@fantasticfatima',
        img: 'https://semantic-ui.com/images/avatar2/large/molly.png',
        tweet: 'Better late than never but never late is better.',
        likes: 12,
    },
    {
        id: 3,
        name: 'Xin',
        handle: '@xeroxin',
        img: 'https://semantic-ui.com/images/avatar2/large/elyse.png',
        tweet: 'Beauty in the struggle, ugliness in the success.',
        likes: 18,
    },
];

document.addEventListener('DOMContentLoaded', function () {
    const tweetsDom = document.querySelector('#tweets');
    const tweetTemplate = document.querySelector('#tweet-template').content.firstElementChild;
    tweets.forEach((tweet) => {
        const tweetDom = tweetTemplate.cloneNode(true);
        tweetDom.querySelector('.tweet-name').textContent = tweet.name;
        tweetDom.querySelector('.tweet-handle').textContent = tweet.handle;
        tweetDom.querySelector('.tweet-tweet').textContent = tweet.tweet;
        tweetDom.querySelector('.tweet-likes').textContent = tweet.likes;
        tweetDom.querySelector('.tweet-img').src = tweet.img;
        tweetsDom.appendChild(tweetDom);
    });
});
