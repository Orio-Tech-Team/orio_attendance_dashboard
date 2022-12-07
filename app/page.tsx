"use client";

import "./styles/login.scss";

import LoginForm from "features/user/presentation/components/LoginForm";

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-[#dddddd] login__image"></div>
      <LoginForm />
    </div>
  );
}
