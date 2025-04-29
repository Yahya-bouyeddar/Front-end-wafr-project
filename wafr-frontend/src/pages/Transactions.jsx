import { useEffect, useState } from 'react';
import axios from 'axios';

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Appeler l'API backend pour récupérer les transactions
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des transactions', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Liste des Transactions</h1>

      <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
        <thead className="bg-gray-700">
          <tr>
            <th className="text-left p-3">ID</th>
            <th className="text-left p-3">Téléphone Client</th>
            <th className="text-left p-3">Montant</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id} className="border-b border-gray-700 hover:bg-gray-600">
              <td className="p-3">{transaction.id}</td>
              <td className="p-3">{transaction.clientPhone}</td>
              <td className="p-3">{transaction.amount} MAD</td>
              <td className="p-3">{transaction.status}</td>
              <td className="p-3">{new Date(transaction.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
