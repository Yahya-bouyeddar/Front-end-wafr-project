import { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [searchPhone, setSearchPhone] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [transactions, setTransactions] = useState([]);

  // Charger tous les utilisateurs
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      console.log(response);
      
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des users", error);
    }
  };

  // Charger les transactions d’un user spécifique
  const fetchTransactions = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/transactions/user/${userId}`
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des transactions", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBlock = async (id) => {
    await axios.put(`http://localhost:5000/api/users/${id}/block`);
    fetchUsers();
  };

  const handleUnblock = async (id) => {
    await axios.put(`http://localhost:5000/api/users/${id}/unblock`);
    fetchUsers();
  };

  // Quand on clique sur une ligne user
  const handleUserClick = (id) => {
    setSelectedUserId(id);
    fetchTransactions(id);
  };

  // Filtrage local
  const filteredUsers = users.filter((user) =>
    user.phoneNumber.includes(searchPhone)
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Liste des Shops (Users)</h1>

      {/* Champ de recherche */}
      <input
        type="text"
        placeholder="Rechercher par numéro"
        value={searchPhone}
        onChange={(e) => setSearchPhone(e.target.value)}
        className="mb-4 p-2 rounded bg-gray-700 text-white w-full max-w-md"
      />

      <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden mb-8">
        <thead className="bg-gray-700">
          <tr>
            <th className="text-left p-3">ID</th>
            <th className="text-left p-3">Nom du Shop</th>
            <th className="text-left p-3">Téléphone</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-700 hover:bg-gray-600 cursor-pointer"
              onClick={() => handleUserClick(user.id)}
            >
              <td className="p-3">{user.id}</td>
              <td className="p-3">{user.shopName}</td>
              <td className="p-3">{user.phoneNumber}</td>
              <td className="p-3">{user.status}</td>
              <td className="p-3">
                {user.status === "active" ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBlock(user.id);
                    }}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
                  >
                    Bloquer
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnblock(user.id);
                    }}
                    className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white"
                  >
                    Débloquer
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Affichage des transactions */}
      {selectedUserId ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Transactions du Shop ID {selectedUserId}
          </h2>

          <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left p-3">ID</th>
                <th className="text-left p-3">Téléphone client</th>
                <th className="text-left p-3">Montant</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(transactions) && transactions.length > 0 ? (
                transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-gray-700 hover:bg-gray-600"
                  >
                    <td className="p-3">{tx.id}</td>
                    <td className="p-3">{tx.clientPhone}</td>
                    <td className="p-3">{tx.amount} MAD</td>
                    <td className="p-3">{tx.status}</td>
                    <td className="p-3">
                      {new Date(tx.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border-b border-gray-700 hover:bg-gray-600">
                  <div className="w-full flex items-center justify-center p-16">No Transactions Found</div>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

export default Users;
