import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from './DatePicker.js'

class App extends React.Component {
    render() {
      return (
        <div>
          <DatePicker />
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
