import React, { useState, useMemo } from 'react';
import {
  Search,
  Clock,
  Check,
  MessageCircle,
  Plus,
  Settings2,
  Sparkles,
  ArrowUpDown,
  AlertCircle,
  Info
} from 'lucide-react';
import {
  ServiceItem,
  CATEGORIES,
  HairSize,
  buildWhatsAppLink,
  formatRupiah
} from '../data/servicesData';
import { useLanguage } from '../context/LanguageContext';

interface ServicesPriceListProps {
  services: ServiceItem[];
  selectedServiceIds: string[];
  onToggleSelectService: (service: ServiceItem, chosenSize?: HairSize, chosenPrice?: number) => void;
  onOpenManager: () => void;
}

export const ServicesPriceList: React.FC<ServicesPriceListProps> = ({
  services,
  selectedServiceIds,
  onToggleSelectService,
  onOpenManager
}) => {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Track selected size for multi-size services: serviceId -> HairSize
  const [activeSizes, setActiveSizes] = useState<Record<string, HairSize>>({});

  const handleSelectSize = (serviceId: string, size: HairSize) => {
    setActiveSizes((prev) => ({
      ...prev,
      [serviceId]: size
    }));
  };

  const getCategoryLabel = (catId: string, fallback: string) => {
    if (lang === 'en') {
      switch (catId) {
        case 'all': return 'All Services';
        case 'styling': return 'Hair Styling & Cut Team';
        case 'owner': return 'Haircut by Owner (Maguwo)';
        case 'package': return 'Hair & Treatment Packages';
        case 'treatment-perm': return 'Hair Treatment & Perm';
        case 'colouring': return 'Hair Colouring (Soft & Fashion)';
        default: return fallback;
      }
    }
    return fallback;
  };

  const getSizeLabel = (size: HairSize, original: string) => {
    if (lang === 'en') {
      switch (size) {
        case 'S': return 'Short Hair (S)';
        case 'M': return 'Medium Hair (M)';
        case 'L': return 'Long Hair (L)';
        case 'XL': return 'Extra Long Hair (XL)';
      }
    }
    return original;
  };

  // Get active price & label for a service
  const getServiceCurrentState = (service: ServiceItem) => {
    if (!service.sizePrices || service.sizePrices.length === 0) {
      return {
        price: service.price,
        formattedPrice: service.formattedPrice,
        size: undefined,
        sizeLabel: undefined
      };
    }

    const availableSizes = service.sizePrices.map((sp) => sp.size);
    const chosenSize = activeSizes[service.id] || availableSizes[0];
    const sizeObj = service.sizePrices.find((sp) => sp.size === chosenSize) || service.sizePrices[0];

    return {
      price: sizeObj.price,
      formattedPrice: sizeObj.formattedPrice,
      size: sizeObj.size,
      sizeLabel: sizeObj.sizeLabel
    };
  };

  // Filter & sort services
  const filteredServices = useMemo(() => {
    return services
      .filter((item) => {
        const matchesCategory =
          activeCategory === 'all' || item.category === activeCategory;
        const matchesSearch =
          searchQuery.trim() === '' ||
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.features.some((f) =>
            f.toLowerCase().includes(searchQuery.toLowerCase())
          );
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') {
          return a.price - b.price;
        }
        if (sortBy === 'price-desc') {
          return b.price - a.price;
        }
        // 'featured'
        if (a.isPopular && !b.isPopular) return -1;
        if (!a.isPopular && b.isPopular) return 1;
        return 0;
      });
  }, [services, activeCategory, searchQuery, sortBy]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: services.length };
    services.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });
    return counts;
  }, [services]);

  const handleBookSingleService = (service: ServiceItem) => {
    const state = getServiceCurrentState(service);
    let sizeDetails = '';
    if (state.size) {
      sizeDetails = ` (Ukuran Rambut ${state.size} - ${state.formattedPrice})`;
    } else {
      sizeDetails = ` (${service.formattedPrice})`;
    }

    const text = lang === 'en'
      ? `Hi Deara, I'd like to book *${service.name}*${sizeDetails}. Please let me know the available time slots! ✨`
      : `Hi Deara, aku mau reservasi layanan *${service.name}*${sizeDetails}. Mohon info jadwal ketersediaan ya! ✨`;
    const url = buildWhatsAppLink(text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="layanan-harga" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#E8E2D9]">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#8C6D58]">
              <span>Deara Beauty Salon</span>
              <span aria-hidden="true">·</span>
              <span>{t('services.kicker')}</span>
            </div>
            <h2 className="font-serif-brand text-3xl sm:text-4xl lg:text-5xl text-[#242120] mt-2">
              {t('services.title')}
            </h2>
            <p className="text-[#6B5E52] mt-3 text-sm sm:text-base leading-relaxed">
              {t('services.desc')}
            </p>
          </div>

          {/* Quick Price List Editor notice / action */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenManager}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#524538] bg-[#EDE6DC] hover:bg-[#E2D8CC] border border-[#D5C9BA] rounded-xl transition-all shadow-xs"
            >
              <Settings2 className="w-4 h-4 text-[#8C6D58]" />
              <span>{t('services.manageBtn')}</span>
            </button>
          </div>
        </div>

        {/* Info Notices from PDF */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3.5 bg-[#F2ECE1] border border-[#DDD5C7] rounded-xl flex items-start gap-2.5 text-xs text-[#524538]">
            <Info className="w-4 h-4 text-[#8C6D58] shrink-0 mt-0.5" />
            <div>
              {t('services.noticeOwner')}
            </div>
          </div>
          <div className="p-3.5 bg-[#F2ECE1] border border-[#DDD5C7] rounded-xl flex items-start gap-2.5 text-xs text-[#524538]">
            <AlertCircle className="w-4 h-4 text-[#8C6D58] shrink-0 mt-0.5" />
            <div>
              {t('services.noticeExtra')}
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-8 space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.id] || 0;
              const isActive = activeCategory === cat.id;
              const label = getCategoryLabel(cat.id, cat.label);
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap shrink-0 transition-all ${
                    isActive
                      ? 'bg-[#2E2824] text-white shadow-sm'
                      : 'bg-[#EFEAE2] text-[#63574C] hover:bg-[#E5DDD0] hover:text-[#242120]'
                  }`}
                >
                  <span>{label}</span>
                  <span className={`ml-2 text-xs ${isActive ? 'text-white/70' : 'text-[#8C7E72]'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7E72]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('services.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-[#DDD5C7] rounded-xl text-[#242120] placeholder-[#9C8F84] focus:outline-none focus:ring-2 focus:ring-[#8C6D58]/30 focus:border-[#8C6D58]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C7E72] hover:text-[#242120]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs text-[#7A7067] flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" /> {t('services.sort')}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Urutkan daftar layanan"
                className="px-3 py-2 text-xs font-medium bg-white border border-[#DDD5C7] rounded-xl text-[#423A33] focus:outline-none focus:border-[#8C6D58]"
              >
                <option value="featured">{t('services.sortFeatured')}</option>
                <option value="price-asc">{t('services.sortAsc')}</option>
                <option value="price-desc">{t('services.sortDesc')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mt-10">
          {filteredServices.length === 0 ? (
            <div className="text-center py-16 bg-[#F5EFE6]/60 rounded-2xl border border-dashed border-[#DDD5C7] p-8">
              <div className="font-serif-brand text-2xl text-[#242120]">{t('services.notFoundTitle')}</div>
              <p className="text-xs sm:text-sm text-[#7A7067] mt-2 max-w-md mx-auto">
                {t('services.notFoundDesc')}
              </p>
              <div className="mt-5 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="px-4 py-2 text-xs font-medium text-[#242120] bg-white border border-[#DDD5C7] rounded-lg hover:bg-[#F2ECE1]"
                >
                  {t('services.resetFilter')}
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredServices.map((service) => {
                const currentState = getServiceCurrentState(service);
                const isSelected = selectedServiceIds.includes(service.id);
                const categoryLabel = getCategoryLabel(service.category, service.categoryLabel);
                const sizeLabelTranslated = currentState.size ? getSizeLabel(currentState.size, currentState.sizeLabel || '') : '';

                return (
                  <div
                    key={service.id}
                    className={`relative flex flex-col justify-between rounded-2xl bg-white border transition-all duration-300 p-6 sm:p-7 shadow-xs hover:shadow-md ${
                      isSelected
                        ? 'border-[#8C6D58] ring-2 ring-[#8C6D58]/20 bg-[#FAF7F2]'
                        : 'border-[#E8E1D5] hover:border-[#D1C4B5]'
                    }`}
                  >
                    <div>
                      {/* Top Metadata */}
                      <div className="flex items-center justify-between gap-2 text-xs text-[#7A7067] pb-3 border-b border-[#F0EAE1]">
                        <span className="font-medium text-[#8C6D58]">
                          {categoryLabel}
                        </span>
                        {service.duration && (
                          <div className="flex items-center gap-1.5 font-mono tabular-nums">
                            <Clock className="w-3.5 h-3.5 text-[#9C8F84]" />
                            <span>{service.duration}</span>
                          </div>
                        )}
                      </div>

                      {/* Title & Badge */}
                      <div className="mt-4 flex items-start justify-between gap-3">
                        <h3 className="font-serif-brand text-xl sm:text-2xl text-[#242120] leading-snug">
                          {service.name}
                        </h3>
                        {service.badge ? (
                          <span className="shrink-0 text-[10px] font-semibold text-[#8C5D39] bg-[#F7ECE1] px-2 py-0.5 rounded border border-[#E8D1BE]">
                            {service.badge}
                          </span>
                        ) : service.isPopular ? (
                          <span className="shrink-0 text-[10px] font-semibold text-[#8C5D39] bg-[#F7ECE1] px-2 py-0.5 rounded border border-[#E8D1BE]">
                            {t('services.favorite')}
                          </span>
                        ) : null}
                      </div>

                      {/* Hair Length Size Selector (S, M, L, XL) if sizePrices exist */}
                      {service.sizePrices && service.sizePrices.length > 0 && (
                        <div className="mt-3.5 p-2.5 bg-[#FAF6F0] rounded-xl border border-[#EDE2D5] space-y-2">
                          <div className="text-[11px] font-medium text-[#7A7067] flex items-center justify-between">
                            <span>{t('services.hairLength')}</span>
                            <span className="text-[#8C6D58] font-semibold">
                              {sizeLabelTranslated}
                            </span>
                          </div>
                          <div className="grid grid-cols-4 gap-1.5">
                            {service.sizePrices.map((sp) => {
                              const isCurrentSize = currentState.size === sp.size;
                              return (
                                <button
                                  key={sp.size}
                                  type="button"
                                  onClick={() => handleSelectSize(service.id, sp.size)}
                                  className={`py-1.5 px-2 text-xs font-semibold rounded-lg transition-all text-center ${
                                    isCurrentSize
                                      ? 'bg-[#2E2824] text-white shadow-xs'
                                      : 'bg-white text-[#5C554E] hover:bg-[#EFEAE2] border border-[#DDD5C7]'
                                  }`}
                                >
                                  <div>{sp.size}</div>
                                  <div className="text-[10px] opacity-80 font-mono mt-0.5">
                                    {sp.price >= 1000000
                                      ? `${(sp.price / 1000000).toFixed(1)}jt`
                                      : `${sp.price / 1000}k`}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Dynamic Price in Tabular Display */}
                      <div className="mt-4">
                        <span className="font-mono tabular-nums text-2xl font-bold text-[#242120]">
                          {currentState.formattedPrice}
                        </span>
                        {currentState.size && (
                          <span className="text-xs text-[#8C7E72] ml-2">
                            ({lang === 'en' ? `Size ${currentState.size}` : `Ukuran ${currentState.size}`})
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="mt-2.5 text-xs sm:text-sm text-[#5C554E] leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features / Inclusion list */}
                      {service.features && service.features.length > 0 && (
                        <div className="mt-4 pt-3.5 border-t border-[#F2ECE1] space-y-1.5">
                          <div className="text-[10px] font-semibold tracking-wider uppercase text-[#8C7E72]">
                            {t('services.included')}
                          </div>
                          <ul className="space-y-1 text-xs text-[#4F4741]">
                            {service.features.map((feat, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Check className="w-3.5 h-3.5 text-[#8C6D58] shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Special Footnote from PDF */}
                      {service.notes && (
                        <div className="mt-3 text-[11px] text-[#A85836] font-medium italic">
                          {service.notes}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 pt-5 border-t border-[#F0EAE1] flex items-center gap-2.5">
                      {/* WhatsApp Direct Book Button */}
                      <button
                        onClick={() => handleBookSingleService(service)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-white bg-[#2E2824] hover:bg-[#433B35] rounded-xl transition-all shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>{t('services.bookOnWa')}</span>
                      </button>

                      {/* Add to Estimate Multi-Select */}
                      <button
                        onClick={() =>
                          onToggleSelectService(
                            service,
                            currentState.size,
                            currentState.price
                          )
                        }
                        className={`px-3 py-2.5 text-xs font-medium rounded-xl border transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#8C6D58] text-white border-[#8C6D58]'
                            : 'bg-[#F7F4EE] hover:bg-[#EFEAE2] text-[#5C554E] border-[#DDD5C7]'
                        }`}
                        title={isSelected ? (lang === 'en' ? 'Remove from estimate' : 'Keluarkan dari estimasi') : (lang === 'en' ? 'Add to estimate' : 'Tambahkan ke estimasi total')}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{t('services.chosen')}</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>{t('services.choose')}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
