import { firestore } from './firebase';

export async function registerNewCustomer(name, phone, organization) {
  const storage = JSON.parse(localStorage.getItem('customerData'));

  if (!storage || storage.phone !== phone || storage.name !== name || storage.organization !== organization) {
    localStorage.setItem('customerData', JSON.stringify({ name, phone, organization }));

    const data = {
      name,
      phone,
      organization,
      platform: navigator.platform,
      timestamp: new Date().toLocaleString(),
    };

    try {
      await firestore.collection('users-test').doc(phone.substr(3)).set(data, { merge: true });
    } catch (e) {
      console.error(e);
    }
  }
}
