package site.carborn.service.common;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Null;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import site.carborn.dto.request.AccountRequestDTO;
import site.carborn.entity.account.Account;
import site.carborn.entity.account.Company;
import site.carborn.entity.account.User;
import site.carborn.entity.common.SmsAuth;
import site.carborn.entity.company.Cbr;
import site.carborn.entity.company.Inspector;
import site.carborn.entity.company.InsuranceCompany;
import site.carborn.entity.company.RepairShop;
import site.carborn.repository.account.AccountRepository;
import site.carborn.repository.account.CompanyRepository;
import site.carborn.repository.account.UserRepository;
import site.carborn.repository.common.SmsAuthRepository;
import site.carborn.repository.company.CbrRepository;
import site.carborn.repository.company.InspectorRepository;
import site.carborn.repository.company.InsuranceCompanyRepository;
import site.carborn.repository.company.RepairShopRepository;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.common.AuthUtils;

import java.util.Map;
import java.util.regex.Pattern;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class JoinService {
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final CbrRepository cbrRepository;
    private final RepairShopRepository repairShopRepository;
    private final InspectorRepository inspectorRepository;
    private final InsuranceCompanyRepository insuranceCompanyRepository;
    private final SmsAuthRepository smsAuthRepository;
    private final PasswordEncoder passwordEncoder;

    public void join(AccountRequestDTO dto, Map<String, Object> geo) {
        Account account = Account.copy(dto);
        String id = account.getId();
        String pwd = account.getPwd();
        String phoneNo = account.getPhoneNo();

        checkAccountIdFormat(id);
        checkAccountPwdFormat(pwd);

        // 비밀번호 암호화
        account.setPwd(passwordEncoder.encode(pwd));

        Account idCheck = accountRepository.findById(id);
        if (idCheck != null) {
            throw new RuntimeException("중복된 아이디가 존재합니다");
        }
        Account phoneNoCheck = accountRepository.findByPhoneNo(phoneNo);
        if (phoneNoCheck != null) {
            throw new RuntimeException("중복된 휴대전화 번호가 존재합니다");
        }

//        SmsAuth smsAuth = smsAuthRepository.checkSmsAuth(phoneNo);
//        if (smsAuth == null || smsAuth.isStatus() == false) {
//            throw new RuntimeException("SMS 인증을 완료하지 않았습니다");
//        }

        switch(account.getAuth()) {
            case AuthUtils.AUTH_USER:
                User user = new User();
                user.setBirth(dto.getBirth());
                joinUser(account, user);
                break;

            case AuthUtils.AUTH_REPAIR_SHOP:
            case AuthUtils.AUTH_INSPECTOR:
            case AuthUtils.AUTH_INSURANCE:
                Company company = new Company();
                company.setBrn(dto.getBrn());
                joinCompany(account, company, dto, geo);
                break;
        }
    }

    private void joinUser(Account account, User user) {
        accountRepository.save(account);
        user.setAccount(account);
        userRepository.save(user);
    }

    private void joinCompany(Account account, Company company, AccountRequestDTO dto, Map<String, Object> geo) {
        double lat = geo == null ? 0 : (double) geo.get("lat");
        double lng = geo == null ? 0 : (double) geo.get("lng");

        Account accountSave = accountRepository.save(account);
        company.setAccount(accountSave);
        Company companySave = companyRepository.save(company);

        // 사업자등록증 이미지 저장
        saveCbrImage(companySave, dto);

        switch (account.getAuth()) {
            case AuthUtils.AUTH_REPAIR_SHOP -> {
                RepairShop repairShop = new RepairShop();
                repairShop.setAccount(account);
                repairShop.setAddress(dto.getAddress());
                repairShop.setLat(lat);
                repairShop.setLng(lng);
                repairShopRepository.save(repairShop);
            }
            case AuthUtils.AUTH_INSPECTOR -> {
                Inspector inspector = new Inspector();
                inspector.setAccount(account);
                inspector.setAddress(dto.getAddress());
                inspector.setLat(lat);
                inspector.setLng(lng);
                inspectorRepository.save(inspector);
            }
            case AuthUtils.AUTH_INSURANCE -> {
                InsuranceCompany insuranceCompany = new InsuranceCompany();
                insuranceCompanyRepository.save(insuranceCompany);
            }
        }
    }

    private void saveCbrImage(Company company, AccountRequestDTO dto) {
        if (dto.getCbr() == null || dto.getCbr().isEmpty()) {
            throw new NullPointerException("사업자등록증 이미지를 첨부해주세요");
        }

        String cbrImgNm = BoardUtils.singleFileSave(dto.getCbr());

        Cbr cbr = new Cbr();
        cbr.setCompany(company);
        cbr.setImgNm(cbrImgNm);

        cbrRepository.save(cbr);
    }

    private void checkAccountIdFormat(String id) {
        String pattern = "^[a-z0-9]*$";
        if (id.length() < 8 || id.length() > 20) {
            throw new RuntimeException("아이디는 8~20자로 설정해야 합니다");
        }

        if (Pattern.matches(pattern, id) == false) {
            throw new RuntimeException("아이디는 영문 소문자, 숫자만 가능합니다");
        }
    }

    private void checkAccountPwdFormat(String pwd) {
        String pattern = "^(?=^.{8,20}$)(?=.*\\d)(?=.*[a-z])(?=.*[!@#$%^&*])[a-z0-9!@#$%^&*]*$";
        if (pwd.length() < 8 || pwd.length() > 20) {
            throw new RuntimeException("비밀번호는 8~20자로 설정해야 합니다");
        }

        if (Pattern.matches(pattern, pwd) == false) {
            throw new RuntimeException("비밀번호 형식이 올바르지 않습니다");
        }
    }
}
