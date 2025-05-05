"use client"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { NavbarUserPage } from "@/components/navbar";
import HomePage from "./user/home/page";

export default function Home() {
  const searchParams = useSearchParams()
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    const loginSuccess = searchParams.get("login")
    if (loginSuccess === "success") {
      setShowAlert(true)

      // Hilangkan alert setelah 3 detik (opsional)
      const timer = setTimeout(() => {
        setShowAlert(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [searchParams])
  return (
    <div>
      {showAlert && (
        <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
          <Alert variant="destructive" className="shadow-lg">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Login Berhasil</AlertTitle>
            <AlertDescription>
              Selamat datang kembali!
            </AlertDescription>
          </Alert>
        </div>
      )}
      <NavbarUserPage/>
        <HomePage/>
    </div>
  );
}
