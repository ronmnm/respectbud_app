import firebase from './firebase'

export default async function notifyBot(data) {
  const notifyBot = firebase.app().functions('europe-west1').httpsCallable('notifyBot')
  return notifyBot({ ...data })
}
