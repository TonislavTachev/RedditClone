class Thread {
  constructor(thread_id, title, text) {
    this.thread_id = thread_id;
    this.title = title;
    this.text = text;
    this.upvotes = 0;
    this.downvotes = 0;
    this.comments = [];
  }
}

module.exports = Thread;
