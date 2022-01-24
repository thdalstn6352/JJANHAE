package com.ssafy.api.service;

import java.util.Random;

import javax.mail.Message.RecipientType;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.ssafy.api.request.FindIdRequest;
import com.ssafy.api.request.FindPwdRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    JavaMailSender emailSender;

    public static final String ePw = createKey();

    private MimeMessage createMessage(String name, String to)throws Exception{
        System.out.println("보내는 대상 : "+ to);
        System.out.println("인증 번호 : "+ePw);
        MimeMessage  message = emailSender.createMimeMessage();

        message.addRecipients(RecipientType.TO, to); //보내는 대상
        message.setSubject("짠해 아이디 찾기 이메일 인증"); //제목

        String msgg="";
//        msgg+= "<div style='margin:100px;'>";
//        msgg+= "<h1> 안녕하세요 랜선 술파티 서비스, '짠해'입니다. </h1>";
//        msgg+= "<br>";
//        msgg+= "<p>아래 코드를 회원가입 창으로 돌아가 입력해주세요<p>";
//        msgg+= "<br>";
//        msgg+= "<p>감사합니다!<p>";
//        msgg+= "<br>";
//        msgg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
//        msgg+= "<h3 style='color:blue;'>아이디 찾기 인증 코드입니다.</h3>";
//        msgg+= "<div style='font-size:130%'>";
//        msgg+= "CODE : <strong>";
//        msgg+= ePw+"</strong><div><br/> ";
//        msgg+= "</div>";
        msgg += "<!DOCTYPE html>";
        msgg += "<html>";
        msgg += "<head>";
        msgg += "</head>";
        msgg += "<body>";
        msgg +=
                " <div" 																																																	+
                        "	style=\"font-family: 'Apple SD Gothic Neo', 'sans-serif' !important; width: 400px; height: 600px; border-top: 4px solid #02b875; margin: 100px auto; padding: 30px 0; box-sizing: border-box;\">"		+
                        "	<h1 style=\"margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400;\">"																															+
                        "		<span style=\"font-size: 15px; margin: 0 0 10px 3px;\">랜선 술파티 서비스 짠해</span><br />"																													+
                        "		<span style=\"color: #02b875\">메일인증</span> 안내입니다."																																				+
                        "	</h1>\n"																																																+
                        "	<p style=\"font-size: 16px; line-height: 26px; margin-top: 50px; padding: 0 5px;\">"																													+
                        name																																																+
                        "		님 안녕하세요.<br />"																																													+
                        "		짠해에 가입해 주셔서 진심으로 감사드립니다.<br />"																																						+
                        "		아래 <b style=\"color: #02b875\">'메일 인증'</b> 버튼을 클릭하여 아이디 찾기를 완료해 주세요.<br />"																													+
                        "		감사합니다."																																															+
                        "	</p>"																																																	+
                        "	<a style=\"color: #FFF; text-decoration: none; text-align: center;\""																																	+
                        "		<p"																																																	+
                        "			style=\"display: inline-block; width: 210px; height: 45px; margin: 30px 5px 40px; background: #02b875; line-height: 45px; vertical-align: middle; font-size: 16px;\">"							+
                        ePw + "			</p>"																																														+
                        "	</a>"																																																	+
                        "	<div style=\"border-top: 1px solid #DDD; padding: 5px;\"></div>"																																		+
                        " </div>";
        msgg += "</body>";
        msgg += "</html>";
        message.setText(msgg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress("soyeon1170@gmail.com","짠해"));//보내는 사람

        return message;
    }

    private MimeMessage createMessageWithoutName(String to)throws Exception{
        System.out.println("보내는 대상 : "+ to);
        System.out.println("인증 번호 : "+ePw);
        MimeMessage  message = emailSender.createMimeMessage();

        message.addRecipients(RecipientType.TO, to); //보내는 대상
        message.setSubject("짠해 아이디 찾기 이메일 인증"); //제목

        String msgg="";
        msgg += "<!DOCTYPE html>";
        msgg += "<html>";
        msgg += "<head>";
        msgg += "</head>";
        msgg += "<body>";
        msgg +=
                " <div" 																																																	+
                        "	style=\"font-family: 'Apple SD Gothic Neo', 'sans-serif' !important; width: 400px; height: 600px; border-top: 4px solid #02b875; margin: 100px auto; padding: 30px 0; box-sizing: border-box;\">"		+
                        "	<h1 style=\"margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400;\">"																															+
                        "		<span style=\"font-size: 15px; margin: 0 0 10px 3px;\">랜선 술파티 서비스 짠해</span><br />"																													+
                        "		<span style=\"color: #02b875\">메일인증</span> 안내입니다."																																				+
                        "	</h1>\n"																																																+
                        "	<p style=\"font-size: 16px; line-height: 26px; margin-top: 50px; padding: 0 5px;\">"																													+
                        "		안녕하세요.<br />"																																													+
                        "		아래 <b style=\"color: #02b875\">'인증코드'</b> 를 화면에 입력하여 이메일 중복찾기를 완료해 주세요.<br />"																													+
                        "		감사합니다."																																															+
                        "	</p>"																																																	+
                        "	<a style=\"color: #FFF; text-decoration: none; text-align: center;\""																																	+
                        "		<p"																																																	+
                        "			style=\"display: inline-block; width: 210px; height: 45px; margin: 30px 5px 40px; background: #02b875; line-height: 45px; vertical-align: middle; font-size: 16px;\">"							+
                        ePw + "			</p>"																																														+
                        "	</a>"																																																	+
                        "	<div style=\"border-top: 1px solid #DDD; padding: 5px;\"></div>"																																		+
                        " </div>";
        msgg += "</body>";
        msgg += "</html>";
        message.setText(msgg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress("soyeon1170@gmail.com","짠해"));//보내는 사람

        return message;
    }

    private MimeMessage createMessageButton(String userId, String name, String to)throws Exception{
        System.out.println("보내는 대상 : "+ to);
        MimeMessage  message = emailSender.createMimeMessage();

        message.addRecipients(RecipientType.TO, to); //보내는 대상
        message.setSubject("짠해 비밀번호 찾기 이메일 인증"); //제목

        String msgg="";
        msgg += "<!DOCTYPE html>";
        msgg += "<html>";
        msgg += "<head>";
        msgg += "</head>";
        msgg += "<body>";
        msgg +=
                " <div" 																																																	+
                        "	style=\"font-family: 'Apple SD Gothic Neo', 'sans-serif' !important; width: 400px; height: 600px; border-top: 4px solid #02b875; margin: 100px auto; padding: 30px 0; box-sizing: border-box;\">"		+
                        "	<h1 style=\"margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400;\">"																															+
                        "		<span style=\"font-size: 15px; margin: 0 0 10px 3px;\">랜선 술파티 서비스 짠해</span><br />"																													+
                        "		<span style=\"color: #02b875\">메일인증</span> 안내입니다."																																				+
                        "	</h1>\n"																																																+
                        "	<p style=\"font-size: 16px; line-height: 26px; margin-top: 50px; padding: 0 5px;\">"																													+
                        name																																																+
                        "		님 안녕하세요.<br />"																																													+
                        "		짠해에 가입해 주셔서 진심으로 감사드립니다.<br />"																																						+
                        "		아래 <b style=\"color: #02b875\">'메일 인증'</b> 버튼을 클릭하여 비밀번호 찾기를 완료해 주세요.<br />"																													+
                        "		감사합니다."																																															+
                        "	</p>"																																																	+
                        "	<a style=\"color: #FFF; text-decoration: none; text-align: center;\""																																	+
                        "	href=\"http://localhost:3000/user/resetpwd?userId=" + userId + "&authcode="+ ePw + "\" target=\"_blank\">"														+
                        "		<p"																																																	+
                        "			style=\"display: inline-block; width: 210px; height: 45px; margin: 30px 5px 40px; background: #02b875; line-height: 45px; vertical-align: middle; font-size: 16px;\">"							+
                        "			메일 인증</p>"																																														+
                        "	</a>"																																																	+
                        "	<div style=\"border-top: 1px solid #DDD; padding: 5px;\"></div>"																																		+
                        " </div>";
        msgg += "</body>";
        msgg += "</html>";
        message.setText(msgg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress("soyeon1170@gmail.com","짠해"));//보내는 사람

        return message;
    }

    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    //  a~z  (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    //  A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }

        return key.toString();
    }
    @Override
    public String sendSimpleMessage(FindIdRequest findIdRequest)throws Exception {
        MimeMessage message = createMessage(findIdRequest.getName(), findIdRequest.getEmail());
        try{ //예외처리
            emailSender.send(message);
        }catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
        return ePw;
    }

    @Override
    public String sendSimpleMessageButton(FindPwdRequest findPwdRequest) throws Exception {
        MimeMessage message = createMessageButton(findPwdRequest.getUserId(), findPwdRequest.getName(), findPwdRequest.getEmail());
        try{ //예외처리
            emailSender.send(message);
        }catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
        return ePw;
    }

    @Override
    public String sendAuthCode(String email) throws Exception {
        MimeMessage message = createMessageWithoutName(email);
        try{ //예외처리
            emailSender.send(message);
        }catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
        return ePw;
    }

}