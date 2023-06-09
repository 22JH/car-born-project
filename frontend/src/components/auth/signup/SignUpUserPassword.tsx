import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPage";
import { SignupFormData } from "./SignUpButton";
import { StyledInput, StyleIsValidSpaceBetween, StyleNameLabel } from "./SignUpUserName";
import IsValidComponent from './../../isValid/IsValidComponent';

export interface SignUpPasswordProps {
  signupUserFormData: SignupFormData;
  setSignupUserFormData: React.Dispatch<React.SetStateAction<SignupFormData>>;
  secondPassword: string;
  setIsPasswordValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpUserPassword = ({
  setSignupUserFormData,
  signupUserFormData,
  secondPassword,
  setIsPasswordValid,
}: SignUpPasswordProps) => {
  // 메세지
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<String>("");

  // 입력되는거 formdata에 넘겨주기
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const regex =
  /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    const { value } = e.target;
    if(e.target.value === '') {
      setMessage(" ")
      setIsAlert(false);
    }
    if (regex.test(value)) {
      setSignupUserFormData({
        ...signupUserFormData,
        password: value,
      });
      setIsAlert(true);
    } else {
      setIsAlert(false);
      setMessage("영소문자, 숫자, '_'만 입력 가능합니다.")
      setSignupUserFormData({
        ...signupUserFormData,
        password: e.target.value,
      });
    }
    // 타이핑하는순간 비밀번호중복체크 초기화됨
    setSignupUserFormData({
      ...signupUserFormData,
      password: e.target.value,
    });
    if (secondPassword === e.target.value) {
      setIsPasswordValid(true);
    }
  };

  // 비밀번호 유효성 : 영문자 소문자랑 숫자랑 특수문자(전부가능)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if(e.currentTarget.value === '') {
        setMessage(" ")
        setIsAlert(false);
      }
      // 영어 소문자, 숫자, 특수문자 모두 조합해야함을 나타내는 정규표현식
      const regex =
        /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
      if (regex.test(e.currentTarget.value)) {
        setIsAlert(true);
      } else {
        if(e.currentTarget.value === '') {
          setMessage(" ")
          setIsAlert(false)
        } else {
          setIsAlert(false);
          setMessage("8자리 이상의 영소문자,숫자,특수문자 조합이어야 합니다.");
          setSignupUserFormData({
            ...signupUserFormData,
            password: "",
          });
        }
      }
    }
  };

  const handleBlur = (e:any) => {
    const regex =
        /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
      if (regex.test(e.currentTarget.value)) {
        setIsAlert(true);
      } else {
        if(e.currentTarget.value === '') {
          setMessage(" ")
          setIsAlert(false)
        } else {
          setIsAlert(false);
          setMessage("8자리 이상의 영소문자,숫자,특수문자 조합이어야 합니다.");
          setSignupUserFormData({
            ...signupUserFormData,
            password: "",
          });
        }
      }
    }

  useEffect(() => {
    if (
      secondPassword === signupUserFormData.password &&
      signupUserFormData.password
    ) {
      setIsPasswordValid(true);
      setSignupUserFormData({
        ...signupUserFormData,
        passwordcheck: true,
      });
    } else {
      setIsPasswordValid(false);
      setSignupUserFormData({
        ...signupUserFormData,
        passwordcheck: false,
      });
    }
  }, [secondPassword, signupUserFormData.password]);

  return (
    <StyleSignUpInputDiv>
      <StyleIsValidSpaceBetween>
        <StyleNameLabel htmlFor="userpassword">
          비밀번호
          <IsValidComponent isValid={isAlert} />
        </StyleNameLabel>
        {isAlert ? null : <span>{message}</span>}
      </StyleIsValidSpaceBetween>
      <StyledInput
        type="password"
        id="userpassword"
        name="userpassword"
        tabIndex={3}
        placeholder="Password"
        autoComplete="off"
        required
        value={signupUserFormData.password}
        onChange={(e) => handlePassword(e)}
        onKeyDown={(e) => handleKeyPress(e)}
        onBlur={(e) => handleBlur(e)}
      />
    </StyleSignUpInputDiv>
  );
};

export default SignUpUserPassword;
