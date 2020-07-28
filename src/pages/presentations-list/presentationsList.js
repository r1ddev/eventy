import React from "react";
import "./presentationsList.scss";
import withApiService from "../../components/hoc/with-api-service";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { Link } from "react-router-dom";
import Header from "../../components/header";
import { isMobile } from "react-device-detect";
import { withTranslation } from "react-i18next";

class PresentationsList extends React.Component {
  folders = [
    {
      folder: "day1",
      files: [
        {
          name: this.props.t("Презентация Smit.studio"),
          weight: "",
          link: "https://drive.google.com/drive/folders/1K9EdTVHS-WIDND31GK5oCYcvqHr7ZQzW?usp=sharing",
        },
      ],
    },
    {
      folder: "day2",
      files: [
        {
          name: "Сцена 1 “Big Marketing Talks”",
          weight: "",
          link: "https://drive.google.com/drive/folders/1-TdHihBjquDLxfzBZ-chhJh05lXmzz84?usp=sharing",
        },
        {
          name: "Сцена 2 “Кабинет маркетинг-директора”",
          weight: "",
          link: "https://drive.google.com/drive/folders/1i627qExXrXdKhN_x7pcsMxfYT6xxjhLQ?usp=sharing",
        },
        {
          name: "Сцена 3 “Expert's Corner”",
          weight: "",
          link: "https://drive.google.com/drive/folders/1lL1gco6pPfYZ0h0W6lqHxdf7EPz82872?usp=sharing",
        },
      ],
    },
  ];

  render() {
    const { data } = this.props.user;

    return (
      <div id="presentations-list">
        {!isMobile && (
          <Header data={data}>
            <></>
          </Header>
        )}

        <div className="container pt-3">
          {((this.folders.find((folder) => folder.folder == this.props.match.params.folder) || []).files || []).map(
            (file, index) => {
              return (
                <a href={file.link} target="_blank" className="file-link">
                  <div className="file row" key={index}>
                    <div className="col-md">{file.name}</div>
                    <div className="col-md-auto">{file.weight}</div>
                  </div>
                </a>
              );
            }
          )}
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
  withTranslation(),
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(PresentationsListContainer);
