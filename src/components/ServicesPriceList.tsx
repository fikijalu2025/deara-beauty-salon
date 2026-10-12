import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  Clock,
  Check,
  MessageCircle,
  Plus,
  Settings2,
  Sparkles,
  ArrowUpDown,
  AlertCircle,
  Info,
  Scissors,
  Wand2,
  Palette,
  Layers
} from 'lucide-react';
import {
  ServiceItem,
  CATEGORIES,
  HairSize,
  buildWhatsAppLink,
  formatRupiah
} from '../data/servicesData';
import { useLanguage } from '../context/LanguageContext';

export interface CategoryFilterTab {
  id: string;
  labelKey: string;
  defaultLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const CATEGORY_FILTER_TABS: CategoryFilterTab[] = [
  { id: 'all', labelKey: 'services.tabAll', defaultLabel: 'Semua Layanan', icon: Layers },
  { id: 'styling', labelKey: 'services.tabHairStyling', defaultLabel: 'Hair Styling', icon: Scissors },
  { id: 'treatment', labelKey: 'services.tabTreatment', defaultLabel: 'Treatment', icon: Sparkles },
  { id: 'smoothing', labelKey: 'services.tabSmoothing', defaultLabel: 'Smoothing', icon: Wand2 },
  { id: 'colouring', labelKey: 'services.tabColouring', defaultLabel: 'Colouring', icon: Palette },
];

export const isServiceInTab = (item: ServiceItem, tabId: string): boolean => {
  if (tabId === 'all') return true;

  if (tabId === 'styling' || tabId === 'hair-styling') {
    return (
      item.category === 'styling' ||
      item.category === 'owner' ||
      item.id.startsWith('hs-') ||
      item.id.startsWith('own-') ||
      (Boolean(item.categoryLabel) && item.categoryLabel.toLowerCase().includes('styling')) ||
      item.name.toLowerCase().includes('hair cut') ||
      item.name.toLowerCase().includes('haircut') ||
      item.name.toLowerCase().includes('catok') ||
      item.name.toLowerCase().includes('blow dry')
    );
  }

  if (tabId === 'smoothing') {
    return (
      item.name.toLowerCase().includes('smoothing') ||
      item.description.toLowerCase().includes('smoothing') ||
      item.description.toLowerCase().includes('pelurusan')
    );
  }

  if (tabId === 'treatment') {
    // Exclude services whose primary feature is Smoothing so Smoothing has its own dedicated tab
    const isSmoothing =
      item.name.toLowerCase().includes('smoothing') ||
      (item.name.toLowerCase().includes('pelurusan') && !item.name.toLowerCase().includes('keratin'));
    if (isSmoothing) return false;

    return (
      item.category === 'treatment-perm' ||
      item.category === 'package' ||
      item.name.toLowerCase().includes('treatment') ||
      item.name.toLowerCase().includes('creambath') ||
      item.name.toLowerCase().includes('mask') ||
      item.name.toLowerCase().includes('spa') ||
      item.name.toLowerCase().includes('perm') ||
      item.name.toLowerCase().includes('keratin')
    );
  }

  if (tabId === 'colouring') {
    return (
      item.category === 'colouring' ||
      item.name.toLowerCase().includes('colour') ||
      item.name.toLowerCase().includes('color') ||
      item.name.toLowerCase().includes('toning') ||
      item.name.toLowerCase().includes('bleach') ||
      item.name.toLowerCase().includes('balayage') ||
      item.name.toLowerCase().includes('highlight')
    );
  }

  return item.category === tabId;
};

const POPULAR_SEARCH_TAGS = [
  'Haircut',
  'Owner',
  'Smoothing',
  'Creambath',
  'Balayage',
  'Toning',
  'Blow Dry'
];

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

