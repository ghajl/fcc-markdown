import React from 'react';
import ReactDOM from 'react-dom';
import './style/main.scss';

const Editor = () => {
	return (
		<textarea id="editor">editor</textarea>
	)
}

const Preview = () => {
	return (
		<div id="preview">preview</div>
	)
}

class App extends React.Component {

	render() {
		return (
			<div className="container">
				<div className="editor-wrapper">
					<Editor />
				</div>
				<div className="preview-wrapper">
					<Preview />
				</div>
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
)