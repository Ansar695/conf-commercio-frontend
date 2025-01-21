export type ISong = {
  id: number;
  name: string;
  album: string;
  trackId: string;
  image: string;
  duration: number;
  previewUrl: string;
  url: string;
  recommendation?: IRecommendation | null;
  recommendationId: number;
};

export type IRecommendation = {
  id: number;
  language: string;
  text: string;
  qnaId: number;
  audio?: string | null;
  songs?: ISong[];
};

export type IZShot = {
  id: number;
  stress: number;
  physicalPain: number;
  concentration: number;
  rest: number;
};

export type IUserFeeling = {
  id: number;
  language?: string | null;
  text: string;
  markino?: number | null;
  keywords?: string | null;
  zshot?: IZShot | null;
  audio?: string | null;
};

export type ProcessAudioResultData = {
  transcription: string;
  political_needs: Array<{
    key: string;
    value: number;
  }>
}

export type ProcessAudioApiResponse = {} & (
  | {
    succeed: true;
    data: ProcessAudioResultData;
  }
  | {
    succeed: false;
    data?: unknown | null;
  }
);

export type ApiResponse<T = unknown> = {
  succeed?: boolean;
  code?: string;
  data?: T;
};

export type LoginResponse = ApiResponse<{
  name: string;
  email: string;
}>;

export type ResetPasswordResponse = ApiResponse<unknown>;
export type CreateNewPasswordResponse = ApiResponse<unknown>;

export type RegisterResponse = ApiResponse<{
  name: string;
  email: string;
}>;
export type SendVerificationResponse = ApiResponse<null>;

export const ApiResCode = {
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  USER_REGISTERED: "USER_REGISTERED",
  USER_LOGGED_IN: "USER_LOGGED_IN",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  WRONG_PASSWORD: "WRONG_PASSWORD",
  DUPLICATE_EMAIL: "DUPLICATE_EMAIL",
  SESSION_EXPIRED: "SESSION_EXPIRED",
  CLIENT_ERROR: "CLIENT_ERROR",
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  email_verified: boolean;
  role: "admin" | "user";
};
