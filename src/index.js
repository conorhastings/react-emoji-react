import React, { Component } from 'react';
import emoji from 'gemoji';

const wrapperStyle = {
	display: 'inline-block',
	marginTop: 2,
	marginBottom: 2,
	marginRight: 4,
	padding: '1px 3px',
	borderRadius: 5,
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
	fontSize: 11,
	fontFamily: 'helvetica, arial',
	position: 'relative',
	top: -2,
	padding: '0 1px 3px',
	color: '#959595'
};

const countHover = {
	color: "#4fb0fc"
};

const selectorStyle = {
	boxShadow: '0 6px 8px 0 rgba(0, 0, 0, 0.24)',
	backgroundColor: '#fff',
	width: 250,
	height: 150,
	overflow: 'auto',
	position: 'relative',
	left: 10,
	top: 0
};

export class SingleEmoji extends Component {
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
				<span style={emojiStyle}>{emoji.name[name].emoji}</span>
				<span style={countFinalStyle}>{count}</span>
			</div>
		);
	}
}

export const EmojiWrapper = ({reactions, onReaction}) => {
	return (
		<div style={{display: 'inline-block'}}>
			{reactions.map(({name, count}) => (
				<SingleEmoji name={name} count={count} key={name} onClick={onReaction} />
			))}
		</div>
	);
}

class EmojiSelector extends Component {
	constructor() {
		super();
		this.state = { hovered: false };
	}

	render() {
		const { showing, onEmojiClick } = this.props;
		if (!showing) {
			return null;
		}
		const emojis = Object.keys(emoji.name).map(em => {
			return (
				<span 
					style={{cursor: 'pointer'}} 
					key={em}
					onClick={() => onEmojiClick(em)}
				>
					{emoji.name[em].emoji}
				</span>
			);
		});
		return (
			<div style={selectorStyle}>
				{emojis}
			</div>
		);
	}
}

export default class EmojiReact extends Component {
	constructor() {
		super();
		this.state = { hovered: false, showSelector: false };
	}

	render() {
		const { reactions, onReaction, onEmojiClick } = this.props;
		const plusButtonStyle = this.state.hovered ? {...wrapperStyle, ...wrapperHover} : wrapperStyle;
		const plusStyle = this.state.hovered ? {...countStyle, ...countHover} : countStyle;
		const selector = (
			<div style={{display: 'inline-block'}}>
				<div 
					style={plusButtonStyle}
					onMouseEnter={() => this.setState({ hovered: true })}
					onMouseLeave={() => this.setState({ hovered: false})	}
					onClick={() => this.setState({ showSelector: !this.state.showSelector })}
				>
					<span style={plusStyle}>+</span>
				</div>
				<EmojiSelector showing={this.state.showSelector} onEmojiClick={onEmojiClick} />
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
