const UserClass = require("../Databases/models/User");
const ThreadClass = require("../Databases/models/Thread");
const CommentClass = require("../Databases/models/Comment");
const ThreadPoolData = require("../Databases/threadPool.json");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

exports.getCommentsForThread = (threadId) => {
  let threads = JSON.parse(readThreadFile("threadPool"));
  let userPool = JSON.parse(readThreadFile("userPool"));

  let threadComments = threads.pool.find(
    (el) => el.thread_id === threadId
  ).comments;

  // userPool.users.map((el) => {
  //   el.comments.map((comment, index) => {
  //     if (comment === threadComments[index]["comment_id"]) {
  //       threadComments[index]["user"] = {
  //         username: el["username"],
  //         userId: el["user_id"],
  //       };
  //     }
  //   });
  // });

  return threadComments;
};

exports.createCommentForThread = (threadId, commentBody) => {
  let threads = JSON.parse(readThreadFile("threadPool"));
  let userPool = JSON.parse(readThreadFile("userPool"));

  let { text, ownerId } = commentBody;

  let threadComments = threads.pool.find((el) => el.thread_id === threadId);
  let userToWriteComment = userPool.users.find(
    (user) => user.user_id === ownerId
  );

  let newComment = new CommentClass(uuidv4(), text);

  userToWriteComment.comments.push(newComment.comment_id);

  threadComments.comments.push(newComment);

  writeToFile(threads, "threadPool");
  writeToFile(userPool, "userPool");

  let sendToFronted = {
    comment_id: newComment.comment_id,
    text: newComment.text,
    user: {
      username: userToWriteComment["username"],
      user_id: userToWriteComment["user_id"],
    },
  };

  return {
    status: 200,
    msg: "Successfully created comment",
    newComment: sendToFronted,
  };
};

exports.updateCommentForThread = (threadId, commentId, requestData) => {
  let userPool = JSON.parse(readThreadFile("userPool"));
  let threadPool = JSON.parse(readThreadFile("threadPool"));

  let { ownerId, title, text } = requestData;

  let user = userPool.users.find((el) => el.user_id === ownerId);
  let userOwnedComment = user.comments.find((el) => el === commentId);

  let threadOwner = threadPool.pool.find((el) => el.thread_id === threadId);
  let threadCommentOwner = threadOwner.comments.find(
    (el) => el.comment_id === commentId
  );

  if (userOwnedComment && threadCommentOwner) {
    threadCommentOwner.title = title;
    threadCommentOwner.text = text;
    writeToFile(threadPool, "threadPool");

    return threadCommentOwner;
  }
};

exports.deleteCommentForThread = (threadId, commentId, ownerIdOfComment) => {
  let userPool = JSON.parse(readThreadFile("userPool"));
  let threadPool = JSON.parse(readThreadFile("threadPool"));

  //get user and check if he's the owner of the comment to be removed
  let { ownerId } = ownerIdOfComment;
  let user = userPool.users.find((el) => el.user_id === ownerId);
  let userOwnerComment = user.comments.find((el) => el === commentId);

  //get the thread and check if this comment is in the thread itself
  let thread = threadPool.pool.find((el) => el.thread_id === threadId);
  let threadOwnerComment = thread.comments.find(
    (el) => el.comment_id === commentId
  );

  if (userOwnerComment && threadOwnerComment) {
    //remove comment from comments array in the thread
    thread.comments.splice(thread.comments.indexOf(threadOwnerComment), 1);

    user.comments.splice(user.comments.indexOf(commentId), 1);

    writeToFile(threadPool, "threadPool");
    writeToFile(userPool, "userPool");

    return { status: 200, msg: "Successfully deleted comment" };
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
