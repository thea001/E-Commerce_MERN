const Footer = () => {
  return (
    <>
      <div id="newsletter" className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="newsletter">
                <p>
                  Sign Up for the <strong>NEWSLETTER</strong>
                </p>
                <form>
                  <input
                    className="input"
                    type="email"
                    placeholder="Enter Your Email"
                  />
                  <button className="newsletter-btn">
                    <i className="fa fa-envelope"></i> Subscribe
                  </button>
                </form>
                <ul className="newsletter-follow">
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-pinterest"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer id="footer " className="  text-bg-dark">
        {/* Top Footer */}
        <div className="section   py-5">
          <div className="container">
            <div className="row">
              {/* About Us */}
              <div className=" col-md-3 col-sm-6 mb-4">
                <div className="footer">
                  <h3 className="footer-title">About Us</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut.
                  </p>
                  <ul className="footer-links list-unstyled">
                    <li>
                      <a href="#">
                        <i className="bi bi-geo-alt"></i> 1734 Stonecoal Road
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-telephone"></i> +021-95-51-84
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-envelope"></i> email@email.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Categories */}
              <div className="col-md-3 col-sm-6 mb-4">
                <div className="footer">
                  <h3 className="footer-title">Categories</h3>
                  <ul className="footer-links list-unstyled">
                    <li>
                      <a href="#">Hot deals</a>
                    </li>
                    <li>
                      <a href="#">Laptops</a>
                    </li>
                    <li>
                      <a href="#">Smartphones</a>
                    </li>
                    <li>
                      <a href="#">Cameras</a>
                    </li>
                    <li>
                      <a href="#">Accessories</a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Information */}
              <div className="col-md-3 col-sm-6 mb-4">
                <div className="footer">
                  <h3 className="footer-title">Information</h3>
                  <ul className="footer-links list-unstyled">
                    <li>
                      <a href="#">About Us</a>
                    </li>
                    <li>
                      <a href="#">Contact Us</a>
                    </li>
                    <li>
                      <a href="#">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="#">Orders and Returns</a>
                    </li>
                    <li>
                      <a href="#">Terms & Conditions</a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Service */}
              <div className="col-md-3 col-sm-6 mb-4">
                <div className="footer">
                  <h3 className="footer-title">Service</h3>
                  <ul className="footer-links list-unstyled">
                    <li>
                      <a href="#">My Account</a>
                    </li>
                    <li>
                      <a href="#">View Cart</a>
                    </li>
                    <li>
                      <a href="#">Wishlist</a>
                    </li>
                    <li>
                      <a href="#">Track My Order</a>
                    </li>
                    <li>
                      <a href="#">Help</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <hr />
        <div id="bottom-footer" className="text-bg-dark section">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <ul className="footer-payments">
                  <li>
                    <a href="#">
                      <i className="fa fa-cc-visa"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-credit-card"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-cc-paypal"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-cc-mastercard"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-cc-discover"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-cc-amex"></i>
                    </a>
                  </li>
                </ul>
                <span className="copyright">
                  Copyright &copy; {new Date().getFullYear()} All rights
                  reserved | This template is made with{" "}
                  <i className="fa fa-heart-o" aria-hidden="true"></i> by{" "}
                  <a
                    href="https://colorlib.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Colorlib
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
