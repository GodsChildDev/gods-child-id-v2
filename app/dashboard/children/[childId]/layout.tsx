import MainNavBar from "@/app/main-navbar";
import BottomBanner from "../../bottom-banner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-screen-xl mx-auto py-10">
      <MainNavBar activeItem={'children'} />
      {children}
      <BottomBanner />
    </div>
  );
}