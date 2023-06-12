"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ThemeProvider } from "next-themes";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return (
    <ThemeProvider attribute="class" themes={['light', 'dark']}>
      <SessionProvider baseUrl={process.env.NEXTAUTH_URL} refetchInterval={30}>
        <SessionVerifier />
        {children}
      </SessionProvider>
    </ThemeProvider>
  );
};

export const SessionVerifier = () => {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  // console.log(session, status, update);
  useEffect(() => {
    // TIP: You can also use `navigator.onLine` and some extra event handlers
    // to check if the user is online and only update the session if they are.
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine
    // console.log(
    //   new Date(session?.expires as string).valueOf(),
    //   ">>",
    //   new Date().valueOf()
    // );
    if (new Date(session?.expires as string).valueOf() < new Date().valueOf()) {
      update();
      router.push("/login");
    }
    const interval = setInterval(() => update(() => null), 3 * 24 * 60 * 60);
    return () => clearInterval(interval);
  }, [update]);

  // useEffect(() => {
  //   const visibilityHandler = () => document.visibilityState === "visible" && update()
  //   window.addEventListener("visibilitychange", visibilityHandler, false)
  //   return () => window.removeEventListener("visibilitychange", visibilityHandler, false)
  // }, [update])

  useEffect(() => {
    if (status === "unauthenticated") {
      // console.log(session);
      router.push("/login");
    }
  }, [status]);

  return <></>;
};

export const ToastContainerProvider = () => (
  <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    // draggable
    pauseOnHover
    theme="light"
  />
);
