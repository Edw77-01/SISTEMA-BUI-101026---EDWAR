
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">

      <h1 className="footer-title">NUESTRAS REDES</h1>

      <div className="rednet">

        <div className="social-card instagram" id="insdiv">
          <li className="social-icon" id="insli">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </li>

          <h1 className="social-name" id="insh1">
            Instagram
          </h1>
        </div>


        <div className="social-card whatsapp" id="wsdiv">
          <li className="social-icon" id="wsli">
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
          </li>

          <h1 className="social-name" id="wsh1">
            WhatsApp
          </h1>
        </div>


        <div className="social-card facebook" id="facediv">
          <li className="social-icon" id="facebookli">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
          </li>

          <h1 className="social-name" id="facebookh1">
            Facebook
          </h1>
        </div>


        <div className="social-card youtube" id="youdiv">
          <li className="social-icon" id="youli">
            <a href="#">
              <i className="fab fa-youtube"></i>
            </a>
          </li>

          <h1 className="social-name" id="youh1">
            YouTube
          </h1>
        </div>


        <div className="social-card x" id="xdiv">
          <li className="social-icon" id="xli">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-x-twitter"></i>
            </a>
          </li>

          <h1 className="social-name" id="xh1">
            X
          </h1>
        </div>

      </div>


      <div className="contactdiv">

        <div className="contact">

          <h2>Copyright - SISTEMA BUI 2025°</h2>

          <h2>SOPORTE</h2>

          <h2>AYUDA</h2>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
