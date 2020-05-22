export function setUserToLocalStorage(name, phone) {
   const userData = JSON.parse(localStorage.getItem('customerData'));

   if (!userData || userData.customerPhone !== phone || userData.customerName !== name) {
      localStorage.setItem('customerData', JSON.stringify({ customerName: name, customerPhone: phone }));
   }
}
