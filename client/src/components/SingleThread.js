import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Divider,
  Paper,
  TextField,
  Button,
  TextareaAutosize,
  Typography,
  Chip,
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { useParams } from "react-router";
import Avatar from "@material-ui/core/Avatar";
import {
  getThread,
  createComment,
  getThreadComments,
  updateThread,
} from "../actions/threads";

const SingleThread = ({
  getThread,
  createComment,
  singleThread,
  comments,
  getThreadComments,
  updateThread,
  user,
}) => {
  const classes = useStyles();
  const params = useParams();

  const [comment, setComment] = useState("");
  const [upvotes, setupVotes] = useState(0);

  useEffect(() => {
    getThread(params.id);
    getThreadComments(params.id);
  }, []);

  const handleChange = ({ target }) => {
    setComment(target.value);
  };

  const submitComment = () => {
    if (comment !== "" && user) {
      createComment(params.id, comment, user.user_id);
    }
  };

  const upVoteThread = () => {
    updateThread(params.id, singleThread.upvotes + 1);
  };

  const downVoteThread = () => {
    updateThread(params.id, singleThread.upvotes - 1);
  };

  if (singleThread === null && comments.length > 0) {
    return "hui";
  }

  return (
    singleThread && (
      <div className={classes.singleThreadWrapper}>
        <Paper elevation={2} className={classes.Wrapper}>
          <div className={classes.threadWrapper}>
            <div className={classes.thread}>
              <div className={classes.iconContainer}>
                <div className={classes.upperArrow}>
                  <ArrowUpwardIcon onClick={upVoteThread} />
                </div>
                <div
                  className={
                    singleThread.upvotes === 0
                      ? classes.noUpvotes
                      : classes.upvotes
                  }
                >
                  {singleThread.upvotes}
                </div>
                <div className={classes.downArrow}>
                  <ArrowDownwardIcon onClick={downVoteThread} />
                </div>
              </div>
              <div className={classes.contentArea}>
                <div className={classes.titleContainer}>
                  <Typography className={classes.title}>
                    {singleThread.title}
                  </Typography>
                  <Chip
                    variant="outlined"
                    size="small"
                    label={singleThread.owner.username}
                    avatar={
                      <Avatar>{singleThread.owner.username.slice(0, 1)}</Avatar>
                    }
                  />
                </div>
                <div className={classes.textContainer}>{singleThread.text}</div>
              </div>
            </div>
          </div>
          <Divider />
          <div className={classes.createCommentWrapper}>
            <TextareaAutosize
              minRows={5}
              placeholder="What's on your mind"
              value={comment.text}
              onChange={handleChange}
              className={classes.textArea}
            ></TextareaAutosize>
            <Button onClick={submitComment} className={classes.submit}>
              Submit comment
            </Button>
          </div>
          <Divider />
          <div className={classes.commentWrapper}>
            {comments.map((el, key) => {
              return (
                <div key={key} className={classes.comment}>
                  <div className={classes.avatar}>
                    <Avatar>{key + 1}</Avatar>
                  </div>
                  <div className={classes.commentBody}>
                    <div className={classes.commentText}>{el.text}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Paper>
      </div>
    )
  );
};

const useStyles = makeStyles((theme) => ({
  singleThreadWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  },
  Wrapper: {
    width: "50%",
    padding: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  commentWrapper: {
    padding: "20px",
    marginTop: "30px",
  },
  createCommentWrapper: {
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow:
      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
    marginBottom: "30px",
    marginTop: "30px",
  },
  comment: {
    display: "flex",
    flexDirection: "row",
    marginTop: "10px",
    marginBottom: "20px",
    boxShadow:
      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
    padding: "10px",
    borderRadius: "5px",
  },
  avatar: {
    marginLeft: "5px",
    width: "56px",
    height: "56px",
  },
  commentBody: {
    marginLeft: "15px",
    width: "100%",
  },
  commentTitle: {
    fontWeight: "500",
    fontSize: "18px",
    marginBottom: "10px",
  },
  user: {
    marginBottom: "10px",
    color: "#7e8184",
  },
  textArea: {
    resize: "none",
    padding: "5px",
    borderRadius: "5px",
    border: "none",
    border: "0.3px solid #e0e6eb",
  },
  submit: {
    width: "150px",
    marginTop: "10px",
    alignSelf: "end",
    backgroundColor: "#f64747",
    color: "#FFF",
    fontSize: "10px",
  },
  threadWrapper: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  upvotes: {
    marginLeft: "3px",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  noUpvotes: {
    marginLeft: "7px",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  contentArea: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  titleContainer: {
    marginLeft: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: "20px",
  },
  textContainer: {
    marginLeft: "20px",
    marginTop: "5px",
    opacity: 0.7,
  },
  thread: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "30px",
  },
}));

const mapStateToProps = (state) => ({
  singleThread: state.threads.singleThread,
  comments: state.threads.singleThreadComments,
  user: state.user.user,
});

export default connect(mapStateToProps, {
  getThread,
  createComment,
  getThreadComments,
  updateThread,
})(SingleThread);
