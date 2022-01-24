package com.ssafy.api.service;

import com.ssafy.api.request.ModifyPasswordRequest;
import com.ssafy.api.request.UserProfilePutReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.entity.User;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User createUser(UserRegisterPostReq userRegisterInfo);
	User getUserByUserId(String userId);
	User getUserByEmail(String email);
	User getUserByNameAndEmail(String name, String email);
	User getUserByUserIdAndNameAndEmail(String userId, String name, String email);
	String updateUserProfile(String userId, UserProfilePutReq userProfilePutReq);
	void disable(String userId);
	int updatePassword(String userId, ModifyPasswordRequest modifyPasswordRequest);
}