import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdAddAPhoto } from "react-icons/md";
import { toast } from "react-toastify";
import { updateUser } from "../../store/actions/userActions.js"
import Loader from "../../components/layout/Loader"
import AddressesContent from "./order/AddressesContent";
export default function ProfileContent({ activeTab }) {
  return (
    <div className=" md:p-4 w-full">
      {activeTab === 1 && <ProfileInfo />}
      {activeTab === 2 && <Orders />}
      {activeTab === 6 && <Addresses />}

    </div>
  );
}



const ProfileInfo = () => {
  const [update, setUpdate] = useState(false);
  const { userData } = useSelector((state) => state.user);
 
  useEffect(() => {
    if (update) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Clean up function to reset overflow on component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [update]);


  return (
    <div className=" flex flex-col items-center justify-center w-full bg-white h-[100vh] ">
      <div className=" w-full flex items-center justify-center ">
     
        <img
          src={`${userData && userData.user.avatar.url} `}
          className=" h-32 w-32 md:w-52 md:h-52 rounded-full cursor-pointer   "
          alt="sdf"
        />
      </div>
      <div className=" gap-3 w-full flex bg-white mt-5  flex-wrap justify-center flex-col  p-2 md:p-5">
        <div className=" flex gap-6">
          <p className=" font-semibold text-xl w-16  md:w-28">Name:</p>
          <p className=" font-semibold p-1 md:font-bold text-xl md:p-2 bg-gray-100 w-full">
         {userData && userData.user.fullName}
          </p>
        </div>
        <div className=" flex gap-6">
          <p className="  font-semibold text-xl w-16  md:w-28">Email:</p>
          <p className=" font-semibold p-1 md:font-bold text-xl md:p-2 bg-gray-100 w-full ">
           {userData && userData.user.email}
          </p>
        </div>
        <div className=" flex gap-6">
          <p className="  font-semibold text-xl w-16  md:w-28">Phone No:</p>
          <p className=" font-semibold p-1 md:font-bold text-xl md:p-2 bg-gray-100 w-full">
            {userData && userData.user.phoneNumber}
          </p>
        </div>
      

        <button
          onClick={() => {
            setUpdate(true);
          }}
          className=" hover:bg-gray-200 shadow-sm border border-gray-200 transition-all duration-300 bg-gray-100 p-2 md:p-2 w-18 md:w-32 text-black  rounded-sm mr-2 text-sm font-semibold  self-end md:text-lg"
        >
          Edit
        </button>
      </div>

      {update && <UpDatePopUp setUpdate={setUpdate} userData={userData} />}
    </div>
  );
};

const UpDatePopUp = ({ setUpdate, userData,  }) => {
  const [file, setFile]=useState()
  const [filepath, setFilePath]=useState()
  const [image, setImage]=useState()
  const [error , setError]=useState(null)
  const [loading , setLoadng]=useState(false)
  const [data, setData]=useState({name:'', email:'', phoneNumber:'', password:""})
  const dispatch=useDispatch() 
  const handleChange=(e)=>{
     const url=e.target.files[0]
     setImage(url)
      setFilePath(url)
     
  }

  useEffect(()=>{
    if(filepath){

      const reader = new FileReader();
      reader.onload = () => {
        setFile(reader.result);
      };
      
      reader.readAsDataURL(filepath);
    }
  

   toast.error(error)


  },[filepath, error])

 const handleOnInputChange=(e)=>{
    setData({...data ,[e.target.id]:e.target.value})


  }
  const handleSubmit= async(e)=>{
    e.preventDefault()
  let formData=new FormData()
  Object.entries(data).forEach(([key, value]) => {
    
    formData.append(key, value);
    
  });



  if(image){
    formData.append("avatar", image)
  }
 



try {
     setLoadng(true)
     setError(null)
    let res=await fetch('/api/user/update-user', {
      method: "POST",
  
      body: formData,
      headers:{'ngrok-skip-browser-warning': 'any-value'}
    },
    { withCredentials: true })
    
    let resData= await res.json()
    if(!resData.success){
      setLoadng(false)
      return setError(resData.message)
    }

    dispatch(updateUser(resData))
    toast.success(resData.message)
    setLoadng(false)
    
   
} catch (error) {
  setError(error)
  setLoadng(false)
}





  }
  return loading?<>
  <div  className="left-0 top-0 absolute w-screen h-screen bg-white flex  justify-center  z-50">
    <Loader/>
  </div> 
  </> 
     :

    <div className="left-0 top-0 absolute w-screen h-screen flex  justify-center  z-50 ">
      <form onSubmit={handleSubmit} className=" py-3 overflow-auto scrollbar-hide p-1 md:p-3 flex flex-col items-center justify-center w-[60%] shadow-lg top-[2%] md:top-[15%] bg-white  md:h-[60vh] fixed">
        <div className=" w-full flex items-center justify-center relative">
        <label htmlFor="file" className="absolute  ">
       <MdAddAPhoto size={35} color="white" className=" cursor-pointer  hover:opacity-90"/>
        </label>
        <input type="file" name="" hidden id="file" className=" left-2" onChange={handleChange} />
          <img
            src={file?file:`${userData && userData.user.avatar.url} ` }
            className=" h-32 w-32 md:w-52 md:h-52 rounded-full border border-red-500"
            alt="sdf"
          />
        </div>
        <div className=" gap-3 w-full flex bg-white mt-5  flex-wrap justify-center  p-2 md:p-5">
          <Input label={"Name"} type="text"   value={data.name} id="name" onChangeHandler={handleOnInputChange}/>
          <Input label={"Email"}  type="email" value={data.email}  id="email" onChangeHandler={handleOnInputChange}/>
          <Input label={"Phone No"}  type="number" value={data.phoneNumber} id="phoneNumber" onChangeHandler={handleOnInputChange}/>

          <Input label={"Password"}  type="password" value={data.password} id="password"  onChangeHandler={handleOnInputChange}/>
      
        </div>
        <div className=" self-end">
          <button
            onClick={() => {
              setUpdate(false);
            }}
            className=" hover:bg-gray-200 shadow-sm border border-gray-200 transition-all duration-300 bg-gray-100 p-2 md:p-2 w-18 md:w-32 text-black  rounded-sm mr-2 text-sm font-semibold  self-end md:text-lg"
          >
            Cencel
          </button>
          <button  className=" hover:bg-gray-200 shadow-sm border border-gray-200 transition-all duration-300 bg-gray-100 p-2 md:p-2 w-18 md:w-32 text-black  rounded-sm mr-2 text-sm font-semibold  self-end md:text-lg">
            Update
          </button>
        </div>
      </form>
    </div>
  
};

const Input = ({ label , type,id,  onChangeHandler }) => {
  return (
    <div className="  w-full md:w-[40%] flex  flex-col gap-2">
      <label className=" font-semibold">{label}</label>
      <input
      onChange={onChangeHandler}
      id={id}
        type={type}
        className=" bg-gray-200 border-none outline-none p-2
      "
      />
    </div>
  );
};

const Orders = () => {
  return <div>ordre</div>;
};







const Addresses = () => {
  return <AddressesContent></AddressesContent>
};
