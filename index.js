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

  if (!avatar.startsWith("http")) {
    res.status(400).send("URL inválida para avatar.");
    return;
  }

  users.push(user);
  res.status(201).send("Usuário cadastrado com sucesso.");
});

//Post Tweet
app.post("/tweets", (req, res) => {
  const tweet = req.body;
  const avatar = users.find((user) => user.username === tweet.username).avatar;
  const id = tweets.length + 1;

  tweets.push({ id, ...tweet, avatar });
  res.status(201).send("Tweet postado com sucesso.");
});

//Get Tweets
app.get("/tweets", (req, res) => {
  res.status(201).send(tweets.slice(-10));
});

app.listen(5000, () => {
  console.log("Listening on 5000");
});
