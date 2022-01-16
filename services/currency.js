
/**
 * Get all currencies in this system
 *
 * @since 1.0.0
 *
 * @return array currencies as array
 */
export function getCurrencies () {
    const currencies = [
        {
            'slug'     : 'en',
            'code'     : 'BDT', // USD
            'lang'     : 'EN',
            'sign'     : '৳', //$
            'flag_link': '/images/languages/usa.png',
            'active'   : false
        },
        {
            'slug'     : 'bn',
            'code'     : 'BDT',
            'lang'     : 'বাংলা',
            'sign'     : '৳',
            'flag_link': '/images/languages/bn.png',
            'active'   : true
        }
    ];

    return currencies;
}

/**
 * Get active currency
 *
 * @since 1.0.0
 *
 * @param string printableLabel the params of currencies array
 *
 * @return string|null|object active currency data
 */
export function activeCurrency ( printableLabel = '' ) {
    if(process.browser) {
        let activeLang = localStorage.getItem('lang') || 'en';

        if ( typeof activeLang === 'undefined' || ( activeLang !== 'en' && activeLang !== 'bn' ) ) {
            activeLang = 'en';
        }

        let activeCurrency     = null;
        const currencies       = getCurrencies();
        const activeCurrencies = currencies.filter(cur => cur.slug === activeLang);

        if ( typeof activeCurrencies !== 'undefined' && activeCurrencies !== null && activeCurrencies.length > 0 ) {
            activeCurrency = activeCurrencies[0];
        }

        if ( printableLabel === '' || printableLabel === null || activeCurrency === null ) return activeCurrency;

        return activeCurrency[printableLabel] || '';
    }

    return '';
}

export function activeLang ( printableLabel = '' ) {
    return en;
}

/**
 * Format Currency amount to nice formatting
 *
 * @since 1.0.0
 *
 * @param float amount
 * @param string thousandSeparator
 * @param string prefix by default it would be the sign of taka
 *
 * @return string Currency format component with data
 */
export function formatCurrency (amount, thousandSeparator = true, prefix = activeCurrency('sign')) {
    var CurrencyFormat = require('react-currency-format');

    amount = Math.floor(isNumeric(amount)) ? Math.floor(parseFloat(amount)) : 0;

    return <CurrencyFormat value={amount} displayType={'text'} thousandSeparator={thousandSeparator} prefix={prefix} />;
}

/**
 * Check if given value is numeric or not
 *
 * @param string|int|undefined|null value
 *
 * @return boolean
 */
function isNumeric(value) {
    return !isNaN(parseFloat(value)) && !isNaN(value - 0);
}