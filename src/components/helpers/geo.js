import jsonp from 'jsonp';

const apiUrl = 'https://kladr-api.ru/api.php';
let delayTimer;

export default {
  getCity: function(query, callback) {
  	clearTimeout(delayTimer);
  	delayTimer = setTimeout( function() {
  		let url = `${apiUrl}?contentType=city&query=${query}&withParent=1`;
    	jsonp(url, {}, callback);
  	}, 500);
    
  }
}