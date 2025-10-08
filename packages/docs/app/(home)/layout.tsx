import Navbar from '@/components/Navbar';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <div className="bg-radial-theme min-h-screen">
      {/* Custom Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <div className="min-h-screen">
        {children}
      </div>
    </div>
  );
}
