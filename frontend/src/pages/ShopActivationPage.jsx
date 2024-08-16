import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function ShopActivationPage() {
  const { shopToken } = useParams();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const activateAccount = async () => {
      if (shopToken) {
        try {
          setError(null);
          const res = await fetch("http://localhost:3000/api/shop/activation", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
               'ngrok-skip-browser-warning': 'any-value'
            },

            body: JSON.stringify({ shopToken }),
          });

          const data = await res.json();
          if (!data.success) {
            setError(data.message);
            console.log(data);
            return;
          }

          navigate("/shop-sign-in");
        } catch (error) {
          setError(error.message);
          console.log(error);
        }
      }
    };
    activateAccount();
  }, [shopToken]);

  return (
    <div className=" h-screen w-screen  flex items-center justify-center text-3xl text-blue-600 font-bold">
      {error && error}
      {!error && (
        <div>
          Shop has been created successfully <br />
          <br />
          <Link className=" text-blue-800" to={"/shop-sign-in"}>
            Click here to go to HomePage
          </Link>
        </div>
      )}
    </div>
  );
}

export default ShopActivationPage;
