'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getEmoji = require('get-emoji');

var _getEmoji2 = _interopRequireDefault(_getEmoji);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var wrapperStyle = {
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

var emojiStyle = {
	lineHeight: '20px',
	verticalAlign: 'middle',
	display: 'inline-block'
};

var wrapperHover = {
	border: '1px solid #4fb0fc'
};

var countStyle = {
	fontSize: '11px',
	fontFamily: 'helvetica, arial',
	position: 'relative',
	top: '-2px',
	padding: '0 1px 3px',
	color: '#959595'
};

var countHover = {
	color: "#4fb0fc"
};

var selectorStyle = {
	boxShadow: '0 6px 8px 0 rgba(0, 0, 0, 0.24)',
	backgroundColor: '#fff',
	width: '250px',
	height: '220px',
	position: 'relative',
	left: '10px',
	top: '0px'
};

var EmojiImage = function EmojiImage(_ref) {
	var name = _ref.name;
	return _react2.default.createElement('img', { style: { width: '16px', height: '16px' }, src: (0, _getEmoji2.default)(name) });
};

var SingleEmoji = function (_Component) {
	_inherits(SingleEmoji, _Component);

	function SingleEmoji() {
		_classCallCheck(this, SingleEmoji);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SingleEmoji).call(this));

		_this.state = { hovered: false };
		return _this;
	}

	_createClass(SingleEmoji, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props;
			var name = _props.name;
			var _props$count = _props.count;
			var count = _props$count === undefined ? 1 : _props$count;
			var _props$styles = _props.styles;
			var styles = _props$styles === undefined ? {
				wrapperStyle: wrapperStyle,
				emojiStyle: emojiStyle,
				countStyle: countStyle,
				wrapperHover: wrapperHover,
				countHover: countHover
			} : _props$styles;
			var _props$onClick = _props.onClick;

			var _onClick = _props$onClick === undefined ? function () {} : _props$onClick;

			var wrapperFinalStyle = this.state.hovered ? _extends({}, wrapperStyle, wrapperHover) : wrapperStyle;
			var countFinalStyle = this.state.hovered ? _extends({}, countStyle, countHover) : countStyle;
			return _react2.default.createElement(
				'div',
				{
					style: wrapperFinalStyle,
					onClick: function onClick() {
						return _onClick(name);
					},
					onMouseEnter: function onMouseEnter() {
						return _this2.setState({ hovered: true });
					},
					onMouseLeave: function onMouseLeave() {
						return _this2.setState({ hovered: false });
					}
				},
				_react2.default.createElement(
					'span',
					{ style: emojiStyle },
					_react2.default.createElement(EmojiImage, { name: name })
				),
				_react2.default.createElement(
					'span',
					{ style: countFinalStyle },
					count
				)
			);
		}
	}]);

	return SingleEmoji;
}(_react.Component);

var PickerEmoji = function PickerEmoji(_ref2) {
	var _onClick2 = _ref2.onClick;
	var image = _ref2.image;
	return _react2.default.createElement(
		'span',
		{ style: { cursor: 'pointer', padding: '5px' }, onClick: function onClick() {
				return _onClick2();
			} },
		image
	);
};

var EmojiWrapper = function EmojiWrapper(_ref3) {
	var reactions = _ref3.reactions;
	var onReaction = _ref3.onReaction;

	return _react2.default.createElement(
		'div',
		{ style: { display: 'inline-block' } },
		reactions.map(function (_ref4) {
			var name = _ref4.name;
			var count = _ref4.count;
			return _react2.default.createElement(SingleEmoji, { name: name, count: count, key: name, onClick: onReaction });
		})
	);
};

var SINGLE_EMOJI_HEIGHT = 23;
var LOAD_HEIGHT = 500;
var EMOJIS_ACROSS = 8;

