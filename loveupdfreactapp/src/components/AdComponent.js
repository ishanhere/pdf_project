import React from "react";

export default class AdComponent extends React.Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    if (Math.floor(Math.random() * 10) % 2 == 0) {
      return (
        <ins
          class="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-8065152953492967"
          data-ad-slot="8288871795"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      );
    } else {
      return (
        <ins
          class="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-8065152953492967"
          data-ad-slot="2284708404"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      );
    }
  }
}
