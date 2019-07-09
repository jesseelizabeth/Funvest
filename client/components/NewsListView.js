import React from 'react';

const News = props => {
  const { headline, image, source, url } = props.singleNews;
  return (
    <a
      className="black-text"
      href={url}
      target="_blank"
      rel="noreferrer noopener"
    >
      <div className="row">
        <div className="col l8">
          <div>{source}</div>
          <div className="bold">{headline}</div>
        </div>
        <div className="col l4">
          <img id="img" src={image} />
        </div>
      </div>
    </a>
  );
};

export default News;
