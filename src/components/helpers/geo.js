import jsonp from 'jsonp';

const apiUrl = 'https://kladr-api.ru/api.php';

export default {
  getCity: function(query, callback) {
    let url = `${apiUrl}?contentType=city&query=${query}&withParent=1`;
    return jsonp(url, {}, callback);
  }
}