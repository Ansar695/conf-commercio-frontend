import {
  ApiResCode,
  CreateNewPasswordResponse,
  LoginResponse,
  RegisterResponse,
  ResetPasswordResponse,
  UserProfile,
} from "@/typing/api";
import axiosClient from "../axios";
import {
  CreateNewPasswordSchema,
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
} from "@/validations/form";

async function register(data: RegisterSchema): Promise<RegisterResponse> {
  try {
    const res = await axiosClient.post<RegisterResponse>(
      "/auth/register",
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        withCredentials: true,
      }
    );
    if (res.status !== 200) throw new Error();
    return res.data;
  } catch (error) {
    console.error(error);
  }
  return {
    code: ApiResCode.UNKNOWN_ERROR,
    succeed: false,
  };
}

async function login(data: LoginSchema): Promise<LoginResponse> {
  try {
    const res = await axiosClient.post<LoginResponse>(
      "/auth/login",
      {
        email: data.email,
        password: data.password,
      },
      {
        withCredentials: true,
      }
    );
    if (res.status !== 200) throw new Error();
    return res.data;
  } catch (error) {
    console.error(error);
  }
  return {
    code: ApiResCode.UNKNOWN_ERROR,
    succeed: false,
  };
}

async function resetPassword(
  data: ResetPasswordSchema
): Promise<ResetPasswordResponse> {
  try {
    const res = await axiosClient.post<ResetPasswordResponse>(
      "/user/password/reset",
      {
        email: data.email,
      },
      {
        withCredentials: true,
      }
    );
    if (res.status !== 200) throw new Error();
    return res.data;
  } catch (error) {
    console.error(error);
  }
  return {
    code: ApiResCode.UNKNOWN_ERROR,
    succeed: false,
  };
}

async function createNewPassword(
  sessionId: string,
  data: CreateNewPasswordSchema
): Promise<CreateNewPasswordResponse> {
  try {
    const res = await axiosClient.post<CreateNewPasswordResponse>(
      "/user/password/create-new",
      {
        session_id: sessionId,
        password: data.password,
      },
      {
        withCredentials: true,
      }
    );
    if (res.status !== 200) throw new Error();
    return res.data;
  } catch (error) {
    console.error(error);
  }
  return {
    code: ApiResCode.UNKNOWN_ERROR,
    succeed: false,
  };
}

async function getProfile(): Promise<UserProfile | null> {
  try {
    const res = await axiosClient.get<{ data?: UserProfile | null }>(
      "/user/profile",
      { withCredentials: true }
    );
    if (res.status !== 200 || !res.data.data) throw new Error();
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
  return null;
}

async function logout(): Promise<null | boolean> {
  try {
    const res = await axiosClient.get("/auth/logout", {
      withCredentials: true,
    });
    if (res.status === 200) return true;
  } catch (error) {
    console.error(error);
  }
  return null;
}

const authApi = {
  register,
  login,
  getProfile,
  resetPassword,
  createNewPassword,
  logout,
};

export default authApi;
