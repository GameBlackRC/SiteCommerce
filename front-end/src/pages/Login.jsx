import { Link } from "react-router-dom";

const Login = () => {
    return(
        <>
            <main className="main-form">
                <section className="login-content">
                    <h2>Connectez-vous</h2>
                    <form className="main-form" action="/connexion" method="post">
                        <p>Entrez vos informations</p>
                        <label for="mail">E-mail</label>
                        <input type="email" name="mail" id="mail" />
                        <label for="password">Mot de passe</label>
                        <input type="password" name="password" id="password" />
                        <Link to="/sign-up" className="a-sign-up">Créer un compte</Link>
                        <input type="submit" value="Se connecter" />
                    </form>
                </section>
            </main>
        </>
    );
};

export default Login;