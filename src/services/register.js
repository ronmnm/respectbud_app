import { firestore } from './firebase';

export async function registerNewCustomer(name, phone, organization) {
   const storage = JSON.parse(localStorage.getItem('customerData'));

   if (!storage || storage.customerPhone !== phone || storage.customerName !== name) {
      localStorage.setItem('customerData', JSON.stringify({ customerName: name, customerPhone: phone }));

      const data = {
         name,
         phone,
         organization,
         platform: navigator.platform,
         timestamp: new Date().toLocaleString(),
      };

      try {
         await firestore
            .collection('users-test')
            .doc(`${name} ${phone.substr(3)}`)
            .set(data, { merge: true });
      } catch (e) {
         console.error(e);
      }
   }
}
