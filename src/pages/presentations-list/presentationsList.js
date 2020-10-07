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
          name: this.props.t("SMART CITIES 2020: MOVING BEYOND THE HYPE"),
          weight: "Володимир Гук",
          link: "https://drive.google.com/drive/folders/1869EXaswXW7Ml3FhJ7MV1Nz8oxNNgQIf?usp=sharing",
        },
        {
          name: this.props.t("Виступає без презентації"),
          weight: "Вадим Бортник",
          link: "https://drive.google.com/drive/folders/1nn3gAVUPRoe4dcOpfcBqTAx-fttukiQ1?usp=sharing",
        },
        {
          name: this.props.t("Цифрова трансформація регіонів."),
          weight: "Михайло Лазарєв",
          link: "https://drive.google.com/drive/folders/1oyzNKDcBR2bCFnJpqI8uNy-6fLdEGI3k?usp=sharing",
        },
        {
          name: this.props.t("Як ефективно приймати легітимні рішення в умовах карантину"),
          weight: "Сергій Мартинчук",
          link: "https://drive.google.com/drive/folders/18mQQ5ms1zYxB7CLlbgQtmiaiMPgco3Pp?usp=sharing",
        },
        {
          name: this.props.t("Big Data: реальні завдання – реальні рішення"),
          weight: "Сергій Бориславський",
          link: "https://drive.google.com/drive/folders/1ElU8f3n2dhvnGl9K6iyyhnOwT5qOnDPP?usp=sharing",
        },
        {
          name: this.props.t("5 простих кроків до смарт транспорту в наших містах"),
          weight: "Дмитро Беспалов",
          link: "https://drive.google.com/drive/folders/13dvaGQGeW9XkFHg08DmYjzQk5YWGJ1VN?usp=sharing",
        },
        {
          name: this.props.t("Майбутнє інфраструктуриміств епоху невизначеності"),
          weight: "Володимир Шульмейстер",
          link: "https://drive.google.com/drive/folders/10VkvgK53YMtyoNzYtFN2iDIXLTYAWsQO?usp=sharing",
        },
        {
          name: this.props.t("Smart cities and future mobility. An insight to hydrogen mobility!"),
          weight: "Сергій Бориславський",
          link: "https://drive.google.com/drive/folders/1ElU8f3n2dhvnGl9K6iyyhnOwT5qOnDPP?usp=sharing",
        },
        {
          name: this.props.t("Big Data: реальні завдання – реальні рішення"),
          weight: "Dr. Peyman Khodabakhsh, Sebastian Martin",
          link: "https://drive.google.com/drive/folders/1SMmbm16fHgd7BjfNSyiDc17EOGHW2oMn?usp=sharing",
        },
        {
          name: this.props.t("7 кроків, завдяки яким Сингапур (і не тільки) позбавляється від заторів"),
          weight: "Данило Тонкопій",
          link: "https://drive.google.com/drive/folders/1ke-OTY1da4-jqlLfuTZC9XQ4vQTLKmRT?usp=sharing",
        },
        {
          name: this.props.t("Підключений уряд, розумне місто і розумний транспорт. Досвід Азербайджану."),
          weight: "Володимир Орлов",
          link: "https://drive.google.com/drive/folders/1H00plJskN2lOcbpIj8nDXTHs0zSGNA3L?usp=sharing",
        },
        {
          name: this.props.t("Архітектура — атрактор якості ком'юніті"),
          weight: "Олександр Попов",
          link: "https://drive.google.com/drive/folders/1teUDef6OkOFHQCk19zgkVPSvCyGlWJRh?usp=sharing",
        },
        {
          name: this.props.t("Інклюзивність та універсальний дизайн у міському просторі, як запорука дотримання рівних прав для всіх громадян в смарт містах"),
          weight: "Олександр Ворона",
          link: "https://drive.google.com/drive/folders/1scuzoPNUJeTDvtqahWLZPOdJnRfyQ2hQ?usp=sharingg",
        },
        {
          name: this.props.t("Відеоролик Smart-поводження з побутовими відходами. Відеоролик Obuhіvmіskvtorresursi_OMVR"),
          weight: "Армен Полатьян",
          link: "https://drive.google.com/drive/folders/1B6w-UBTB2l5eDHtjNW90yRZ7RUinFQzH?usp=sharing",
        },
        {
          name: this.props.t("Екологічна безпека – проблеми і шляхи вирішення з допомогою водневих технологій"),
          weight: "Володимир Присяжнюк",
          link: "https://drive.google.com/drive/folders/1JYHGsoEbX9iZP97WLFcF3dB-xDcdC3ij?usp=sharing",
        },
        {
          name: this.props.t("Сучасні компоненти комплексних рішень для Smart City"),
          weight: "Володимир Гук",
          link: "https://drive.google.com/drive/folders/1qnzwPL9WQ7SS4wwbqo8jllq4uL-0c5-z?usp=sharing",
        },
        {
          name: this.props.t("Підключений уряд, розумне місто і розумний транспорт. Досвід Азербайджану."),
          weight: "Володимир Орлов",
          link: "https://drive.google.com/drive/folders/1H00plJskN2lOcbpIj8nDXTHs0zSGNA3L?usp=sharing",
        },
        {
          name: this.props.t("Quantela - Smart city platform & case studies"),
          weight: "Srikanth Mantha",
          link: "https://drive.google.com/drive/folders/1LLnq1Wv2N9oDJMdo-yN_LcS5LDqM0_XI?usp=sharing",
        },
        {
          name: this.props.t("Пропозиція за рішеннями для індивідуальної роботи і комплектів для переговорних кімнат"),
          weight: "Анастасія Макова",
          link: "https://drive.google.com/drive/folders/1ZHBV0vnK1AOFxsEdP3d_EuVNy0P3-n3x?usp=sharing",
        },
        {
          name: this.props.t("Цифрова трансформація на основі IoT рішень "),
          weight: "Максим Куликов",
          link: "https://drive.google.com/drive/folders/1Pi5nND6cuPk-w6h3q-R5EVSMlUMT2sAh?usp=sharing",
        },
        {
          name: this.props.t("Повністю захищена система відеозасідань з можливістю авторизованого голосування або голосування з ЕЦП"),
          weight: "Ігор Сукайло",
          link: "https://drive.google.com/drive/folders/17zKFxIAsYxmrzOIcjVoKSESPE3XejwQ3?usp=sharing",
        },
        {
          name: this.props.t("Утеплення фасадів: сучасні вимоги до систем утеплення фасадів. Інноваційне рішення Caparol"),
          weight: "Вячеслав Любімцев",
          link: "https://drive.google.com/drive/folders/1VigCEq7IDDuqOdgJ5o_2oGyIEL2YIm3_?usp=sharing",
        },
        {
          name: this.props.t("Urbio - інтегрована платформа Smart City"),
          weight: "Вероніка Курсонова",
          link: "https://drive.google.com/drive/folders/1xTy2KOc_8ZYcq_vSb7jaFCgQuCpIKv-t?usp=sharing",
        },
        {
          name: this.props.t("Решение Aruba для отслеживания контактов в рамках борьбы с COVID-19"),
          weight: "В'ячеслав Самойленко",
          link: "https://drive.google.com/drive/folders/1GjRtGN1b7ba986yV2hU8Gay4YlcgYXO3?usp=sharing",
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
