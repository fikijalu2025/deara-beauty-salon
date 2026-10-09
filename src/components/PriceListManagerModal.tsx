import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Copy,
  Download,
  Upload,
  RotateCcw,
  Check,
  AlertCircle
} from 'lucide-react';
import {
  ServiceItem,
  CATEGORIES,
  formatRupiah,
  INITIAL_SERVICES
} from '../data/servicesData';

interface PriceListManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceItem[];
  onUpdateServices: (services: ServiceItem[]) => void;
}

export const PriceListManagerModal: React.FC<PriceListManagerModalProps> = ({
  isOpen,
  onClose,
  services,
  onUpdateServices,
}) => {
  const [activeTab, setActiveTab] = useState<'manage' | 'json'>('manage');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ServiceItem['category']>('styling');
  const [price, setPrice] = useState<string>('50000');
  const [duration, setDuration] = useState('45 Menit');
  const [description, setDescription] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [isPopular, setIsPopular] = useState(false);

  // JSON Tab State
  const [rawJson, setRawJson] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [jsonSuccess, setJsonSuccess] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // When switching to JSON tab, sync rawJson
  React.useEffect(() => {
    if (isOpen) {
      setRawJson(JSON.stringify(services, null, 2));
      setJsonError(null);
      setJsonSuccess(null);
    }
  }, [isOpen, services]);

  if (!isOpen) return null;

  const handleStartEdit = (service: ServiceItem) => {
    setEditingId(service.id);
    setName(service.name);
    setCategory(service.category);
    setPrice(service.price.toString());
    setDuration(service.duration || '45 Menit');
    setDescription(service.description);
    setFeaturesText(service.features.join('\n'));
    setIsPopular(!!service.isPopular);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName('');
    setCategory('styling');
    setPrice('50000');
    setDuration('45 Menit');
    setDescription('');
    setFeaturesText('');
    setIsPopular(false);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const numericPrice = Number(price) || 0;
    const catObj = CATEGORIES.find((c) => c.id === category);
    const catLabel = catObj ? catObj.label : 'Layanan';

    const featuresArray = featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    if (editingId) {
      // Update existing
      const updated = services.map((s) => {
        if (s.id === editingId) {
          return {
            ...s,
            name: name.trim(),
            category,
            categoryLabel: catLabel,
            price: numericPrice,
            formattedPrice: formatRupiah(numericPrice),
            duration: duration.trim(),
            description: description.trim(),
            features: featuresArray,
            isPopular,
          };
        }
        return s;
      });
      onUpdateServices(updated);
      handleCancelEdit();
    } else {
      // Add new
      const newService: ServiceItem = {
        id: `srv-${Date.now()}`,
        name: name.trim(),
        category,
        categoryLabel: catLabel,
        price: numericPrice,
        formattedPrice: formatRupiah(numericPrice),
        duration: duration.trim() || '60 Menit',
        description: description.trim(),
        features: featuresArray,
        isPopular,
      };
      onUpdateServices([newService, ...services]);
      handleCancelEdit();
    }
  };

  const handleDeleteService = (id: string) => {
    if (window.confirm('Yakin ingin menghapus layanan ini dari daftar harga?')) {
      const filtered = services.filter((s) => s.id !== id);
      onUpdateServices(filtered);
      if (editingId === id) {
        handleCancelEdit();
      }
    }
  };

  const handleApplyJson = () => {
    try {
      setJsonError(null);
      const parsed = JSON.parse(rawJson);
      if (!Array.isArray(parsed)) {
        throw new Error('Format JSON harus berupa Array daftar layanan [...]');
      }
      // Basic validation and formatting check
      const sanitized: ServiceItem[] = parsed.map((item, index) => {
        const p = Number(item.price) || 0;
        return {
          id: item.id || `srv-${Date.now()}-${index}`,
          name: item.name || `Layanan ${index + 1}`,
          category: item.category || 'styling',
          categoryLabel: item.categoryLabel || 'Layanan Umum',
          price: p,
          formattedPrice: item.formattedPrice || formatRupiah(p),
          duration: item.duration || '60 Menit',
          description: item.description || '',
          features: Array.isArray(item.features) ? item.features : [],
          isPopular: !!item.isPopular,
        };
      });

      onUpdateServices(sanitized);
      setJsonSuccess(`Berhasil menerapkan ${sanitized.length} data layanan baru!`);
      setTimeout(() => setJsonSuccess(null), 3500);
    } catch (err: any) {
      setJsonError(err.message || 'JSON tidak valid. Periksa sintaks penulisan.');
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(services, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset seluruh daftar layanan ke data awal default Deara?')) {
      onUpdateServices(INITIAL_SERVICES);
      setRawJson(JSON.stringify(INITIAL_SERVICES, null, 2));
      handleCancelEdit();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#FAF8F5] rounded-2xl border border-[#DDD5C7] shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E2D9] bg-white">
          <div>
            <div className="text-xs uppercase font-medium tracking-wider text-[#8C6D58]">
              Pusat Data & Katalog
            </div>
            <h3 className="font-serif-brand text-xl sm:text-2xl text-[#242120]">
              Kelola & Input Data Price List
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#7A7067] hover:text-[#242120] rounded-lg hover:bg-[#F2ECE1]"
            aria-label="Tutup editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 px-6 pt-3 bg-white border-b border-[#E8E2D9]">
          <button
            onClick={() => setActiveTab('manage')}
            className={`pb-3 text-xs sm:text-sm font-medium border-b-2 transition-all ${
              activeTab === 'manage'
                ? 'border-[#8C6D58] text-[#242120]'
                : 'border-transparent text-[#7A7067] hover:text-[#242120]'
            }`}
          >
            Input & Edit Visual ({services.length} Item)
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`pb-3 text-xs sm:text-sm font-medium border-b-2 transition-all ${
              activeTab === 'json'
                ? 'border-[#8C6D58] text-[#242120]'
                : 'border-transparent text-[#7A7067] hover:text-[#242120]'
            }`}
          >
            Impor / Ekspor JSON Price List
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeTab === 'manage' ? (
            <div className="space-y-6">
              {/* Form to Add / Edit */}
              <form
                onSubmit={handleSaveService}
                className="bg-white p-5 sm:p-6 rounded-xl border border-[#E4DDD2] shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serif-brand text-lg text-[#242120]">
                    {editingId ? 'Edit Layanan' : 'Tambah Layanan Baru ke Price List'}
                  </h4>
                  {editingId && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="text-xs text-[#8C6D58] hover:underline"
                    >
                      Batal Edit (Buat Baru)
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#524B45] mb-1">
                      Nama Layanan / Treatment *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Contoh: Signature Hydro Facial Glow"
                      className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#242120] focus:ring-1 focus:ring-[#8C6D58] focus:border-[#8C6D58]"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-semibold text-[#524B45] mb-1">
                      Kategori Layanan
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#242120] focus:border-[#8C6D58]"
                    >
                      <option value="styling">Hair Styling & Cut Team</option>
                      <option value="owner">Haircut by Owner (Maguwo)</option>
                      <option value="package">Paket Hemat Hair & Treatment</option>
                      <option value="treatment-perm">Hair Treatment & Perm</option>
                      <option value="colouring">Hair Colouring (Soft & Fashion)</option>
                    </select>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-xs font-semibold text-[#524B45] mb-1">
                      Harga (IDR / Rupiah) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="5000"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#242120] focus:border-[#8C6D58]"
                    />
                    <div className="text-[11px] text-[#7A7067] mt-1 font-mono">
                      Preview: {formatRupiah(Number(price) || 0)}
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-xs font-semibold text-[#524B45] mb-1">
                      Durasi Treatment
                    </label>
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="Contoh: 60 Menit, 90 Menit"
                      className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#242120]"
                    />
                  </div>

                  {/* Popular tag toggle */}
                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id="popularCheck"
                      checked={isPopular}
                      onChange={(e) => setIsPopular(e.target.checked)}
                      className="w-4 h-4 text-[#8C6D58] rounded border-[#DDD5C7] focus:ring-[#8C6D58]"
                    />
                    <label htmlFor="popularCheck" className="text-xs font-medium text-[#423A33] cursor-pointer">
                      Tandai sebagai Layanan Favorit / Rekomendasi
                    </label>
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#524B45] mb-1">
                      Deskripsi Layanan
                    </label>
                    <textarea
                      rows={2}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Jelaskan manfaat dan pengalaman yang didapatkan klien..."
                      className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#242120]"
                    />
                  </div>

                  {/* Features list (one per line) */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#524B45] mb-1">
                      Keunggulan / Item Termasuk (1 per baris)
                    </label>
                    <textarea
                      rows={3}
                      value={featuresText}
                      onChange={(e) => setFeaturesText(e.target.value)}
                      placeholder="Contoh:&#10;Double cleansing organik&#10;Serum hyaluronic acid&#10;Cryo soothing globe massage"
                      className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#242120] font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#2E2824] hover:bg-[#433B35] rounded-lg transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{editingId ? 'Simpan Perubahan' : 'Tambahkan ke Price List'}</span>
                  </button>
                </div>
              </form>

              {/* List of current services */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif-brand text-lg text-[#242120]">
                    Daftar Layanan Tersimpan ({services.length})
                  </h4>
                  <button
                    onClick={handleResetToDefault}
                    className="flex items-center gap-1.5 text-xs text-[#8C6D58] hover:text-[#524538]"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Kembalikan Default</span>
                  </button>
                </div>

                <div className="divide-y divide-[#E8E2D9] bg-white rounded-xl border border-[#DDD5C7] overflow-hidden">
                  {services.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 sm:p-4 flex items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-[#242120] truncate">
                            {item.name}
                          </span>
                          {item.isPopular && (
                            <span className="text-[10px] bg-[#F7ECE1] text-[#8C5D39] px-1.5 py-0.2 rounded font-medium">
                              Favorit
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-[#7A7067] flex items-center gap-2 mt-0.5">
                          <span>{item.categoryLabel}</span>
                          <span>·</span>
                          <span>{item.duration}</span>
                          <span>·</span>
                          <span className="font-mono font-semibold text-[#242120]">
                            {item.formattedPrice}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleStartEdit(item)}
                          className="p-2 text-[#6B5E52] hover:text-[#242120] hover:bg-[#EFEAE2] rounded-lg"
                          title="Edit layanan ini"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(item.id)}
                          className="p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg"
                          title="Hapus layanan ini"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
                <div className="font-semibold mb-1 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  Format Impor Price List Kustom
                </div>
                Anda dapat mengirimkan data price list kapan saja! Cukup salin template JSON di bawah ini atau tempelkan daftar data Anda ke kolom ini, lalu klik tombol <strong>Terapkan Data JSON</strong>.
              </div>

              {jsonError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{jsonError}</span>
                </div>
              )}

              {jsonSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{jsonSuccess}</span>
                </div>
              )}

              <div className="relative">
                <textarea
                  rows={14}
                  value={rawJson}
                  onChange={(e) => setRawJson(e.target.value)}
                  className="w-full p-3 font-mono text-xs bg-white border border-[#DDD5C7] rounded-xl text-[#242120] focus:ring-1 focus:ring-[#8C6D58]"
                  placeholder="Paste JSON array here..."
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyJson}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#4D453E] bg-white border border-[#DDD5C7] rounded-lg hover:bg-[#F2ECE1]"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? 'Tersalin!' : 'Salin JSON'}</span>
                  </button>
                  <button
                    onClick={handleResetToDefault}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#7A7067] hover:text-[#242120]"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Contoh</span>
                  </button>
                </div>

                <button
                  onClick={handleApplyJson}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#2E2824] hover:bg-[#433B35] rounded-xl shadow-xs"
                >
                  <Upload className="w-4 h-4" />
                  <span>Terapkan Data JSON</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#E8E2D9] bg-white flex items-center justify-between">
          <span className="text-xs text-[#7A7067]">
            Data tersimpan otomatis di browser lokal Anda.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-[#242120] bg-[#EFEAE2] hover:bg-[#E5DED4] rounded-lg"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
