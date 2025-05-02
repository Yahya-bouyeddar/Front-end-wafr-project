import api from "../services/api"; // si tu utilises api.js avec token
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FireBase";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';






function Login() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      // 1. Connexion avec Firebase
      const firebaseUser = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await firebaseUser.user.getIdToken(); // ⬅️ token Firebase
  
      // 2. Envoyer le token Firebase à ton backend pour générer un JWT
      const response = await api.post("/auth/firebase-login", {
        token: idToken,
      });
  
      // 3. Stocker le JWT renvoyé par ton backend
      localStorage.setItem("token", response.data.token);
      login()
  
      // 4. Rediriger + marquer comme connecté
      navigate("/dashboard");
  
    } catch (error) {
      console.error(error);
      alert("Erreur de connexion");
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-lg shadow-md space-y-6 w-full max-w-md"
      >
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
