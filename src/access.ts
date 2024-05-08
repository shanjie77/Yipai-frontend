import login from "@/pages/User/Login";

/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: InitialState  | undefined) {
  const { loginUser } = initialState ?? {};
  return {
    canUser:login,
    canAdmin: loginUser?.userRole === 'admin',
  };
}
