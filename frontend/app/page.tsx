"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { NavbarUserPage } from "@/components/navbar";
import HomePage from "./user/home/page";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const searchParams = useSearchParams()
  const [showAlert, setShowAlert] = useState(false)
  const router = useRouter();

  useEffect(() => {
    const loginSuccess = searchParams.get("login");
    if (loginSuccess === "success") {
      setShowAlert(true);

      const timer = setTimeout(() => {
        setShowAlert(false);
        // Hapus query param setelah alert muncul
        router.replace("/", undefined); // ini menghapus ?login=success
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [searchParams, router]);
  return (
    <div>
      {showAlert && (
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-4 right-4 z-50 max-w-sm w-full"
                    >
                        <Alert
                            variant="default"
                            className="shadow-lg bg-green-100 border border-green-300 text-green-800"
                        >
                            <AlertCircle className="h-4 w-4 text-green-600" />
                            <AlertTitle>Login Berhasil</AlertTitle>
                            <AlertDescription>
                                Selamat Datang Kembali
                            </AlertDescription>
                        </Alert>
                    </motion.div>
                </AnimatePresence>
            )}
      <NavbarUserPage/>
        <HomePage/>
    </div>
  );
}
