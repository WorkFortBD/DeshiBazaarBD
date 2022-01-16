import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchLoadingSkeleton from "./SearchLoadingSkeleton";
import { searchProductAction } from "./_redux/Action/SearchInputAction";
import { useRouter } from "next/router";
import { translate } from "../../services/translation/translation";
import { formatCurrency } from "../../services/currency";
import axios from "axios";
import { toggleBackdrop } from "../../_redux/store/action/globalAction";
import Image from "../master/Image/Image";
import Link from 'next/link';

const SearchInput = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pathname } = router;
  
  const [search, setSearch] = useState("");

  const [isSearchInputTouch, setIsSearchInputTouch] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  
  const [isSuggestionVisible, setIsSuggestionVisible] = useState(false);
  const [searchType, setSearchType] = useState("product"); // products || shops || brands
  const [searchHistory, setSearchHistory] = useState([]);

  const suggestions = useSelector((state) => state.productSearch.products);
  const loading = useSelector((state) => state.productSearch.loading);
  const firstRenderRef = useRef(true);
  const searchRef = useRef();



  const searchByList = [
    {label: 'products', id: 'product'},
    {label: 'shops', id: 'shop'},
    {label: 'brands', id: 'brand'},
    {label: 'Categories', id: 'category'},
  ];

  const searchProduct = (e) => {
    setIsSearched(false);
    setIsSearchInputTouch(true)
    setIsSuggestionVisible(false);
    setSearch(e.target.value);
  };

  const onKeyDownHandler = (key) => {
    if(!search) return;
    if(key === "Enter") {
      setIsSearched(true)
      setIsSearchInputTouch(true)

      const searchHistories = updateSearchHistory(search, null)

      setSearchHistory(searchHistories);

      // searchRef.current.value = ""

      // setSearch(""); @todo 

      router.push({
        pathname: '/products',
        query: {
          search: encodeURIComponent(search),
          filter: 'paginate_no__40'
        }
      })
      .then((_) => {
        window.scrollTo(0, 0);
      });
    }
  }

  const searchClick = (searchData) => {
    if(!search) return;
    setIsSearched(true)
    setIsSearchInputTouch(true)
    // searchRef.current.value = ""

    // setSearch(""); @todo 

    setSearchType('product');
    dispatch(toggleBackdrop());

    const uriEncodedSlug = encodeURIComponent(searchData.slug);

    if (searchData.is_item) {
      const searchHistories = updateSearchHistory(searchData.search_name, searchData.slug, true)
      setSearchHistory(searchHistories);

      const uri = `/products/${uriEncodedSlug}`;
      router
        .push(uri)
        .then((_) => {
          window.scrollTo(0, 0);
          dispatch(toggleBackdrop())
        });
    } else if (searchData.is_category) {
      router
      .push(`/products?category=${uriEncodedSlug}&name=${encodeURIComponent(searchData.search_name)}&filter=paginate_no__40`)
      .then((_) => {
        window.scrollTo(0, 0);
        dispatch(toggleBackdrop());
      });
    } else if (searchData.is_brand) {
      router
      .push(`/products?brand=${uriEncodedSlug}&name=${encodeURIComponent(searchData.search_name)}&filter=paginate_no__40`)
        .then((_) => {
          window.scrollTo(0, 0);
          dispatch(toggleBackdrop());
        });
    } else if (searchData.is_shop) {
      router
        .push(`/store/${uriEncodedSlug}?name=${encodeURIComponent(searchData.search_name)}`)
        .then((_) => {
          window.scrollTo(0, 0);
          dispatch(toggleBackdrop());
        });
    }
  };

  const searchByListHandler = (id) => {
    setSearchType(id);
  }

  // useEffect(() => {
  //   console.log('pathname  from useeffect => ', pathname);
  // }, [pathname])

  useEffect(() => {
    const getSearchHistory = JSON.parse(localStorage.getItem('search-history')) || [];

    if(pathname === '/') {
      setIsSearched(true)
      searchRef.current.value = "";
      setSearch("")
    }
    setSearchHistory(getSearchHistory)

  }, [JSON.stringify(searchHistory), pathname])

  useEffect(() => {

    if(firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }

    const source = axios.CancelToken.source();

    dispatch(searchProductAction({search: search, type: searchType}, source));

    if(!search) {
      setSearchType('product')
    }

    return () => {
      source.cancel()
    }
  }, [search, searchType])

  const inputFocusHandler = () => {
    setIsSearched(false)
    if(search) return;
    setIsSearchInputTouch(false)

    if(searchHistory.length === 0) return;
    
    setIsSuggestionVisible(true);
  }

  const searchHistoryClickHandler = searchQuery => {
    searchRef.current.value = searchQuery || ""
    
    setSearch(searchQuery);
    setIsSearched(true);
    setIsSuggestionVisible(false);
    setIsSearchInputTouch(true)
  }

  const toggleInputAction = () => {
    setIsSuggestionVisible(false)
    if(isSuggestionVisible && !search) {
      setIsSearched(true)
    }

    if(search) {
      setSearch("")
      searchRef.current.value = ""
    }
  }

  const clearSearchHistory = () => {
    setSearchHistory([]);
    setIsSuggestionVisible(false);
    localStorage.setItem('search-history', JSON.stringify([]));
  }  

  return (
    <>
      <input
        ref={el => searchRef.current = el}
        className="search-input font-14"
        placeholder={translate("Search Products, Brands and Shop")}
        onFocus={inputFocusHandler}
        // onBlur={() => setTimeout(() => {
        //   setIsSearched(true);
        //   setIsSuggestionVisible(false);
        // }, 150)}
        onChange={(e) => searchProduct(e)}
        onKeyDown={e => onKeyDownHandler(e.key)}
      />

      <div style={{position: 'absolute', zIndex: '100', right: 'calc(63px + 15px)', top: '17px', fontSize: '12px'}}>
        <span className="color-main pointer" onClick={toggleInputAction} style={{fontWeight: '500'}} >
          {
            (isSuggestionVisible && !search) ? 'close' : (search) && 'remove'
          }
          </span>
      </div>

      <div className="header-custom-prepend pointer" onClick={() => onKeyDownHandler('Enter')} >
        <i className="fas fa-search"></i>
      </div>

        {
          isSuggestionVisible && !search && !isSearched && (
            <div className="search-suggestion-area search-history modal-scrollbar">
              <div className="d-flex justify-content-between">
                <span className="d-inline-block py-2 px-2 font-12 font-weight-500 pointer">Search history</span>
                <span className="d-inline-block py-2 px-2 font-12 font-weight-500 pointer" onClick={clearSearchHistory}>Clear</span>
              </div>
              {
                searchHistory && searchHistory.map((searchItem, index) => (
                  <div 
                    className="pointer search-history-item"
                    key={index}
                    onClick={() => searchHistoryClickHandler(searchItem.name)}
                  >
                    <div>
                      <Link href={{
                        pathname: searchItem?.isItem ? `/products/${searchItem?.slug}` : '/products',
                        query: {
                          search: !searchItem?.isItem ? searchItem?.name : '',
                          filter: !searchItem?.isItem ? 'paginate_no__40' : ''
                        }
                      }}>
                        <a className="d-block py-2 px-3 text-decoration-none" style={{color: '#333'}}>
                          <span className="text-ellipsis">
                            {searchItem.name}
                          </span>
                        </a>
                      </Link>
                    </div>
                  </div>
                ))
              }

            </div>
          )
        }

      {search.length > 0 && !isSearched && (
        <div className="search-suggestion-area modal-scrollbar">
          <div className="p-2" style={{backgroundColor: '#f7f7f7'}}>
              <div className="d-flex">
                  {
                    searchByList.map((item, index) => (
                      <span
                        key={index}
                        className={`search-suggestion-area-search_by-item d-inline-block p-2 mr-3 ${searchType === item.id ? 'active' : ''}`}
                        onClick={() => searchByListHandler(item.id)} >
                        {item.label}
                      </span>
                    )) 
                  }
              </div>
          </div>

          {
            search && loading && isSearchInputTouch && <SearchLoadingSkeleton/>
          }

          {
            search && suggestions.length === 0 && !loading && (
              <div
                className="text-danger text-center pt-1" >
                <p style={{lineHeight: '1.5rem', paddingTop: '10px'}}>
                  Sorry, No Product found by "{search}" <br></br>
                  Please try with another keyword
                </p>
              </div>
            )
          }

          {suggestions.map((searchItem, searchIndex) => (
            <div
              className="search-suggestion-item"
              key={searchIndex}
              onClick={() => searchClick(searchItem)} >
                <div className="search-suggestion-item__img-box">
                  {/* <img src={searchItem.search_image_url ? searchItem.search_image_url : '/images/default/fallback-image.png'} alt={searchItem.name} /> */}
                  <Image src={searchItem.search_image_url} alt={searchItem.name} width={60} height={60} />
                </div>

              <div className="search-suggestion-item__info">
                <h5 className="search-suggestion-item__title">
                  {searchItem.search_name}
                </h5>
                {searchItem.search_price > 0 && (
                  <p className="search-suggestion-item__search-price">{formatCurrency(+searchItem.search_price)}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const updateSearchHistory = (search, slug = null, isItem = false) => {
  const searchHistories = JSON.parse(localStorage.getItem('search-history'))|| [];
  const currentSearch = {id: new Date().getTime(), name: search, slug: slug, isItem: isItem}

  searchHistories.unshift(currentSearch);
  localStorage.setItem('search-history', JSON.stringify(searchHistories))

  return searchHistories;
}

export default SearchInput;