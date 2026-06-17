import "../styles/Footer.css";
function Footer() {
    return (
        <footer className="footer">
            <div className="footer-grid">
                <div>
                    <div className="footer-logo">
                        Web App
                    </div>
                </div>

                <div>
                    <h4>Informacije</h4>
                    <p>O nama</p>
                    <p>Kontakt</p>
                    <p>Uslovi korišćenja</p>
                </div>

                <div>
                    <h4>Kontakt</h4>
                    <p>support@webapp.com</p>
                    <p>+381 60 123 456</p>
                </div>
            </div>
            <div className="footer-bottom">
                © 2026 Web App. Sva prava zadržana.
            </div>
        </footer>
    );
}

export default Footer;