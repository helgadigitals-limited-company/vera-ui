import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout
     className="bg-radial-theme min-h-screen"
      {...baseOptions()}
    >
      {children}
    </HomeLayout>
  );
}
