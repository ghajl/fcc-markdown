import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import {stripIndent} from 'common-tags';
import './style/main.scss';

const Editor = ({...props}) => {
  return <textarea id="editor" className="pane" {...props}></textarea>;
}

const Preview = ({value, ...props}) => {
  return <div id="preview" className="pane" dangerouslySetInnerHTML= {{__html: value}}></div>;
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
    const input = event.target.value;
    const previewOutput = marked(input);
    this.setState({editor: input, preview: previewOutput});
  }
  
  render() {
    return (
      <div className="wrapper">
        <header className="header">Markdown Previewer</header>
        <main className="app-container">
          <div className="editor-wrapper">
            <Editor onChange={this.handleChange} value={this.state.editor}/>
          </div>
          <div className="preview-wrapper">
            <Preview value={this.state.preview}/>
          </div>
        </main>
      </div>
    )
  }
}


const rootElement = document.getElementById('root');

ReactDOM.hydrate(<App />, rootElement);
