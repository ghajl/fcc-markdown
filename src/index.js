import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import './style/main.scss';

const Editor = (props) => {
  return (
    <textarea id="editor" className="pane" onChange={props.handleChange} value={props.output}></textarea>
  )
}

const Preview = (props) => {
  
  return (
    <div id="preview" className="pane" dangerouslySetInnerHTML= {{__html: props.output}}></div>
  )
}

class App extends React.Component {
  state = {
    editor: '',
    preview: '',
  }
  
  componentDidMount() {
    const initialValue = '# Level 1 Header\n## Level 2 Header\n[external link](http://google.com)\n\n`inline code`\n\n```a code block```,\n\n- list\n\n- item,\n\n\n > a blockquote,\n\n an image,\n\n **and bolded text.**';
    const previewOutput = marked(initialValue);
    this.setState({editor: initialValue, preview: previewOutput});    
  }

  handleChange = (event) => {
    const value = event.target.value;
    const previewOutput = marked(value);
    this.setState({editor: value, preview: previewOutput});
  }
  
  render() {
    return (
      <div className="container">
        <header><h1>Markdown Previewer</h1></header>
        <main>
          <div className="window-wrapper">
            <header><span>Editor</span></header>
            <Editor handleChange={this.handleChange} output={this.state.editor}/>
          </div>
          <div className="window-wrapper">
            <header><span>Preview</span></header>
            <Preview output={this.state.preview}/>
          </div>
        </main>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)