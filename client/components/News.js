import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNews } from '../store/news';
import NewsListView from './NewsListView';
import LoadingScreen from './LoadingScreen';

class News extends Component {
  componentDidMount() {
    const { symbol } = this.props;
    this.props.fetchNews(symbol);
  }
  render() {
    const { news, loading, symbol } = this.props;
    if (loading) return <LoadingScreen />;
    return (
      <div>
        <h5 className="center-align">Latest {symbol.toUpperCase()} News</h5>
        {news.map(singleNews => (
          <NewsListView key={singleNews.datetime} singleNews={singleNews} />
        ))}
      </div>
    );
  }
}

const mapState = state => ({
  news: state.news.all,
  loading: state.news.loading,
});

const mapDispatch = {
  fetchNews,
};

export default connect(
  mapState,
  mapDispatch
)(News);
