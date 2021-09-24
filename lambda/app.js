const express = require("express");
const bodyParser = require("body-parser");
const {
  createCognitoUser,
  login,
  fetchUserByUsername,
  verifyToken,
} = require("./auth");
const {
  createGame,
  fetchGame,
  performMove,
  handlePostMoveNotification,
} = require("./data");

const app = express();
app.use(bodyParser.json());

function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
}

app.post(
  "/login",
  wrapAsync(async (req, res) => {
    const idToken = await login(req.body.username, req.body.password);
    res.json({ idToken });
  })
);

app.post(
  "/users",
  wrapAsync(async (req, res) => {
    const user = await createCognitoUser(
      req.body.username,
      req.body.password,
      req.body.email,
      req.body.phoneNumber
    );
    res.json(user);
  })
);

app.post(
  "/games",
  wrapAsync(async (req, res) => {
    const token = await verifyToken(req.header("Authorization").split(' ')[1]);
    const opponent = await fetchUserByUsername(req.body.opponent);
    const game = await createGame({
      creator: token["cognito:username"],
      opponent: opponent,
    });
    res.json(game);
  })
);

app.get(
  "/games/:gameId",
  wrapAsync(async (req, res) => {
    const game = await fetchGame(req.params.gameId);
    res.json(game);
  })
);

app.post(
  "/games/:gameId",
  wrapAsync(async (req, res) => {
    const token = await verifyToken(req.header("Authorization").split(' ')[1]);
    const game = await performMove({
      gameId: req.params.gameId,
      user: token["cognito:username"],
      changedHeap: req.body.changedHeap,
      changedHeapValue: req.body.changedHeapValue,
    });
    let opponentUsername;
    if (game.user1 !== game.lastMoveBy) {
      opponentUsername = game.user1;
    } else {
      opponentUsername = game.user2;
    }
    const opponent = await fetchUserByUsername(opponentUsername);
    const mover = {
      username: token["cognito:username"],
      phoneNumber: token["phone_number"],
    };
    await handlePostMoveNotification({ game, mover, opponent });
    res.json(game);
  })
);

app.use(function (error, req, res, next) {
  res.status(400).json({ message: error.message });
});

module.exports = app;
