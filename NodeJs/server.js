const express = require("express");
var cors = require("cors");

const app = express();

const fs = require("fs");
const bcrypt = require("bcrypt");
const saltRounds = 10;
// const { randomBytes } = require("crypto");
const PORT = 8000;

const imgList = ["ido", "inf", "kwm", "pev", "tgb", "uxq", "yaj", "zrc"];

const DATA = {
  ido: [
    "ldo1EhDfGteKi.png",
    "ldo5ZW2uFcs8C.png",
    "ldo6mc1rU9bfv.png",
    "ldo7BVlxjBNRE.png",
    "ldoCYuVHFtWLb.png",
    "ldoEeJ00854YT.png",
    "ldoH3DdtRNtVq.png",
    "ldoOX8nTokltc.png",
    "ldoSVKRQuZo3t.png",
    "ldoT6bv5b25ll.png",
    "ldobucUnbljBW.png",
    "ldodDJmvlxevO.png",
    "ldoj6VIzfaZtF.png",
    "ldojs2brXD7Tg.png",
    "ldok7aP8IN76Q.png",
    "ldonxIE0OblZB.png",
    "ldopVhndDJdPr.png",
    "ldophupbFTFaC.png",
    "ldosrYH6iCgIo.png",
    "ldozXcjJ65wPc.png",
  ],
  inf: [
    "inf57AAbLazWx.png",
    "inf81h1gEIcB3.png",
    "infBWG5Tr4yGQ.png",
    "infDT1UT1M76F.png",
    "infEjRoa0TgEl.png",
    "infG16JiGmwao.png",
    "infGxFxylBmZi.png",
    "infHNqkN0tZVQ.png",
    "infHpuBWJRkeA.png",
    "infKwWxYapO6Y.png",
    "infSVzR98YXPr.png",
    "infSwfa3G0h7Q.png",
    "infV0RNGOamhx.png",
    "infVayeC1qY5H.png",
    "infWCDmbiJPPa.png",
    "infWkqAaZXuBM.png",
    "infX30w6oMISa.png",
    "infZxG0AqddPp.png",
    "inffeHjRd1HwA.png",
    "infh1t9iBJ7ez.png",
    "infmjGGc0DQHN.png",
    "infuLHzQKaRvF.png",
    "infv8L1r2r388.png",
    "infwrV8bh0eP9.png",
    "infx28o14JMlU.png",
    "infyR0iGZ0Zm7.png",
    "infzK5uPMByQh.png",
    "infzQ0JhpEhDY.png",
  ],
  kwm: [
    "kwm65ggKjX2bH.png",
    "kwm86KGTrYjNf.png",
    "kwm8AStQQhESn.png",
    "kwmB13dyP6922.png",
    "kwmCf8CISDDue.png",
    "kwmEe1TolpmHD.png",
    "kwmIOaR0EBJE7.png",
    "kwmIRj2gFrOJz.png",
    "kwmQsBjZDvWTg.png",
    "kwmVSpvciWRKz.png",
    "kwmWn2AvGXE9s.png",
    "kwmbRHHjC46S7.png",
    "kwmmJ6lEevTkY.png",
    "kwmnDHofwbFm6.png",
    "kwmoCXK1AGqcU.png",
    "kwmrn4FvdVXrU.png",
    "kwmvnsAX46LV1.png",
    "kwmwfrI8LzpE2.png",
  ],
  uxq: [
    "uxq2Tfw6ESRXN.png",
    "uxq40s58vkvz5.png",
    "uxqBkCpiDeYEM.png",
    "uxqCsOqu78fNV.png",
    "uxqI3SVSPwIQU.png",
    "uxqTffVcdA3UN.png",
    "uxqU0DGDFRUYU.png",
    "uxqavvPuT7X35.png",
    "uxqgocXZKCOhK.png",
    "uxqho2yh0l5Ve.png",
    "uxqjMdMs9jn3F.png",
    "uxqjNAzEDD2Q8.png",
    "uxqjkcJkis51p.png",
    "uxqkXO2FzNz1f.png",
    "uxqntVuEmjg1t.png",
    "uxqoil2yveeXP.png",
    "uxqpJZFVghkKE.png",
    "uxqq6k9h5ORCJ.png",
    "uxqqSGsBmhtjr.png",
    "uxqt5LCVeoJJH.png",
    "uxqumK2CUbNa5.png",
  ],
  pev: [
    "pev2ypIcZZlMM.png",
    "pev49U8qyUilV.png",
    "pev5mQ4PutPQw.png",
    "pev5mnaJLB9XK.png",
    "pev7HidZxszwK.png",
    "pevAVVZbuyOJ1.png",
    "pevApwFK9F3e4.png",
    "pevGJrjwOq7xn.png",
    "pevIg0WqNw6OU.png",
    "pevJ5uOzsFmfu.png",
    "pevJrkJyXBGNb.png",
    "pevLLpXfKF1W0.png",
    "pevMFbfsFBBYA.png",
    "pevNWEVB9ZGXD.png",
    "pevRDoGx6S0eK.png",
    "pevTFpEy24GGc.png",
    "pevUKch63TeIk.png",
    "pevUYe9VIPXU1.png",
    "pevZi5Pn3P4Tc.png",
    "pevdVKf7qK7I3.png",
    "pevf0ykvbIy5x.png",
    "pevfSfPEKTVJV.png",
    "pevgpwwoJThqd.png",
    "pevgvwv9NB84e.png",
    "pevh1kMK69zYI.png",
    "pevlEFrr5VVMH.png",
    "pevnNbXztVFGK.png",
    "pevs1es0Fa6rF.png",
    "pevuMILmgvN7y.png",
    "pevvEh7RfZl37.png",
    "pevzjJEnEi3P7.png",
  ],
  tgb: [
    "tgb3wsCCGqDod.png",
    "tgb4KB6ui6Krb.png",
    "tgb8d5RFw3n8H.png",
    "tgbBvdl5oTIdw.png",
    "tgbCCXPx14nQY.png",
    "tgbCMrQjAc4rY.png",
    "tgbFuPq7BPyKy.png",
    "tgbGdj3BJMSS4.png",
    "tgbJOpLMlbGJd.png",
    "tgbKTzx0fOO6K.png",
    "tgbNI0uf7tzHb.png",
    "tgbX9hd1bBVLZ.png",
    "tgbasM78zFKbe.png",
    "tgbnUJtP7PxFe.png",
    "tgbq9kI6VpymX.png",
    "tgbtaQaydbqe3.png",
    "tgbuzMxj58hmA.png",
    "tgbvTCxXRorIV.png",
    "tgbvxV8SVN3Wa.png",
    "tgbwvdxzqRVuw.png",
    "tgbxD39HjCqaS.png",
  ],
  yaj: [
    "yaj3tKeAg8e1i.png",
    "yaj4y7Zt63SQH.png",
    "yaj5MXF8kCbBS.png",
    "yaj9PcTYKndQO.png",
    "yajIgnyeLA32d.png",
    "yajXbAl0yPIZz.png",
    "yajbQ4bYCOPKZ.png",
    "yajdaWDwjALh3.png",
    "yajhIrgAXvRi7.png",
    "yajiQq5q7ji6V.png",
    "yajm9gvnBdhVh.png",
    "yajnD09DWndmV.png",
    "yajpc2mDma5S5.png",
    "yajq3vUZtj1EZ.png",
    "yajsaroc3nuHd.png",
    "yajseDDY8xDd2.png",
    "yajutKcI49F6S.png",
    "yajwXMUi5KdDn.png",
    "yajyzTfzmfIfB.png",
    "yajzdjkxwANsW.png",
  ],
  zrc: [
    "zrc2MZZY2vSn5.png",
    "zrc2WfBdG5ZdX.png",
    "zrc7K5sYzwuz1.png",
    "zrc7THC9c02Em.png",
    "zrc7UfsMkCSuv.png",
    "zrc7jwW0GI3SM.png",
    "zrc88aqq28GHu.png",
    "zrc8JCfJEQYtq.png",
    "zrc8hfc440d8s.png",
    "zrcAIDykWGVs2.png",
    "zrcAIFKKxdqzw.png",
    "zrcAdzluF6Kba.png",
    "zrcDoqbRn4RSM.png",
    "zrcMYq1rlOHng.png",
    "zrcP2UwRWdjyz.png",
    "zrcR9nJqURQwC.png",
    "zrcSDyUPKOAn3.png",
    "zrcSINmGBU8VW.png",
    "zrcStTypoOl5B.png",
    "zrcTEk2ncz0Ou.png",
    "zrcTaGsnpAN0Y.png",
    "zrcUKoAMFF2EE.png",
    "zrcWPKb6oYfr3.png",
    "zrcWQizpBTMb2.png",
    "zrcWfbtiGLJ55.png",
    "zrcYg0nkaQdQq.png",
    "zrcbB5bXcgP7v.png",
    "zrcc1Nrz2TW3A.png",
    "zrccGSKKKvctD.png",
    "zrcfp505goU1o.png",
    "zrcgnmjPH8gdw.png",
    "zrchKc5oT1xdW.png",
    "zrchg5PYx2M1R.png",
    "zrciF357bmgDC.png",
    "zrciVLbD4HPYB.png",
    "zrcksd2nCb074.png",
    "zrclP1MLzwYOr.png",
    "zrcmLjqA2kxj9.png",
    "zrcmhoyx1XRhs.png",
    "zrco5ExwRhwUN.png",
    "zrcoRHoRVHe85.png",
    "zrcpqwIJlybW3.png",
    "zrcqQkR0CP9gk.png",
    "zrcsypekNu389.png",
    "zrcwEm2wo3CR7.png",
    "zrcxXBZzMXNxv.png",
  ],
};

