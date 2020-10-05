import React from "react";
import "./scenes-chat.scss";
import InputEmoji from "react-input-emoji";
import RSC from "react-scrollbars-custom";
import Spinner from "../spinner";
import Linkify from "react-linkify";
import { Link } from "react-router-dom";
import api from "./../../js/api";
import Translit from "../../components/translit";


class ScenesChat extends React.Component {
	state = {
		message: "",
		replyAttachment: false,
		replyAttachmentData: null
	};

	onSubmit = (e) => {
		const { message } = this.state;
		// e.preventDefault();
		const replyAttachment = this.state.replyAttachment;
		let reply_id = null;
		if (replyAttachment) reply_id = this.state.replyAttachmentData.id;


		if (message !== "") {
			this.props.sendMessage(message, reply_id, this.state.replyAttachmentData);
			this.clearInput();
			this.onClearReplyAttachment();
		}
	};

	onUpdate = (force = false) => {
		if (this.refs.scrollbar) {
			let scrollPosition =
				this.refs.scrollbar.scrollTop +
				this.refs.scrollbar.clientHeight;
			let delta = this.refs.scrollbar.scrollHeight - scrollPosition;

			if (delta < 400 || force) {
				this.refs.scrollbar.scrollToBottom();
			}
		}
	};

	onChangeMessageValue = (message) => {
		this.onUpdate();
		this.setState({
			message: message,
		});
	};

	clearInput = () => {
		this.setState(
			{
				message: "",
			},
			() => this.refs.chatInput.updateHTML()
		);
	};

	onSetReplyAttachment = (attachment) => {
		this.setState({
			replyAttachment: true,
			replyAttachmentData: attachment
		})
	}

	onClearReplyAttachment = () => {
		this.setState({
			replyAttachment: false,
			replyAttachmentData: null
		})
	}

	render() {
		const {
			messages,
			activeChat,
			setChat,
			loading,
			isPrivate,
			userbanned,
			t = (val) => val //перевод
		} = this.props;

		const { message, replyAttachment, replyAttachmentData } = this.state;

		const messageList = messages.map((mes, index) => {
			return (
				<MessageItem
					key={index}
					user_id={mes.user_id}
					id={mes.id}
					reply={mes.reply}
					replyAttachmentData={replyAttachmentData}
					name={mes.first_name + " " + mes.last_name}
					first_name={mes.first_name}
					last_name={mes.last_name}
					ad={mes.range === 4}
					sponsor={mes.range === 5}
					message={mes.message}
					avatar={mes.avatar}
					isPrivate={isPrivate}
					time={mes.time}
					t={t}
					onSetReplyAttachment={this.onSetReplyAttachment}
				/>
			);
		});

		return (
			<div id="scenes-chat">
				{!isPrivate && (
					<div className="chat-tabs row m-0">
						<div
							onClick={() => setChat("general")}
							className={
								activeChat === "general"
									? "chat-tab-item-active col"
									: "chat-tab-item col"
							}>
							<div className="tab-label">{t('Общий чат')}</div>
						</div>
						<div
							onClick={() => setChat("sponsor")}
							className={
								activeChat === "sponsor"
									? "chat-tab-item-active col"
									: "chat-tab-item col"
							}>
							<div className="tab-label">
								{t('Чат с организаторами')}
							</div>
						</div>
						<div
							onClick={() => setChat("spiker")}
							className={
								activeChat === "spiker"
									? "chat-tab-item-active col"
									: "chat-tab-item col"
							}>
							<div className="tab-label">{t('Вопросы спикеру')}</div>
						</div>
					</div>
				)}
				<div className="chat-message-container">
					{!loading && (
						<RSC ref="scrollbar" className="mes-box">
							{messageList}
						</RSC>
					)}

					{loading && <Spinner />}
				</div>
				<div className="chat-input-container">
					{(replyAttachment) && <div className="message-attachment">
						<div className="reply-attachment">
							<div className="reply-icon"></div>
							<div className="reply-name"><Translit value={replyAttachmentData.first_name + ' ' + replyAttachmentData.last_name} /> </div>
							<div className="close-btn" onClick={() => this.onClearReplyAttachment()}></div>
						</div>
					</div>}

					{(!userbanned) && <div style={{ display: 'flex', flexDirection: "row" }}>
						<div className="chat-input-wrapper">
							{!loading && (
								<InputEmoji
									value={message}
									onChange={this.onChangeMessageValue}
									cleanOnEnter
									className="chat-input"
									placeholder={t("Введите ваше сообщение")}
									onEnter={this.onSubmit}
									borderRadius={10}
									ref="chatInput"
								/>
							)}
						</div>

						<button className="send-mes-btn" onClick={this.onSubmit}>
							<div
								className="send-mes-btn-icon"
								onClick={this.onSubmit}></div>
						</button>
					</div>
					}

					{(!!userbanned) && <div style={{ display: 'flex', flexDirection: "row" }}>
						<div className="chat-input-wrapper-banned">
							Доступ к чату ограничен
						</div>
					</div>
					}
				</div>
			</div >
		);
	}
}

