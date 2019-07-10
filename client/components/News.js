import React, { Component } from 'react';
import NewsListView from './NewsListView';

class News extends Component {
  render() {
    const { news, symbol } = this.props;
    return (
      <div>
        <h5 className="center-align">Latest {symbol.toUpperCase()} News</h5>
        <br />
        {news.map(singleNews => (
          <NewsListView key={singleNews.datetime} singleNews={singleNews} />
        ))}
      </div>
    );
  }
}

export default News;
