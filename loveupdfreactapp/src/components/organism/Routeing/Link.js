import React from "react";

const Link = ({ className, href, children }) => {
  const onClick = (event) => {
    if (event.metaKey || event.ctrlKey) return;

    event.preventDefault();
    window.history.pushState({}, "", href);
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };
  return (
    <a
      href={href}
      onClick={onClick}
      className={className}
      style={{ color: "white", marginLeft: "10px", marginRight: 10 }}
    >
      {children}
    </a>
  );
};
export default Link;
