import RegisterForm from "@auth/components/RegisterForm";
import useRedirectIfAuthenticated from "@features/auth/hooks/useRedirect.hook";
import LoadingContainer from "@shared/components/LoadingContainer";

const RegisterPage = () => {
  const { isLoading } = useRedirectIfAuthenticated("/dashboard");

  if (isLoading) {
    return <LoadingContainer />;
  }
  return <RegisterForm />;
};

export default RegisterPage;
