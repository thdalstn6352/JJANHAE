package com.ssafy.api.service;

import com.ssafy.api.request.CreateRoomRequest;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 *	방 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface RoomService {
    Room createRoom(User user, LocalDateTime now, CreateRoomRequest createRoomRequest);
}
