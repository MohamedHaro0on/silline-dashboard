import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  ar: {
    signUp: "أشترك معنا",
    login: "سجل دخول",
    register: "إشترك",
    admin: "أدمن",
    user: "مستخدم",

    successfullLogin : "تم تسجيل الدخول بنجاح",
    registerError : "خطأ في تسجيل الحساب",
    successfullRegistration : "تم تسجيل الحساب بنجاح",
    wrongCredentials : "خطأ في اسم المستخدم او كلمة السر", 
    loggedOut :"تم تسجيل الخروج",
    loggingOutError :"خطأ في تسجيل الخروج",
    userName: "إسم المستخدم ",
    userNameEmptyError: "يجب إدخال إسم المستخدم ",
    userNameNotStringError: "إسم المستخدم يجب ان يكون نصاً",

    lastName: "اسم العائلة",
    lastNameEmptyError: "يجب إدخال اسم العائلة",
    lastNameNotStringError: "اسم العائلة يجب ان يكون نصاً",

    role: "الدور",
    roleEmptyError: "يجب إدخال الدور ",
    roleNotValid: "الدور يجب ان يكون إما أدمن أو مستخدم",

    password: "كلمة السر",
    passwordEmptyError: "يجب إدخال كلمة السر",
    passwordLessThanMin: "كلمة السر يجب ان تكون اكثر من 4 حروف",
    passwordNotString: "كلمة السر يجب ان تكون نصاً",

    confirmPassword: "تأكيد كلمة السر",
    confirmPasswordEmptyError: "يجب إدخال التأكد من كلمة السر",
    confirmPasswordLessThanMin: "تأكيد كلمة السر يجب أن تكون أكثر من 4 حروف",
    confirmPasswordNotString: "كلمة السر يجب ان تكون نصاً",
    passAndConfirmAreNotMatch: "كلمة السر يجب ان تتشابه مع تأكيد كلمة السر",

    email: "البريد الالكتروني",
    emailNotEmailFormat: "يجب إدخال سيغة بريد الكتروني صحيحة",
    emailEmptyError: "يجب إدخال بريدك الالكتروني",

    haveAnAccount: "أمتلك حساب بالفعل",
    dontHaveAnAccount: "لا تمتلك حساب , يمكنك",

    logOut: "تسجيل خروج",

    overView: "نبذة عامة",
    items: "العناصر",

    totalCustomers: "إجمالي العملاء",
    totalOrders: "إجمالي الطلبات",
    mostSoldItem: "العنصر الأكثر مبيعاً",
    totalProfit: "إجمالي الارباح",

    itemName: "اسم العنصر",
    itemNameIsNotStringError: "اسم العنصر يجب ان يكون نصاً",
    itemNameIsEmpty: "يجب إدخال اسم العنصر",
    itemImageIsRequired: "يجب إدخال صورة العنصر",
    itemAddedSuccessfully: "تم إضافة العنصر بنجاح",
    addItemError : "خطأ في تسجيل العنصر" ,
    description: "الوصف",
    descriptionIsNotStringError: "الوصف يجب ان يكون نصاً",
    descriptionIsEmptyError: "يجب إدخال وصف العنصر",

    allergy: "حساسية من ",
    allergyIsNotString: "الحساسية يجب ان تكون نصاً",
    allergyIsEmptyError: "يجب إدخال الحساسية",

    price: "السعر",
    priceIsNotNumber: "السعر يجب ان يكون رقم و لا يحتوي علي اي حروف",
    priceIsEmpty: "يجب إدخال السعر",
    priceMustBeGreaterThanZero: "يجب ان يكون السعر اكبر من 0 ",

    submit: "تسجيل",
    addNewItem: "اضافة عنصر جديد",

    categories: "الاصناف",
    category: "الصنف",
    categoryIsEmpty: "يجب إدخال تصنيف العنصر",
    categoryTitle: "اسم الصنف",
    categoryTitlIsNotString: "اسم الصنف يجب ان يكون نصاً ",
    categoryTitleIsEmptyError: "يجب إدخال اسم الصنف",

    all: " جميع العناصر",
    filterItems: "تصفية العناصر بواسطة الصنف",
  },
  en: {
    signUp: "Sign Up",
    login: "Log In",
    register: "Register",
    admin: "Admin",
    user: "User",

    successfullLogin : "Sucessfull Login" ,
    successfullRegistration : "Successfull Registration",
    registerError :"Registration Error",
    wrongCredentials : "Wrong Credentials",
    loggedOut :"Logged Out Successfully",
    loggingOutError : "Logging Out Error",
    userName: "User Name ",
    userNameEmptyError: "User Name is required",
    userNameNotStringError: "User Name must be a String",

    lastName: "Last Name",
    lastNameEmptyError: "Last Name is required",
    lastNameNotStringError: "Last Name must be a String",

    role: "Role",
    roleEmptyError: "Role is required",
    roleNotValid: "Role must be either admin or user",

    password: "Password",
    passwordEmptyError: "Password is required",
    passwordLessThanMin: "Password must be at least 8 char",
    passwordNotString: "Password must be a string",

    confirmPassword: "Confirm Password",
    confirmPasswordEmptyError: "Confirm Password is Required",
    confirmPasswordLessThanMin: "Password must be at least 4 char",
    confirmPasswordNotString: "Password must be a string",
    passAndConfirmAreNotMatch: "Password and Confirm Password must match",

    email: "Email",
    emailNotEmailFormat: "Enter a valid Email Format",
    emailEmptyError: "Email is Required",

    haveAnAccount: "Already , have an Account",
    dontHaveAnAccount: "Don't have an account , you can ",
    logOut: "Log Out",
    overView: "Overview",
    items: "Items",
    totalCustomers: "Total Customers",
    totalOrders: "Total Orders",
    mostSoldItem: "Most Sold Item",
    totalProfit: "Total Profit",

    itemName: "Item Name",
    itemNameIsNotStringError: "Item Name must be string",
    itemNameIsEmpty: "Item Name is required",
    itemImageIsRequired: "Item image is required",
    itemAddedSuccessfully: "Item Has Been Added Successfully",
    addItemError : "Add Item Error" ,
    description: "Description",
    descriptionIsNotStringError: "Description must be string",
    descriptionIsEmptyError: "Decription is Required",

    allergy: "Allergy",
    allergyIsNotString: "Allergy must be string",
    allergyIsEmptyError: "Allergy is Required",

    price: "Price",
    priceIsNotNumber: "Price must be a number",
    priceIsEmpty: "Price is required",
    priceMustBeGreaterThanZero: "Price must be greater than 0",

    submit: "Submit",
    addNewItem: "Add New Item",

    category: "Category",
    categories: "Categories",
    categoryIsEmpty: "Category is required",
    categoryTitle: "Category Title",
    categoryTitlIsNotString: "Category title must be string",
    categoryTitleIsEmptyError: "Category title is required",

    all: "All Items",
    filterItems: "Filter Items by Category",
  },
});

export default strings;
