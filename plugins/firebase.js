import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBFnbDNhWG6vg9NHuhPooUBIlcXW_2T2Zw",
  authDomain: "omadesu-33249.firebaseapp.com",
  databaseURL: "https://omadesu-33249-default-rtdb.firebaseio.com",
  projectId: "omadesu-33249",
  storageBucket: "omadesu-33249.appspot.com",
  messagingSenderId: "59670790545",
  appId: "1:59670790545:web:739befe42d60932ffd1a30",
  measurementId: "G-6CHWW1ZGXK"
};

// Initialize Firebase
// ここをif文表記しないと複数回呼ばれるカウントになって
// エラーになるので必ず書く！！！！！！
// https://qiita.com/taskeknight/items/332fb23160b0ab8a52e7
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// これを書かないとdb系がエラーを吐くので書いたほうがよさそう
export default firebase