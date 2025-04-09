import { useNavigate, Link } from "react-router-dom";
import React, { useState  } from "react";
import { createUser } from "../services/api";

const SignUp = () => {
    const [login, setLogin] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (element) => {
        element.preventDefault();

        try {
            const response = await createUser({login, mail, password});

            if (response) {
                localStorage.setItem("token", response.token)
                localStorage.setItem("user", JSON.stringify(response.user));
                console.log(response.user);
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
                    <h2>Inscrivez-vous</h2>
                    <form className="main-form" onSubmit={handleSubmit}>
                        <p>Entrez vos informations</p>
                        <label for="login">Identifiant</label>
                        <input type="text" name="login" id="login" value={login} onChange={(element) => setLogin(element.target.value)} required />
                        <label for="mail">E-mail</label>
                        <input type="email" name="mail" id="mail" value={mail} onChange={(element) => setMail(element.target.value)} required />
                        <label for="password">Mot de passe</label>
                        <input type="password" name="password" id="password" value={password} onChange={(element) => setPassword(element.target.value)} required />
                        {error && <p className="error">{error}</p>}
                        <input type="submit" value="Se connecter" />
                    </form>
                </section>
            </main>
        </>
    );
};

export default SignUp;