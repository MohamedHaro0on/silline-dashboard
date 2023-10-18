import { FaAccusoft, FaEnvelope  } from "react-icons/fa";
import * as yup from "yup";
import strings from "../../../assets/locals/locals";
export const getInputs = (lang , categories ) => {
  strings.setLanguage(lang);
  return [
    {
      name: "CategoryName",
      label: strings.categoryTitle,
      type: "text",
      id: "CategoryName",
      icon: <FaEnvelope />,
    },
    {
      name: "CategoryPicture",
      label: strings.itemImage,
      type: "file",
      id: "CategoryPicture",
      icon: <FaAccusoft />,
    },
  ];
};


export const getValidationSchema = (lang) =>{

  strings.setLanguage(lang);



  const FILE_SIZE = 200 * 1024;
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
  
   return  yup.object({
    CategoryName: yup
      .string(strings.categoryTitlIsNotString)
      .required(strings.categoryTitleIsEmptyError),
  
      CategoryPicture: yup
      .mixed()
      .required(strings.itemImageIsRequired)
      .test(
        "fileSize",
        "File too large",
        (value) => value && value.size <= FILE_SIZE
      )
      .test(
        "fileFormat",
        "Unsupported Format",
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
      ),
  });
}
