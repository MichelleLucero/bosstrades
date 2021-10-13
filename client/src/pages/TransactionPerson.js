import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Search from '../components/search/Search';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const TransactionPerson = () => {
  const classes = useStyles();
  const { person_id } = useParams();

  const [transactions, setTransactions] = useState({ person: {}, trans: [] });

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await api.get(`/search/person/${person_id}`);
        setTransactions(response.data);
      } catch (err) {}
    };
    getTransactions();
  }, [person_id]);

  return (
    <div>
      <Search />
      <h1>Transactions</h1>
      <p>{transactions.person.name}</p>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align='right'>Date of Trans</TableCell>
              <TableCell align='right'>Transactions Code</TableCell>
              <TableCell align='right'>Amount</TableCell>
              <TableCell align='right'>Buy or Sale</TableCell>
              <TableCell align='right'>Price</TableCell>
              <TableCell align='right'>Shares owned after trans</TableCell>
              <TableCell align='right'>Direct or indirect ownership</TableCell>
              <TableCell align='right'>Ticker</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.trans &&
              transactions.trans.map((tran) => {
                const {
                  trans_uid,
                  title,
                  date_of_trans,
                  transactions_code,
                  amount,
                  adq_or_disp,
                  price,
                  shares_owned_after_trans,
                  direct_or_indirect_ownership,
                  ticker,
                  // person_uid,
                } = tran;

                return (
                  <TableRow key={trans_uid}>
                    <TableCell component='th' scope='row'>
                      {title}
                    </TableCell>
                    <TableCell align='right'>{date_of_trans}</TableCell>
                    <TableCell align='right'>{transactions_code}</TableCell>
                    <TableCell align='right'>{amount}</TableCell>
                    <TableCell align='right'>{adq_or_disp}</TableCell>
                    <TableCell align='right'>{price}</TableCell>
                    <TableCell align='right'>
                      {shares_owned_after_trans}
                    </TableCell>
                    <TableCell align='right'>
                      {direct_or_indirect_ownership}
                    </TableCell>
                    <TableCell align='right'>
                      <Link to={'/transaction/company/' + ticker}>
                        {ticker}
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default TransactionPerson;
