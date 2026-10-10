import './globals.css';

import { FitLogProvider } from '@/context/FitLogContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToastViewport from '@/components/ToastViewport';

export const metadata = {
title: 'FitLog — Workout Library',
description: 'Train with intent. Log every set.',
};

export default function RootLayout({ children }) {
return ( <html lang="en"> <body> <FitLogProvider> <Navbar />
      <main>{children}</main>

      <Footer />
      <ToastViewport />
    </FitLogProvider>
  </body>
</html>
);
}
