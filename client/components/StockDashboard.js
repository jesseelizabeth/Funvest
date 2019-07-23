import React, { Component } from 'react';
import { connect } from 'react-redux';
import StockInfo from './StockInfo';
import News from './News';
import CompanyInfo from './CompanyInfo';
import { getQuote, getLogo, getCompanyInfo } from '../store/stockQuote';
import { fetchNews } from '../store/news';
import { getGame } from '../store/game';
import { fetchPortfolio } from '../store/portfolio';
import { getColor } from '../../utils';
import LoadingScreen from './LoadingScreen';

class StockDashbaord extends Component {
  constructor() {
    super();
    this.state = {
      color: 'grey-text',
    };
  }
  async componentDidMount() {
    const { symbol } = this.props.match.params;
    const { id } = this.props.location.state;
    await this.props.getQuote(symbol);
    this.props.getCompanyInfo(symbol);
    this.props.fetchNews(symbol);
    this.props.getGame(id);
    this.props.fetchPortfolio(id);
    // get color for stock price
    const { close, latestPrice } = this.props.stock;
    const color = getColor(close, latestPrice);
    this.setState({ color });
  }
  render() {
    const { symbol } = this.props.match.params;
    const {
      stock,
      loading,
      companyInfo,
      news,
      loadingNews,
      balance,
      game,
    } = this.props;
    if (loading || loadingNews) return <LoadingScreen />;
    return (
      <div className="container">
        <div className="row">
          <StockInfo
            stock={stock}
            color={this.state.color}
            loading={loading}
            balance={balance}
            game={game}
          />
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
  balance: state.portfolio.portfolio.balance,
  game: state.game.selected,
});

const mapDispatch = {
  getQuote,
  getLogo,
  getCompanyInfo,
  fetchNews,
  getGame,
  fetchPortfolio,
};

export default connect(
  mapState,
  mapDispatch
)(StockDashbaord);
