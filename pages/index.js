import {useState, useEffect} from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { MyHead, Nav, Search, UsersResult, Skeleton } from '../components';
import { Section, Columns, Pagination, Notification } from 'react-bulma-components';

export default function Home() {
  const [busqueda, setBusqueda] = useState('');
  const [result, setResult] = useState([]);
  const [errorResult, setErrorResult] = useState('');
  const [loadingResult, setLoadingResult] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const handleInputChange = (inputBusqueda) => {
    const cleanString = inputBusqueda.split(" ").join("");
    setBusqueda(cleanString);
  }
  
  const handleInputSubmit = async () => {
    const endpoint = `https://api.github.com/search/users?q=${busqueda}&page=${page}`;
    setLoadingResult(true);
    const response = await fetch(endpoint);
    const data = await response.json();
    if(response.status === 200 && data.total_count > 0){
      checkTotalPages(data.total_count);
      setResult(data.items);
      setErrorResult('');
    }
    if(data?.total_count < 1) {
      setErrorResult('No encontramos usuarios con ese nombre');
      setResult([]);
    }

    setLoadingResult(false);
  };

  const checkTotalPages = totalItems => {
    const maxTotalApi = totalItems > 1000 ? 1000 : totalItems;
    let myTotalPage = maxTotalApi/30;
    if(myTotalPage % 1 !== 0) {
      myTotalPage = Math.trunc(myTotalPage) + 1;
    }
    setTotalPage(myTotalPage);
  }
  const changePage = (e) => setPage(e);

  useEffect(() => handleInputSubmit, [page]);

  const renderUsers = () => {
    if(result?.length > 0 && !loadingResult) return (
      <Columns alignContent='center' breakpoint="tablet">
        {result.map((user) => (
          <Columns.Column key={user.id} size={4}>
            <UsersResult user={user} />
          </Columns.Column>
        ))}
      </Columns>
    );
    if(result === [] || loadingResult) return (
      <Skeleton/>
    );
  };

  const renderPagination = () => {
    if(totalPage > 1 && errorResult === '') return(
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
        <meta name="description" content="App para buscar usuarios y repositorios de GitHub" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"/>
      </Head>

      <main>
        <MyHead>
          FIND THE REPO
        </MyHead>
        <Section>
          <Nav page='user'/>
        </Section>
        <Section>
          <Search 
            page='user' 
            busqueda={busqueda} 
            handleInputChange={handleInputChange}
            handleInputSubmit={handleInputSubmit}
          />
        </Section>
        {renderUsers()}
        {renderPagination()}
        {errorResult !== '' && (
          <Notification textAlign="center" color="danger">
            <strong>{errorResult}</strong>
          </Notification>
        )}
      </main>
    </div>
  )
}
