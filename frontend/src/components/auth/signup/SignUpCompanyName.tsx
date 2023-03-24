import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPages";
import { SignupFormData } from "./SignUpButton";

//타입 지정
export type SignUpUserNameProps = {
  signupCompanyFormData: SignupFormData;
  setSignupCompanyFormData: Dispatch<SetStateAction<SignupFormData>>;
};

const SignUpCompanyName = ({
  signupCompanyFormData,
  setSignupCompanyFormData,
}: SignUpUserNameProps) => {
  // 회원가입 이름 세팅(회사명은 정규표현식 제거)
  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSignupCompanyFormData({
      ...signupCompanyFormData,
      name: e.target.value,
    });
  };

  return (
    <div>
      <StyleSignUpInputDiv>
        <label htmlFor="companyname">회사명</label>
        <br />
        <input
          tabIndex={1}
          type="text"
          id="companyname"
          autoComplete="off"
          placeholder="회사명을 입력해주세요(ex. (주)싸피)"
          value={signupCompanyFormData.name}
          onChange={(e) => handleUserName(e)}
        />
      </StyleSignUpInputDiv>
    </div>
  );
};

export default SignUpCompanyName;
