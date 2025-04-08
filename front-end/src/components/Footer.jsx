import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <p>&copy; {new Date().getFullYear()} · Site Commerce</p>
        </footer>
    );
};

export default Footer;