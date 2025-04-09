import { useNavigate, Link } from "react-router-dom";
import React, { useState  } from "react";
import { loginUser } from "../services/api";

const Login = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (element) => {
        element.preventDefault();

        try {
            const response = await loginUser({mail, password});

            if (response) {
                localStorage.setItem("token", response.token)
                localStorage.setItem("user", JSON.stringify(response.user));
                window.location.href = "/compte/"+response.user.id;
            }
        } catch (error) {
            setError("Identifiants incorrects.");
        }
    };

    return(
        <>
            <main className="main-form">
                <section className="login-content">
                    <h2>Connectez-vous</h2>
                    <form className="main-form" onSubmit={handleSubmit}>
                        <p>Entrez vos informations</p>
                        <label htmlFor="mail">E-mail</label>
                        <input type="email" name="mail" id="mail" value={mail} onChange={(element) => setMail(element.target.value)} required />
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" name="password" id="password" value={password} onChange={(element) => setPassword(element.target.value)} required />
                        {error && <p className="error">{error}</p>}
                        <Link to="/sign-up" className="a-sign-up">Créer un compte</Link>
                        <input type="submit" value="Se connecter" />
                    </form>
                </section>
            </main>
        </>
    );
};

export default Login;