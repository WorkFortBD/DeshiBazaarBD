/**
 * key and value separated by '__' and filter item separated by '--' ex: filter=category__groceries--page__2 
 * @param {Object} queries
 * @param {Object} filterItemObj
 * @returns {Object} -> will return updated query object
 */
function parseFilterString(queries, filterItemObj) {
    if(typeof filterItemObj !== 'object' && typeof queries !== 'object') {
        throw new Error('filterItem is not Object; Object required');
    }

    const filterItems = Object.keys(filterItemObj);

    const cloneQueries = {...queries};
    const isFilterQueryPresent = cloneQueries['filter'] && true;
    const filterStr = isFilterQueryPresent && cloneQueries?.filter;

    if(!isFilterQueryPresent) {
        return {
            ...cloneQueries,
            filter: generateFilterStrFromObj(filterItemObj)
        }
    }

    const isMultipleFilterItemFound = countMatched(filterStr) > 0 ? true : false;

    if(!isMultipleFilterItemFound && filterItems.some((filterItem => filterStr.split('__')[0] === filterItem))) {
        return {
            ...cloneQueries,
            filter: generateFilterStrFromObj(filterItemObj)
        }
    }

    const filterItemArr       = filterStr.split?.('--').filter(query => query) || []

    const filterItemSingleArr = generateFilterStrFromObj(filterItemObj).split?.('--').filter(query => query) || [];

    filterItemSingleArr.forEach(item => {
        const FoundFilteredItemIndex  = filterItemArr.findIndex(filterItemWithVal => {
            const filterItem = filterItemWithVal.split?.('__')?.[0] ?? '';
        
            if(filterItem === item.split?.('__')[0]) return true;
        
            return false;
        });

        if(FoundFilteredItemIndex === -1) {
            filterItemArr.push(item)
        } else {
            filterItemArr.splice(FoundFilteredItemIndex, 1, `${item}`);
        }
    });

    const removeDuplicate      = [...new Set(filterItemArr)];
    
    const updatedFilterItemArr = removeDuplicate.join('--');

    return {
        ...cloneQueries,
        filter: updatedFilterItemArr
    }
};


function parseUri(queries) {
    const cloneQueries = {...queries};
    const isFilterQueryPresent = cloneQueries['filter'] && true;
    const filterStr = isFilterQueryPresent ? cloneQueries?.filter : '';

    const filterArr = filterStr && filterStr.split('--') || []; // ['order_by__price', 'order__asc', 'paginate_no__100', 'page__1']
    
    filterArr.forEach(filterItem => {
        const filterKeyAndVal = filterItem.split?.('__') || [];
        const filterKey = filterKeyAndVal?.[0];
        const filterVal = filterKeyAndVal?.[1];
        
        cloneQueries[filterKey] = filterVal;
    });

    const finalUriObj = {
      category: cloneQueries?.['category'] || '',
      name: cloneQueries?.['name'] || '',
      brand: cloneQueries?.['brand'] || '',
      type: cloneQueries?.['type'] || '',
      rating: cloneQueries?.['rating'] || '',
      search: cloneQueries?.['search'] || '',
      page: cloneQueries?.['page'] || '',
      seller_id: cloneQueries?.['seller_id'] || '',
      paginate_no: cloneQueries?.['paginate_no'] || '',
      order_by: cloneQueries?.['order_by'] || '',
      order: cloneQueries?.['order'] || '',
      min_price: cloneQueries?.['min_price'] || '',
      max_price: cloneQueries?.['max_price'] || '',
    };

    const filterParam = Object.keys(finalUriObj)
      .filter((item) => finalUriObj[item])
      .map((item) =>{
        return `${item}=${encodeURIComponent(finalUriObj[item])}`
      })
      .join("&");

    return {filterParam, finalUriObj};
}

function countMatched(str) {
    const re = /--/g
    return ((str || '').match(re) || []).length;
};

function generateFilterStrFromObj(filterItemObj) {
    if(typeof filterItemObj !== 'object') throw new Error('generateFilterStrFromObj obj required');

    let filterStr = "";

    for (const key in filterItemObj) {
        filterStr += `${key}__${filterItemObj[key]}--`
    }

    return filterStr;
};

export { parseFilterString, parseUri };