import styled from "styled-components";
import Title from "../ui/Title";
import Logo from "../ui/Logo";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import Form from "../ui/Form";
import Button from "../ui/Button";

const Container = styled.div`
  background-color: var(--color-secondary-300);
  height: 100vh;
  padding: 2.5rem 5rem;

  display: grid;
  grid-template-rows: auto 1fr;

  /* display: flex;
  justify-content: center;
  align-items: center; */
`;

const LoginBox = styled.div`
  background-color: var(--color-white);
  width: 60rem;
  height: 65rem;
  border-radius: 2rem;
  justify-self: center;
  align-self: top;

  display: flex;
  flex-direction: column;

  padding: 5rem 8rem;
`;

const Span = styled.span`
  font-size: 1.4rem;
  color: var(--color-gray-800);
  grid-column-start: 2;
  justify-self: end;

  &:hover {
    text-decoration: underline;
  }
`;

function Login() {
  return (
    <Container>
      <Logo />
      <LoginBox>
        <div className="flex flex-col items-center">
          <Title as="h1">welcome back!</Title>
          <p className="text-[--color-gray-800]">
            Enter your email and password to access your account.
          </p>
        </div>
        <form className="mt-[5rem]">
          <FormRow label="email" id="email">
            <Input id="email" type="email" />
          </FormRow>
          <FormRow label="password">
            <Input id="password" type="password" />
            <Span>Forgot password?</Span>
          </FormRow>
          <Button option="primary" size="medium" className="w-full mt-[2.5rem]">
            log in
          </Button>
        </form>
        <div className="grid grid-cols-3 items-center gap-2 my-[2.5rem]">
          <span className="h-[0.2rem] w-full bg-[--color-gray-400]"></span>
          <p className="text-[--color-gray-800] text-center text-[1.4rem]">
            Or continue with
          </p>
          <span className="h-[0.2rem] w-full bg-[--color-gray-400]"></span>
        </div>
        <Button option="secondary" size="medium" className="">
          google
        </Button>
        <p className="text-[--color-gray-800] text-[1.4rem] mt-auto self-center">
          Don't have an account?{" "}
          <span className="text-[--color-primary-900] hover:underline">
            Register now
          </span>
        </p>
      </LoginBox>
    </Container>
  );
}

export default Login;
