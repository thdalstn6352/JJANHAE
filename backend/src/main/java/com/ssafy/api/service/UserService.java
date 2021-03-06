package com.ssafy.api.service;

import com.ssafy.api.request.UserProfilePatchReq;
import com.ssafy.api.request.UserSignupPostReq;
import com.ssafy.api.response.DrinkTogether;
import com.ssafy.db.entity.User;

import java.util.List;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User createUser(UserSignupPostReq userSignupInfo);
	User getUserByUserId(String userId);
	User getUserByEmail(String email);
	User getUserByNameAndEmail(String name, String email);
	User getUserByUserIdAndEmail(String userId, String email);
	void updateUserAuthCode(User user, String authCode);
	void updateUserProfile(String userId, UserProfilePatchReq userProfilePatchReq);
	void updateUserProfileImg(String userId, String imageUrl);
	void updateUserPassword(String userId, String password);
	void disableUser(String userId);
	List<String> findUserNameByUserSeq(List<Integer> userSeqList);
	List<DrinkTogether> findDrinkTogether(Long userSeq);
	User findOneUserByUserSeq(Long userSeq);
}
