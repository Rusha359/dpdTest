import React from 'react';
import { useState } from 'react';
import styles from './UsersFilter.module.scss';

const UsersFilter = ({ setSearchParams, userQuery }) => {
  const [search, setSearch] = useState(userQuery);
  const handelSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const query = form.search.value;

    const params = {};
    if (query.length) params.user = query;

    setSearchParams(params);
  };
  return (
    <div className={styles.root}>
      {' '}
      <form autoComplete="off" onSubmit={handelSubmit}>
        <input
          type="search"
          name="search"
          placeholder="поиск"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>{' '}
        <input type="submit" value="Поиск" className={styles.input}></input>
      </form>
    </div>
  );
};

export default UsersFilter;
