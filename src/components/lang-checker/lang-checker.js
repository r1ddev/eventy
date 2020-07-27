import React from "react";
import "./lang-checker.scss";
import { withTranslation } from "react-i18next";
import i18next from "i18next";
import { compose } from "../../utils";
import Select from 'react-select'
import i18n from "../../utils/i18n";

const colourStyles = {
	option: (styles, { data, isDisabled, isFocused, isSelected }) => {
		const color = '#22d671';
		return {
			...styles,
			backgroundColor: isDisabled
				? null
				: isSelected
					? '#22d6718a'
					: isFocused
						? color
						: null,
			color: isDisabled
				? '#ccc'
				: isSelected
					? color
						? 'black'
						: 'black'
					: data.color,
			cursor: isDisabled ? 'not-allowed' : 'default',

			':active': {
				...styles[':active'],
				backgroundColor: !isDisabled && (isSelected ? data.color : color)
			},
		};
	},

};

class LangChecker extends React.Component {

	state = {
		lang: 'EN',

	}

	options = [
		{ value: 'EN', label: 'Английский' },
		{ value: 'RU', label: 'Русский' },

	]

	onChangeLang = (e) => {
		this.setState({ lang: e.value });
	}

	componentDidMount() {
		if (i18n.language.indexOf('EN') !== -1) {
			this.setState({
				lang: 'EN'
			})
		} else {
			this.setState({
				lang: 'RU'
			})
		}
	}

	render() {
		const { lang } = this.state;
		console.log(lang)

		return (
			<div id="lang-checker">
				<Select
					options={this.options}
					styles={colourStyles}
					onChange={this.onChangeLang}
					defaultValue={(lang == 'EN') ? this.options[0] : this.options[1]} />
			</div>
		);
	}
}


export default compose(
	withTranslation(),
)(LangChecker);