//Used to create safe tags so people can't inject jquery
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Create the element tweet HTML code
const createTweetElement = function (tweet) {
  const $tweet = `
  <article class="tweet-box">
    <header class="tweet-head">
    <div class="left-tweet">
      <img class = "avatar-img" alt=" An avatar img for the user" src="${
        tweet.user.avatars
      }" />
      <h1>${tweet.user.name}</h1>
    </div>
    <div class="right-tweet">
      <h1 class="handle">${tweet.user.handle}</h1>
    </div>
  </header>
  <p class="tweet-post">${escape(tweet.content.text)}</p>
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

//pushes the tweets to the page
const renderTweets = function (tweets) {
  const $container = $("#tweets-container");
  tweets.forEach((tweet) => {
    const tweetNode = createTweetElement(tweet);
    $container.prepend(tweetNode);
  });
};

//When the page loads it renders the tweets from the data and when someone submits the form it sends it to the ajax file

$(document).ready(function () {
  const loadTweets = function () {
    $.get("/tweets")
      .then((res) => {
        renderTweets(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  $(".right-nav").on("click", function (event) {
    $(".new-tweet").slideToggle(1000);
  });

  $("#form-id").on("submit", function (event) {
    event.preventDefault();
    //Get the text from the twet form
    const formData = $("#form-id").serialize();
    //Get the text to compare values
    const $text = $("#tweet-text").val();

    // don't need !$text.length condition since required is set to "" which allows my label for the textarea to move above the textarea
    if ($text.length > 140) {
      $(".error").slideDown("slow").show().delay(1400).slideUp("slow");
    } else {
      $.post("/tweets", formData)
        .then(() => {
          $("#form-id").trigger("reset");
          $(".counter").text(140);
          $("#tweets-container").empty();
          loadTweets();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  loadTweets();
});