const user1 = [];
let passLent = 8;
let user1ImgOrder = [
  "pevLLpXfKF1W0.png",
  "pevRDoGx6S0eK.png",
  "pevzjJEnEi3P7.png",
  "zrcP2UwRWdjyz.png",
  "zrcmhoyx1XRhs.png",
  "kwm65ggKjX2bH.png",
  "kwmbRHHjC46S7.png",
  "kwmVSpvciWRKz.png",
];
let user1SimilarImag = [
  "pevs1es0Fa6rF.png",
  "pev49U8qyUilV.png",
  "pevJ5uOzsFmfu.png",
  "zrcksd2nCb074.png",
  "zrcoRHoRVHe85.png",
  "kwmIOaR0EBJE7.png",
  "kwmrn4FvdVXrU.png",
  "kwm8AStQQhESn.png",
];

app.use(cors());

app.use(express.static("public"));
app.use(express.json());

function getRandImg(u1, lnt = 9) {
  let result = [];
  let idx = 0;
  while (idx < 9) {
    let k = imgList.length;
    let rF = Math.floor(Math.random() * k);
    // console.log(`rf = ${rF}`);
    // let rfn = Math.round(Math.random() * lnt - 1);
    // for (let i = 0; i < rfn; i++) {
    let rff = Math.floor(Math.random() * DATA[imgList[rF]].length);
    // console.log(`rff = ${rff}`);

    lnt--;
    if (!u1.includes(DATA[imgList[rF]][rff])) {
      result.push(DATA[imgList[rF]][rff]);
      lnt++;
      idx++;
    }
    // }
    // for (let j = 0; j < result.length; j++) {
    //   if (u1.includes(result[j])) {
    //     lnt++;
    //   }
    // console.log(idx);
    // }
    // console.log(`l = ${result.length}`);
  }
  return result;
}
// JavaScript implementation of the Durstenfeld shuffle, an optimized version of Fisher-Yates:
// /* Randomize array in-place using Durstenfeld shuffle algorithm */

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/data", (req, res) => {
  const query = req.query.a;
  if (query == null) {
    console.log("a is numm");
  }
  res.send("ok");
});

