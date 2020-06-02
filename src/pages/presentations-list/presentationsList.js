import React from "react";
import "./presentationsList.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { Link } from "react-router-dom";
import Header from "../../components/header";

const folders = [
	{
		folder: "day1",
		files: [
			{
				name: "Сцена 1 “Big Marketing Talks”",
				weight: "",
				link: "https://drive.google.com/drive/folders/1y-kqwqZ_8a3FNoS3LqhwO2sQ_gW3Beyw?usp=sharing",
			},
			{
				name: "Сцена 2 “Кабинет маркетинг-директора”",
				weight: "",
				link: "https://drive.google.com/drive/folders/1E3n48YF5E0c-E8MdvTcQECN6puyZzkbR?usp=sharing",
			},
		],
	},
	{
		folder: "day2",
		files: [
			{
				name:
					"Сцена 1 “Big Marketing Talks”",
				weight: "",
				link: "https://drive.google.com/drive/folders/1-TdHihBjquDLxfzBZ-chhJh05lXmzz84?usp=sharing",
			},
			{
				name: "Сцена 2 “Кабинет маркетинг-директора”",
				weight: "",
				link: "https://drive.google.com/drive/folders/1i627qExXrXdKhN_x7pcsMxfYT6xxjhLQ?usp=sharing",
			}, {
				name: "Сцена 3 “Expert's Corner”",
				weight: "",
				link: "https://drive.google.com/drive/folders/1lL1gco6pPfYZ0h0W6lqHxdf7EPz82872?usp=sharing",
			}
		],
	},
];

class PresentationsList extends React.Component {
	componentDidMount() { }

	render() {
		const { data } = this.props.user;

		return (
			<div id="presentations-list">
				<Header data={data}>
					<></>
					<div className="col d-flex align-items-center p-0">
						<Link to="/messages/5" className="action-link">
							Связь <br />с организаторами
						</Link>
					</div>
				</Header>
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

const mapStateToProps = ({ user }) => {
	return { user };
};

const mapDispatchToProps = (dispatch, { apiService }) => {
	return {};
};

export default compose(
	withApiService(),
	connect(mapStateToProps, mapDispatchToProps)
)(PresentationsListContainer);
