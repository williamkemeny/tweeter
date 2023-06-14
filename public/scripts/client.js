// Fake data taken from initial-tweets.json
const testData = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

const createTweetElement = function (tweet) {
  const $tweet = `
  <article class="tweet-box">
    <header class="tweet-head">
    <div class="left-tweet">
      <img class = "avatar-img" src="${tweet.user.avatars}" />
      <h1>${tweet.user.name}</h1>
    </div>
    <div class="right-tweet">
      <h1 class="handle">${tweet.user.handle}</h1>
    </div>
  </header>
  <p class="tweet-post">${tweet.content.text}</p>
  <hr />
  <footer class="tweet-foot">
    <div class="left-tweet">
      <p class="date">${timeago.format(tweet.created_at)}</p>
    </div>
    <div class="right-tweet icons">
      <i class="far fa-flag" id="flag"></i>
      <i class="fas fa-retweet" id="retweet"></i>
      <i class="far fa-heart" id="heart"></i>
    </div>
  </footer>
</article>
  `;
  return $tweet;
};

const renderTweets = function (tweets) {
  const $container = $("#tweets-container");
  tweets.forEach((tweet) => {
    const tweetNode = createTweetElement(tweet);
    $container.prepend(tweetNode);
  });
};

$(document).ready(function () {
  renderTweets(testData);
});