// app.get("/img", (req, res) => {
//   let result = {};
//   let contentType = "image/png";
//   fs.readdir(`./public/ido/`, function (err, files) {
//     for (let i = 0; i < 3; i++) {
//       var p = `./public/ido/${files[i]}`;
//       console.log(p);
//     }
//   });
//   console.log(result);
//   res.json(result);
// });

app.get("/img/:id", (req, res) => {
  const id = req.params.id;
  console.log("Request Id:", req.params.id);
  let result = {};
  let u1 = [];
  u1 = u1.concat(user1ImgOrder);
  u1 = u1.concat(user1SimilarImag);

  u1 = u1.concat(getRandImg(u1));
  // console.log(typeof u1);
  u1 = shuffleArray(u1);
  // console.log(`u1 = ${u1}`);
  // let ans = {};
  // for (let i = 0; i < u1.length; i++) {
  //   ans[i] = u1[i];
  // }
  result["imgList"] = u1;
  result["passLent"] = 8;

  // console.log(ans);
  res.send(result);
});

app.post("/img/:id", (req, res) => {
  const id = req.params.id;
  // console.log("Request Id:", req.params.id);
});

app.post("/checkuser", async (req, res) => {
  console.log("in post checkuser");
  let UserPass = req.body.subpass;
  console.log(`UserPass = ${UserPass}`);
  let SavePass =
    "pevLLpXfKF1W0.pngpevRDoGx6S0eK.pngpevzjJEnEi3P7.pngzrcP2UwRWdjyz.pngzrcmhoyx1XRhs.pngkwm65ggKjX2bH.pngkwmbRHHjC46S7.pngkwmVSpvciWRKz.png";

  // SavePass =
  //   "pevLLpXfKF1W0.pngpevRDoGx6S0eK.pngpevzjJEnEi3P7.pngzrcP2UwRWdjyz.pngzrcmhoyx1XRhs.pngkwm65ggKjX2bH.pngkwmbRHHjC46S7.pngkwmVSpvciWRKz.png";
  // let SavePass = user1ImgOrder.join("");
  // console.log(`userPass = ${SavePass}`);

  // let hash = await bcrypt.hash(userPass, 10);
  // let saveHash = "$2b$10$W9WpgKKnFHedWg0Dfh87xObyaw74tVBguK3eim2XYCAlxT1ryAv1q";
  // console.log(`hash = ${hash}`);
  // let resultpass = await bcrypt.hash(SavePass, 10);
  // console.log(`resultPass = ${resultpass}`);
  // let bol = await bcrypt.compare(UserPass, hash);
  // console.log(`bol === ${bol}`);
  if (UserPass === SavePass) {
    console.log(`password are same}`);
    res.json({ pass: true });
  } else {
    res.json({ pass: false });
    console.log(`password are not same}`);
  }
});

