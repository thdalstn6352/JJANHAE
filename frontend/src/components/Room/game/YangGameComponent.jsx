import React, { useEffect, useState, useRef, useContext } from "react";
import styles from "./YangGameComponent.module.css";
import Keyword from "../../Modals/Game/Keyword";
import BangZzangContext from "../../../contexts/BangZzangContext";

function YangGameComponent({ sessionId, user, subscribers }) {
  const color = [
    "#adeac9",
    "#ff98ad",
    "#abece7",
    "#ffff7f",
    "#FFC0CB",
    "#FFEB46",
    "#EE82EE",
    "#B2FA5C",
    "#a3c9f0",
    "#e3ae64",
    "#a1e884",
    "#84e8c5",
    "#ceb1e3",
    "#e3b1d2",
    "#e3b1b1",
    "#d4ff8f",
    "#98ff8f",
    "#b6f0db",
    "#b6e3f0",
    "#f288e9",
  ];

  const [bgcolor, setBgcolor] = useState("");
  const [userId, setUserId] = useState("");
  const [nickname, setNickname] = useState([]);
  const [myNickname, setMyNickname] = useState("");
  const [streamId, setStreamId] = useState("");
  const [targetId, setTargetId] = useState("");
  const [targetGameName, setTargetGameName] = useState("");
  const [index, setIndex] = useState("1");
  const [keywordInputModal, setKeywordInputModal] = useState(false);
  const [answer, setAnswer] = useState("");
  const [modalMode, setModalMode] = useState("start");
  const [targetNickName, setTargetNickName] = useState("");

  const { bangZzang } = useContext(BangZzangContext);

  const indexRef = useRef(index);
  indexRef.current = index;

  const subscribersRef = useRef(subscribers);
  subscribersRef.current = subscribers;

  const myNicknameRef = useRef(myNickname);
  myNicknameRef.current = myNickname;

  useEffect(() => {
    for (let i = 0; i < nickname.length; i++) {
      if (sessionId === "" && sessionId === undefined) {
        console.log(user);
        console.log(nickname);
        if (
          user.getStreamManager().stream.streamId === nickname[i].connectionId
        ) {
          console.log(nickname[i].keyword);
          setMyNickname(nickname[i].keyword);
        }
      }
    }
  }, [nickname]);

  useEffect(() => {
    console.log(myNickname);
  }, [myNickname]);

  const giveGamename = (data) => {
    console.log(streamId);
    console.log(targetId);
    console.log(data);
    console.log(index);
    const senddata = {
      streamId: streamId,
      gameStatus: 1,
      gameId: 1,
      gamename: data,
      index: index,
    };
    user.getStreamManager().stream.session.signal({
      data: JSON.stringify(senddata),
      type: "game",
    });
  };

  const checkMyAnswer = (data) => {
    const senddata = {
      streamId: streamId,
      gameStatus: 2,
      gameId: 1,
      gamename: data,
    };
    user.getStreamManager().stream.session.signal({
      data: JSON.stringify(senddata),
      type: "game",
    });
  };

  const findName = (id) => {
    const nickname = subscribers.map((data) => {
      if (id === data.getStreamManager().stream.streamId) {
        return data.nickname;
      }
    });
    setTargetNickName(nickname);
  };

  //?????????????????? ?????? ????????? ????????? ?????????
  useEffect(() => {
    setNickname([]);
    openKeywordInputModal();
    setTimeout(() => {
      if (sessionId !== undefined) {
        if (user.getStreamManager().stream.streamId === bangZzang) {
          console.log(user.getStreamManager().stream.streamId);
          const data = {
            gameStatus: 0,
            gameId: 1,
          };
          user.getStreamManager().stream.session.signal({
            type: "game",
            data: JSON.stringify(data),
          });
        }
      }
    }, 5000);
  }, []);

  useEffect(() => {
    let index = Math.floor(Math.random() * 21);
    setBgcolor(color[index]);
  }, []);

  useEffect(() => {
    console.log(subscribers);
  }, [subscribers]);

  useEffect(() => {
    setUserId(user.connectionId);
  }, [user]);

  useEffect(() => {
    //back?????? ?????? ?????? data??????
    user.getStreamManager().stream.session.on("signal:game", (event) => {
      closeKeywordInputModal();
      //???????????? ??????

      //?????? ???????????? ????????? ????????????
      if (sessionId !== undefined) {
        const data = event.data;
        if (data.gamename !== "" && data.gamename !== undefined) {
          let nicknameList = [];
          nicknameList = nickname;
          nicknameList.push({
            connectionId: data.streamId,
            keyword: data.gamename,
          });
          setNickname([...nicknameList]);
          console.log(nicknameList);
        }

        if (data.gameStatus === 1) {
          if (data.streamId === user.getStreamManager().stream.streamId) {
            console.log("my turn");
            //????????? ????????? ???????????? ?????? ?????????
            setStreamId(data.streamId);
            setTargetId(data.targetId);
            findName(data.targetId);
            setModalMode("assign");
            openKeywordInputModal();
            if (data.index !== undefined && data.index !== "") {
              setIndex(data.index);
            }
            //?????? ????????? ????????? ????????????
          } else {
            console.log("not my turn");
            setModalMode("wait");
            openKeywordInputModal();
          }
        } else if (data.gameStatus === 2) {
          if (data.answerYn !== undefined && data.answerYn.index !== "") {
            if (data.answerYn === "Y") {
              setModalMode("correct");
              openKeywordInputModal();
            }
          } else {
            setModalMode("letsplay");
            openKeywordInputModal();
            setTimeout(() => {
              setModalMode("answer");
              closeKeywordInputModal();
            }, 5000);
            console.log("????????? ?????? ??????");
          }
        }
      }
    });
  }, []);

  const openKeywordInputModal = () => {
    console.log("open!!!!!");
    setKeywordInputModal(true);
  };
  const closeKeywordInputModal = () => {
    setKeywordInputModal(false);
  };
  const confirmMyAnswer = (data) => {
    closeKeywordInputModal();
    setAnswer(data);
    //?????? ?????? ????????? api??????
    checkMyAnswer(data);
  };
  const confirmTargetGameName = (data) => {
    closeKeywordInputModal();
    setTargetGameName(data);
    giveGamename(data);
    //target gamename ??????????????? api??????
  };

  return (
    <div className={styles.yangGame}>
      <Keyword
        open={keywordInputModal}
        close={closeKeywordInputModal}
        confirmMyAnswer={confirmMyAnswer}
        confirmTargetGameName={confirmTargetGameName}
        mode={modalMode}
        targetNickName={targetNickName}
      />
      {sessionId ? (
        <div className={styles.postitInput}>
          <div className={styles.keyword} onClick={openKeywordInputModal}>
            ????????? ?????????????
          </div>
        </div>
      ) : (
        <div
          className={styles.postit}
          style={{ backgroundColor: `${bgcolor}` }}
        >
          {myNicknameRef.current}
        </div>
      )}
    </div>
  );
}

export default YangGameComponent;
