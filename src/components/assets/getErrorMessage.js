export default function(code) {
  switch(code) {
    case 'auth/wrong-password': return 'Неверный пароль для указанного адреса эл. почты или Ваша учетная запись не имеет пароля (вход через социальные сети)';
    case 'auth/network-request-failed': return 'Проблемы с доступностью сети: превышено ожидание, отсутствует соединение или сервер недоступен';
    case 'auth/user-not-found': return 'Учетная запись с таким адресом электронной почты не найдена';
    case 'auth/invalid-email': return 'Неверный адрес электронной почты';
    default: return false
  }
}