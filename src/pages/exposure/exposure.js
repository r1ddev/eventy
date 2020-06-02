import React from "react";
import "./exposure.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import Header from "../../components/header";
import { Link } from 'react-router-dom';

const partners = [
	{
		logo: require("../../images/partners/univest.png"),
		name: "Специализированный партнер",
		desc:
			"Univest Advertising Production - мощная производственная компания, которая создает рекламную продукцию из экологичных материалов.",
		link: "https://us02web.zoom.us/j/86047358537"
	},
	{
		logo: require("../../images/partners/freedom.png"),
		name: "Официальный партнер",
		desc:
			"Инвестиционная компания, которая открывает перед клиентами возможности в мире ценных бумаг и фондового рынка.",
		link: "https://ffin.ua/"
	},
	{
		logo: require("../../images/partners/angry.png"),
		name: "Креативный партнер",
		desc:
			"ANGRY AGENCY –  независимое креативное агентство. Создаем бренды и запускаем рекламные кампании для бизнеса.",
		link: "https://angry.agency/"
	},
	{
		logo: require("../../images/partners/42.png"),
		name: "Event-партнер",
		desc:
			"За любым крупным проектом стоит команда единомышленников. Команда 42, которой мы гордимся, создает проекты, которыми будете гордиться вы.",
		link: "https://sorokdva.com.ua/"
	},
	{
		logo: require("../../images/partners/prime.png"),
		name: "Партнер по наружной рекламе",
		desc:
			"PRIME Group — инновационный лидер out of home рынка, комплексный оператор наружной рекламы с международными инвестициями.",
		link: "http://www.prime-group.com.ua/"
	},
	{
		logo: require("../../images/partners/bigmedia.jpg"),
		name: "Партер по наружной рекламе",
		desc:
			"BigBoard Ukraine / JCDecaux - лидер наружной рекламы Украины",
		link: "https://bigmedia.ua/uk"
	},
	{
		logo: require("../../images/partners/b2bpr.png"),
		name: "PR-партнер",
		desc:
			"B2B PR — ваш пиар в сегменте бизнес-для-бизнеса",
		link: "https://b2bpr.com.ua/"
	},
	{
		logo: require("../../images/partners/razom.png"),
		name: "Партнер",
		desc:
			"Рекламно-коммуникационная группа razom communications. Smart. Fast. Furious.",
		link: "http://rzm.com.ua/"
	},
	{
		logo: require("../../images/partners/starlight.jpg"),
		name: "Партнер",
		desc:
			"Медіагрупа StarLightMedia – лідер з теледивлення в Україні.",
		link: "https://slm.ua/"
	},
	{
		logo: require("../../images/partners/arthuss.jpg"),
		name: "Издательский партнер",
		desc:
			"Издательство ArtHuss - современная литература для современных людей.",
		link: "https://www.arthuss.com.ua/"
	},
	{
		logo: require("../../images/partners/zmeet.png"),
		name: "Интерактивный партнер",
		desc:
			"zMEET - онлайн-платформа, разработана студией ZLab, для конференций и концертов на тысячи посетителей. Зацените!",
		link: "http://zmeet.life/"
	},
	{
		logo: require("../../images/partners/gradus.png"),
		name: "Исследовательский партнер",
		desc:
			"Gradus Research: Социология в смартфоне. Современный и уникальный на украинском рынке инструмент для маркетинговых исследований.",
		link: "https://gradus.app/uk/"
	},
	{
		logo: require("../../images/partners/dyb.jpg"),
		name: "Партнер",
		desc:
			"DYB | Develop Your Business шведский проект. Развиваем компании через корпоративное обучение и создание борда",
		link: "http://dyb.ua/"
	},
	{
		logo: require("../../images/partners/24.png"),
		name: "ТВ-партнер",
		desc:
			"ВКЛЮЧАЙ НАСТРОЕНИЕ!",
		link: "https://24tv.ua/ru/"
	},
	{
		logo: require("../../images/partners/luxfm.png"),
		name: "Радиопартнер",
		desc:
			"МЕНЯЕМ СТРАНУ К ЛУЧШЕМУ.",
		link: "https://lux.fm/ru/"
	},
	{
		logo: require("../../images/partners/sostav.jpg"),
		name: "Партнер",
		desc:
			"Информационно-аналитический портал, посвященный украинскому рынку рекламы, маркетинга и PR.",
		link: "https://sostav.ua/"
	},
	{
		logo: require("../../images/partners/knigabiz.jpg"),
		name: "Книжный партнер",
		desc:
			"Kniga.biz.ua – интернет-магазин, в котором собраны самые полезные и развивающее книги.",
		link: "https://kniga.biz.ua/"
	},
	{
		logo: require("../../images/partners/online.png"),
		name: "Партнер",
		desc:
			"ONLINE.UA — медіа платформа нового онлайн-формату. Організація прямих трансляцій та онлайн-конференцій.",
		link: "https://news.online.ua/"
	},
	{
		logo: require("../../images/partners/eba.png"),
		name: "Партнер",
		desc:
			"EBA объединяет более 1000 украинских и международных компаний, улучшаем инвестиционный климат в Украине.",
		link: "https://eba.com.ua/"
	},
	{
		logo: require("../../images/partners/eco.jpg"),
		name: "Партнер",
		desc:
			"Производство эко-сумок с логотипом.",
		link: "https://ecotorba.ua/"
	},
	{
		logo: require("../../images/partners/remi.png"),
		name: "Напиток светских бесед",
		desc:
			"Коньяк Rémy Martin VSOP  -  самый титулованный и самый продаваемый VSOP коньяк в мире.",
		link: "https://www.remy-cointreau.com/en/"
	},
	{
		logo: require("../../images/partners/oil.png"),
		name: "Аромапартнер",
		desc:
			"Ol.factory – єдине агентство аромабрендингу на ринку України!Ваш бізнес-парфумер!",
		link: "https://ua.olfactory.me/"
	},
	{
		logo: require("../../images/partners/vrk.png"),
		name: "Партнер",
		desc:
			"Наибольшее общественное объединение рекламной индустрии Украины.",
		link: "https://vrk.org.ua/"
	},
	{
		logo: require("../../images/partners/mib.png"),
		name: "Партнер",
		desc:
			"Бизнес-школа, которая реализует первые в Украине программы МВА, аккредитованные Ассоциацией МВАs (Великобританя).",
		link: "https://iib.com.ua/ru/"
	},
	{
		logo: require("../../images/partners/spell.jpg"),
		name: "Сладкий партнер",
		desc:
			"Украинский бренд авторских шоколадных изделий, превративший вкусные подарки в искусство.",
		link: "https://forms.gle/VUZ3JahBvi5943F28"
	},
	{
		logo: require("../../images/partners/rider.png"),
		name: "Технический партнер",
		desc:
			"Комплексне вирішення технічних завдань на великих, складних івентах.",
		link: "https://www.rider.rent/uk"
	},
	{
		logo: require("../../images/partners/ubs.jpg"),
		name: "Партнер",
		desc:
			"Настройки и сервисы сети для украинской аудитории помогут в раскрутке брендов.",
		link: "https://www.bannerka.ua/"
	},






];