  const formatDuration = (dur?: string) => {
    if (!dur) return '';
    if (lang === 'en') {
      return dur.replace(/Menit/gi, 'Mins').replace(/Jam/gi, 'Hours');
    }
    return dur;
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
        const matchesCategory = isServiceInTab(item, activeCategory);
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          q === '' ||
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.features.some((f) => f.toLowerCase().includes(q)) ||
          (item.badge && item.badge.toLowerCase().includes(q));
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

  // Global matches across all categories for active search query
  const totalGlobalMatches = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return services.length;
    return services.filter((item) =>
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.features.some((f) => f.toLowerCase().includes(q)) ||
      (item.badge && item.badge.toLowerCase().includes(q))
    ).length;
  }, [services, searchQuery]);

  // Category tab counts reflecting current search query
  const tabCounts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const counts: Record<string, number> = {
      all: 0,
      styling: 0,
      treatment: 0,
      smoothing: 0,
      colouring: 0
    };

    services.forEach((s) => {
      const matchesSearch =
        q === '' ||
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.features.some((f) => f.toLowerCase().includes(q)) ||
        (s.badge && s.badge.toLowerCase().includes(q));

      if (matchesSearch) {
        CATEGORY_FILTER_TABS.forEach((tab) => {
          if (isServiceInTab(s, tab.id)) {
            counts[tab.id] = (counts[tab.id] || 0) + 1;
          }
        });
      }
    });
    return counts;
  }, [services, searchQuery]);

  const getActiveTabLabel = () => {
    const tab = CATEGORY_FILTER_TABS.find((t) => t.id === activeCategory);
    if (!tab) return '';
    return t(tab.labelKey as any) || tab.defaultLabel;
  };

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
    <section id="layanan-harga" className="py-16 sm:py-24 bg-[#FAF8F5] dark:bg-[#141210] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#E8E2D9] dark:border-[#2D2721]">
          <div className="max-w-2xl">
            <h2 className="font-serif-brand text-3xl sm:text-4xl lg:text-5xl text-[#242120] dark:text-[#FAF5EE]">
              {t('services.title')}
            </h2>
            <p className="text-[#6B5E52] dark:text-[#BAACA0] mt-3 text-sm sm:text-base leading-relaxed">
              {t('services.desc')}
            </p>
          </div>

          {/* Quick Price List Editor notice / action */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenManager}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#524538] dark:text-[#D5C7B7] bg-[#EDE6DC] dark:bg-[#25201C] hover:bg-[#E2D8CC] dark:hover:bg-[#322B25] border border-[#D5C9BA] dark:border-[#3E342B] rounded-xl transition-all shadow-xs"
            >
              <Settings2 className="w-4 h-4 text-[#8C6D58] dark:text-[#D8B168]" />
              <span>{t('services.manageBtn')}</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tab System (Above Search Bar) */}
        <div className="mt-8">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#8C6D58] dark:text-[#D8B168] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B08D57] dark:text-[#E2B774]" />
              {t('services.categoryFilterTitle')}
            </span>
            {activeCategory !== 'all' && (
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className="text-xs text-[#8C6D58] dark:text-[#D4A76A] hover:text-[#242120] dark:hover:text-[#FAF5EE] font-medium underline-offset-4 hover:underline transition-colors"
              >
                {lang === 'en' ? 'Show All Services' : 'Lihat Semua Layanan'}
              </button>
            )}
          </div>

          <div
            role="tablist"
            aria-label="Category Filters"
            className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {CATEGORY_FILTER_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;
              const count = tabCounts[tab.id] || 0;
              const label = t(tab.labelKey as any) || tab.defaultLabel;

              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`group relative flex items-center gap-2 px-4 sm:px-5 py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 shrink-0 select-none cursor-pointer ${
                    isActive
                      ? 'bg-[#2E2824] dark:bg-[#D4A76A] text-white dark:text-[#181410] shadow-md shadow-[#2E2824]/10 dark:shadow-black/40 ring-1 ring-[#2E2824] dark:ring-[#D4A76A]'
                      : 'bg-white dark:bg-[#1E1B18] text-[#5C4F42] dark:text-[#B8ACA0] hover:text-[#242120] dark:hover:text-[#FAF5EE] hover:bg-[#F7F3EE] dark:hover:bg-[#282420] border border-[#E5DDD0] dark:border-[#332C25] shadow-2xs'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 shrink-0 ${
                      isActive ? 'text-[#D5B895] dark:text-[#181410]' : 'text-[#8C6D58] dark:text-[#D8B168]'
                    }`}
                  />
                  <span className="whitespace-nowrap font-medium">{label}</span>
                  <span
                    className={`ml-1 text-[11px] font-mono px-2 py-0.5 rounded-full transition-colors ${
                      isActive
                        ? 'bg-white/15 dark:bg-black/15 text-white/90 dark:text-black/90 font-semibold'
                        : 'bg-[#F2ECE1] dark:bg-[#2B2621] text-[#7A6C5F] dark:text-[#C5B8A8] group-hover:bg-[#E8DFC0]/60 dark:group-hover:bg-[#362F29]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Top Search Bar & Sort Controls */}
        <div className="mt-5 bg-white dark:bg-[#1C1916] border border-[#E2D9CC] dark:border-[#302A24] rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input Box */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6D58] dark:text-[#D8B168]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('services.searchPlaceholder')}
                className="w-full pl-10 pr-10 py-3 text-xs sm:text-sm bg-[#FAF8F5] dark:bg-[#24201C] border border-[#DDD5C7] dark:border-[#3D352E] rounded-xl text-[#242120] dark:text-[#FAF5EE] placeholder-[#9C8F84] dark:placeholder-[#7A7067] focus:outline-none focus:bg-white dark:focus:bg-[#2A2520] focus:ring-2 focus:ring-[#8C6D58]/25 dark:focus:ring-[#D4A76A]/25 focus:border-[#8C6D58] dark:focus:border-[#D4A76A] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  title={t('services.clearSearch')}
                  aria-label={t('services.clearSearch')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8C7E72] dark:text-[#A09486] hover:text-[#242120] dark:hover:text-white rounded-lg hover:bg-[#EAE4DC] dark:hover:bg-[#342D26] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <span className="text-xs text-[#7A7067] dark:text-[#A89C8F] flex items-center gap-1 font-medium">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#8C6D58] dark:text-[#D8B168]" /> {t('services.sort')}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Urutkan daftar layanan"
                className="px-3 py-2.5 text-xs font-medium bg-[#FAF8F5] dark:bg-[#24201C] border border-[#DDD5C7] dark:border-[#3D352E] rounded-xl text-[#423A33] dark:text-[#E8E0D5] focus:outline-none focus:bg-white dark:focus:bg-[#2A2520] focus:border-[#8C6D58] dark:focus:border-[#D4A76A] cursor-pointer"
              >
                <option value="featured">{t('services.sortFeatured')}</option>
                <option value="price-asc">{t('services.sortAsc')}</option>
                <option value="price-desc">{t('services.sortDesc')}</option>
              </select>
            </div>
          </div>

          {/* Quick Search Tag Chips */}
          <div className="mt-3.5 pt-3 border-t border-[#F0EAE1] dark:border-[#2D2620] flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#8C7E72] dark:text-[#A6998C] font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#B08D57] dark:text-[#E2B774]" />
              {t('services.quickSearch')}
            </span>
            {POPULAR_SEARCH_TAGS.map((tag) => {
              const isSelected = searchQuery.toLowerCase().trim() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    if (isSelected) {
                      setSearchQuery('');
                    } else {
                      setSearchQuery(tag);
                      setActiveCategory('all');
                    }
                  }}
                  className={`px-2.5 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#2E2824] dark:bg-[#D4A76A] text-white dark:text-[#181410] font-medium shadow-xs'
                      : 'bg-[#F2ECE1] dark:bg-[#28231E] text-[#5C4F42] dark:text-[#BDB0A3] hover:bg-[#E5DDD0] dark:hover:bg-[#342D26]'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#8C6D58] dark:text-[#D4A76A] hover:text-[#524538] dark:hover:text-[#FAF5EE] hover:underline ml-auto flex items-center gap-1 font-medium cursor-pointer"
              >
                <X className="w-3 h-3" />
                {t('services.clearSearch')}
              </button>
            )}
          </div>
        </div>

        {/* Search Results Notification Banner */}
        {searchQuery.trim() && (
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#F5EFE6] dark:bg-[#231F1B] px-4 py-2.5 rounded-xl border border-[#E2D9CC] dark:border-[#38312A] text-xs sm:text-sm text-[#4E443B] dark:text-[#D8CFCA]">
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-[#8C6D58] dark:text-[#D8B168] shrink-0" />
              <span>
                {lang === 'en'
                  ? `Showing ${filteredServices.length} service${filteredServices.length === 1 ? '' : 's'} for "${searchQuery}"`
                  : `Menampilkan ${filteredServices.length} layanan untuk "${searchQuery}"`}
                {activeCategory !== 'all' && (
                  <span className="text-[#8C7E72] dark:text-[#A09384] ml-1">
                    ({lang === 'en' ? `Category: ${getActiveTabLabel()}` : `Kategori: ${getActiveTabLabel()}`})
                  </span>
                )}
              </span>
            </div>
            <div className="flex items-center gap-3 self-end sm:self-auto">
              {activeCategory !== 'all' && (
                <button
                  onClick={() => setActiveCategory('all')}
                  className="text-xs font-semibold text-[#8C6D58] dark:text-[#D4A76A] hover:underline cursor-pointer"
                >
                  {lang === 'en' ? 'Show all categories' : 'Lihat semua kategori'}
                </button>
              )}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="text-xs text-[#7A7067] dark:text-[#A6998C] hover:text-[#242120] dark:hover:text-white hover:underline cursor-pointer"
              >
                {t('services.clearSearch')}
              </button>
            </div>
          </div>
        )}

        {/* Global Match Helper Banner if filtered is 0 in specific category */}
        {searchQuery.trim() && activeCategory !== 'all' && filteredServices.length === 0 && totalGlobalMatches > 0 && (
          <div className="mt-4 p-4 bg-[#F2ECE1] dark:bg-[#25201C] border border-[#DDD5C7] dark:border-[#3E342C] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-[#524538] dark:text-[#DACFC3]">
            <p>
              {lang === 'en'
                ? `No services matching "${searchQuery}" in "${getActiveTabLabel()}", but ${totalGlobalMatches} services were found across other categories.`
                : `Tidak ada layanan "${searchQuery}" di kategori "${getActiveTabLabel()}", tetapi ditemukan ${totalGlobalMatches} layanan di kategori lain.`}
            </p>
            <button
              onClick={() => setActiveCategory('all')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#2E2824] dark:bg-[#D4A76A] dark:text-[#181410] hover:bg-[#433B35] dark:hover:bg-[#E2BA84] rounded-lg shrink-0 transition-colors cursor-pointer"
            >
              {lang === 'en' ? 'Show All Categories' : 'Lihat Semua Kategori'}
            </button>
          </div>
        )}

        {/* Info Notices from PDF */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3.5 bg-[#F2ECE1] dark:bg-[#201C18] border border-[#DDD5C7] dark:border-[#383028] rounded-xl flex items-start gap-2.5 text-xs text-[#524538] dark:text-[#D5C8BA]">
            <Info className="w-4 h-4 text-[#8C6D58] dark:text-[#D8B168] shrink-0 mt-0.5" />
            <div>
              {t('services.noticeOwner')}
            </div>
          </div>
          <div className="p-3.5 bg-[#F2ECE1] dark:bg-[#201C18] border border-[#DDD5C7] dark:border-[#383028] rounded-xl flex items-start gap-2.5 text-xs text-[#524538] dark:text-[#D5C8BA]">
            <AlertCircle className="w-4 h-4 text-[#8C6D58] dark:text-[#D8B168] shrink-0 mt-0.5" />
            <div>
              {t('services.noticeExtra')}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mt-10">
          {filteredServices.length === 0 ? (
            <div className="text-center py-16 bg-[#F5EFE6]/60 dark:bg-[#1E1A17] rounded-2xl border border-dashed border-[#DDD5C7] dark:border-[#383028] p-8">
              <div className="font-serif-brand text-2xl text-[#242120] dark:text-[#FAF5EE]">{t('services.notFoundTitle')}</div>
              <p className="text-xs sm:text-sm text-[#7A7067] dark:text-[#A89D91] mt-2 max-w-md mx-auto">
                {t('services.notFoundDesc')}
              </p>
              <div className="mt-5 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="px-4 py-2 text-xs font-medium text-[#242120] dark:text-[#FAF5EE] bg-white dark:bg-[#28221D] border border-[#DDD5C7] dark:border-[#3D342C] rounded-lg hover:bg-[#F2ECE1] dark:hover:bg-[#342D26] cursor-pointer"
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
                    className={`relative flex flex-col justify-between rounded-2xl bg-white dark:bg-[#1A1715] border transition-all duration-300 p-6 sm:p-7 shadow-xs hover:shadow-md ${
                      isSelected
                        ? 'border-[#8C6D58] dark:border-[#D4A76A] ring-2 ring-[#8C6D58]/20 dark:ring-[#D4A76A]/20 bg-[#FAF7F2] dark:bg-[#25201C]'
                        : 'border-[#E8E1D5] dark:border-[#2D2722] hover:border-[#D1C4B5] dark:hover:border-[#473E36]'
                    }`}
                  >
                    <div>
                      {/* Top Metadata */}
                      <div className="flex items-center justify-between gap-2 text-xs text-[#7A7067] dark:text-[#9E9284] pb-3 border-b border-[#F0EAE1] dark:border-[#28231E]">
                        <span className="font-medium text-[#8C6D58] dark:text-[#D8B168]">
                          {categoryLabel}
                        </span>
                        {service.duration && (
                          <div
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF5EE] dark:bg-[#241F1B] text-[#5C5045] dark:text-[#D5C9BD] font-mono text-xs tabular-nums border border-[#E4D9CA] dark:border-[#383028]"
                            title={t('services.durationTooltip')}
                          >
                            <Clock className="w-3.5 h-3.5 text-[#8C6D58] dark:text-[#D8B168] shrink-0" />
                            <span className="font-semibold">{formatDuration(service.duration)}</span>
                          </div>
                        )}
                      </div>

                      {/* Title & Badge */}
                      <div className="mt-4 flex items-start justify-between gap-3">
                        <h3 className="font-serif-brand text-xl sm:text-2xl text-[#242120] dark:text-[#FAF5EE] leading-snug">
                          {service.name}
                        </h3>
                        {service.badge ? (
                          <span className="shrink-0 text-[10px] font-semibold text-[#8C5D39] dark:text-[#F3BA78] bg-[#F7ECE1] dark:bg-[#342417] px-2 py-0.5 rounded border border-[#E8D1BE] dark:border-[#523A25]">
                            {service.badge}
                          </span>
                        ) : service.isPopular ? (
                          <span className="shrink-0 text-[10px] font-semibold text-[#8C5D39] dark:text-[#F3BA78] bg-[#F7ECE1] dark:bg-[#342417] px-2 py-0.5 rounded border border-[#E8D1BE] dark:border-[#523A25]">
                            {t('services.favorite')}
                          </span>
                        ) : null}
                      </div>

                      {/* Hair Length Size Selector (S, M, L, XL) if sizePrices exist */}
                      {service.sizePrices && service.sizePrices.length > 0 && (
                        <div className="mt-3.5 p-2.5 bg-[#FAF6F0] dark:bg-[#221D19] rounded-xl border border-[#EDE2D5] dark:border-[#362E27] space-y-2">
                          <div className="text-[11px] font-medium text-[#7A7067] dark:text-[#9E9284] flex items-center justify-between">
                            <span>{t('services.hairLength')}</span>
                            <span className="text-[#8C6D58] dark:text-[#D8B168] font-semibold">
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
                                  className={`py-1.5 px-2 text-xs font-semibold rounded-lg transition-all text-center cursor-pointer ${
                                    isCurrentSize
                                      ? 'bg-[#2E2824] dark:bg-[#D4A76A] text-white dark:text-[#181410] shadow-xs'
                                      : 'bg-white dark:bg-[#1A1715] text-[#5C554E] dark:text-[#C5B8A8] hover:bg-[#EFEAE2] dark:hover:bg-[#2A241F] border border-[#DDD5C7] dark:border-[#383028]'
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

                      {/* Dynamic Price in Tabular Display & Estimated Duration */}
                      <div className="mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                        <div className="flex items-baseline">
                          <span className="font-mono tabular-nums text-2xl font-bold text-[#242120] dark:text-[#FAF5EE]">
                            {currentState.formattedPrice}
                          </span>
                          {currentState.size && (
                            <span className="text-xs text-[#8C7E72] dark:text-[#A09384] ml-2">
                              ({lang === 'en' ? `Size ${currentState.size}` : `Ukuran ${currentState.size}`})
                            </span>
                          )}
                        </div>
                        {service.duration && (
                          <div className="flex items-center gap-1.5 text-xs text-[#6E6359] dark:text-[#B3A698]">
                            <span className="text-[#9C8F84] dark:text-[#8A7D71] text-[11px] font-medium">{t('services.durationLabel')}:</span>
                            <span className="font-mono font-semibold text-[#242120] dark:text-[#FAF5EE]">
                              {formatDuration(service.duration)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p className="mt-2.5 text-xs sm:text-sm text-[#5C554E] dark:text-[#B5A89C] leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features / Inclusion list */}
                      {service.features && service.features.length > 0 && (
                        <div className="mt-4 pt-3.5 border-t border-[#F2ECE1] dark:border-[#28231E] space-y-1.5">
                          <div className="text-[10px] font-semibold tracking-wider uppercase text-[#8C7E72] dark:text-[#9E9082]">
                            {t('services.included')}
                          </div>
                          <ul className="space-y-1 text-xs text-[#4F4741] dark:text-[#C5B8AA]">
                            {service.features.map((feat, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Check className="w-3.5 h-3.5 text-[#8C6D58] dark:text-[#D8B168] shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Special Footnote from PDF */}
                      {service.notes && (
                        <div className="mt-3 text-[11px] text-[#A85836] dark:text-[#E88D68] font-medium italic">
                          {service.notes}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 pt-5 border-t border-[#F0EAE1] dark:border-[#28231E] flex items-center gap-2.5">
                      {/* WhatsApp Direct Book Button */}
                      <button
                        onClick={() => handleBookSingleService(service)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-white bg-[#2E2824] dark:bg-[#D4A76A] dark:text-[#181410] hover:bg-[#433B35] dark:hover:bg-[#E2BA84] rounded-xl transition-all shadow-xs cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#25D366] dark:text-[#18753B]" />
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
                        className={`px-3 py-2.5 text-xs font-medium rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-[#8C6D58] dark:bg-[#D4A76A] text-white dark:text-[#181410] border-[#8C6D58] dark:border-[#D4A76A]'
                            : 'bg-[#F7F4EE] dark:bg-[#25201C] hover:bg-[#EFEAE2] dark:hover:bg-[#302A24] text-[#5C554E] dark:text-[#D5C9BC] border-[#DDD5C7] dark:border-[#3D352D]'
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
