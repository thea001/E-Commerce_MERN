import * as React from "react";
import { useAuth } from "../context/Auth/AuthContext";

import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart/CartContext";
import logo from "../assets/img/logo.png";
function Navbar() {
  const { username, isAuthenticated, logout } = useAuth();
  const { cartItems, removeItemInCart } = useCart();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleMyOrders = () => {
    navigate("/my-orders");
    handleCloseUserMenu();
  };

  const handleRemoveItem = (productId: string) => {
    removeItemInCart(productId);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subTotal = cartItems.reduce((sum, item) => sum + item.unitPrice, 0);

  const handleLogout = () => {
    logout();
    navigate("/");
    handleCloseUserMenu();
  };

  const handleCart = () => {
    navigate("/cart");
  };

  return (
    <>
      <header>
        {/* TOP HEADER */}
        <div id="top-header">
          <div className="container">
            <ul className="header-links pull-left">
              <li>
                <a href="#">
                  <i className="fa fa-phone"></i> +021-95-51-84
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-envelope-o"></i> email@email.com
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-map-marker"></i> 1734 Stonecoal Road
                </a>
              </li>
            </ul>
            <ul className="header-links pull-right">
              {isAuthenticated && (
                <li>
                  <a onClick={handleLogout} href="#">
                    <i className="fa fa-caret-square-o-left"></i> Logout
                  </a>
                </li>
              )}
              {!isAuthenticated && (
                <li>
                  <a onClick={() => navigate("/login")} href="#">
                    <i className="fa fa-user-o"></i> My Account
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
        {/* /TOP HEADER */}

        {/* MAIN HEADER */}
        <div id="header">
          <div className="container">
            <div className="row">
              {/* LOGO */}
              <div className="col-md-3">
                <div className="header-logo">
                  <a
                    onClick={() => {
                      navigate("/");
                    }}
                    className="logo"
                  >
                    <img src={logo} alt="Logo" />
                  </a>
                </div>
              </div>
              {/* /LOGO */}

              {/* SEARCH BAR */}
              <div className="col-md-6">
                <div className="header-search">
                  <form>
                    <select className="input-select">
                      <option value="0">All Categories</option>
                      <option value="1">Category 01</option>
                      <option value="2">Category 02</option>
                    </select>
                    <input className="input" placeholder="Search here" />
                    <button className="search-btn">Search</button>
                  </form>
                </div>
              </div>
              {/* /SEARCH BAR */}

              {/* ACCOUNT */}
              <div className="col-md-3 clearfix">
                <div className="header-ctn">
                  {/* Wishlist */}
                  <div>
                    <a href="#">
                      <i className="fa fa-heart-o"></i>
                      <span>Your Wishlist</span>
                      <div className="qty">2</div>
                    </a>
                  </div>
                  {/* /Wishlist */}

                  {/* Cart */}
                  <div className="dropdown">
                    <a
                      className="dropdown-toggle"
                      data-toggle="dropdown"
                      aria-expanded="true"
                    >
                      <i className="fa fa-shopping-cart"></i>
                      <span>Your Cart</span>
                      <div className="qty">{totalItems}</div>
                    </a>
                    <div className="cart-dropdown">
                      {/* Cart Items List */}
                      <div className="cart-list">
                        {cartItems.map((item) => (
                          <div className="product-widget" key={item.productId}>
                            <div className="product-img">
                              <img
                                src={item.image || "./img/default-product.png"}
                                alt={item.title || "Product"}
                              />
                            </div>
                            <div className="product-body">
                              <h3 className="product-name">
                                <a href="#">{item.title || "Product name"}</a>
                              </h3>
                              <h4 className="product-price">
                                <span className="qty">{item.quantity}x</span>$
                                {item.unitPrice?.toFixed(2)}
                              </h4>
                            </div>
                            <button
                              className="delete"
                              onClick={() => handleRemoveItem(item.productId)}
                            >
                              <i className="fa fa-close"></i>
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Cart Summary */}
                      <div className="cart-summary">
                        <small>{totalItems} Item(s) selected</small>
                        <h5>SUBTOTAL: ${subTotal?.toFixed(2)}</h5>
                      </div>

                      {/* Cart Buttons */}
                      <div className="cart-btns">
                        <a
                          onClick={() => {
                            handleCart();
                          }}
                        >
                          View Cart
                        </a>
                        <a
                          onClick={() => {
                            navigate("/checkout");
                          }}
                        >
                          Checkout <i className="fa fa-arrow-circle-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* /Cart */}

                  {/* Menu Toogle */}
                  <div className="menu-toggle">
                    <a href="#">
                      <i className="fa fa-bars"></i>
                      <span>Menu</span>
                    </a>
                  </div>
                  {/* /Menu Toogle */}
                </div>
              </div>
              {/* /ACCOUNT */}
            </div>
          </div>
        </div>
        {/* /MAIN HEADER */}
      </header>
      <nav id="navigation">
        {/* container */}
        <div className="container">
          {/* responsive-nav */}
          <div id="responsive-nav">
            {/* NAV */}
            <ul className="d-flex flex-row main-nav nav navbar-nav">
              <li className="active">
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Hot Deals</a>
              </li>
              <li>
                <a href="#">Categories</a>
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
            {/* /NAV */}
          </div>
          {/* /responsive-nav */}
        </div>
        {/* /container */}
      </nav>
    </>
    /*<AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between",alignItems:"center" ,width: "100%"}}>
            <Button variant='text' sx={{color:'#fff'}} onClick={() => navigate("/")}>
            <Box sx= {{display: "flex", flexDirection:"row", alignItems:"center"}}>


          <AdbIcon sx={{ display: 'flex', mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
            }}
          >
            Tech Store
          </Typography>
          </Box>
          </Button>

          <Box
              gap={4}
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
           <IconButton aria-label="cart"  onClick={handleCart}>
                <Badge badgeContent={cartItems.length} color="secondary">
                  <ShoppingCart sx= {{color:'#ffffff'}} />
                </Badge>
              </IconButton>
            {isAuthenticated ?<>
              <Tooltip title="Open settings">
             <Grid container alignItems="Center" justifyContent="center" gap={2}>
              <Grid item>
              <Typography>{username}</Typography>
              </Grid>
              <Grid item>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={username || ''} src="/static/images/avatar/2.jpg" />
              </IconButton>
              </Grid>
              </Grid>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
               <MenuItem onClick={handleMyOrders}>
                  <Typography sx={{ textAlign: 'center' }}>My orders</Typography>
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                  <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                </MenuItem>

            </Menu>
            </> : (<Button variant="contained" color="success" onClick={handleLogin}>Login</Button>)}
            
          </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>*/
  );
}
export default Navbar;
