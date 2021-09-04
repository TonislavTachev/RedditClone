const UserClass = require("../Databases/models/User");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");

exports.loginUser = (userBody) => {
  const { username, password } = userBody;
  let userPool = JSON.parse(readThreadFile("userPool"));

  let foundUser = userPool.users.find((el) => el.username === username);
  console.log(foundUser);
  if (foundUser && bcrypt.compare(password, foundUser.password)) {
    return { token: jwt.sign({ foundUser }, "jwt_secret") };
  } else {
    return { status: 401, message: "Unsuccessfull login" };
  }
};

exports.getUser = (userId) => {
  let userPool = JSON.parse(readThreadFile("userPool"));
  let foundUser = userPool.users.find((el) => el.user_id === userId);

  return foundUser;
};

exports.createUser = async (userBody) => {
  const { username, password } = userBody;
  let userPool = JSON.parse(readThreadFile("userPool"));

  let newUserPassword = await bcrypt.hash(password, 10);
  let newUser = new UserClass(username, uuidv4(), [], [], newUserPassword);
  userPool.users.push(newUser);

  writeToFile(userPool, "userPool");

  return { token: jwt.sign({ newUser }, "jwt_secret") };
};

const readThreadFile = (jsonFileToRead) => {
  let path = require("path").resolve(
    __dirname,
    `../Databases/${jsonFileToRead}.json`
  );
  let data = fs.readFileSync(path, "utf8");
  return data;
};

const writeToFile = (stringifiedObjet, filePathToWriteTo) => {
  fs.writeFile(
    require("path").resolve(
      __dirname,
      `../Databases/${filePathToWriteTo}.json`
    ),
    JSON.stringify(stringifiedObjet),
    (err) => {
      if (err) {
        throw err;
      }

      console.log("Successfully created Thread");
    }
  );
};
