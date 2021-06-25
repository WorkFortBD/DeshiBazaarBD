import React, { useEffect, memo } from "react";

// third party imports
import { useRouter } from 'next/router';
import { Navbar } from "react-bootstrap";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

// local imports
import { getMenuListData } from "./_redux/HeaderAction/HeaderAction";

const HeaderMenu = ({ toggleNav }) => {
  const { menuList } = useSelector((state) => state.HeaderReducer);
  const router       = useRouter();
  const dispatch     = useDispatch();

  useEffect(() => {
    dispatch(getMenuListData());
  }, []);

  /**
   * Click Menu Link & Redirect to that page
   * 
   * @since 1.0.0
   * 
   * @param string categorySlug
   * 
   * return void
   */
  const clickMenuLink = ( categorySlug ) => {
    router.push(`/products?category=${categorySlug}`);
  }

  return (
    <div className="menu_list">
      <Navbar.Collapse id={toggleNav}>
        <Menu
          menuButton={
            <MenuButton className="font-weight-bold">
              <img
                src="/images/logos/menu.png"
                className="menu pr-2"
                style={{ width: 30 }}
              />
              {"ALL CATEGORIES"}
            </MenuButton>
          }
          key={1}
        >
          {menuList.map((category, i) => {
            if (category.childs.length === 0) {
              return <MenuItem onClick={() => clickMenuLink(category.short_code)} key={i}>{category.name}</MenuItem>;
            } else {
              return (
                <SubMenu key={i} label={category.name}>
                  {category.childs.map((subCategory, i) => {
                    if (subCategory.childs.length === 0) {
                      return <MenuItem key={i} onClick={() => clickMenuLink(subCategory.short_code)}>{subCategory.name}</MenuItem>;
                    } else {
                      return (
                        <SubMenu key={i} label={subCategory.name} onClick={() => clickMenuLink(subCategory.short_code)}>
                          {subCategory.childs.map((subCtgOne, i) => (
                            <MenuItem key={i} onClick={() => clickMenuLink(subCtgOne.short_code)}>{subCtgOne.name}</MenuItem>
                          ))}
                        </SubMenu>
                      );
                    }
                  })}
                </SubMenu>
              );
            }
          })}
        </Menu>

        {menuList.length > 0 &&
          menuList.map((category, i) => (
            <Menu
              menuButton={
                <MenuButton>
                  {category.name}{" "}
                  <FontAwesomeIcon
                    className="custom-fontAwesome"
                    icon={faCaretDown}
                  />
                </MenuButton>
              }
              key={i}
            >
              {category.childs.length > 0 &&
                category.childs.map((subCategory, i) => {
                  if (subCategory.childs.length === 0) {
                    return <MenuItem onClick={() => clickMenuLink(subCategory.short_code)} key={i}>{subCategory.name}</MenuItem>;
                  } else {
                    return (
                      <SubMenu key={i} label={subCategory.name}>
                        {subCategory.childs.length > 0 &&
                          subCategory.childs.map((subCtgOne, i) => (
                            <MenuItem onClick={() => clickMenuLink(subCtgOne.short_code)} key={i}>{subCtgOne.name}</MenuItem>
                          ))}
                      </SubMenu>
                    );
                  }
                })}
            </Menu>
          ))}
      </Navbar.Collapse>
    </div>
  );
};

export default memo(HeaderMenu);
