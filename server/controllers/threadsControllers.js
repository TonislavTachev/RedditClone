const UserClass = require("../Databases/models/User");
const ThreadClass = require("../Databases/models/Thread");
const ThreadPoolData = require("../Databases/threadPool.json");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

//@desc - returns all the available threads
//@route - /threads
//@method - GET
//@access - public
exports.getThreads = () => {
  let userPool = JSON.parse(readThreadFile("userPool"));
  let data = JSON.parse(readThreadFile("threadPool"));

  data.pool.map((thread) => {
    userPool.users.map((user) => {
      let owner = user.threads.find(
        (threadToFind) => threadToFind === thread.thread_id
      );

      if (owner) {
        thread.owner = user;
      }
    });
  });

  return data.pool;
};

//@desc - fetches a single thread
//@route - /threads/:id
//@method - GET
//@access - public
exports.getThread = (threadId) => {
  let userPool = JSON.parse(readThreadFile("userPool"));
  let data = JSON.parse(readThreadFile("threadPool"));

  let findThread = data.pool.find((el) => el.thread_id === threadId);

  if (findThread) {
    let obj = findThread;
    return obj;
  } else {
    return { status: 400, msg: "Thread not found" };
  }
};

//@desc - creates a new thread
//@route - /threads
//@method - POST
//@access - public
exports.createThread = (userId, bodyToCreate) => {
  //Add thread to thread pool
  //return newly created thread

  //get users pool and find the user by the given id
  let usersPool = JSON.parse(readThreadFile("userPool"));
  let user = usersPool.users.find((el) => el.user_id === userId);

  //create the thread
  const { title, text } = bodyToCreate;
  let newThread = new ThreadClass(uuidv4(), title, text);

  //push the newly created thread to the user's threads array
  user.threads.push(newThread.thread_id);

  //read thread pool json file
  let threads = JSON.parse(readThreadFile("threadPool"));
  threads.pool.push(newThread);

  //write the new thread to the thread pool
  writeToFile(threads, "threadPool");

  //update user in users pool and write back to json file
  writeToFile(usersPool, "userPool");

  return newThread;
};

//@desc - updates thread
//@route - /threads/:id
//@method - PUT
//@access - public
exports.updateThread = (threadId, threadDataToBeUpdated) => {
  //find thread to be updated from thread pool
  let threads = JSON.parse(readThreadFile("threadPool"));
  let threadToBeUpdated = threads.pool.find((el) => el.thread_id === threadId);

  threadToBeUpdated[Object.keys(threadDataToBeUpdated)[0]] = Object.values(
    threadDataToBeUpdated
  )[0];

  writeToFile(threads, "threadPool");

  return threadToBeUpdated;
};

//@desc - delete thread
//@route - /threads/:id
//@method - DELETE
//@access - public
exports.deleteThread = (threadId, ownerId) => {
  //get user pool and thread pool
  let usersPool = JSON.parse(readThreadFile("userPool"));
  let threads = JSON.parse(readThreadFile("threadPool"));

  let threadToDelete = threads.pool.find((el) => el.thread_id === threadId);

  let threadsOwnedByUserToDelete = usersPool.users.find(
    (el) => el.user_id === ownerId
  );

  let threadOwnedByUserToDelete = threadsOwnedByUserToDelete.threads.find(
    (el) => el === threadToDelete.thread_id
  );

  if (threadOwnedByUserToDelete) {
    threadsOwnedByUserToDelete.threads.splice(
      threadsOwnedByUserToDelete.threads.indexOf(threadOwnedByUserToDelete),
      1
    );

    threads.pool.splice(threads.pool.indexOf(threadToDelete), 1);

    //write to users pool
    writeToFile(usersPool, "userPool");

    //write to thread pool
    writeToFile(threads, "threadPool");

    return { status: 200, msg: "Thread sucessfully deleted" };
  }
};

//utils function
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
