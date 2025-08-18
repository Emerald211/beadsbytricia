import { Button, Input, message } from "antd";
import { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

import "react-phone-number-input/style.css";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import { UserContext } from "../../../../utils/context/user/UserContext";
import { UserProps } from "../../../../utils/context/user/types/UserType";
import { createUserDocumentFromAuth } from "../../../../utils/firebase/auth/firebaseAuth";
import { StoreContext } from "../../../../utils/context/store/StoreContext";
import { StoreProps } from "../../../../utils/context/store/StoreProps";

type UserLoginProps = {
  firstName: string;
  lastName: string;
  phoneNo: string;
  dob: string;
};

const PersonalInformation = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext) as UserProps;
  const { setOpenCart } = useContext(StoreContext) as StoreProps;

  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<UserLoginProps>();

  const [messageApi, contextHolder] = message.useMessage();

  const UpdateProfile = async (data: UserLoginProps) => {
    setLoading(true);

    const success = () => {
      messageApi.open({
        type: "success",
        content: "Login Successful",
      });
    };

    const error = (message: string) => {
      messageApi.open({
        type: "error",
        content: message,
      });
    };

    const warning = (meessage: string) => {
      messageApi.open({
        type: "warning",
        content: meessage,
      });
    };

    if (user) {
      try {
        setLoading(true);

        await createUserDocumentFromAuth(user, {
          ...data,
        });

        console.log("User document created/updated successfully.");

        setLoading(false);

        success();
        navigate("/shop");
        setOpenCart(true);
      } catch (err: unknown) {
        setLoading(false);

        if (err instanceof Error) {
          error("Failed to create user document: " + err.message);
        } else {
          error("An unknown error occurred.");
        }
      }
    } else {
      // Handle case where the user is null, display a warning
      warning("User is null, cannot create user document");
    }

    console.log(data, "dhdjdh");
  };

  return (
    <section className="flex items-center justify-center flex-col font-main py-12 md:py-24 px-12 md:px-24 w-full h-auto">
      {contextHolder}
      <div>
        <h1 className=" text-3xl font-serrat font-bold text-main">
          Personal Information
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(UpdateProfile)}
        className="w-[100%] flex items-center justify-between p-5 md:flex-row md:flex-wrap flex-col gap-5 mt-12"
      >
        <Controller
          name="firstName"
          control={control}
          rules={{
            required: "Firstname is required",
          }}
          render={({ field }) => (
            <div className=" font-serrat gap-2 flex flex-col">
              <label className=" text-sm font-bold" htmlFor="firstName">
                Firstname
              </label>
              <Input
                size="large"
                placeholder="Enter your first name"
                {...field}
              />
            </div>
          )}
        />

        <Controller
          name="lastName"
          control={control}
          rules={{
            required: "lastName is required",
          }}
          render={({ field }) => (
            <div className=" font-serrat gap-2 flex flex-col">
              <label className=" text-sm font-bold" htmlFor="firstName">
                Lastname
              </label>
              <Input
                size="large"
                placeholder="Enter your last name"
                {...field}
              />
            </div>
          )}
        />

        <Controller
          name="phoneNo"
          control={control}
          rules={{
            required: "Phone No is required",
          }}
          render={({ field }) => (
            <div className="font-serrat gap-2 flex flex-col">
              <label className="text-sm font-bold" htmlFor="lastName">
                Phone No
              </label>
              <div className="flex items-center border border-gray-300 rounded px-2 py-1">
                <PhoneInputWithCountrySelect
                  country="NG"
                  className="w-full focus:outline-none"
                  {...field}
                />
              </div>
            </div>
          )}
        />

        <Controller
          name="dob"
          control={control}
          rules={{
            required: "Date of Birth is required",
          }}
          render={({ field }) => (
            <div className=" font-serrat gap-2 flex flex-col">
              <label className=" text-sm font-bold" htmlFor="firstName">
                Date of birth
              </label>
              <input
                className=" border py-1 px-2 rounded-lg"
                type="date"
                {...field}
              />
            </div>
          )}
        />
        <Button
          className=" flex items-center justify-center  bg-main w-full md:w-[20%] hover:bg-black"
          htmlType="submit"
          type="primary"
          loading={loading}
        >
          Update profile
        </Button>
      </form>
    </section>
  );
};

export default PersonalInformation;
