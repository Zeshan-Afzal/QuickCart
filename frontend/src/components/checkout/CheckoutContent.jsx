import React, { useEffect, useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { City, Country, State } from "country-state-city";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function CheckoutContent() {
  const [step, setStep] = useState("shipping");
  const [subTotal, setSubTotal]=useState(0)
  const [couponCode, setCouponCode]=useState(null)
  const [paymentMethod, setPaymentMethod] = useState();
  const [totalOrderAmount, setTotalOrderAmount]=useState(0)
  const [discount, setDiscount]=useState(null)
  const [shippingCharges, setShippingCharges]=useState(null)
  const { userData } = useSelector((state) => state.user);
  const [savedAddress, setSavedAddress] = useState(null);
   const {cart}=useSelector((state)=>state.cart) 
   

  const [data, setData] = useState({
    address:"",
    country: "",
    zipcod: "",
    city: "",
    addressType: "",
    phoneNumber: "",
    name:"",
    email:""
  });
  const [selectedAddress, setSelectedAddress] = useState("");
  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];
  const handleOnInputChange = (e) => {
    console.log(selectedAddress);
    setData({ ...data, [e.target.id]: e.target.value });

    setSelectedAddress(e.target.id)
    // setSelectedAddress("")
    //  if(e.target.id==="Default" || e.target.id==="Home" || e.target.id==="Office" || e.target.id==="none"){
    //   if(e.target.id==="none"){
    //     setSelectedAddress("")
    //   }

    //   setSelectedAddress({...selectedAddress,type:e.target.id})
    //  }
  };



  useEffect(() => {
    if (selectedAddress === "none") {
      setSavedAddress(null);
      setSelectedAddress("");
      setData({
        address:"",
        country: "",
        zipcod: "",
        city: "",
        addressType: "",
        phoneNumber: "",
        name:"",
        email:""
      })
    }
    if (selectedAddress !== "") {
      userData &&
        userData.user.address.length !== 0 &&
        userData.user.address.map((adrs) => {
          if (adrs.addressType === selectedAddress) {
            setSavedAddress(adrs);
            setData({
              address:adrs.address,
              country:adrs.country,
              zipcod: adrs.zipcod,
              city:adrs.city,
              addressType:adrs.addressType,
              phoneNumber:adrs.phoneNumber,
              name:userData && userData.user.name,
              email:userData && userData.user.email
            })
          }
        });
    }

   
console.log(data)


    
  }, [selectedAddress, paymentMethod]);
  
  useEffect(()=>{
     let total=cart && cart.reduce((accumulator, currentValue)=>  accumulator + currentValue.product.discountedPrice * currentValue.qty, 0)

     setSubTotal(total)
     
    let shipping=(cart && cart.reduce((accumulator, currentValue)=>  accumulator + currentValue.product.discountedPrice * currentValue.qty, 0) *0.1).toFixed(2)
    setShippingCharges(shipping)

    setTotalOrderAmount((Number(subTotal) + Number(shippingCharges)))



  }, [cart && cart, ])

  

 const handleSubmit=async(e)=>{
      e.preventDefault()

    console.log('dl')

       try {
        const res=await fetch("/api/shop/apply-coupon",  {method:"POST", headers:{"Content-Type":"text/plain"},
          body:couponCode
         })
   
   
           let data= await res.json()
           if(data.success){
              const {coupon}=data
            
             const eligialbeProducts=cart && cart.filter((item)=>item.product.shopId===coupon.shopId)
            
             if(eligialbeProducts.length===0){
             return toast.error("The code is not eligible for this shop")
             }
             
             let applicableTotalPriceForDis=eligialbeProducts && eligialbeProducts.reduce((accumulator, currentValue)=>  accumulator + currentValue.product.discountedPrice * currentValue.qty, 0)
             console.log(applicableTotalPriceForDis, coupon.discount)
             
             setDiscount(((applicableTotalPriceForDis * coupon.discount)/100).toFixed(2))

             



           }
            if(!data.success){
              toast.error(data.message)
            }

         
       } catch (error) {
          toast.error(error.message)
       }



 }




  return (
    <div className=" min-h-screen w-full flex flex-col md:gap-12 md:py-10">
      <div className=" w-full h-full flex items-center flex-col  md:gap-5 md:mt-6  ">
        <div className=" w-full px-3  md:w-[70%] ">
          <CheckoutSteps setStep={setStep} step={step} />
        </div>
      </div>
      {step === "shipping" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] w-full md:w-[80%] justify-items-center  gap-2 md:gap-5 py-5 px-5 m-auto">
            <div className="bg-white min-h-[60vh] shadow-md border border-gray-200 rounded-sm w-full">
              <form action="" className="  w-[90%] m-auto  pb-4 ">
                <h1 className=" text-center text-lg md:text-3xl font-bold my-5">
                  Add Address
                </h1>
                <div className=" gap-2 md:gap-4 w-full  grid grid-cols-1 md:grid-cols-2 bg-white mt-2  p-1 md:p-2 pb-5">
                <Input
                place={"john doe"}
                    label={"Name"}
                    type="text"
                    val={    data.name?data.name: userData && userData.user.fullName }
                    id="name"
            
                    onChangeHandler={handleOnInputChange}
                  />
                    <Input
                    place={"example@xyz.com"}
                    label={"Email"}
                    type="email"
                   
                    val={ data.email? data.email :userData && userData.user.email}
                    id="email"
                    onChangeHandler={handleOnInputChange}
                  />
                
                  <div className="w-[90%] flex flex-col">
                    <label className=" text-sm md:text-lg md:font-semibold text-gray-500">
                      Select Country *
                    </label>
                    <select
                      type="text"
                      rows={5}
                      className=" p-1 md:p-1 rounded-lg border border-gray-300 focus:outline-none bg-slate-100 "
                      id="country"
                      placeholder="Enter your email"
                      onChange={handleOnInputChange}
                      value={savedAddress ? savedAddress.country : data.country}
                    >
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-[90%] flex flex-col">
                    <label className=" text-sm md:text-lg md:font-semibold text-gray-500">
                      Select City *
                    </label>
                    <select
                      type="text"
                      rows={5}
                      className=" p-1 md:p-1 rounded-lg border border-gray-300 focus:outline-none bg-slate-100 "
                      id="city"
                      placeholder="Enter your email"
                      onChange={handleOnInputChange}
                      value={savedAddress ? savedAddress.city : data.city}
                    >
                      {City &&
                        City.getCitiesOfCountry(data.country).map((item) => (
                          <option key={item.isoCode} value={savedAddress?savedAddress.city: item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <Input
                  place={"dalas Taxas, St, mount palace"}
                    label={"Address"}
                    type="text"
                    val={ data.address ||savedAddress && savedAddress.address}
                    id="address"
                    onChangeHandler={handleOnInputChange}
                  />

                  <Input
                  place={"3745"}
                    label={"ZipCod No"}
                    type="number"
                    val={savedAddress ? savedAddress.zipcod : data.zipcod}
                    id="zipcod"
                    onChangeHandler={handleOnInputChange}
                  />
                  <Input
                  place={"034053745"}
                    label={"Phone No"}
                    type="number"
                    val={
                      savedAddress ? savedAddress.phoneNumber : data.phoneNumber
                    }
                    id="phoneNumber"
                    onChangeHandler={handleOnInputChange}
                  />

                  <div className="w-[90%] flex flex-col">
                    <label className=" text-sm md:text-lg md:font-semibold text-gray-500">
                      Select Address Type *
                    </label>
                    <select
                      type="text"
                      rows={5}
                      className=" p-1 md:p-1 rounded-lg border border-gray-300 focus:outline-none bg-slate-100 "
                      id="addressType"
                      placeholder="Enter your email"
                      onChange={handleOnInputChange}
                      value={
                        savedAddress
                          ? savedAddress.addressType
                          : data.addressType
                      }
                    >
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option key={item.name} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </form>
              <div className=" py-4 px-5  flex flex-col gap-4 ">
                <span>Choose from the saved Addresses</span>

                <div className="flex gap-4">
                  <div className="flex gap-2 items-center justify-center ">
                    <label htmlFor="default">Default</label>
                    <input
                     onChange={handleOnInputChange}
                   
                      checked={selectedAddress === "Default"}
                      className=" size-4"
                      type="checkbox"
                      name="Defalut"
                      id="Default"
                    />
                  </div>
                  <div className="flex gap-2  items-center justify-center ">
                    <label htmlFor="home">Home</label>
                    <input
                     onChange={handleOnInputChange}
                     
                      checked={selectedAddress === "Home"}
                      className=" size-4"
                      type="checkbox"
                      name="Home"
                      id="Home"
                    />
                  </div>
                  <div className="flex gap-2 items-center justify-center  ">
                    <label htmlFor="office">Office</label>
                    <input
                     onChange={handleOnInputChange}
                      checked={selectedAddress === "Office"}
                      className=" size-4"
                      type="checkbox"
                      name="Office"
                      id="Office"
                    />
                  </div>
                  <div className="flex gap-2 items-center justify-center  ">
                    <label htmlFor="none">None</label>
                    <input
                     onChange={handleOnInputChange}
                
                      checked={selectedAddress === "none"}
                      className=" size-4"
                      type="checkbox"
                      name="none"
                      id="none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[40vh] bg-white shadow-md border border-gray-200 rounded-sm w-full p-6">
              <div className=" flex flex-col justify-between h-[60%] ">
                <div className=" flex justify-between items-center ">
                  <span className=" font-semibold  text-gray-500">
                    Subtotal
                  </span>
                  <span className=" font-bold ">${subTotal}</span>
                </div>
                <div className=" flex justify-between items-center ">
                  <span className=" font-semibold  text-gray-500">
                    Shipping (10%)
                  </span>
                  <span className=" font-bold "> ${shippingCharges}</span>
                </div>
                <div className=" flex justify-between items-center ">
                  <span className=" font-semibold  text-gray-500">
                    Discount
                  </span>
                  <span className=" font-bold ">{discount?"$"+discount:"--"}</span>
                </div>
                <div className=" flex justify-between items-center ">
                  <span className=" font-semibold  text-gray-500">
                    Total Amount
                  </span>
                  <span className=" font-bold ">${((discount? totalOrderAmount- Number(discount): totalOrderAmount)).toFixed(2)}</span>
                </div>
              </div>
              <div className=" w-full p-6  ">
                <form 
                 onSubmit={
                handleSubmit
                 }
                className=" flex flex-col gap-4">
                  <input
                  onChange={(e)=>setCouponCode(e.target.value)}
                    type="text"
                    placeholder="Enter coupon code"
                    className=" w-full p-1  outline-none border border-gray-200 rounded-md"
                  />
                  <button 
                 type="submit"
                  className=" w-full p-2 rounded-sm border border-red-500 ">
                    Apply
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className=" w-[100%] flex  justify-center ">
            <button
              onClick={() => setStep("payment")}
              className=" p-2 md:p-4 rounded-md  md:w-52 bg-black  text-white  font-semibold "
            >
              Go To Payment
            </button>
          </div>
        </>
      )}

      {step === "payment" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] w-full md:w-[80%] justify-items-center  gap-2 md:gap-5 py-5 px-5 m-auto">
            <div className="bg-white min-h-[60vh] shadow-md border border-gray-200 rounded-sm w-full">
              <form action="" className="  w-[90%] m-auto  pb-4 ">
                <h1 className=" text-center text-lg md:text-3xl font-bold my-5">
                  Choose a Payment method
                </h1>
                <div className="  flex flex-col   gap-3 ">
                  <div className=" flex   gap-3 items-center">
                    <label className=" font-bold text-lg" htmlFor="credit">
                      Credit Card
                    </label>

                    <input
                      onChange={(e) => setPaymentMethod(e.target.id)}
                      type="radio"
                      className=" text-lg size-4"
                      name="payment"
                      id="credit"
                    />
                  </div>
              {paymentMethod ==="credit" && 
                <>
             <div className="  grid grid-cols-1 md:grid-cols-2">
                    <Input
                    label={"Name on Card"}
                    ></Input>
                    <Input label={"Exp Date"}></Input>
                    <Input label={"Card No"}></Input>
                    <Input label={"CVV"}></Input>
                   

                </div>    
                <button className=" mb-3 p-1 md:p-2 rounded-md mt-3  md:mt-6  w-32 bg-red-600  text-white  font-semibold ">Pay</button>
                </>  }
                {/* 
                 */}
             
                </div>
                <div className=" flex flex-col   gap-3 ">
                  <div className="flex   gap-3 items-center">

                  <label className=" font-bold text-lg " htmlFor="credit">
                    PayPal
                  </label>
                  <input
                    onChange={(e) => setPaymentMethod(e.target.id)}
                    className=" text-lg size-4"
                    type="radio"
                    name="payment"
                    id="paypal"
                    />
                    </div>
                    {paymentMethod ==="paypal" &&  <div className=" ">
                      <button className="  my-5 p-1 md:p-2 rounded-md mt-3  md:mt-6  w-32 bg-red-600  text-white  font-semibold ">Pay</button>
                </div>}

                </div>
                <div className="flex flex-col gap-3 ">

                  <div className=" flex   gap-3 items-center">

                  <label className=" font-bold text-lg " htmlFor="credit">
                    Cash On Delivery
                  </label>
                  <input
                    onChange={(e) => setPaymentMethod(e.target.id)}
                    className=" text-lg size-4"
                    type="radio"
                    name="payment"
                    id="cash"
                    />
                    </div>

                    {paymentMethod ==="cash" &&  <div className=" ">
                      <button className=" my-5 p-1 md:p-2 rounded-md mt-3  md:mt-6  w-32 bg-red-600  text-white  font-semibold ">Order Now</button>
                </div>}
                </div>
              </form>
            </div>
            <div className="h-[40vh] bg-white shadow-md border border-gray-200 rounded-sm w-full p-6">
              <div className=" flex flex-col justify-between h-[60%] ">
                <div className=" flex justify-between items-center ">
                  <span className=" font-semibold  text-gray-500">
                    Subtotal
                  </span>
                  <span className=" font-bold ">$534</span>
                </div>
                <div className=" flex justify-between items-center ">
                  <span className=" font-semibold  text-gray-500">
                    Shipping
                  </span>
                  <span className=" font-bold ">$534</span>
                </div>
                <div className=" flex justify-between items-center ">
                  <span className=" font-semibold  text-gray-500">
                    Discount
                  </span>
                  <span className=" font-bold ">$534</span>
                </div>
                <div className=" flex justify-between items-center ">
                  <span className=" font-semibold  text-gray-500">
                    Total Amount
                  </span>
                  <span className=" font-bold ">$534</span>
                </div>
              </div>
              <div className=" w-full p-6 h-[40%] flex items-center justify-center  ">
                <h2 className="   text-center font-bold text-lg md:text-2xl p-2 border border-red-500 w-full rounded-md">
                  Total Amout To Pay $498
                </h2>
              </div>
            </div>
          </div>

          <div className=" md:w-[90%] flex  justify-center ">
            <button
              onClick={() => setStep("shipping")}
              className=" p-2 md:p-4 rounded-md mt-3  md:mt-6 md:w-52 bg-black  text-white  font-semibold  w-32"
            >
              Go Back
            </button>
           
          </div>
        </>
      )}
    </div>
  );
}

const Input = ({ label, type, id, onChangeHandler, val , place}) => {
  return (
    <div className="  w-full md:w-[90%] flex  flex-col gap-2">
      <label className="  text-sm md:text-lg md:font-semibold text-gray-500">
        {label}
      </label>
      <input
      placeholder={place}
        onChange={onChangeHandler}
        id={id}
        value={val}
        type={type}
        className={`  p-1 md:p-[3px] rounded-lg border border-gray-300 focus:outline-none bg-slate-100 `}
      />
    </div>
  );
};

export default CheckoutContent;
