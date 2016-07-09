import React, { Component } from 'react';
import { emojiList as emoji } from 'get-emoji';
import getEmoji from 'get-emoji';


const wrapperStyle = {
	display: 'inline-block',
	marginTop: '2px',
	marginBottom: '2px',
	marginRight: '4px',
	padding: '1px 3px',
	borderRadius: '5px',
	backgroundColor: '#fff',
	border: '1px solid #E8E8E8',
	cursor: 'pointer',
	height: '1.4rem',
	lineHeight: '23px',
	WebkitUserSelect: 'none',
	msUserSelect: 'none',
	MozUserSelect: 'none'
};

const emojiStyle = {
	lineHeight: '20px',
	verticalAlign: 'middle',
	display: 'inline-block'
};

const wrapperHover = {
	border: '1px solid #4fb0fc'
};

const countStyle = {
	fontSize: '11px',
	fontFamily: 'helvetica, arial',
	position: 'relative',
	top: '-2px',
	padding: '0 1px 3px',
	color: '#959595'
};

const countHover = {
	color: "#4fb0fc"
};

const selectorStyle = {
	boxShadow: '0 6px 8px 0 rgba(0, 0, 0, 0.24)',
	backgroundColor: '#fff',
	width: '250px',
	height: '220px',
	position: 'relative',
	left: '10px',
	top: '0px'
};

const EmojiImage = ({name}) => <img style={{width: '16px', height: '16px'}} src={getEmoji(name)} />;

class SingleEmoji extends Component {
	constructor() {
		super();
		this.state = { hovered: false };
	}

	render() {
		const {
			name,
			count = 1,
			styles = {
				wrapperStyle: wrapperStyle,
				emojiStyle: emojiStyle,
				countStyle: countStyle,
				wrapperHover: wrapperHover,
				countHover: countHover
			},
			onClick = () => {}
		} = this.props;

		const wrapperFinalStyle = this.state.hovered ? {...wrapperStyle, ...wrapperHover} : wrapperStyle;
		const countFinalStyle = this.state.hovered ? {...countStyle, ...countHover} : countStyle;
		return (
			<div
				style={wrapperFinalStyle}
				onClick={() => onClick(name)}
				onMouseEnter={() => this.setState({hovered: true})}
				onMouseLeave={() => this.setState({hovered: false})}
			>
				<span style={emojiStyle}><EmojiImage name={name} /></span>
				<span style={countFinalStyle}>{count}</span>
			</div>
		);
	}
}

const PickerEmoji = ({onClick, image}) => (
	<span style={{cursor: 'pointer', padding: '5px'}} onClick={() => onClick()}>
		{image}
	</span>
);

const EmojiWrapper = ({reactions, onReaction}) => {
	return (
		<div style={{display: 'inline-block'}}>
			{reactions.map(({name, count}) => (
				<SingleEmoji name={name} count={count} key={name} onClick={onReaction} />
			))}
		</div>
	);
}

const SINGLE_EMOJI_HEIGHT = 23;
const LOAD_HEIGHT = 500;
const EMOJIS_ACROSS = 8

class EmojiSelector extends Component {
	constructor() {
		super();
		this.state = {
			filter: "",
			xHovered: false,
			scrollPosition: 0
		};
		this.onScroll = this.onScroll.bind(this);
	}

	onScroll() {
		this.setState({ scrollPosition: this.emojiContainer.scrollTop })
	}

	componentDidMount() {
		this.emojiContainer.addEventListener('scroll', this.onScroll);
	}

	componentWillUnMount() {
		this.emojiContainer.removeEventListener('scroll', this.onScroll);
	}

