import React, { useState } from 'react';

import {
  initiateGetResult,
  initiateLoadMoreArtists
} from '../actions/result';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SearchResult from './SearchResult';
import SearchForm from './SearchForm';
import Header from './Header';

const Dashboard = (props) => {
  const [selectedCategory, setSelectedCategory] = useState('artists');
  const { isValidSession, history } = props;

  const handleSearch = (searchTerm) => {
    if (isValidSession()) {
      props.dispatch(initiateGetResult(searchTerm)).then(() => {
        setSelectedCategory('artists');
      });
    } else {
      history.push({
        pathname: '/',
        state: {
          session_expired: true
        }
      });
    }
  };

  const loadMore = async (type) => {
    if (isValidSession()) {
      const { dispatch, artists } = props;
      switch (type) {
        case 'artists':
          await dispatch(initiateLoadMoreArtists(artists.next));
          break;
        default:
      }
    } else {
      history.push({
        pathname: '/',
        state: {
          session_expired: true
        }
      });
    }
  };

  const setCategory = (category) => {
    setSelectedCategory(category);
  };

  const { artists } = props;
  const result = { artists };

  return (
    <React.Fragment>
      {isValidSession() ? (
        <div>
          <Header />
          <SearchForm handleSearch={handleSearch} />
          <SearchResult
            result={result}
            loadMore={loadMore}
            setCategory={setCategory}
            selectedCategory={selectedCategory}
            isValidSession={isValidSession}
          />
        </div>
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: {
              session_expired: true
            }
          }}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    artists: state.artists,
  };
};

export default connect(mapStateToProps)(Dashboard);
