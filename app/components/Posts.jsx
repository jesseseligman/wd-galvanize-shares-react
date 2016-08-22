import Post from 'components/Post';
import PostForm from 'components/PostForm';
import React from 'react';
import weakKey from 'weak-key';

const Posts = React.createClass({

  render() {
    const { editing, params } = this.props;
    let { posts } = this.props;

    if (params.topic) {
      posts = posts.filter((post) => post.topic === params.topic);
    }

    posts.sort((p1, p2) => p1.votes < p2.votes);

    return <main>
      {posts.map((post, index) => {

        if (post === editing) {
          return <PostForm
            stopEditingPost={this.props.stopEditingPost}
            post={post}
            key={weakKey(post)}
            updatePost={this.props.updatePost}
          />;
        }

        return <Post
          post={post}
          key={weakKey(post)}
          decrementVotes = {this.props.decrementVotes}
          incrementVotes={this.props.incrementVotes}
      />;
    })}
    </main>
  }
});

export default Posts;
