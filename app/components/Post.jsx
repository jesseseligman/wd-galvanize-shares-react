import { Link } from 'react-router';
import React from 'react';
import Paper from 'material-ui/Paper';
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

const Post = React.createClass({

  shouldComponentUpdate(nextProps) {
    return nextProps.post !== this.props.post;
  },
  
  handleTouchTap(event) {
    if (event.target.id === 'up') {
      this.props.incrementVotes(this.props.post);
    }
    else if (event.target.id === 'down') {
      this.props.decrementVotes(this.props.post);
    }
  },

  render() {
    const post = this.props.post;

    const styleAside = {
      minWidth: '60px'
    };

    const styleTitle = {
      fontSize: '22px',
      textDecoration: 'none'
    };

    const styleSubTitle = {
      fontSize: '14px',
      marginTop: '8px'
    };

    const styleTopic = {
      fontSize: '14px',
      textDecoration: 'none'
    };

    const styleAction = Object.assign({}, styleTopic, {
      cursor: 'pointer',
      fontWeight: 500,
      marginRight: '8px'
    });

    const stylePaper = {
      display: 'flex'
    };

    const styleVotes = {
      marginLeft: '7px'
    };

    return <Paper style={stylePaper} className="paper">
      <aside style={styleAside}>
        <KeyboardArrowUp id="up" onTouchTap={this.handleTouchTap}/>
        <div style={styleVotes}>{post.votes}</div>
        <KeyboardArrowDown id="down" onTouchTap={this.handleTouchTap}/>
      </aside>

      <article>
        <a href={post.url} style={styleTitle}>
          {post.title}
        </a>

        <div style={styleSubTitle}>
          submitted by {post.submitter} to {' '}

          <Link style={styleTopic} to={`/topics/${post.topic}`}>
            {`/topics/${post.topic}`}
          </Link>
        </div>

        <div style={styleSubTitle}>
          <a style={styleAction}>
            edit
          </a>
          <a style={styleAction}>
            delete
          </a>
        </div>
      </article>
    </Paper>
  }
})

export default Post;
