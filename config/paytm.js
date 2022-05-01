const paytm = {};
if (process.env.NODE_ENV === 'production') {
    paytm.MID = '';
    paytm.MKEY = '';
    paytm.WEBSITE = '';
    paytm.INDUSTRY_TYPE_ID = '';
    paytm.CHANNEL_ID = '';
    paytm.CALLBACK_URL = '';
    paytm.HOST_URL = 'https://securegw.paytm.in';
} else {
    paytm.MID = 'qQqmZK62891940342332';
    paytm.MKEY = 'ZafSn#eujDj%I%#h';
    paytm.WEBSITE = 'WEBSTAGING';
    paytm.INDUSTRY_TYPE_ID = 'Retail';
    paytm.CHANNEL_ID = 'WEB';
    paytm.CALLBACK_URL = process.env.SERVER_URI + '/api/user/payment';
    paytm.HOST_URL = 'https://securegw-stage.paytm.in';
}
module.exports = paytm;