class MessageItem extends React.Component {
	linkifyDecorator = (href, text, key) => (
		<a href={href} key={key} target="_blank">
			{text}
		</a>
	);

	render() {
		const { user_id, id, name, first_name, last_name, ad, sponsor, message, avatar, isPrivate, time, onSetReplyAttachment, reply, t } = this.props;

		// let origin = "https://onlineshow.marketingforum.com.ua";
		let origin = api.origin;

		let newAvatar = api.auth.getAvatarLocation() + avatar;

		return (
			<>
				{(reply) && <div className={reply ? "message-item replied" : "message-item"}>

					<div className="mes-info">
						<Link
							to={"/profile/" + user_id}
							target="_blank"
							className="mes-info-name">
							<Translit value={reply.first_name + ' ' + reply.last_name} />

							<span
								className="mes-info-status"
								style={{
									padding: `${sponsor ? "5px" : "0px"}`,
									backgroundColor: `${sponsor ? "#FCD128" : "white"
										}`,
								}}>
								{sponsor ? "UMF" : ""}
							</span>
						</Link>
						<div className="mes-info-content">
							<Linkify componentDecorator={this.linkifyDecorator}>
								{reply.message}
							</Linkify>
						</div>
					</div>
				</div>}

				<div
					className={reply ? "message-item bordered" : "message-item"}
					style={{ backgroundColor: `${ad ? "#FCD128" : "white"}` }}>
					<div className="mes-photo-wrapper">
						<Link to={"/profile/" + user_id} target="_blank">
							<div
								className="mes-photo"
								style={
									avatar
										? { backgroundImage: `url(${newAvatar})` }
										: {}
								}></div>
						</Link>
					</div>

					<div className="mes-info">
						<Link
							to={"/profile/" + user_id}
							target="_blank"
							className="mes-info-name">
							<Translit value={name} />

							<span
								className="mes-info-status"
								style={{
									padding: `${sponsor ? "5px" : "0px"}`,
									backgroundColor: `${sponsor ? "#22D671" : "white"
										}`,
								}}>
								{sponsor ? "UMF" : ""}
							</span>
						</Link>
						<div className="mes-info-content">
							<Linkify componentDecorator={this.linkifyDecorator}>
								{message}
							</Linkify>
						</div>
					</div>
					<div className="mes-options">
						<div className="mes-time">{time}</div>
						{!isPrivate && <div className="mes-reply-btn" onClick={
							() => {
								onSetReplyAttachment({
									id: id,
									first_name: first_name,
									last_name: last_name,
									message: message
								})
							}
						}>{t("ответить")} </div>}
					</div>
				</div>
			</>
		);
	}
}

export default ScenesChat;
