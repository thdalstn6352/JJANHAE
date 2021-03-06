import React, { useState, useEffect, useRef } from "react";
import styles from "./CalendarPage.module.css";
import axios from "axios";
import moment from "moment";
import buildCalendar from "./buildCalendar";
import ConferenceList from "./ConferenceList";
import ConferenceDetail from "./ConferenceDetail3";
import UserApi from "../../api/UserApi.js";
// import ConferenceDetail from "./ConferenceDetail2";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar.svg";
import { ReactComponent as PartyIcon } from "../../assets/icons/party.svg";
import beerbottle from "../../assets/icons/beerbottle.png";
import { Dropdown } from "bootstrap";
// import Modal from 'react-modal'

const CalendarPage = () => {
  //calendar
  const [calendar, setCalendar] = useState([]);
  const days = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
  //today
  const [value, setValue] = useState(moment());
  //set cliked date
  const [item, setItem] = useState({
    month: "",
    day: "",
  });
  //
  const [month, setMonth] = useState();
  //startDate
  const [startMonth, setStartMonth] = useState(moment());
  //endDate
  const [endMonth, setEndMonth] = useState(moment());
  //conference list
  const [party, setParty] = useState({
    conferences: [],
  });
  const [partyList, setPartyList] = useState({
    conferencesId: [1, 2, 3],
  });
  const [roomList, setRoomList] = useState({
    roomList: [],
  });
  const [roomSeq, setRoomSeq] = useState();
  const [userList, setUserList] = useState([]);
  const [room, setRoom] = useState({});
  const [partyImg, setPartyImg] = useState("");
  const [startTime, setStartTime] = useState();
  const [totalTime, setTotalTime] = useState();
  const [time, setTime] = useState({
    startTime: "",
    endTime: "",
  });

  const [listModalOpen, setListModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const { getRoomDate, getRoomList, getUserList } = UserApi;
  const [isActive, setIsActive] = useState(false);

  const dropDown = useRef([]);
  const partyIconBtn = useRef([]);

  const getDetailModalOpen = (status) => {
    setDetailModalOpen(status);
  };

  const handleCloseList = (event) => {
    if (event.target.nodeName !== "BUTTON") {
      for (let i = 0; i < partyIconBtn.current.length; i++) {
        dropDown.current[i].style.visibility = "hidden";
      }
    }
  };

  useEffect(async () => {
    setCalendar(buildCalendar(value));
    setStartMonth(value.clone().startOf("month").subtract(1, "day"));
    setEndMonth(value.clone().endOf("month"));

    const result = await getRoomDate(value.format("M") * 1);
    //console.log(result);
    //????????? party data state??? ??????
    handleParyDataList(result.data.conferencesDateList);
  }, [value]);

  useEffect(async () => {
    //console.log(item.day);
    if (item.day != "") {
      const result = await getRoomList(item.day);
      //console.log(result);
      let roomList = [];
      roomList = result.data.roomList;
      //console.log(roomList)
      setRoomList({ roomList });
    }
  }, [item.day]);

  const handleParyDataList = (result) => {
    const arr = [];
    for (let i = 0; i < result.length; i++) {
      let data = result[i].date;
      let year = data.year;
      let month = data.month;
      let day = data.day;
      let date = year + "-" + month + "-" + day;
      date = new Date(date);
      let res = moment(date).format("YYYY-MM-DD");
      arr.push(res);
    }

    //????????????
    let conferences = [];
    arr.forEach((element) => {
      if (!conferences.includes(element)) {
        conferences.push(element);
      }
    });

    setParty({
      conferences,
    });
  };

  useEffect(() => {
    // //console.log(item);
  }, [item]);

  useEffect(() => {
    // //console.log(party)
  }, [party]);

  useEffect(() => {
    // //console.log(roomList);
    makeList();
  }, [roomList]);

  useEffect(() => {
    //console.log(room);
    setTime({
      startTime: room.startTime,
      endTime: room.endTime,
    });
  }, [room]);

  useEffect(() => {}, [time]);

  useEffect(() => {}, [detailModalOpen]);

  useEffect(() => {
    document.addEventListener("click", handleCloseList);

    return () => {
      document.removeEventListener("click", handleCloseList);
    };
  });

  function dayStyles(day) {
    let yoil = day.day();
    if (day.isAfter(startMonth) && day.isBefore(endMonth)) {
      if (yoil === 0) return "sunday";
      if (yoil === 6) return "saturday";
      if (yoil > 0 && yoil) return "weekday";
    } else {
      return "wkddisable";
    }
  }

  const currentMonth = () => {
    return value.format("M") + "???";
  };

  const handleClick = async (event) => {
    setUnvisible(event);
    const data = event.nativeEvent.path[2].outerText;
    const dataArr = data.split("\n");
    // //console.log(dataArr[0].substring(0,dataArr[0].length-1));
    setItem({
      month: value.format("M"),
      day: dataArr[0].substring(0, dataArr[0].length - 1),
    });
    //?????? ????????? ????????? ???????????? ???????????? api??????
    // const result = await getRoomList(item.day);
    // //console.log(result);
  };

  function showList(target) {
    if (target.visibility === "visible") {
      target.visibility = "hidden";
      target.opacity = "0";
      target.transform = "translateY(0)";
    } else {
      target.visibility = "visible";
      target.opacity = "1";
      target.transform = "translateY(-20px)";
    }
  }

  function setUnvisible(event) {
    for (let i = 0; i < dropDown.current.length; i++) {
      dropDown.current[i].style.visibility = "hidden";
    }
    showList(event.target.nextElementSibling.style);
  }

  const calcYoil = (day) => {
    let yoil = dayStyles(day);
    let date = day.format("D").toString();
    return <div className={styles[yoil]}>{date}???</div>;
  };

  //roomseq??? ????????? ?????? ?????? ????????? ????????????
  const getRoomDetail = async (roomSeq) => {
    setRoomSeq(roomSeq);
    const { data } = await getUserList(roomSeq);
    console.log(data);
    let userList = data.userList;
    setUserList({ userList });
    setRoom(data.room);
    setPartyImg(data.room.imageUrl);
    //console.log(room);

    openDetailModal();
  };

  //make dropdown
  const makeList = () => {
    const dataList = [];

    for (let i = 0; i < roomList.roomList.length; i++) {
      dataList.push(roomList.roomList[i]);
    }
    // const roomListData = dataList.map((data, index) => (<li key={index}><button className={styles.partyData}>{data.title}</button></li>))
    const roomListData = dataList.map((data, index) => (
      <li key={index}>
        <button
          className={styles.partyData}
          onClick={() => getRoomDetail(data.roomSeq)}
        >
          {data.title}
        </button>
      </li>
    ));
    return <>{roomListData}</>;
  };

  const listStyle = { visibility: "visible" };

  const checkParty = (day) => {
    for (let i = 0; i < party.conferences.length; i++) {
      if (day.format("YYYY-MM-DD") === party.conferences[i]) {
        return (
          <>
            <div className={styles.container}>
              <button
                className={styles.partyicon}
                onClick={handleClick}
                ref={(el) => (partyIconBtn.current[i] = el)}
              ></button>
              <div
                className={
                  isActive
                    ? `${styles.partyList} ${styles.open}`
                    : styles.partyList
                }
                style={listStyle}
                ref={(el) => (dropDown.current[i] = el)}
              >
                <p className={styles.listTitle}>?????? ??????</p>
                <ul>{makeList()}</ul>
              </div>
            </div>
          </>
        );
      }
    }
  };

  const openListModal = () => {
    setListModalOpen(true);
  };

  const openDetailModal = () => {
    setDetailModalOpen(true);
  };

  const closeListModal = () => {
    setListModalOpen(false);
  };

  const closeDetailModal = () => {
    setDetailModalOpen(false);
  };

  return (
    <>
      <div className={styles.calendadrFormBorder}>
        <div className={styles.calendarForm}>
          {/* <ConferenceList
            open={listModalOpen}
            close={closeListModal}
            partyList={partyList}
            getDetailModalOpen={getDetailModalOpen}
          /> */}
          <ConferenceDetail
            open={detailModalOpen}
            close={closeDetailModal}
            date={item}
            time={time}
            userList={userList.userList}
            partyImg={partyImg}
          ></ConferenceDetail>
          <div className={styles.calendarBodyBorder}>
            <div className={styles.calendarHeader}>
              {/* <div className={styles.calendarTitle}>????????? ??????</div> */}
              <div className={styles.calendarTop}>
                <div className={styles.month}>{currentMonth()}</div>
                {/* <CalendarIcon className={styles.icon} /> */}
              </div>
            </div>
          </div>
          <div className={styles.calendarBodyBorder}>
            <div className={styles.calendarBody}>
              {days.map((value, index) => {
                if (index === 0) {
                  return (
                    <div key={index} className={styles.title}>
                      {value}
                    </div>
                  );
                } else if (index === days.length - 1) {
                  return (
                    <div key={index} className={styles.titleLast}>
                      {value}
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className={styles.titleOther}>
                      {value}
                    </div>
                  );
                }
              })}
              {calendar.map((week, index) => {
                if (index === 0) {
                  return (
                    <div key={index} className={styles.week}>
                      {week.map((day, index) => {
                        if (index === 0) {
                          return (
                            <div key={index} className={styles.day}>
                              <div className={styles.dayreal}>
                                {calcYoil(day)}
                              </div>
                              {checkParty(day)}
                            </div>
                          );
                        } else if (index === week.length - 1) {
                          return (
                            <div key={index} className={styles.dayfirstRowEnd}>
                              <div className={styles.dayreal}>
                                {calcYoil(day)}
                              </div>
                              {checkParty(day)}
                            </div>
                          );
                        } else {
                          return (
                            <div key={index} className={styles.dayfirstRow}>
                              <div className={styles.dayreal}>
                                {calcYoil(day)}
                              </div>
                              {checkParty(day)}
                            </div>
                          );
                        }
                      })}
                    </div>
                  );
                } else if (index === calendar.length - 1) {
                  return (
                    <div key={index} className={styles.week}>
                      {week.map((day, index) => {
                        if (index === 0) {
                          return (
                            <div key={index} className={styles.dayLastRow}>
                              <div className={styles.dayreal}>
                                {calcYoil(day)}
                              </div>
                              {checkParty(day)}
                            </div>
                          );
                        } else if (index === week.length - 1) {
                          return (
                            <div key={index} className={styles.dayLastRowEnd}>
                              <div className={styles.dayreal}>
                                {calcYoil(day)}
                              </div>
                              {checkParty(day)}
                            </div>
                          );
                        } else {
                          return (
                            <div key={index} className={styles.dayLastRowother}>
                              <div className={styles.dayreal}>
                                {calcYoil(day)}
                              </div>
                              {checkParty(day)}
                            </div>
                          );
                        }
                      })}
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className={styles.week}>
                      {week.map((day, index) => {
                        if (index === 0) {
                          return (
                            <div
                              key={index}
                              className={styles.dayotherRowFirst}
                            >
                              <div className={styles.dayreal}>
                                {calcYoil(day)}
                              </div>
                              {checkParty(day)}
                            </div>
                          );
                        } else if (index === week.length - 1) {
                          return (
                            <div key={index} className={styles.dayotherRowEnd}>
                              <div className={styles.dayreal}>
                                {calcYoil(day)}
                              </div>
                              {checkParty(day)}
                            </div>
                          );
                        } else {
                          return (
                            <div key={index} className={styles.dayotherRow}>
                              <div className={styles.dayreal}>
                                {calcYoil(day)}
                              </div>
                              {checkParty(day)}
                            </div>
                          );
                        }
                      })}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarPage;
