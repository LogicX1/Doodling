const express = require("express");
const dbConnection = require("../database/db_connection");

const router = express.Router();
const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals
} = require("unique-names-generator");

/*const shortName = uniqueNamesGenerator({
  dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
  length: 2
});*/

function generateGuest() {
  // return uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
  return uniqueNamesGenerator({
    dictionaries: [adjectives, animals], // colors can be omitted here as not used
    length: 2
  });
}

router.get("/", (req, res) => {
  res.render("home", { err: "", layout: "login" });
});
router.get("/getWord", (req, res) => {
  console.log("aaaaaaaaaaaaa");
  dbConnection.query(
    `SELECT doodle FROM round  
    ORDER BY RANDOM() LIMIT 1`,
    (err, result) => {
      res.json(result.rows);
    }
  );
});

router.post("/auth", (req, res) => {
  dbConnection.query(
    "SELECT * FROM usernames WHERE $1 = name and $2 = password",
    [req.body.inputUserName, req.body.inputPassword],
    (err, result) => {
      if (result.rows.length) {
        req.session.user = req.body.inputUserName;
        res.redirect("game");
      } else {
        res.render("home", {
          err: "Invalid login,please try again.",
          layout: "login"
        });
      }
    }
  );
});

router.get("/game", (req, res) => {
  let newUser = {
    user: ""
  };
  if (req.session.user) {
    newUser.user = req.session.user;
    res.render("game", newUser);
  } else {
    // let newGuest = generateGuest();
    // console.log('New guest is',newGuest);
    // newUser.user=newGuest;
    res.render("home", {
      err: "You have to log in first to play!",
      layout: "login"
    });
  }
  
});

module.exports = router;
