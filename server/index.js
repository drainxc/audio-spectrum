const router = require("express").Router();
const ytdl = require("ytdl-core");
const fs = require("fs");

router.get("/", (req, res) => {
  res.send("this is using ytdl-core!!!!");
});
// 대비책 sendFile <-----------********
router.post("/downloadmp3", async (req, res, next) => {
  try {
    const youtubeLink = req.query.youtubeLink;
    const fileName = Date.now();
    const wstream = await fs.createWriteStream(
      `../client/src/asset/audio/${fileName}.mp3`,
      { flags: "w" }
    );
    ytdl(youtubeLink, {
      filter: "audioonly",
      quality: "highestaudio",
      highWaterMark: 1 << 25,
    }).pipe(
      await wstream.on("data", (data) => {
        wstream.write(data);
      })
    );
    // res.sendFile(`./${fileName}.mp3`, {root: __dirname});  // 파일 자체를 보내는 방법
    res.json({ message: "success make mp3 file" }); // 로컬에 저장시 필요한 확인 응답 코드

    return;
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/downloadmp3-v2", async (req, res, next) => {
  try {
    const youtubeLink = req.query.youtubeLink;
    const fileName = Date.now();
    const wstream = await fs.createWriteStream(`./${fileName}.mp3`, {
      flags: "w",
    });
    ytdl(youtubeLink, {
      filter: "audioonly",
      quality: "highestaudio",
      highWaterMark: 1 << 25,
    }).pipe(
      await wstream.on("data", (data) => {
        wstream.write(data);
      })
    );
    const rstream = await fs.createReadStream(`./${fileName}.mp3`, {
      flags: "r",
    }); // 저장한 파일을 읽은 후 그 값을 보냄
    res.writeHead(206, {
      "Content-Type": "audio/mpeg",
    });
    rstream.pipe(res);
    rstream.on("end", () => {
      wstream.on("end", () => {});
    });
    return;
    // res.json({ message : 'success make mp3 file' }); // 로컬에 저장시 필요한 확인 응답 코드
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
