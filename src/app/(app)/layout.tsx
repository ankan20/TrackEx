import Navbar from '@/components/pages/Navbar';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      
      
      <Navbar className='top-5'/>
        
      {children}
    </div>
  );
}