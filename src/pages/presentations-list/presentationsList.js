import React from "react";
import "./presentationsList.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { Link } from "react-router-dom";

const folders = [
	{
		folder: "speakers",
		files: [
			{
				name: "Креатив в панике: Вдохновение в кризис.pdf",
				weight: "12.5 мб",
				link: "#",
			},
			{
				name: "О важности стабильности в технических решениях.pdf",
				weight: "15 мб",
				link: "#",
			},
		],
	},
	{
		folder: "organizers",
		files: [
			{
				name:
					"organizers Креатив в панике: Вдохновение в кризис.pdf в кризис.pdf в кризис.pdf в кризис.pdf",
				weight: "12.5 мб",
				link: "#",
			},
			{
				name: "organizers О важности стабильности в технических решениях.pdf",
				weight: "15 мб",
				link: "#",
			},
		],
	},
];

class PresentationsList extends React.Component {
	componentDidMount() { }

	render() {
		return (
			<div id="presentations-list">
				<div className="profile-header">
					<div className="container">
						<div className="ava text-right">
							<Link to="/profile">
								<img
									src={require("../../images/networking-card-image-placeholder.png")}
									alt=""
								/>
							</Link>
						</div>
					</div>
				</div>
				<div className="container pt-3">
					{(
						(
							folders.find(
								(folder) => folder.folder == this.props.match.params.folder
							) || []
						).files || []
					).map((file, index) => {
						return (
							<div className="file row" key={index}>
								<div className="col-md">{file.name}</div>
								<div className="col-md-auto">{file.weight}</div>
								<div className="col-md-auto">
									<a href={file.link} target="_blank">
										<img
											src={require("../../images/presentations-download.svg")}
											alt=""
										/>
									</a>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
class PresentationsListContainer extends React.Component {
	render() {
		return <PresentationsList {...this.props} />;
	}
}

const mapStateToProps = () => {
	return {};
};

const mapDispatchToProps = (dispatch, { apiService }) => {
	return {};
};

export default compose(
	withApiService(),
	connect(mapStateToProps, mapDispatchToProps)
)(PresentationsListContainer);
