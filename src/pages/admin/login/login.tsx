import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CreateNewAdminUser } from '../../../utils/firebase/auth/firebaseAuth'
import { useNavigate } from 'react-router-dom'

type AdminLoginProps = {
  email: string
  password: string
}

const AdminLogin = () => {
  const [loading, setLoading] = useState(false)
  const [loginType, setLoginType] = useState(false)
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginProps>()

  const SwitchLoginMethod = (type: boolean) => {
    setLoginType(type)
  }

  const loginToAdminDashboard = async (data: AdminLoginProps) => {
    const { email, password } = data
    if (email && password) {
      setLoading(true)
      const getLoginResponse = await CreateNewAdminUser(email, password)
      if (getLoginResponse && typeof getLoginResponse !== 'string') {
        setTimeout(() => {
          setLoading(false)
          toast.success('Login Successful', {
            position: 'top-right',
            autoClose: 5000,
            theme: 'light',
            transition: Bounce,
          })
        }, 2000)
        navigate('/admin-dashboard')
      } else if (typeof getLoginResponse === 'string') {
        setTimeout(() => {
          setLoading(false)
          toast.error(getLoginResponse, {
            position: 'top-right',
            autoClose: 5000,
            theme: 'light',
            transition: Bounce,
          })
        }, 2000)
      } else {
        setTimeout(() => {
          setLoading(false)
          toast.warning('Error logging in, please try again', {
            position: 'top-right',
            autoClose: 5000,
            theme: 'light',
            transition: Bounce,
          })
        }, 2000)
      }
    }
  }

  return (
    <section className="flex flex-col  justify-center items-center w-full h-screen px-4 font-poppins">
      <ToastContainer />
      <h1 className="text-main font-poppins text-2xl md:text-3xl font-bold text-center">
        BeadsbyTricia Admin
      </h1>
      <h5 className="text-xs mt-2 text-gray-400 text-center">
        Kindly Login to the Admin Dashboard with the registered admin email and password
      </h5>

      <div className="flex gap-6 md:gap-12 items-center mt-8 md:mt-12">
        <div
          onClick={() => SwitchLoginMethod(false)}
          className="cursor-pointer flex flex-col items-center"
        >
          <h1 className="px-3 py-2 md:py-3 text-sm md:text-base hover:text-blue-600 hover:bg-slate-200 rounded-md">
            Account Login
          </h1>
          {loginType === false && <div className="h-[2px] rounded-3xl w-full bg-blue-800"></div>}
        </div>
        <div
          onClick={() => SwitchLoginMethod(true)}
          className="cursor-pointer flex flex-col items-center"
        >
          <h1 className="px-3 py-2 md:py-3 text-sm md:text-base hover:text-blue-600 hover:bg-slate-200 rounded-md">
            Create New Admin User
          </h1>
          {loginType === true && <div className="h-[2px] rounded-3xl w-full bg-blue-800"></div>}
        </div>
      </div>

      <form
        onSubmit={handleSubmit(loginToAdminDashboard)}
        className="w-full max-w-md flex flex-col gap-5 mt-8 md:mt-12"
      >
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address',
            },
          }}
          render={({ field }) => (
            <Input
              size="large"
              placeholder="Enter admin email address"
              prefix={<UserOutlined />}
              {...field}
            />
          )}
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

        <Controller
          name="password"
          control={control}
          rules={{ required: 'Password is required' }}
          render={({ field }) => (
            <Input.Password
              size="large"
              placeholder="Enter your password"
              prefix={<LockOutlined />}
              {...field}
            />
          )}
        />
        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

        <div className="flex items-center justify-between text-xs md:text-sm">
          <div className="flex gap-2 items-center">
            <input type="checkbox" />
            <span>Remember me</span>
          </div>
          <h2 className="cursor-pointer text-blue-600 hover:underline">Forgot Password?</h2>
        </div>

        <Button className="py-5 bg-black" htmlType="submit" type="primary"  loading={loading}>
          {loginType ? 'Create Admin' : 'Login'}
        </Button>
      </form>
    </section>
  )
}

export default AdminLogin
