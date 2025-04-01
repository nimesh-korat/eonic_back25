const express = require("express");
const cors = require("cors");
const connectDB = require("./db/dbConnect");
const { SignUp } = require("./apis/user/signup");
const Session = require("./apis/session");
const session = require("express-session");
const {
  productPicUpload,
  bannerPicUpload,
  categoryPicUpload,
} = require("./multer/multer");
const { AddProduct } = require("./apis/admin/addProducts");
const { Login } = require("./apis/user/login");
const { GetProducts } = require("./apis/user/getProducts");
const { GetOneProduct } = require("./apis/user/getOneProduct");
const { AddBanner } = require("./apis/admin/addBanner");
const { GetBanner } = require("./apis/user/getBanner");
const { AddEnquiry } = require("./apis/user/addEnquiry");
const { SearchProduct } = require("./apis/user/searchProduct");
const { EditProduct } = require("./apis/admin/editProduct");
const { DeleteProduct } = require("./apis/admin/deleteProduct");
const { EditBanner } = require("./apis/admin/editBanner");
const { DeleteBanner } = require("./apis/admin/deleteBanner");
const { GetEquiries } = require("./apis/admin/getEnquiries");
const { ContactUs } = require("./apis/user/contactUs");
const { GetContactUs } = require("./apis/admin/getContactUs");
const Logout = require("./apis/logout");
const { GetCounts } = require("./apis/admin/getCounts");
const { AddCategories } = require("./apis/admin/addCategories");
const { ViewCategories } = require("./apis/user/viewCategories");
const { DeleteCategory } = require("./apis/admin/deleteCategories");
const { GetProductsByCategory } = require("./apis/user/getProductByCategory");
const { EditCategory } = require("./apis/admin/editCategory");
const { EditContactDetail } = require("./apis/admin/editContactDetail");
const { GetContactDetail } = require("./apis/user/getContactDetails");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  cors({
    origin: ["http://localhost:3001", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/images/productImage", express.static("images/productImages"));
app.use("/images/bannerImage", express.static("images/bannerImages"));
app.use("/images/categoryImage", express.static("images/categoryImages"));

//!Admin APIs
app.post(
  "/admin/addProducts",
  productPicUpload.array("productImgs", 3),
  AddProduct
);
app.post(
  "/admin/editProducts",
  productPicUpload.array("productImgs", 3),
  EditProduct
);
app.post("/admin/deleteProducts", DeleteProduct);
app.post("/admin/addBanner", bannerPicUpload.single("bannerImg"), AddBanner);
app.post("/admin/editBanner", bannerPicUpload.single("bannerImg"), EditBanner);
app.post("/admin/deleteBanner", DeleteBanner);
app.get("/admin/getEnquiries", GetEquiries);
app.get("/admin/getContactUs", GetContactUs);
app.get("/admin/getCounts", GetCounts);
app.post(
  "/admin/addCategories",
  categoryPicUpload.single("categoryImg"),
  AddCategories
);
app.post(
  "/admin/editCategories",
  categoryPicUpload.single("categoryImg"),
  EditCategory
);
app.post("/admin/deleteCategories", DeleteCategory);
app.post("/admin/editContact", EditContactDetail);

//!User APIs
app.post("/user/login", Login);
app.post("/user/signup", SignUp);
app.get("/viewCategories", ViewCategories);
app.get("/user/getProducts", GetProducts);
app.get("/user/getProductByCategory/:categoryId", GetProductsByCategory);
app.get("/user/getOneProduct/:productId", GetOneProduct);
app.get("/user/getBanner", GetBanner);
app.post("/user/addEnquiry", AddEnquiry);
app.post("/user/searchProduct", SearchProduct);
app.post("/user/contactUs", ContactUs);
app.post("/user/getContactDetail", GetContactDetail);

//!Common APIs
app.post("/session", Session);
app.post("/logout", Logout);

connectDB();

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}!`));
