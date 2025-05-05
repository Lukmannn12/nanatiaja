"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams()

  const HandleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email)
        const userRole = data.role;

        if (userRole == "admin") {
          router.push("/dashboard");
        } else {
          router.push("/?login=success");
        }

        setMessage("login berhasil");
      } else {
        setMessage(data.error || "login gagal");
      }
    } catch (error) {
      console.error("login error:", error);
      setMessage("terjadi kesalahan. Coba Lagi")
    }
  };

  useEffect(() => {
    const success = searchParams.get("success")
    if (success === "true") {
      setShowAlert(true)
    }
  }, [searchParams])


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Tampilkan alert jika berhasil registrasi */}
      {showAlert && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-md z-50">
          <Alert variant="destructive" className="shadow-lg">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Registrasi Berhasil</AlertTitle>
            <AlertDescription>
              Akun Anda telah berhasil dibuat. Silakan login.
            </AlertDescription>
            <button
              onClick={() => setShowAlert(false)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 cursor-pointer p-2"
            >
              ✕
            </button>
          </Alert>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={HandleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/register" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
