import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Lock, User } from "lucide-react";
import { LoginModel } from "@/models/Auth";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useAppDispatch } from "@/app/hooks";
import { userLoggedIn } from "@/app/modules/auth/authSlice";
import { useLoginMutation } from "@/app/api/authApi";

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: LoginModel) => {
    const res = await login(data);

    if (!res.error) {
      dispatch(userLoggedIn({ username: data.username, ...res.data.items }));
      navigate("/dashboard");
    } else {
      toast({
        title: "Thất bại",
        description: "Đăng nhập thất bại",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Toaster />
      <div
        style={{
          backgroundImage: `url(
          'https://png.pngtree.com/thumb_back/fh260/background/20220523/pngtree-cleaning-service-flat-background-with-group-of-young-women-in-uniform-image_1391520.jpg')`,
        }}
        className="flex items-center justify-center min-h-screen"
      >
        <Card className="w-[400px] shadow-xl rounded-2xl bg-white dark:bg-gray-800 p-4">
          <CardHeader className="mb-2">
            <CardTitle className="text-center text-2xl text-gray-800 dark:text-white">
              Quản trị viên Home Service
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div>
                <Label
                  htmlFor="email"
                  className="text-gray-700 dark:text-gray-300"
                >
                  User name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    className="pl-10 dark:bg-gray-700 dark:text-white"
                    {...register("username")}
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <Label
                  htmlFor="password"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Mật khẩu
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-10 dark:bg-gray-700 dark:text-white"
                    {...register("password")}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Button */}
              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                Đăng Nhập
                {isLoading && <Loader2 className="animate-spin" />}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
