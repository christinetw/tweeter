/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Render all the tweets we know about
const renderTweets = function (tweets) {
  const $Container = $(".tweet-container");
  $Container.empty();

  // loops through tweets
  for (let tweet of tweets) {

    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);

    // takes return value and appends it to the tweets container
    $Container.prepend($tweet);
  }
}

// Create our tweet post element
const createTweetElement = function (tweet) {
  let time = timeago.format(tweet.content.created_at);
  const $tweet = `  
        <article class="tweet-post">
          <div class="tweet-info">
            <img src="${tweet.user.avatars}"></i>
            <h1>${tweet.user.name}</h1>
            <h3>${tweet.content.text}</h3>
            <h6>${time}<h6>
          </div>
          <div class="tweet-icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="far fa-heart"></i>
          </div>
      </article>`;

  return $tweet;
}

$(document).ready(function () {

  // Take over submit form event
  $("form").submit(function (e) {
    e.preventDefault(e);

    // Validate tweet not empty
    let tweetText = $('#textInput').val();
    if (tweetText.length === 0) {
      alert("Tweet is empty!");
      return;
    }

    // Validate tweet not too long
    if (tweetText.length > 140) {
      alert("Tweets must be 140 characters or less!");
      return;
    }


    // Transform form data
    const formData = $(this).serialize();

    // Post data using Ajax
    $.ajax('/tweets', { method: 'POST', data: formData })
      .then(function (morePostsHtml) {
        loadtweets();
      });
  });

  // Get tweets from server, then render
  const loadtweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (myData) {
        renderTweets(myData);
      });
  };

  loadtweets();
});
