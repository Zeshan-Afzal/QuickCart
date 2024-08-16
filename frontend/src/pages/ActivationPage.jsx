import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { loadUser } from "../store/actions/userActions";

function ActivationPage() {
  const { userToken } = useParams();
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  console.log("running");
  useEffect(() => {
    const activateAccount = async () => {
      if (userToken) {
        try {
          const res = await fetch("http://localhost:3000/api/user/activation", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
               'ngrok-skip-browser-warning': 'any-value'
            },

            body: JSON.stringify({ userToken }),
          });

          const data = await res.json();
          if (!data.success) {
            setError(true);
            console.log(data);
            return;
          }
          navigate("/login");
        } catch (error) {
          setError(true);
          console.log(error);
        }
      }
    };
    activateAccount();
  }, []);

  return (
    <div className=" h-screen w-screen  flex items-center justify-center text-3xl text-blue-600 font-bold">
      {error && "jwt expired || internal server error"}
      {!error && (
        <div>
          Account has been created successfully <br />
          <br />
          <Link className=" text-blue-800" to={"/login"}>
            Click here to go to login page
          </Link>
        </div>
      )}
    </div>
  );
}

export default ActivationPage;
