package site.carborn.controller.common;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.carborn.dto.request.AccountRequestDTO;
import site.carborn.entity.common.SmsAuth;
import site.carborn.service.common.AddressService;
import site.carborn.service.common.JoinService;
import site.carborn.service.common.SmsService;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.common.AuthUtils;
import site.carborn.util.network.NormalResponse;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Tag(name = "Join", description = "회원가입 API")
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class JoinController {
    @Autowired
    JoinService joinService;

    @Autowired
    SmsService smsService;

    @Autowired
    AddressService addressService;

    @PostMapping("/join")
    public ResponseEntity<?> join(@ModelAttribute AccountRequestDTO dto) {
        if (dto.getCbr() == null || dto.getCbr().isEmpty()) {
            log.debug("첨부파일이 없습니다");
        }

        Map<String, Object> geo = null;

        if (dto.getAuth() != AuthUtils.AUTH_USER) {
            geo = addressService.getGeoAddress(dto.getAddress());

            if (geo.isEmpty()) {
                throw new NullPointerException("위도 및 경도 정보를 받아올 수 없습니다");
            }
        }
        
        if (geo == null) {
            geo = new HashMap<>();
        }

        joinService.join(dto, geo);
        return NormalResponse.toResponseEntity(HttpStatus.OK, BoardUtils.BOARD_CRUD_SUCCESS);
    }

    @PostMapping("/sms-auth-send")
    public ResponseEntity<?> smsAuthSend(@RequestBody SmsAuth smsAuth) {
        String phoneNm = smsAuth.getPhoneNm();
        if (phoneNm.isBlank()) {
            throw new NullPointerException("휴대전화 번호를 입력해주세요");
        }

        smsService.smsAuthSend(smsAuth);
        return NormalResponse.toResponseEntity(HttpStatus.OK, BoardUtils.BOARD_CRUD_SUCCESS);
    }
}
