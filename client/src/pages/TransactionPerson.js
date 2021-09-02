import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import api from '../utils/api';

const TransactionPerson = () => {
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
      <div>
        <h1>Transactions</h1>
        <p>{transactions.person.name}</p>
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
              // person_uid,
            } = tran;
            return (
              <div key={trans_uid}>
                <p>{title}</p>
                <p>{date_of_trans}</p>
                <p>{transactions_code}</p>
                <p>{amount}</p>
                <p>{adq_or_disp}</p>
                <p>{price}</p>
                <p>{shares_owned_after_trans}</p>
                <p>{direct_or_indirect_ownership}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TransactionPerson;
