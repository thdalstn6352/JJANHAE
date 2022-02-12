import React, { useContext } from "react";
import styles from "./Room.module.css";
import { ReactComponent as PlayerIcon } from "../../assets/icons/player.svg";
import { ReactComponent as PlayIcon } from "../../assets/icons/play.svg";
import { ReactComponent as StopIcon } from "../../assets/icons/stop.svg";
import { ReactComponent as CameraIcon } from "../../assets/icons/camera.svg";
import { ReactComponent as GameIcon } from "../../assets/icons/game.svg";
import { ReactComponent as MusicIcon } from "../../assets/icons/music.svg";
import { ReactComponent as SettingIcon } from "../../assets/icons/setting.svg";
import { ReactComponent as RetryIcon } from "../../assets/icons/retry.svg";
import { ReactComponent as SaveIcon } from "../../assets/icons/save.svg";
import Marquee from "react-fast-marquee";
import LoadingSpinner from "../Modals/LoadingSpinner/LoadingSpinner";
import LoginStatusContext from "../../contexts/LoginStatusContext";
import NameContext from "../../contexts/NameContext";
import VideoMicContext from "../../contexts/VideoMicContext";
import RegistMusic from "../Modals/RegistMusic/RegistMusic";
import GameList from "../Modals/Game/GameList";
import Setting from "../Modals/Setting/Setting";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import RoomContents from "./RoomContents";
import SnapShot from "./snapshot/SnapShot";
import RoomApi from "../../api/RoomApi";
import { useNavigate } from "react-router-dom";

let posX = 0;
let posY = 0;

const Room = () => {
  const navigate = useNavigate();
  const { setLoginStatus } = useContext(LoginStatusContext);
  const { myVMstate } = useContext(VideoMicContext);
  const { myName } = useContext(NameContext);
  const [onPlayerClick, setOnPlayerClick] = useState(false);
  const [isPlayMusic, setIsPlayMusic] = useState(false);
  const [mode, setMode] = useState("game1");
  const [contentTitle, setContentTitle] = useState("");
  // const [onCamera, setOnCamera] = useState(false);
  const [onGameList, setOnGameList] = useState(false);
  const [onRegistMusic, setOnRegistMusic] = useState(false);
  const [onSetting, setOnSetting] = useState(false);
  const { title, roomseq } = useParams();
  const [loading, setLoading] = useState(false);
  
  //console.log(myName);
  const {getRoomExitResult} = RoomApi;
  console.log(myName);
  useEffect(() => {
    console.log("room render");
    // setLoginStatus("3");
    //console.log(myVMstate);
    setContentTitle(title);
    console.log("?????????????");
    return () => {
      // console.log("tlfgod");
      setLoginStatus("2");
      // const body = {
      //   roomSeq : roomseq * 1
      // }
      // const {data} = await getRoomExitResult(body);
      
      
    }
  }, []);

  const handleCameraClick = () => {
    setContentTitle("인생네컷");
    setMode("snapshot");
  };

  const handleMusicPlayer = () => {
    setIsPlayMusic((prev) => !prev);
  };

  const handleModalClose = () => {
    setOnGameList(false);
    setOnRegistMusic(false);
    setOnSetting(false);
  };

  const handleGameList = () => {
    setOnGameList(true);
  };

  const handleRegistMusic = () => {
    setOnRegistMusic(true);
  };

  const handleSetting = () => {
    setOnSetting(true);
  };

  const handlePlayerClick = () => {
    setOnPlayerClick((prev) => !prev);
  };

  const dragStartHandler = (e) => {
    posX = e.clientX;
    posY = e.clientY;

    //console.log(posX);
    //console.log(posY);
  };

  const dragHandler = (e) => {
    e.target.style.left = `${e.target.offsetLeft + e.clientX - posX}px`;
    e.target.style.top = `${e.target.offsetTop + e.clientY - posY}px`;
    posX = e.clientX;
    posY = e.clientY;
  };

  const dragEndHandler = (e) => {
    e.target.style.left = `${e.target.offsetLeft + e.clientX - posX}px`;
    e.target.style.top = `${e.target.offsetTop + e.clientY - posY}px`;
  };

  const onClickExit = async () =>{
    const body = {
      roomSeq : roomseq * 1
    }
    setLoading(true);
    await getRoomExitResult(body);
    setTimeout(()=>{
      setLoading(false);
      navigate("/conferences/list");
    }, 1500);
    
  }



  return (
    <div className={styles.container}>
      {loading ? <LoadingSpinner></LoadingSpinner> : null}
      <div className={styles.nav}>
        <button className={styles.link} onClick={onClickExit}>
          EXIT
        </button>
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.contents}>
          <div className={styles.title}>
            <h1>{contentTitle}</h1>
          </div>
          <div className={styles["main-contents"]}>
            {/* <SnapShot
              sessionName={roomseq}
              userName={myName}
              media={myVMstate}
            /> */}
            <RoomContents
              sessionName={roomseq}
              userName={myName}
              media={myVMstate}
              mode={mode}
            />
          </div>
          <div
            className={styles.player}
            draggable
            onDragStart={dragStartHandler}
            onDrag={dragHandler}
            onDragEnd={dragEndHandler}
          >
            <div
              className={
                isPlayMusic
                  ? `${styles.playerIcon} ${styles.playerStart}`
                  : styles.playerIcon
              }
              onClick={handlePlayerClick}
            >
              <PlayerIcon width="30" height="30" />
            </div>
            {onPlayerClick ? (
              <>
                <Marquee
                  play={isPlayMusic}
                  pauseOnClick={isPlayMusic}
                  direction="right"
                  gradient={false}
                  className={styles.musicTitle}
                >
                  되돌리다 - 이승기
                </Marquee>

                <div>
                  {isPlayMusic ? (
                    <StopIcon
                      width="30"
                      height="30"
                      onClick={handleMusicPlayer}
                    />
                  ) : (
                    <PlayIcon
                      width="30"
                      height="30"
                      onClick={handleMusicPlayer}
                    />
                  )}
                </div>
              </>
            ) : (
              <div>Music Player</div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.dockBar}>
        <div className={styles.dock}>
          <CameraIcon
            width="50"
            height="50"
            className={styles.icon}
            onClick={handleCameraClick}
          />
          <GameIcon
            width="50"
            height="50"
            fill="#eee"
            className={styles.icon}
            onClick={handleGameList}
          />
          <MusicIcon
            width="50"
            height="50"
            onClick={handleRegistMusic}
            className={styles.icon}
          />
          <SettingIcon
            width="50"
            height="50"
            className={styles.icon}
            onClick={handleSetting}
          />
        </div>
        {/* <div className={styles.snapshotBtn}>
          <div>
            <button className={styles.retryBtn}>
              <RetryIcon width="50" height="50" />
            </button>
          </div>
          <div>
            <button className={styles.saveBtn}>
              <SaveIcon width="50" height="50" />
            </button>
          </div>
        </div> */}
      </div>

      {/* 카메라 기능 */}
      {/* <CameraIcon onClick={handleCameraClick} /> */}
      <GameList
        open={onGameList}
        onClose={handleModalClose}
        // onChange={handleModeChange}
      />
      <RegistMusic
        open={onRegistMusic}
        onClose={handleModalClose}
        // onChange={handleModeChange}
      />
      <Setting
        open={onSetting}
        onClose={handleModalClose}
        // onChange={handleModeChange}
      />
    </div>
  );
};

export default Room;
