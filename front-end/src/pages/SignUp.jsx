import { Link } from "react-router-dom";

const SignUp = () => {
    return(
        <>
            <main className="main-form">
                <section className="login-content">
                    <h2>Inscrivez-vous</h2>
                    <form className="main-form" action="/connexion" method="post">
                        <p>Entrez vos informations</p>
                        <label for="login">Identifiant</label>
                        <input type="text" name="login" id="login" />
                        <label for="mail">E-mail</label>
                        <input type="email" name="mail" id="mail" />
                        <label for="password">Mot de passe</label>
                        <input type="password" name="password" id="password" />
                        <input type="submit" value="Se connecter" />
                    </form>
                </section>
            </main>
        </>
    );
};

export default SignUp;