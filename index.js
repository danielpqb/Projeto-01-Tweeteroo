import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const users = [];
const tweets = [];

app.use(cors());
app.use(express.json());

//Register User
app.post("/sign-up", (req, res) => {
  const user = req.body;
  const { username, avatar } = user;

  if (!username || !avatar) {
    res.status(400).send("Atributos inválidos.");
    return;
  }

  users.push(user);
  res.status(201).send("Usuário cadastrado com sucesso.");
});

//Post Tweet
app.post("/tweets", (req, res) => {
  const tweet = req.body;
  tweets.push(tweet);
  res.send("Tweet postado com sucesso.");
});

//Get Tweets
app.get("/tweets", (req, res) => {
  const newTweets = tweets.slice(-10).map((tweet) => {
    const avatar = users.find(
      (user) => user.username === tweet.username
    ).avatar;
    return { ...tweet, avatar };
  });
  res.send(newTweets);
});

app.listen(5000, () => {
  console.log("Listening on 5000");
});
