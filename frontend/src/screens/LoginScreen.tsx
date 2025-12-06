import FormContainer from "@/components/FormContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "@/slices/authSlice";
import { useLoginMutation } from "@/slices/usersApiSlice";
import { toast } from "react-toastify";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const redirect = searchParams.get("redirect") || "/";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, redirect, userInfo]);

  return (
    <FormContainer className="w-full flex flex-col gap-6">
      <h1 className="">Sign In</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <Input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          size="lg"
          className="h-12 text-base"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </form>
      <p className="text-center text-base">
        New customer?{" "}
        <Link
          to={redirect ? `/register?redirect=${redirect}` : "/register"}
          className="text-primary hover:underline"
        >
          Register
        </Link>
      </p>
    </FormContainer>
  );
}
