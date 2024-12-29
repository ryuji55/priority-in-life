export const errors = {
  PASSWORD_RESET_FAILED: "パスワードリセットに失敗しました",
  PASSWORD_RESET_TOKEN_INVALID: "パスワードリセットトークンが無効です",
  FAILED_TO_SEND_PASSWORD_RESET_EMAIL:
    "パスワードリセット用のメール送信に失敗しました",
  LOGIN_FAILED: "ログインに失敗しました",
  LOGOUT_FAILED: "ログアウトに失敗しました",
  USER_NOT_FOUND: "ユーザーが見つかりません",
  EMAIL_IS_ALREADY_REGISTERED: "このメールアドレスは既に登録されています",
  UN_AUTHORIZED: "認証に失敗しました",
} as const;

export const getErrorMessage = (errorKey: string): string => {
  return (
    (errors as Record<string, string>)[errorKey] ||
    "予期せぬエラーが発生しました"
  );
};

export type ApiErrorResponse = {
  data: {
    message: keyof typeof errors;
  };
};
