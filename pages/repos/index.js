import {useState, useEffect} from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import {MyHead, Nav, Search, ReposResult} from '../../components';
import { Columns, Pagination, Notification } from 'react-bulma-components';

export default function Repos() {
  const [busqueda, setBusqueda] = useState('');
  const [result, setResult] = useState([]);
  const [errorResult, setErrorResult] = useState('');
  const [loadingResult, setLoadingResult] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const handleInputChange = (inputBusqueda) => {
    const cleanString = inputBusqueda.split(" ").join("");
    setBusqueda(cleanString);
  };

  const handleInputSubmit = async () => {
    //https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}
    const endpoint = `https://api.github.com/search/repositories?q=${busqueda}&page=${page}`;
    setLoadingResult(true);
    const response = await fetch(endpoint);
    const data = await response.json();
    if(response.status === 200){
      checkTotalPages(data.total_count);
      setResult(data.items);
      setErrorResult('');
    }
    if(data?.total_count < 1) {
      setErrorResult('No encontramos repos con ese nombre');
      setResult([]);
    }
    setLoadingResult(false);
  };

  const checkTotalPages = totalItems => {
    const maxTotalApi = totalItems > 1000 ? 1000 : totalItems;
    let myTotalPage = maxTotalApi/30;
    if(myTotalPage % 1 !== 0){
      myTotalPage = Math.trunc(myTotalPage) + 1;
    }
    setTotalPage(myTotalPage);
  };

  const changePage = (e) => setPage(e);

  useEffect(() => handleInputSubmit, [page]);

  const renderRepos = () => {
    if(result?.length > 0 && !loadingResult) return (
      <Columns alignContent='center' breakpoint="tablet">
        {result.map((repo) => (
          <Columns.Column key={repo.id} size={4}>
            <ReposResult repo={repo} />
          </Columns.Column>
        ))}
      </Columns>
    );
  };

  const renderPagination = () => {
    if(totalPage > 1 && errorResult === '') return (
      <Pagination
        showFirstLast
        total={totalPage}
        current={page}
        onChange={e => changePage(e)}
      />
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>find the repo</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"/>
      </Head>
      <main>
        <MyHead>
          FIND THE REPO
        </MyHead>
        <Nav page='repos' />
        <Search
          page='repos'
          busqueda={busqueda}
          handleInputChange={handleInputChange}
          handleInputSubmit={handleInputSubmit}
        />
        {renderRepos()}
        {renderPagination()}
        {errorResult !== '' && (
          <Notification textAlign="center" color="danger">
            <strong>{errorResult}</strong>
          </Notification>
        )}
      </main>
    </div>
  );
}
