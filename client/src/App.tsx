// import axios from "axios";
import HireDetail from "./pages/HireDetail";

function App() {
  // axios({
  //   method: "post",
  //   url: "http://gigker.iptime.org:8080/members", // https://3cd6-211-227-190-110.jp.ngrok.io/members",
  //   // data: {
  //   //   email: "email@email.com",
  //   //   nickName: "testUser",
  //   //   password: 1234,
  //   //   about: "about me!",
  //   // },
  // }).then((res) => console.log(res));

  return (
    <div>
      <HireDetail />
    </div>
  );
}

export default App;
