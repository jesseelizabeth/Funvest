import React, { Component } from 'react';
import { connect } from 'react-redux';
import StockInfo from './StockInfo';
import News from './News';
import CompanyInfo from './CompanyInfo';
import { getQuote, getLogo, getCompanyInfo } from '../store/stockQuote';
import { fetchNews } from '../store/news';
import LoadingScreen from './LoadingScreen';

class StockDashbaord extends Component {
  componentDidMount() {
    const { symbol } = this.props.match.params;
    this.props.getQuote(symbol);
    this.props.getCompanyInfo(symbol);
    this.props.fetchNews(symbol);
  }
  render() {
    const { symbol } = this.props.match.params;
    const { stock, loading, companyInfo, news } = this.props;
    if (loading) return <LoadingScreen />;
    return (
      <div className="container">
        <div className="row">
          <StockInfo stock={stock} />
        </div>
        <div className="row">
          <div className="col">
            <CompanyInfo companyInfo={companyInfo} quote={stock} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <News news={news} symbol={symbol} />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  loading: state.stockQuote.loading,
  stock: state.stockQuote.quote,
  logo: state.stockQuote.logo,
  companyInfo: state.stockQuote.company,
  news: state.news.all,
  loadingNews: state.news.loading,
});

const mapDispatch = {
  getQuote,
  getLogo,
  getCompanyInfo,
  fetchNews,
};

export default connect(
  mapState,
  mapDispatch
)(StockDashbaord);
