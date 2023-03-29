package site.carborn.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import site.carborn.entity.account.Account;
import site.carborn.entity.car.Car;
import site.carborn.entity.company.Inspector;
import site.carborn.entity.user.Community;
import site.carborn.entity.user.InspectBook;
import site.carborn.mapping.user.UserCommunityListMapping;
import site.carborn.mapping.user.UserInspectBookDetailMapping;
import site.carborn.repository.account.AccountRepository;
import site.carborn.repository.user.CommunityRepository;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.common.BookUtils;

import java.time.LocalDateTime;

@Service
public class UserCommunityService {
    @Autowired
    private CommunityRepository communityRepository;
    @Autowired
    private AccountRepository accountRepository;

    public Page<UserCommunityListMapping> getBoardList(int page, int size){
        Page<UserCommunityListMapping> getBoardList = communityRepository.findByStatus(
                BoardUtils.BOARD_DELETE_STATUS_FALSE
                ,BoardUtils.pageRequestInit(
                        page
                        ,size
                        ,"id", BoardUtils.ORDER_BY_DESC
                )
        );
        if(getBoardList.isEmpty()){
            throw new NullPointerException("해당 페이지의 데이터가 존재하지 않습니다");
        }
        return getBoardList;
    }

    public UserCommunityListMapping getBoardDetail(int communityId){
        UserCommunityListMapping boardDetail = communityRepository.findAllByIdAndStatus(communityId,BoardUtils.BOARD_DELETE_STATUS_FALSE);

        if (boardDetail == null){
            throw new RuntimeException("존재하지 않는 데이터입니다");
        }

        return boardDetail;
    }

    public int createBoard(Community community){

        if (community.getAccount().getId().isBlank()) {
            throw new RuntimeException("세션이 만료되었습니다");
        }

        Account account = accountRepository.findById(community.getAccount().getId());
        if (account == null){
            throw new RuntimeException("존재하지 않는 아이디입니다");
        }

        community.setRegDt(LocalDateTime.now());
        community.setUptDt(LocalDateTime.now());
        community.setStatus(BoardUtils.BOARD_DELETE_STATUS_FALSE);

        Community save = communityRepository.save(community);
        return save.getId();
    }

    public int updateBoard(Community community, int communityId) {

        if (community.getAccount().getId().isBlank()) {
            throw new RuntimeException("세션이 만료되었습니다");
        }

        if (accountRepository.findById(community.getAccount().getId())==null){
            throw new RuntimeException("존재하지 않는 아이디입니다");
        }
        if (community.getId() != communityId){
            throw new RuntimeException("잘못된 경로입니다");
        }
        Community update = communityRepository.findById(communityId).orElseThrow(()->
                new RuntimeException("존재하지 않는 데이터입니다"));
//
        if (!community.getAccount().getId().equals(update.getAccount().getId())){
            throw new RuntimeException("권한이 없습니다");
        }

        update.setTitle(community.getTitle());
        update.setContent(community.getContent());
        update.setUptDt(LocalDateTime.now());

        communityRepository.save(update);
        return update.getId();
    }

    public void deleteBoard(int communityId){
        Community delete = communityRepository.findById(communityId).orElseThrow(() ->
                new RuntimeException("존재하지 않는 데이터입니다")
        );

        if (delete.isStatus() == BoardUtils.BOARD_DELETE_STATUS_TRUE) {
            throw new RuntimeException("삭제된 데이터입니다");
        }

        delete.setStatus(BoardUtils.BOARD_DELETE_STATUS_TRUE);
        delete.setUptDt(LocalDateTime.now());
        communityRepository.save(delete);
    }
}
