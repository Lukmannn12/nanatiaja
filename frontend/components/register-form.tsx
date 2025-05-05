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
import { useState } from "react"
import { useRouter } from "next/navigation"

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        setErrors({});

        try {
            const res = await fetch("http://localhost:8000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setName("");
                setEmail("");
                setPassword("");
                router.push('/login?success=true');
            } else {
                setErrors(data.error || {});
            } 
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                        Fill in the form below to create a new account.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleRegister}>
                        <div className="flex flex-col gap-6">
                            {/* Name */}
                            <div className="grid gap-3">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Your name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500">{errors.name[0]}</p>
                                )}
                            </div>

                            {/* Email */}
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
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email[0]}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500">{errors.password[0]}</p>
                                )}
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    Register
                                </Button>
                                <Button variant="outline" className="w-full">
                                    Register with Google
                                </Button>
                            </div>
                        </div>

                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <a href="#" className="underline underline-offset-4">
                                Login
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
