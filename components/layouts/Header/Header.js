import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, withRouter } from "next/router";
import MobileMenu from "./MobileMenu";

import {
  // Dropdown,
  Navbar,
  Nav,
  NavDropdown,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import {
  FaSearchengin,
  FaCartArrowDown,
  FaNotesMedical,
  FaBell,
} from "react-icons/fa";
import MainMenu from "./Menu";

import Menu, { SubMenu, Item as MenuItem, Divider } from "rc-menu";
import "rc-menu/assets/index.css";
import { getCartsAction } from "../../../store/actions/orders/CartAction";
import { getCategoriesList } from "./_redux/MenuAction/MenuAction";

import Menubar from "react-responsive-multi-level-menu";
import SearchInput from "../../search-input/SearchInput";
import { getUserDataAction, handleLogoutUser } from "../../getUserData/Action/UserDataAction";

function handleSelect(info) {
  console.log("selected ", info);
}

function handleDeselect(info) {
  console.log("deselect ", info);
}
const titleRight = <span>Electronics</span>;
const titleRight1 = <span>Smartphone</span>;
const titleRight2 = <span>sub menu 2</span>;
const titleRight3 = <span>sub menu 3</span>;

const leftMenu = (
  <Menu
    multiple
    onSelect={handleSelect}
    onDeselect={handleDeselect}
    defaultSelectedKeys={["2", "1-1"]}
  >
    <SubMenu title={titleRight} key="1">
      <MenuItem key="1-1">0-1</MenuItem>
      <MenuItem key="1-2">0-2</MenuItem>
    </SubMenu>
    <MenuItem key="3">outer</MenuItem>
    <SubMenu title={titleRight1} key="4">
      <MenuItem key="4-1">inner inner</MenuItem>
      <Divider />
      <SubMenu key="4-2" title={titleRight2}>
        <MenuItem key="4-2-1">inn</MenuItem>
        <SubMenu title={titleRight3} key="4-2-2">
          <MenuItem key="4-2-2-1">inner inner</MenuItem>
          <MenuItem key="4-2-2-2">inner inner2</MenuItem>
        </SubMenu>
      </SubMenu>
    </SubMenu>
    <MenuItem disabled key="disabled">
      disabled
    </MenuItem>
    <MenuItem key="4-3">outer3</MenuItem>
  </Menu>
);
// 
const menuItems = [
  {
    value: "Fashion",
    items: [
      {
        value: "Men",
        items: [
          {
            value: "Shirts"
          }
        ]
      },
      {
        value: "Women",
        items: [
          {
            value: "Jackets"
          },
          {
            value: "T-Shirts"
          },
          {
            value: "Underwear"
          }
        ]
      },
      {
        value: "Children"
      }
    ]
  },
  {
    value: "Electronics"
  },
  {
    value: "Furnitures",
    items: []
  },
  {
    value: "Jewelery&watches",
    items: []
  }
];
const color = "#348DF4";
const animation = ["fadeIn", "fadeOut"];
const Header = () => {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.carts);
  const categoriesMenuList = useSelector(
    (state) => state.MenuReducer.categoriesMenuList
  );

  useEffect(() => {
    dispatch(getCartsAction());
    dispatch(getCategoriesList());
    dispatch(getUserDataAction());
  }, []);

  const [enableMobileMenu, setEnableMenu] = useState(false);

  const printLogo = () => {
    return (
      <div className="">
        <Link href="/" className="text-white">
          <Navbar.Brand href="/">
            <img src="/images/logos/logo-white.png" />
            <span className="logo-bottom-text">#UnboxHappiness</span>
          </Navbar.Brand>
        </Link>
      </div>
    );
  }

  const printCartMenu = () => {
    return (
      <>
        <Link href="/cart">
          <FaCartArrowDown className="header-carticon pointer" />
        </Link>
        <span className="badge counter">
          <span className="count">
            {carts ? carts.length : 0}
          </span>
        </span>
      </>
    )
  }
  const router = useRouter()
  const userData = useSelector((state) => state.UserDataReducer.userData)

  const handleLogout = () => {
    dispatch(handleLogoutUser());
    router.push('/login')
    // if (userData === null) {
    //   router.push('/login')

    // }
  }

  return (
    <div className="main-menu">
      <div className="main-menu-desktop-mode">
        <div className="header">
          <div className="container-fluid">
            <div className="row">
              <Navbar>
                {printLogo()}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <div className="">
                    <Nav className="header-category mr-3">
                      <NavDropdown title="Category" id="basic-nav-dropdown">
                        <div className="menu-div-category">
                          <Menu
                            multiple
                            onSelect={handleSelect}
                            onDeselect={handleDeselect}
                            defaultSelectedKeys={["2", "1-1"]}
                          >
                            {categoriesMenuList &&
                              categoriesMenuList.map((category) =>
                                category.childs.length === 0 ? (
                                  <MenuItem key={category.short_code}>
                                    {category.name}
                                  </MenuItem>
                                ) : (
                                  <SubMenu
                                    title={category.name}
                                    key={category.short_code}
                                  >
                                    {category.childs.length > 0
                                      ? category.childs.map((subCategory) => (
                                        <MenuItem key={subCategory.short_code}>
                                          {subCategory.name}
                                        </MenuItem>
                                      ))
                                      : ""}
                                  </SubMenu>
                                )
                              )}
                          </Menu>
                        </div>
                      </NavDropdown>
                    </Nav>
                  </div>
                  <div className="col-lg-6 ">
                    <SearchInput />
                  </div>
                  <div className="col-lg-6">
                    <div className="rightnavbar d-flex flex-row ml-3">
                      <div className="loginguest">
                        {
                          userData === null ?
                            <>
                              <p>Hey user/Guest</p>
                              <Link href="/login">
                                <span className="text-white pointer">
                                  Sign up or Login
                                 </span>
                              </Link>
                            </> :
                            //  <p>{userData.first_name}</p>
                            <DropdownButton className="user-profile" id="dropdown-item-button" title={userData && userData.first_name}>
                              <Link className="dropdown-item" href="/profile">
                                <Dropdown.Item as="button">
                                  <i className="fas fa-user mr-2"></i> Profile
                              </Dropdown.Item>
                              </Link>
                              <Dropdown.Item as="button" onClick={() => handleLogout()}><i className="fas fa-sign-out-alt mr-2"></i>Logout</Dropdown.Item>
                            </DropdownButton>
                        }

                      </div>
                      <div className="mt-1 ml-3">
                        <button className="offer-zone-btn">Offer Zone</button>
                      </div>
                      <div>
                        <Link href="/notification">
                          <FaBell className="header-carticon pointer" />
                        </Link>
                        <span className="badge counter pointer">
                          <span className="count">0</span>
                        </span>
                      </div>
                      <div>
                        {printCartMenu()}
                      </div>
                      {/* <div>
                        <Toggle checkedChildren={"EN"} unCheckedChildren={"BN"} />
                      </div> */}
                    </div>
                  </div>
                </Navbar.Collapse>
              </Navbar>
            </div>
          </div>
        </div>
      </div>

      <div className="main-menu-mobile-mode navbar-sticky-top mb-5">
        <div className="float-left">
          {printLogo()}
        </div>
        <div className="float-left mt-3">
          <SearchInput />
        </div>
        <div className="float-left mt-3">
          {printCartMenu()}
        </div>
        <div className="float-right">
          <i
            className="fas fa-bars menu-bar-icon"
            onClick={() => setEnableMenu(!enableMobileMenu)}
          ></i>
          <div className="mobile-menu-area">
            {enableMobileMenu && <MobileMenu categories={categoriesMenuList} />}
          </div>
        </div>
        <div className="clearfix"></div>
      </div>

      <div className="menu main-menu-desktop-mode">
        <MainMenu />
      </div>
    </div>
  );
};

export default withRouter(Header);
