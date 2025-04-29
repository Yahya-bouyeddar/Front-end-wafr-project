import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Pour l'instant on simule un login simple
    if (email && password) {
      console.log('Connexion réussie');
      navigate('/dashboard');
    } else {
      alert('Veuillez remplir tous les champs');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-lg shadow-md space-y-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center">Se connecter</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Login;
