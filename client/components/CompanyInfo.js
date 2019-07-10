import React, { Component } from 'react';

class CompanyInfo extends Component {
  render() {
    const { companyInfo, quote } = this.props;
    return (
      <div>
        <br />
        <div className="row">
          <div className="divider" />
          <h6 className="bold">About</h6>
          <br />
          <div>{companyInfo.description}</div>
        </div>
        <div className="row">
          <div className="col l4">
            <div className="bold">CEO</div>
            <div>{companyInfo.CEO}</div>
          </div>
          <div className="col l4">
            <div className="bold">Employees</div>
            <div>{companyInfo.employees}</div>
          </div>
          <div className="col l4">
            <div className="bold">Sector</div>
            <div>{companyInfo.sector}</div>
          </div>
        </div>
        <div className="row">
          <div className="col l4">
            <div className="bold">Market Cap</div>
            <div>{quote.marketCap}</div>
          </div>
          <div className="col l4">
            <div className="bold">Average Volume</div>
            <div>{quote.avgTotalVolume}</div>
          </div>
          <div className="col l4" />
        </div>
        <div className="divider" />
      </div>
    );
  }
}

export default CompanyInfo;
