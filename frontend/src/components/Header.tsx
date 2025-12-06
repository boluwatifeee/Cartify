import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useLogoutMutation } from "@/slices/usersApiSlice";
import { logout } from "@/slices/authSlice";
import { toast } from "react-toastify";

export default function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const onLogout = async () => {
    try {
      await logoutApiCall({}).unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
      console.log(err);
    }
  };

  return (
    <header className="w-full flex justify-between items-center p-4">
      <Link to="/">
        <h1 className="text-2xl font-bold">Cartify</h1>
      </Link>

      <div className="flex items-center gap-4">
        {userInfo && (
          <Link to="/cart">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.344 2.065m2.174 6.97A2 2 0 0 0 9.46 13h7.086a2 2 0 0 0 1.954-1.535l1.375-5.477A1 1 0 0 0 18.92 5H6.184m0 0L5.344 3M6.184 5l1.148 6.035"
              />
              <circle cx="9" cy="20" r="1" />
              <circle cx="17" cy="20" r="1" />
            </svg>
            {cartItems.length > 0 ? (
              <Badge>
                {cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
              </Badge>
            ) : null}
          </Link>
        )}

        {userInfo ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="bg-transparent">
                {userInfo.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
}
