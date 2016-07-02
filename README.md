## React Emoji React

A clone (eventually) of slack emoji reactions as a react component

<a href="http://conorhastings.com/react-emoji-react/demo/index.html">Click here for a demo</a>.

<img src="http://i.imgur.com/qbvWhU7.gif" />

### Install

`npm install react-emoji-react --save`

### Use

```js
import EmojiReact from 'react-emoji-react';
import React, { Component } from 'react';
import { render } from 'react-dom';

const emojis = [
  {
    name: 'rage',
    count: 2
  },
  {
    name: 'blush',
    count: 1
  },
  {
    name: 100,
    count: 3
  },
  {
    name: 'grinning',
    count: 2
  }
];

class ReactingComponent extends Component {
  constructor() {
    super();
    this.state = {
      emojis
    };
  }

  onReaction(name) {
    const emojis = this.state.emojis.map(emoji => {
      if (emoji.name === name) {
        emoji.count += 1;
      }
      return emoji;
    });
    this.setState({ emojis });
  }

  onEmojiClick(name) {
    console.log(name);
    const emojis = this.state.emojis.concat([{name, count: 1}]);
    this.setState({ emojis });
  }

  render() {
    return (
      <EmojiReact
        reactions={this.state.emojis}
        onReaction={(name) => this.onReaction(name)}
        onEmojiClick={(name) => this.onEmojiClick(name)}
        sort={true}
      />
    );
  }
}


render(<ReactingComponent />, document.getElementById('app'));
```

### Args

* `reactions` - an array of current emoji reactions, reactions are objects containing name and count.
* `onReaction` - fired when a current reaction is clicked.
* `onEmojiClick` - fired when a new emoji is selected.
* `sort` - You can set sort to `true` in order to sort the reactions by descending order.
