import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import {stripIndent} from 'common-tags';
import './style/main.scss';

const Editor = (props) => {
  return <textarea id="editor" className="pane" onChange={props.handleChange} value={props.output}></textarea>;
}

const Preview = (props) => {
  return <div id="preview" className="pane" dangerouslySetInnerHTML= {{__html: props.output}}></div>;
}

class App extends React.Component {
  state = {
    editor: '',
    preview: '',
  }
  
  componentDidMount() {
    const initialValue = 
      stripIndent`
      # Level 1 Header
      ## Level 2 Header
      [external link](http://google.com)

      \`<div></div>\`

      \`\`\`
      const App = () => {
        return <h1>Hello world!</h1>
      }
      \`\`\`

      - list
      - item

      > a blockquote

      ![alt text](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg "Logo Title Text 1")

      and **bolded** text.
      `;
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
      <div className="wrapper">
        <header className="header"><h1>Markdown Previewer</h1></header>
        <main className="app-container">
          <div className="editor-wrapper">
            <Editor handleChange={this.handleChange} output={this.state.editor}/>
          </div>
          <div className="preview-wrapper">
            <Preview output={this.state.preview}/>
          </div>
        </main>
      </div>
    )
  }
}


const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<App />, rootElement);
} else {
  ReactDOM.render(<App />, rootElement);
}