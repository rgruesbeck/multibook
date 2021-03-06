/**
 *
 * Search
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'react-router-redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  changeQuery,
  submitQuery,
  selectTune,
} from './actions';
import reducer from './reducer';
import makeSelectSearch from './selectors';
import saga from './saga';

import SearchBar from 'components/SearchBar';
import SearchResults from 'components/SearchResults';

import styled from 'styled-components';

const Branding = styled.div`
  font-size: 7.5vw;
  text-align: center;
  color: navy;
  min-width: 15rem;
  max-width: 40rem;
  margin: 30vh auto;
  display: ${(props) => props.disabled ? 'none' : 'block'};
  @media (max-width: 40rem) {
    font-size: 12vw;
  }
  h1 {
    font-size: 100%;
    margin: none;
  }
  h2 {
    font-size: 50%;
    font-weight: 200;
    margin: none;
  }
`;


export class Search extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <SearchBar
          onChange={this.props.onChangeQuery}
          onSubmit={this.props.onSubmitQuery}
        />
        <Branding disabled={this.props.search.query}>
          <h1>multiBook</h1>
          <h2>a digital real book</h2>
        </Branding>
        <SearchResults
          search={this.props.search}
          onSelect={this.props.onSelectTune}
        />
      </div>
    );
  }
}

Search.propTypes = {
  onChangeQuery: PropTypes.func.isRequired,
  query: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  search: makeSelectSearch(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeQuery: (evt) => dispatch(changeQuery(evt.target.value)),
    onSelectTune: (evt) => dispatch(push('/tunes/#' + evt.currentTarget.dataset.id.toLowerCase().replace(/ /g, '-'))),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'search', reducer });
const withSaga = injectSaga({ key: 'search', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Search);