async function e() {
  console.log("in post checkuser");
  let UserPass =
    "pevLLpXfKF1W0.pngpevRDoGx6S0eK.pngpevzjJEnEi3P7.pngzrcP2UwRWdjyz.pngzrcmhoyx1XRhs.pngkwm65ggKjX2bH.pngkwmbRHHjC46S7.pngkwmVSpvciWRKz.png";
  // let UserPass = "1.2.3.4.5";
  // let SavePass = user1ImgOrder.join("");
  let SavePass =
    "pevLLpXfKF1W0.pngpevRDoGx6S0eK.pngpevzjJEnEi3P7.pngzrcP2UwRWdjyz.pngzrcmhoyx1XRhs.pngkwm65ggKjX2bH.pngkwmbRHHjC46S7.pngkwmVSpvciWRKz.png";
  // let SavePass = "1.2.3.4.5";
  // console.log(`userPass = ${SavePass}`);

  let hash = await bcrypt.hash(UserPass, 10);
  console.log(`usersaved hash = ${hash}`);
  let saveHash = "$2b$10$q/cUR.elnnhnPdPfkhnsG.3YMjn6Dg88uQkv6Lk/3FL0RLz0mU2uG";
  // let saveHash = "$2b$10$oLY2f95sn97bCVrBUeuSB.3KlHzv3/rwWsiQI3EqMyRorGZ9XnK3q";
  // let saveHash = "$2b$10$jBQkgQ3BNeIq53GXn3TpSuJkw7p2Mk1dFUE8vHatMrlSmKIZvW5Jm";

  // console.log(`hash = ${hash}`);
  // let resultpass = await bcrypt.hash(SavePass, 10);
  // console.log(`resultPass = ${resultpass}`);
  let bol = await bcrypt.compare(UserPass, saveHash);
  console.log(`bol === ${bol}`);
  if (bol) {
    console.log(`password are same${bol}`);
  } else {
    console.log(`password are same${bol}`);
  }
  console.log();
}
// e();
app.listen(PORT, () => {
  console.log(`server listening at port ${PORT}....`);
});
