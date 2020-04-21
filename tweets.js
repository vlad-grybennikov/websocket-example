const RestError = require("./restError");
const {users} = require("./users");

const addTweet = async function(req, res, next) {
    try {
        const {content, userId, image} = req.body;
        if (!(content && content.length > 2 && userId && users.some((u) => u.id === userId) && image && image.startsWith("http"))) {
            throw new RestError("content должен иметь длину больше 2, image должен быть ссылкой, а userId существовать", 400);
        }
        const tweet = {
            id: this.tweets.length + 1,
            content,
            userId,
            image
        };
        this.tweets.push(tweet);
        res.data = tweet;
        res.statusCode = 201;
        next();
    } catch (err) {
        next(err);
    }
};

const getAllTweets = async function(req, res, next) {
    try {
        res.data = this.tweets;
        next();
    } catch (err) {
        next(err);
    }
};

const Tweets = {
    tweets: [{
        id: 1,
        userId: 1,
        content: "Who grabbed my lightsaber? >_<",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQtRb9lhMbBum7PQYaxpBfo32FaxaGA64QmE7N-ByDr-sCAeCx&usqp=CAU"
    }, {
        id: 2,
        userId: 2,
        content: "Страх к темной стороне силы ведет",
        image: "https://i.pinimg.com/originals/49/8c/45/498c455c8183b9c21a41b390a362a468.jpg"
    }, {
        id: 3,
        userId: 3,
        content: "Ты был мне как брат! Я любил тебя!",
        image: "https://www.meme-arsenal.com/memes/8aa9a21da031c74e3ed9f2e83b51bf29.jpg"
    }]
};

Tweets.addTweet = addTweet.bind(Tweets);
Tweets.getAllTweets = getAllTweets.bind(Tweets);

module.exports = Tweets;