var EmojiSelector = function (_Component2) {
	_inherits(EmojiSelector, _Component2);

	function EmojiSelector() {
		_classCallCheck(this, EmojiSelector);

		var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(EmojiSelector).call(this));

		_this3.state = {
			filter: "",
			xHovered: false,
			scrollPosition: 0
		};
		_this3.onScroll = _this3.onScroll.bind(_this3);
		return _this3;
	}

	_createClass(EmojiSelector, [{
		key: 'onScroll',
		value: function onScroll() {
			this.setState({ scrollPosition: this.emojiContainer.scrollTop });
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.emojiContainer.addEventListener('scroll', this.onScroll);
		}
	}, {
		key: 'componentWillUnMount',
		value: function componentWillUnMount() {
			this.emojiContainer.removeEventListener('scroll', this.onScroll);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var _props2 = this.props;
			var showing = _props2.showing;
			var onEmojiClick = _props2.onEmojiClick;
			var close = _props2.close;

			var xStyle = {
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
			var searchInput = _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement('input', {
					style: { margin: '10px', width: '85%', borderRadius: '5px', border: '1px solid #E8E8E8' },
					type: 'text',
					placeholder: 'Search',
					value: this.state.filter,
					onChange: function onChange(e) {
						return _this4.setState({ filter: e.target.value });
					}
				})
			);
			var x = _react2.default.createElement(
				'span',
				{
					style: xStyle,
					onClick: function onClick() {
						_this4.setState({ xHovered: false });
						close();
					},
					onMouseEnter: function onMouseEnter() {
						return _this4.setState({ xHovered: true });
					},
					onMouseLeave: function onMouseLeave() {
						return _this4.setState({ xHovered: false });
					}
				},
				'x'
			);
			var show = _getEmoji.emojiList.filter(function (name) {
				return name.indexOf(_this4.state.filter) !== -1;
			});
			var emptyStyle = {
				height: '16px',
				width: '16px',
				display: 'inline-block'
			};
			var emojis = show.map(function (em, i) {
				var row = Math.floor((i + 1) / EMOJIS_ACROSS);
				var pixelPosition = row * SINGLE_EMOJI_HEIGHT;
				var position = _this4.state.scrollPosition + LOAD_HEIGHT;
				var shouldShowImage = pixelPosition < position && position - pixelPosition <= LOAD_HEIGHT;
				var image = shouldShowImage ? _react2.default.createElement(EmojiImage, { name: em }) : _react2.default.createElement('div', { style: emptyStyle });
				return _react2.default.createElement(PickerEmoji, {
					key: em,
					image: image,
					onClick: function onClick() {
						onEmojiClick(em);
						close();
					}
				});
			});
			return _react2.default.createElement(
				'div',
				{ style: showing ? selectorStyle : { display: 'none' } },
				searchInput,
				x,
				_react2.default.createElement(
					'div',
					{
						style: { padding: '10px', paddingTop: '5px', width: '230px', height: '160px', overflow: 'auto' },
						ref: function ref(node) {
							return _this4.emojiContainer = node;
						}
					},
					emojis
				)
			);
		}
	}]);

	return EmojiSelector;
}(_react.Component);

var EmojiReact = function (_Component3) {
	_inherits(EmojiReact, _Component3);

	function EmojiReact() {
		_classCallCheck(this, EmojiReact);

		var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(EmojiReact).call(this));

		_this5.state = { hovered: false, showSelector: false };
		_this5.onKeyPress = _this5.onKeyPress.bind(_this5);
		_this5.closeSelector = _this5.closeSelector.bind(_this5);
		_this5.onClick = _this5.onClick.bind(_this5);
		return _this5;
	}

	_createClass(EmojiReact, [{
		key: 'onKeyPress',
		value: function onKeyPress(e) {
			if (e.keyCode === 27) {
				this.closeSelector();
			}
		}
	}, {
		key: 'onClick',
		value: function onClick(_ref5) {
			var target = _ref5.target;

			if (!this.node.contains(target) && this.state.showSelector) {
				this.closeSelector();
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			document.addEventListener('click', this.onClick);
			document.addEventListener('keydown', this.onKeyPress);
		}
	}, {
		key: 'componentWillUnMount',
		value: function componentWillUnMount() {
			document.removeEventListener('click', this.onClick);
			document.removeEventListener('keydown', this.onKeyPress);
		}
	}, {
		key: 'closeSelector',
		value: function closeSelector() {
			this.setState({ showSelector: false });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this6 = this;

			var _props3 = this.props;
			var reactions = _props3.reactions;
			var onReaction = _props3.onReaction;
			var onEmojiClick = _props3.onEmojiClick;
			var sort = _props3.sort;

			if (sort) {
				reactions = reactions.slice(0);
				reactions.sort(function (a, b) {
					return b.count - a.count;
				});
			}
			var plusButtonStyle = this.state.hovered ? _extends({}, wrapperStyle, wrapperHover) : wrapperStyle;
			var plusStyle = this.state.hovered ? _extends({}, countStyle, countHover) : countStyle;
			var selector = _react2.default.createElement(
				'div',
				{ style: { display: 'inline-block' }, ref: function ref(node) {
						return _this6.node = node;
					} },
				_react2.default.createElement(
					'div',
					{
						style: plusButtonStyle,
						onMouseEnter: function onMouseEnter() {
							return _this6.setState({ hovered: true });
						},
						onMouseLeave: function onMouseLeave() {
							return _this6.setState({ hovered: false });
						},
						onClick: function onClick() {
							return _this6.setState({ showSelector: !_this6.state.showSelector });
						}
					},
					_react2.default.createElement(
						'span',
						{ style: plusStyle },
						'+'
					)
				),
				_react2.default.createElement(EmojiSelector, {
					showing: this.state.showSelector,
					onEmojiClick: onEmojiClick,
					close: this.closeSelector
				})
			);
			return _react2.default.createElement(
				'div',
				{ style: { display: 'inline-flex' } },
				_react2.default.createElement(EmojiWrapper, { onReaction: onReaction, reactions: reactions }),
				selector
			);
		}
	}]);

	return EmojiReact;
}(_react.Component);

exports.default = EmojiReact;