class Exposure extends React.Component {
	render() {
		let partnersList = partners.map((partner) => {
			return (

				<a target="_blank" href={partner.link} className="card" onClick={() => this.props.postUrl(partner.link)}>
					<div className="row head m-0">
						<div className="col-7 name flex-center">{partner.name}</div>
						<div className="col-5 logo flex-center">
							<img src={partner.logo} alt="" />
						</div>
					</div>
					<div className="desc">{partner.desc}</div>
				</a>
			);
		});

		return (
			<div id="exposure">
				<Header className="fixed" data={this.props.user.data}>
					<></>
					<div className="col d-flex align-items-center p-0">
						<Link to="/messages/5" className="action-link">
							Связь <br />с организаторами
						</Link>
					</div>
				</Header>

				<div className="container">
					<div className="card-list">{partnersList}</div>
				</div>
			</div>
		);
	}
}

class ExposureContainer extends React.Component {
	render() {
		return <Exposure {...this.props} />;
	}
}

const mapStateToProps = ({ user }) => {
	return {
		user,
	};
};

const mapDispatchToProps = (dispatch, { apiService }) => {
	return {
		postUrl: (url) => { apiService.postUrl(url) }
	};
};

export default compose(
	withApiService(),
	connect(mapStateToProps, mapDispatchToProps)
)(ExposureContainer);
