package com.ssafy.api.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

/**
 * 회원 본인 정보 조회 API ([GET] /user/profile) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserProfileResponse")
public class UserProfileRes extends BaseResponseBody {
	@ApiModelProperty(name="유저 Id", example="ssafy")
	String userId;
	@ApiModelProperty(name="유저 이름", example="김싸피")
	String name;
	@ApiModelProperty(name="유저 이메일", example="ssafy@ssafy.com")
	String email;
	@ApiModelProperty(name="유저 선호 주종", example="soju")
	String drink;
	@ApiModelProperty(name="유저 주량", example="1")
	Integer drinkLimit;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy. mm. dd.", timezone = "Asia/Seoul")
	@ApiModelProperty(name="유저 생년월일", example="2022. 1. 20.")
	LocalDate birthday;
	@ApiModelProperty(name="프로필 링크", example="default.png")
	String imageUrl;
	@ApiModelProperty(name="함께 마신 친구 정보", example="[name, numberOf]")
	List<DrinkTogetherResponse> friends;
	
	public static UserProfileRes of(Integer statusCode, String message, User user, List<DrinkTogetherResponse> friends) {
		UserProfileRes res = new UserProfileRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setUserId(user.getUserId());
		res.setName(user.getName());
		res.setEmail(user.getEmail());
		res.setDrink(user.getDrink());
		res.setDrinkLimit(user.getDrinkLimit());
		res.setBirthday(user.getBirthday());
		res.setImageUrl(user.getImageUrl());
		res.setFriends(friends);
		return res;
	}
}
