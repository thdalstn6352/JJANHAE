package com.ssafy.api.service;

import com.ssafy.api.request.AddHistoryRequest;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.RoomHistory;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.RoomHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *	방 이력 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("roomHistoryService")
public class RoomHistoryServiceImpl implements RoomHistoryService{
    @Autowired
    RoomHistoryRepository roomHistoryRepository;


    @Override
    public RoomHistory addHistory(User user, Room room, AddHistoryRequest addHistoryRequest) {
        RoomHistory roomHistory= new RoomHistory();
        roomHistory.setRoomSeq(room);
        roomHistory.setAction(addHistoryRequest.getAction());
        roomHistory.setInsertedTime(addHistoryRequest.getInsertedTime());
        roomHistory.setLastYn(addHistoryRequest.getLastYn());
        roomHistory.setUserSeq(user);

        return roomHistoryRepository.save(roomHistory);
    }

    @Override
    public RoomHistory selectLastYn(Long userSeq) {
        return roomHistoryRepository.selectLastYn(userSeq);
    }
}