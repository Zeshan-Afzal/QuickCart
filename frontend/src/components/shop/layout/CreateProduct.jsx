import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../Input";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { categoriesData } from "../../../static/data";
import { toast } from "react-toastify";

function CreateProduct({ setActive, active }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { isSeller, shopData } = useSelector((state) => state.shop);

  const [imgurl, setImageUrl] = useState([]);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    discountedPrice: "",
    originalPrice: "",
    tags: "",
    category: "",
    images: [],
    stock: "",
  });

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    if (e.target.id === "files") {
      const selectedFiles = Array.from(e.target.files);
      if (selectedFiles.length + files.length > 5) {
        toast.error("you can only select 5 files");
      } else {
        setFiles((prev) => [...prev, ...selectedFiles]);
      }
    }
  };
  useEffect(() => {
    if (files.length > 0) {
      const newImgUrls = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          newImgUrls.push(reader.result);
          if (newImgUrls.length === files.length) {
            setImageUrl(newImgUrls);
          }
        };
        reader.readAsDataURL(file);
      });
      setFormData({ ...formData, images: files });
    }
  }, [files]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData instance
    const formDataToSend = new FormData();
    console.log(shopData);
    // Check if formData and files are not empty
    if (formData && files.length > 0) {
      // Append form data fields

      Object.entries(formData).forEach(([key, value]) => {
        if (key != "images") {
          formDataToSend.append(key, value);
        }
      });
      formDataToSend.append("shopId", shopData?.shop._id);

      // Append files
      files.forEach((file) => formDataToSend.append("images", file));
    } else {
      toast.error("Form data or files are missing");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "/api/shop/create-product",
        {
          method: "POST",
          headers: { 'ngrok-skip-browser-warning': 'any-value' },
          body: formDataToSend,
        },
        { withCredentials: true }
      );

      const data = await res.json();
      if (!data.success) {
        setLoading(false);

        toast.error(data.message);
      } else {
        toast.success(data.message);
        setLoading(false);

        setActive(3);
      }
    } catch (error) {
      setLoading(false);

      console.error("Error:", error.message);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className=" w-full md:max-w-[830px]  mx-auto flex flex-col items-center gap-4 bg-white  shadow-md  border-gray-200 border rounded-lg mt-10 pt-12 h-[80vh] overflow-auto scrollbar-hide"
      >
        <div className=" text-center">
          <h1 className=" font-bold text-lg md:text-2xl xl:md:text-3xl">
            Create Product
          </h1>
        </div>
        <Input
          type="text"
          label="Product name *"
          id="productName"
          placeholder="Enter product discription"
          handleOnChange={handleOnChange}
          value={formData.productName}
        />
        <div className="w-11/12 md:w-4/5 flex flex-col">
          <label className=" text-sm md:text-lg md:font-semibold text-gray-500">
            Description *
          </label>
          <textarea
            type="text"
            rows={5}
            className="  p-1 md:p-2 rounded-lg border border-gray-300 focus:outline-none bg-slate-100 "
            id="description"
            placeholder="Enter product description"
            onChange={handleOnChange}
            value={formData.description}
          ></textarea>
        </div>
        <div className="w-11/12 md:w-4/5 flex flex-col">
          <label className=" text-sm md:text-lg md:font-semibold text-gray-500">
            Cetagory *
          </label>
          <select
            type="text"
            rows={5}
            className="  p-1 md:p-2 rounded-lg border border-gray-300 focus:outline-none bg-slate-100 "
            id="category"
            placeholder="Enter your email"
            onChange={handleOnChange}
            value={formData.category}
          >
            <option value="choose">choose category</option>
            {categoriesData.map((item, i) => (
              <option
                className="rounded-md bg-slate-100"
                key={i}
                value={item.title}
              >
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <Input
          type="text"
          label="Enter tags"
          id="tags"
          placeholder="Enter your phone number"
          handleOnChange={handleOnChange}
          value={formData.tags}
        />
        <Input
          type="number"
          label="Orignal price"
          id="originalPrice"
          placeholder="Enter your address"
          handleOnChange={handleOnChange}
          value={formData.originalPrice}
        />
        <Input
          type="number"
          label="Discounted Price *"
          id="discountedPrice"
          placeholder="Enter your zipcode"
          handleOnChange={handleOnChange}
          value={formData.discountedPrice}
        />

        <Input
          type="number"
          label="Products stock *"
          id="stock"
          placeholder="Enter your password"
          handleOnChange={handleOnChange}
          value={formData.stock}
        />

        <div className="flex self-start md:ml-9  lg:ml-12 xl:ml-16 gap-2   items-center ">
          <label
            htmlFor="files"
            className="  p-1 md:p-3 rounded-lg  flex items-center ml-4 bg-white cursor-pointer "
          >
            <input
              type="file"
              name=""
              id="files"
              multiple
              hidden
              accept="jpg, png, jpeg"
              onChange={handleOnChange}
            />
            <AiOutlinePlusCircle size={30} className="" color="#555" />
            Upload files
          </label>

          {imgurl &&
            imgurl.length > 0 &&
            imgurl.map((item, i) => (
              <img
                key={i}
                src={item}
                alt="img"
                className=" rounded-md w-10  sm:h-14 sm:w-14 h-10 md:h-20 md:w-20 inline"
              />
            ))}
        </div>
        <button className=" mb-9 p-1 md:p-4 bg-blue-600 font-semibold text-white rounded-lg  w-4/5">
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </>
  );
}

export default CreateProduct;
