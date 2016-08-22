import { withRouter } from 'react-router';
import AppBar from 'material-ui/AppBar';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import React from 'react';

const App = React.createClass({

  getInitialState() {
    return {
      editing: null,

      posts: []
    };
  },

  componentWillMount() {
    axios.get('/api/posts')
      .then((res) => {
        this.setState({ posts: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
  },

  handleTitleTouchTap() {
    this.props.router.push('/');
  },

  handleTouchTap() {
    if (this.state.editing) {
      return;
    }

    const newPost = {
      submitter: 'stanleypaddles',
      title: '',
      topic: '',
      url: '',
      votes: Infinity
    };

    const nextPosts = this.state.posts.concat(newPost);

    this.setState({ editing: newPost, posts: nextPosts });
  },

  incrementVotes(post) {
    const nextPosts = this.state.posts.map((element) => {
      if (element !== post) {
        return element;
      }

      const nextPost = Object.assign({}, post, { votes: post.votes + 1 });

      return nextPost;
    });

    this.setState({ posts: nextPosts });
  },

  decrementVotes(post) {
    const nextPosts = this.state.posts.map((element) => {
      if (element !== post) {
        return element;
      }

      const nextPost = Object.assign({}, post, { votes: post.votes - 1 });

      return nextPost;
    });

    this.setState({ posts: nextPosts });
  },

  stopEditingPost(post) {
    const nextPosts = this.state.posts.filter((element) => post !== element);

    this.setState({ editing: null, posts: nextPosts });
  },

  updatePost(post, nextPost) {
    axios.post('/api/posts', nextPost)
      .then((res) => {
        const nextPosts = this.state.posts.map((element) => {
          if (post !== element) {
            return element;
          }

          return res.data;
        });

        this.setState({ editing: null, posts: nextPosts });
      })
      .catch((err) => {
        console.error(err);
      });
  },

  render() {
    const styleFlatButton = {
      height: '64px',
      lineHeight: '64px'
    }

    const styleTitle = {
      cursor: 'pointer'
    }

    return <div>
      <AppBar
        title="U Island"
        onTitleTouchTap={this.handleTitleTouchTap}
        titleStyle={styleTitle}
      >
        <FlatButton
          label="New Post"
          onTouchTap={this.handleTouchTap}
          style={styleFlatButton}
        />
      </AppBar>

      {React.cloneElement(this.props.children, {
        posts: this.state.posts,
        decrementVotes: this.decrementVotes,
        incrementVotes: this.incrementVotes,
        editing: this.state.editing,
        stopEditingPost: this.stopEditingPost,
        updatePost: this.updatePost
      })}
    </div>
  }
});

export default withRouter(App);
