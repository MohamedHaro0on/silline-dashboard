import { FaEnvelope, FaKey, FaLock, FaUserAlt } from "react-icons/fa";
import * as yup from "yup";

import strings from "../../../assets/locals/locals";

export const getInputs = (lang) => {
  strings.setLanguage(lang);
  return [
    {
      name: "userName",
      label: strings.userName,
      type: "text",
      id: "userName",
      icon: <FaUserAlt />,
    },
    {
      name: "email",
      label: strings.email,
      type: "text",
      id: "email",
      icon: <FaEnvelope />,
    },
    {
      name: "password",
      label: strings.password,
      type: "password",
      id: "password",
      icon: <FaLock />,
    },
    {
      name: "confirmPassword",
      label: strings.confirmPassword,
      type: "password",
      id: "confirmPassword",
      icon: <FaKey />,
    },
  ];
};

export const getValidationSchema = (lang) => {
  return yup.object({
    userName: yup
      .string(strings.userNameNotStringError)
      .required(strings.userNameEmptyError),

    email: yup
      .string(strings.emailNotEmailFormat)
      .email(strings.emailNotEmailFormat)
      .required(strings.emailEmptyError),

    password: yup
      .string(strings.passwordNotString)
      .min(8, strings.passwordLessThanMin)
      .required(strings.passwordEmptyError),

    confirmPassword: yup
      .string(strings.confirmPasswordNotString)
      .min(8, strings.confirmPasswordLessThanMin)
      .required(strings.confirmPasswordEmptyError)
      .oneOf([yup.ref("password"), null], strings.passAndConfirmAreNotMatch),
  });
};
