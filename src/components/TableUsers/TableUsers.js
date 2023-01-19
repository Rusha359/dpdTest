import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import styles from './TableUsers.module.scss';
import UsersFilter from '../UsersFilter/UsersFilter';
import Pagination from '../Pagination/Pagination';
const BASE_URL = 'http://localhost:3001/results?';
const TableUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const userQuery = searchParams.get('user') || '';

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(BASE_URL + `_page=${currentPage}&_limit=20`);
      setData(res.data);
    };
    fetchData();
  }, [currentPage]);

  return (
    <>
      <UsersFilter setSearchParams={setSearchParams} userQuery={userQuery} />{' '}
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
      <div className={styles.root}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.tr}>
              <th className={styles.th}>Аватар</th>
              <th className={styles.th}>ФИО</th>
              <th className={styles.th}>Пол</th>
              <th className={styles.th}>Страна</th>
              <th className={styles.th}>Дата рождения</th>
              <th className={styles.th}>Адрес электронной почты</th>
              <th className={styles.th}>Телефон</th>
            </tr>
            {data
              .filter(
                (item) =>
                  item.name.title.includes(userQuery) ||
                  item.name.first.includes(userQuery) ||
                  item.name.last.includes(userQuery) ||
                  item.gender.includes(userQuery) ||
                  item.location.country.includes(userQuery) ||
                  item.dob.date.includes(userQuery) ||
                  item.email.includes(userQuery) ||
                  item.phone.includes(userQuery)
              )
              .map((item) => (
                <tr className={styles.tr} key={item.login.uuid}>
                  <td className={styles.td}>
                    {' '}
                    <img src={item.picture.medium} alt={item.name.last} />
                  </td>
                  <td className={styles.td}>
                    {item.name.title} {item.name.first} {item.name.last}
                  </td>
                  <td className={styles.td}>{item.gender}</td>
                  <td className={styles.td}>{item.location.country}</td>
                  <td className={styles.td}>{item.dob.date}</td>
                  <td className={styles.td}>{item.email}</td>
                  <td className={styles.td}>{item.phone}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableUsers;
