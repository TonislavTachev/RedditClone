class User {
  constructor(username, user_id, threads, comments, password) {
    this.username = username;
    this.user_id = user_id;
    if (threads.length === 0) {
      this.threads = [];
    }
    if (comments.length === 0) {
      this.comments = [];
    }
    this.password = password;
  }
}

module.exports = User;
