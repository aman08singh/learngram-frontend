import React from "react";

export default function ValidationTexts(props) {
  const { src, alt, text } = props;
  return (
    <>
      <div>
        <img src={src} alt={alt} />
      </div>
      <p>{text}</p>
    </>
  );
}
