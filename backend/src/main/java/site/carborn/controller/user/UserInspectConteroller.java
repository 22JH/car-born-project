package site.carborn.controller.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.carborn.entity.user.InspectBook;
import site.carborn.mapping.user.UserInspectBookDetailMapping;
import site.carborn.mapping.user.UserInspectBookListMapping;
import site.carborn.service.user.UserInspectService;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.network.NormalResponse;

@Tag(name = "사용자 Inspector 조회", description = "사용자가 Inspector에 대한 정보를 조회하는 경우")
@RequestMapping("/api/user/inspect")
@RequiredArgsConstructor
@RestController
public class UserInspectConteroller {
    @Autowired
    private UserInspectService userInspectService;

    // 검수 예약 관리
    @GetMapping("/book/list/{page}/{size}")
    @Operation(description = "사용자의 검수원 예약 목록 조회")
    @Parameters({
            @Parameter(name = "page", description = "페이지 번호"),
            @Parameter(name = "size", description = "페이지 번호")
    })
    public ResponseEntity<?> getInspectBookList(@PathVariable("page") int page,
                                                @PathVariable("size") int size){
        String accountId = "usertest";
        Page<UserInspectBookListMapping> result = userInspectService.inspectBookList(accountId,page,size);
        return NormalResponse.toResponseEntity(HttpStatus.OK,result);
    }

    @GetMapping("book/{inspectId}")
    @Operation(description = "사용자의 검수원 예약 단일 조회")
    @Parameter(name = "inspectId", description = "예약글 id")
    public ResponseEntity<?> getInspectBook(@PathVariable("inspectId") int inspectBookId){
        UserInspectBookDetailMapping inspectBook = userInspectService.inspectBookDetail(inspectBookId);
        return NormalResponse.toResponseEntity(HttpStatus.OK,inspectBook);
    }

    @PostMapping("/book")
    @Operation(description = "사용자 검수원 예약")
    public ResponseEntity<?> createRepairBook(@RequestBody InspectBook inspectBook){
        int result = userInspectService.createInspectBook(inspectBook);
        return NormalResponse.toResponseEntity(HttpStatus.OK, result);
    }

    @DeleteMapping ("/book/delete/{inspectId}")
    @Operation(description = "사용자 검수원 예약 삭제")
    @Parameter(name = "inspectId", description = "예약 게시글 id")
    public ResponseEntity<?> deleteRepairBook(@PathVariable("inspectId") int inspectBookId){
        userInspectService.deleteInspectBook(inspectBookId);
        return NormalResponse.toResponseEntity(HttpStatus.OK, BoardUtils.BOARD_CRUD_SUCCESS);
    }

    @PutMapping("/book/{inspectId}")
    @Operation(description = "사용자 검수원 예약 내역 수정")
    @Parameter(name = "inspectId", description = "예약 게시글 id")
    public ResponseEntity<?> updateInspectBook(@RequestBody InspectBook inspectBook,@PathVariable("inspectId") int inspectBookId){
        return NormalResponse.toResponseEntity(HttpStatus.OK, userInspectService.updateInspectBook(inspectBook,inspectBookId));
    }
}