import firebase from './firebase'

export default async function changeOrder(data) {
  const placeOrder = firebase.app().functions('europe-west1').httpsCallable('changeOrder')
  return placeOrder({ ...data })
}