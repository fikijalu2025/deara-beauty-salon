import React, { useState, useEffect } from 'react';
import {
  ServiceItem,
  INITIAL_SERVICES,
  LOCAL_STORAGE_KEY,
  HairSize,
  formatRupiah
} from './data/servicesData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesPriceList } from './components/ServicesPriceList';
import { StudioHighlight } from './components/StudioHighlight';
import { HowToBook } from './components/HowToBook';
import { FAQSection } from './components/FAQSection';
import { SocialAndLocation } from './components/SocialAndLocation';
import { Footer } from './components/Footer';
import { EstimateDrawer } from './components/EstimateDrawer';
import { PriceListManagerModal } from './components/PriceListManagerModal';
import { FloatingWidgets } from './components/FloatingWhatsAppButton';

export default function App() {
  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_SERVICES;
  });

  const [selectedItems, setSelectedItems] = useState<ServiceItem[]>([]);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);

  // Sync services updates to localStorage
  const handleUpdateServices = (updated: ServiceItem[]) => {
    setServices(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Error saving services to localStorage', err);
    }
  };

  // Toggle selection with customized size and price
  const handleToggleSelectService = (
    service: ServiceItem,
    chosenSize?: HairSize,
    chosenPrice?: number
  ) => {
    setSelectedItems((prev) => {
      const exists = prev.some((item) => item.id === service.id);
      if (exists) {
        return prev.filter((item) => item.id !== service.id);
      } else {
        const configured: ServiceItem = {
          ...service,
          selectedSize: chosenSize,
          price: chosenPrice ?? service.price,
          formattedPrice: chosenPrice ? formatRupiah(chosenPrice) : service.formattedPrice
        };
        return [...prev, configured];
      }
    });
  };

  const handleRemoveService = (serviceId: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== serviceId));
  };

  const handleClearAllSelected = () => {
    setSelectedItems([]);
  };

  const selectedServiceIds = selectedItems.map((item) => item.id);

  const handleScrollToPriceList = () => {
    const el = document.getElementById('layanan-harga');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#242120]">
      {/* Top Navigation */}
      <Navbar
        onOpenManager={() => setIsManagerOpen(true)}
        selectedCount={selectedItems.length}
        onOpenEstimator={() => setIsEstimatorOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onOpenPriceList={handleScrollToPriceList} />

        <ServicesPriceList
          services={services}
          selectedServiceIds={selectedServiceIds}
          onToggleSelectService={handleToggleSelectService}
          onOpenManager={() => setIsManagerOpen(true)}
        />

        <StudioHighlight />

        <SocialAndLocation />

        <HowToBook />

        <FAQSection />
      </main>

      {/* Footer */}
      <Footer onOpenManager={() => setIsManagerOpen(true)} />

      {/* Interactive Reservation Estimation Drawer */}
      <EstimateDrawer
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        selectedServices={selectedItems}
        onRemoveService={handleRemoveService}
        onClearAll={handleClearAllSelected}
      />

      {/* Price List & Service Data Manager Modal */}
      <PriceListManagerModal
        isOpen={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
        services={services}
        onUpdateServices={handleUpdateServices}
      />

      {/* Floating WhatsApp and Cart Widgets */}
      <FloatingWidgets
        selectedServices={selectedItems}
        onOpenEstimator={() => setIsEstimatorOpen(true)}
      />
    </div>
  );
}
