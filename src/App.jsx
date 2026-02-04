import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import BookingPage from '@/pages/BookingPage';
import FleetPage from '@/pages/FleetPage';
import RiotLinePage from '@/pages/RiotLinePage';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

function AppContent() {
  const location = useLocation();
  const isRiotLinePage = location.pathname === '/riot-line';

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Riotous Car Care - Premium Auto Detailing & Ceramic Coating Services</title>
        <meta name="description" content="Professional automotive detailing, paint correction, ceramic coating for cars, bikes, and RVs. Book your appointment online with secure deposit payment." />
      </Helmet>
      {!isRiotLinePage && <Navigation />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/riot-line" element={<RiotLinePage />} />
        </Routes>
      </main>
      {!isRiotLinePage && <Footer />}
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;