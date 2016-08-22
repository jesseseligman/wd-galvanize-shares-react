import AssignmentReturned
  from 'material-ui/svg-icons/action/assignment-returned';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import Joi from 'joi';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const schema = Joi.object({
  title: Joi.string().trim().max(255),
  topic: Joi.string().trim().max(50),
  url: Joi.string().trim().uri({scheme: /^https?/ })
})

const PostForm = React.createClass({
  getInitialState() {
    return {
      errors: {},
      post: this.props.post
    };
  },

  handleBlur(event) {
    const { name, value } = event.target;
    const nextErrors = Object.assign({}, this.state.errors)
    const result = Joi.validate({ [name]: value }, schema);

    if (result.error) {
      for (const detail of result.error.details) {
        nextErrors[detail.path] = detail.message;
      }

      return this.setState({ errors: nextErrors });
    }

    delete nextErrors[name];

    this.setState({ errors: nextErrors });
  },

  handleChange(event) {
    const nextPost = Object.assign({}, this.state.post, {
      [event.target.name]: event.target.value
    });

    this.setState({ post: nextPost });
  },

  handleTouchTapCancel() {
    this.props.stopEditingPost(this.props.post);
  },

  handleTouchTapSave() {
    const result = Joi.validate(this.state.post, schema, {
      abortEarly: false,
      allowUnknown: true
    });

    if (result.error) {
      const nextErrors = {};

      for (const detail of result.error.details) {
        nextErrors[detail.path] = detail.message;
      }

      return this.setState({ errors: nextErrors });
    }

    const nextPost = Object.assign({}, result.value, { votes: 1 });

    this.props.updatePost(this.props.post, nextPost);
  },

  render() {
    const { post, errors } = this.state;

    const styleRaisedButton = {
      marginRight: '10px',
      marginTop: '40px'
    };

    const styleTextField = {
      display: 'block'
    };

    return <Paper className="paper">
      <h3>New Post</h3>

      <TextField
        errorText={errors.url}
        floatingLabelText="url"
        fullWidth={true}
        name="url"
        onBlur={this.handleBlur}
        value={post.url}
        onChange={this.handleChange}
        style={styleTextField}
      />
      <TextField
        errorText={errors.title}
        floatingLabelText="title"
        fullWidth={true}
        onBlur={this.handleBlur}
        name="title"
        value={post.title}
        onChange={this.handleChange}
        style={styleTextField}
      />
      <TextField
        errorText={errors.topic}
        floatingLabelText="topic"
        fullWidth={true}
        onBlur={this.handleBlur}
        name="topic"
        value={post.topic}
        onChange={this.handleChange}
        style={styleTextField}
      />

      <RaisedButton
        label="Cancel"
        onTouchTap={this.handleTouchTapCancel}
        primary={true}
        style={styleRaisedButton}
        icon={<Cancel/>}
      />

      <RaisedButton
        label="Save"
        onTouchTap={this.handleTouchTapSave}
        primary={true}
        style={styleRaisedButton}
        icon={<AssignmentReturned/>}
      />

    </Paper>;
  }
});

export default PostForm;
