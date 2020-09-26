import React from 'react';
import './scenes-banner.scss';

class ScenesBanner extends React.Component {

  state = {
    lasttime: null,
    period: 180000,
    current: 0,
    count: 4,
  }

  timerId = null;

  banners = [
    {
      type: 'simple',
      img: "https://translation.soldoutconf.ru/images/smitbanner.jpg",
      name: 'smit',
      src: "https://smit.events/"
    },
    {
      type: 'simple',
      img: "https://translation.soldoutconf.ru/images/banner1.jpg",
      name: 'smitmerch',
      src: "https://gifts.ru/pro/event?utm_source=soldout&utm_medium=banner&utm_campaign=010_for_event&utm_content=online"
    },
    {
      type: 'simple',
      img: "https://translation.soldoutconf.ru/images/banner2.jpg",
      name: 'nethouse',
      src: 'https://events.nethouse.ru/?utm_source=soldout&utm_medium=banner'
    },
    {

      type: 'complex',
      img: "https://translation.soldoutconf.ru/images/banner3.jpg",
      name: 'complex',
      src: [
        'https://event-manager.eventologia.ru/?utm_source=soldout&utm_medium=banner',
        'https://smm2020.tochkadostupa.pro/?utm_source=soldout&utm_medium=banner',
        'https://targeting.school/?utm_source=soldout&utm_medium=banner',
        'https://partner.markevent.ru/?utm_source=soldout&utm_medium=banner',
      ]
    },
  ]

  componentDidMount() {
    this.timerId = setInterval(() => this.upBanner(), this.state.period);
  }

  upBanner = () => {
    const time = new Date;

    if (time !== this.state.lasttime) {

      this.setState((prev) => ({
        current: (prev.current == prev.count - 1) ? 0 : ++prev.current,
        lasttime: time
      }));
    }
  }



  componentWillUnmount() {
    clearTimeout(this.timerId);
  }

  render() {

    const { isVisible = true } = this.props;
    const { current } = this.state;

    return (
      <>
        {(this.banners[current].type == "simple") && <a id="scenes-banner" target="_blank" href={this.banners[current].src} className={(isVisible) ? '' : 'hidden'}>
          <img alt="" src={this.banners[current].img} />
        </a >}
        {(this.banners[current].type == "complex") && <div id="scenes-banner" target="_blank" href={this.banners[current].src} className={(isVisible) ? 'complex' : 'complex hidden'}>
          <img alt="" src={this.banners[current].img} />
          <div className="link-wrapper">
            <a id="scenes-banner" target="_blank" href={this.banners[current].src[0]}>
            </a >
            <a id="scenes-banner" target="_blank" href={this.banners[current].src[1]}>
            </a >
            <a id="scenes-banner" target="_blank" href={this.banners[current].src[2]}>
            </a >
            <a id="scenes-banner" target="_blank" href={this.banners[current].src[1]}>
            </a >
          </div>
        </div >}
      </>
    )
  }
}

export default ScenesBanner;