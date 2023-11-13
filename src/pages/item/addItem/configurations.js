import { FaEnvelope, FaLock } from "react-icons/fa";
import * as yup from "yup";
import strings from "../../../assets/locals/locals";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const FILE_SIZE = 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];



export const getInputs = (lang, categories) => {
  strings.setLanguage(lang);
  return [
    {
      name: "ItemName",
      label: strings.itemName,
      type: "text",
      id: "itemName",
      icon: <FaEnvelope />,
    },
    {
      name: "Description",
      label: strings.description,
      type: "text",
      id: "Description",
      icon: <FaLock />,
    },
    {
      name: "Price",
      label: strings.price,
      type: "number",
      id: "Price",
      icon: <AttachMoneyIcon />,
    },
    {
      name: "AllergyInfo",
      label: strings.allergy,
      type: "text",
      id: "AllergyInfo",
      icon: <FaLock />,
    },
    {
      name: "CategoryID",
      label: strings.category,
      type: "select",
      options: categories && categories.map((el) => el),
      id: "CategoryID",
      icon: <Diversity2Icon />,
    },
    {
      name: "Image",
      label: strings.itemImage,
      type: "file",
      id: "Image",
      icon: <DriveFolderUploadOutlinedIcon />,
      accept: "image/*",
    },
  ];
};

export const getValidationSchema = (lang, categories) => {
  strings.setLanguage(lang);

  return yup.object({
    ItemName: yup
      .string(strings.itemNameIsEmpty)
      .required(strings.itemNameIsNotStringError),
    Description: yup
      .string(strings.descriptionIsNotStringError)
      .required(strings.descriptionIsEmptyError),
    AllergyInfo: yup
      .string(strings.allergyIsNotString)
      .required(strings.allergyIsEmptyError),

    Price: yup
      .number(strings.priceIsNotNumber)
      .required(strings.priceIsEmpty)
      .min(0, strings.priceMustBeGreaterThanZero),

    CategoryID: yup
      .mixed()
      // .oneOf(categories && categories.map((el) => el.CategoryID))
      .defined()
      .required(strings.categoryIsEmpty),

    Image: yup
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
};
