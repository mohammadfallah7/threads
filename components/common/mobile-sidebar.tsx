import { Navbar } from "./navbar";

export const MobileSidebar = () => {
  return (
    <div className="fixed right-0 left-0 bottom-0 md:hidden py-3 text-muted bg-background/70 backdrop-blur-3xl">
      <Navbar />
    </div>
  );
};