	render() {
		const { showing, onEmojiClick, close } = this.props;
		let xStyle = {
			color: '#E8E8E8',
			fontSize: '20px',
			cursor: 'pointer',
			float: 'right',
			marginTop: '-32px',
			marginRight: '5px'
		};
		if (this.state.xHovered) {
			xStyle.color = '#4fb0fc';
		}
		const searchInput = (
			<div>
				<input
					style={{margin: '10px', width: '85%', borderRadius: '5px', border: '1px solid #E8E8E8'}}
					type='text'
					placeholder='Search'
					value={this.state.filter}
					onChange={(e) => this.setState({filter: e.target.value})}
				/>
			</div>
		);
		const x = (
			<span
				style={xStyle}
				onClick={() => {
					this.setState({ xHovered: false});
					close();
				}}
				onMouseEnter={() => this.setState({ xHovered: true})}
				onMouseLeave={() => this.setState({ xHovered: false})}
			>
				x
			</span>
		);
		const show = emoji.filter(name => name.indexOf(this.state.filter) !== -1);
		const emptyStyle = {
			height: '16px',
			width: '16px',
			display: 'inline-block'
		};
		const emojis = show.map((em, i) => {
			const row = Math.floor((i + 1) / EMOJIS_ACROSS);
			const pixelPosition = row * SINGLE_EMOJI_HEIGHT;
			const position = this.state.scrollPosition + LOAD_HEIGHT;
			const shouldShowImage = pixelPosition < position && (position - pixelPosition) <= LOAD_HEIGHT;
			const image = shouldShowImage ? <EmojiImage name={em} /> : <div style={emptyStyle} />;
			return (
				<PickerEmoji
					key={em}
					image={image}
					onClick={() => {
						onEmojiClick(em);
						close();
					}}
				/>
			);
		});
		return (
			<div style={showing ? selectorStyle : {display: 'none'}}>
				{searchInput}
				{x}
				<div
					style={{padding: '10px', paddingTop: '5px', width: '230px', height: '160px', overflow: 'auto'}}
					ref={(node) => this.emojiContainer = node}
				>
					{emojis}
				</div>
			</div>
		);
	}
}

export default class EmojiReact extends Component {
	constructor() {
		super();
		this.state = { hovered: false, showSelector: false };
		this.onKeyPress = this.onKeyPress.bind(this);
		this.closeSelector = this.closeSelector.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	onKeyPress(e) {
		if (e.keyCode === 27) {
			this.closeSelector();
		}
	}

	onClick({ target }) {
		if (!this.node.contains(target) && this.state.showSelector) {
			this.closeSelector();
		}
	}

	componentDidMount() {
		document.addEventListener('click', this.onClick);
		document.addEventListener('keydown', this.onKeyPress);
	}

	componentWillUnMount() {
		document.removeEventListener('click', this.onClick);
		document.removeEventListener('keydown', this.onKeyPress);
	}

	closeSelector() {
		this.setState({ showSelector: false });
	}

	render() {
		let { reactions, onReaction, onEmojiClick, sort } = this.props;
		if (sort) {
		reactions = reactions.slice(0);
	    reactions.sort(function (a, b) {
	      return b.count - a.count;
	    });
		}
		const plusButtonStyle = this.state.hovered ? {...wrapperStyle, ...wrapperHover} : wrapperStyle;
		const plusStyle = this.state.hovered ? {...countStyle, ...countHover} : countStyle;
		const selector = (
			<div style={{display: 'inline-block'}} ref={node => this.node = node}>
				<div
					style={plusButtonStyle}
					onMouseEnter={() => this.setState({ hovered: true })}
					onMouseLeave={() => this.setState({ hovered: false})	}
					onClick={() => this.setState({ showSelector: !this.state.showSelector})}
				>
					<span style={plusStyle}>+</span>
				</div>
				<EmojiSelector
					showing={this.state.showSelector}
					onEmojiClick={onEmojiClick}
					close={this.closeSelector}
				/>
			</div>
		);
		return (
			<div style={{display: 'inline-flex'}}>
				<EmojiWrapper onReaction={onReaction} reactions={reactions} />
				{selector}
			</div>
		);
	}
}
