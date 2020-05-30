import firebase from './firebase'

export default async function PlaceOrder(data) {
  const placeOrder = firebase.app().functions('europe-west1').httpsCallable('placeOrder')
  try {
    await placeOrder({ ...data })
  } catch (err) {
    console.error(err)
  }
}
