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

### Styling

Optionally change style by passing style elements like so:

```
  <EmojiReact 
    reactions={this.state.emojis} 
    onReaction={(name) => this.onReaction(name)} 
    onEmojiClick={(name) => this.onEmojiClick(name)}
    wrapperStyle={{border:'none'}}
  />
```

You can modify the following styling options:

* `wrapperStyle` - controls the borders around emoji.
* `wrapperHover` - controls the borders around emoji when hovering.
* `emojiStyle` - controls emoji themselves.
* `countstyle` - controls the style of each emojis' count.
* `countHover` - controls the style of emoji count when hovering.
* `searchInput` - controls search input style.
* `selectorStyle` - controls style of selector.
* `xStyle` - controls style of close icon.


