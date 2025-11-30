import React, { useState, useEffect } from 'react';
import { DamageType, BusinessSize, VehicleType, HomeDetails, BusinessDetails, VehicleDetails, DamageReport, Language } from '../types';
import { Home, Building2, CarFront, Camera, X } from 'lucide-react';
import { translations } from '../translations';

interface ReportFormProps {
  selectedLocation: { lat: number, lng: number } | null;
  onSubmit: (report: Omit<DamageReport, 'id' | 'timestamp'>) => void;
  lang: Language;
}

export const ReportForm: React.FC<ReportFormProps> = ({ selectedLocation, onSubmit, lang }) => {
  const [activeTab, setActiveTab] = useState<DamageType>(DamageType.HOME);
  const t = translations[lang];
  
  // Form States
  const [homeData, setHomeData] = useState<HomeDetails>({ residents: 0, damagePercentage: 0, memberAges: [] });
  // Local state for age buckets
  const [ageBuckets, setAgeBuckets] = useState({
    range0_7: 0,
    range7_18: 0,
    range18_50: 0,
    range50_plus: 0
  });

  const [businessData, setBusinessData] = useState<BusinessDetails>({ size: BusinessSize.SMALL, damagePercentage: 0 });
  const [vehicleData, setVehicleData] = useState<VehicleDetails>({ type: VehicleType.CAR, count: 1 });
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);

  // Sync age buckets to homeData residents and memberAges
  useEffect(() => {
    const totalResidents = ageBuckets.range0_7 + ageBuckets.range7_18 + ageBuckets.range18_50 + ageBuckets.range50_plus;
    
    // Generate representative ages for the array (used for stats)
    const derivedAges: number[] = [];
    for(let i=0; i<ageBuckets.range0_7; i++) derivedAges.push(4);
    for(let i=0; i<ageBuckets.range7_18; i++) derivedAges.push(12);
    for(let i=0; i<ageBuckets.range18_50; i++) derivedAges.push(30);
    for(let i=0; i<ageBuckets.range50_plus; i++) derivedAges.push(65);

    setHomeData(prev => ({
      ...prev,
      residents: totalResidents > 0 ? totalResidents : prev.residents, 
      memberAges: derivedAges
    }));
  }, [ageBuckets]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLocation) {
      alert(t.pickLocation);
      return;
    }

    onSubmit({
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
      type: activeTab,
      description,
      image: image || undefined,
      homeDetails: activeTab === DamageType.HOME ? homeData : undefined,
      businessDetails: activeTab === DamageType.BUSINESS ? businessData : undefined,
      vehicleDetails: activeTab === DamageType.VEHICLE ? vehicleData : undefined,
    });
    
    // Reset inputs
    setDescription('');
    setImage(null);
    setAgeBuckets({ range0_7: 0, range7_18: 0, range18_50: 0, range50_plus: 0 });
    setHomeData({ residents: 0, damagePercentage: 0, memberAges: [] });
    setBusinessData({ size: BusinessSize.SMALL, damagePercentage: 0 });
  };

  // Color logic for Tabs
  const getTabColor = (type: DamageType) => {
    switch (type) {
      case DamageType.HOME: return 'bg-orange-600 text-white border-orange-600';
      case DamageType.BUSINESS: return 'bg-blue-600 text-white border-blue-600';
      case DamageType.VEHICLE: return 'bg-red-600 text-white border-red-600';
      default: return '';
    }
  };

  const TabButton = ({ type, icon: Icon, label }: { type: DamageType, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(type)}
      className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-full transition-all border ${
        activeTab === type 
          ? getTabColor(type)
          : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <h2 className="font-bold text-xl text-slate-800">{t.submitReport}</h2>
        <div className="mt-2 flex items-center gap-2">
            <span className="text-sm text-slate-500">{t.location}:</span>
            {selectedLocation ? (
                 <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                   {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                 </span>
            ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200">
                    {t.selectOnMap}
                </span>
            )}
        </div>
      </div>

      <div className="p-6">
        {/* Modern Pill Tabs */}
        <div className="flex gap-2 mb-8">
          <TabButton type={DamageType.HOME} icon={Home} label={t.home} />
          <TabButton type={DamageType.BUSINESS} icon={Building2} label={t.business} />
          <TabButton type={DamageType.VEHICLE} icon={CarFront} label={t.vehicle} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* HOME FORM */}
          {activeTab === DamageType.HOME && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Residents Counter */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-3">{t.occupantsAge}</label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: `0 - 7 ${t.years}`, val: ageBuckets.range0_7, key: 'range0_7' },
                    { label: `7 - 18 ${t.years}`, val: ageBuckets.range7_18, key: 'range7_18' },
                    { label: `18 - 50 ${t.years}`, val: ageBuckets.range18_50, key: 'range18_50' },
                    { label: `50+ ${t.years}`, val: ageBuckets.range50_plus, key: 'range50_plus' }
                  ].map((field, idx) => (
                      <div key={idx} className="relative">
                        <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                            {field.label}
                        </label>
                        <input 
                          type="number" min="0"
                          className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg py-3 px-4 text-center font-bold text-slate-900 focus:outline-none focus:border-orange-500 transition-colors"
                          value={field.val || ''}
                          placeholder="0"
                          onChange={e => setAgeBuckets({...ageBuckets, [field.key]: parseInt(e.target.value) || 0})}
                        />
                      </div>
                  ))}
                </div>
              </div>

              {/* Damage Slider */}
              <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                   <label className="text-sm font-bold text-slate-700">{t.damageAssessment}</label>
                   <span className={`text-lg font-black ${
                       homeData.damagePercentage > 75 ? 'text-red-600' : 
                       homeData.damagePercentage > 40 ? 'text-orange-500' : 'text-slate-600'
                   }`}>
                     {homeData.damagePercentage}%
                   </span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100"
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #fb923c 0%, #ea580c ${homeData.damagePercentage}%, #cbd5e1 ${homeData.damagePercentage}%)`
                  }}
                  value={homeData.damagePercentage}
                  onChange={e => setHomeData({...homeData, damagePercentage: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
          )}

          {/* BUSINESS FORM */}
          {activeTab === DamageType.BUSINESS && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-3">{t.businessScale}</label>
                <div className="grid grid-cols-3 gap-3">
                  {Object.values(BusinessSize).map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setBusinessData({...businessData, size: s})}
                      className={`py-3 rounded-lg text-sm font-bold border-2 transition-colors ${
                        businessData.size === s 
                          ? 'bg-blue-600 border-blue-600 text-white' 
                          : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      {s === 'SMALL' ? t.small : s === 'MEDIUM' ? t.medium : t.large}
                    </button>
                  ))}
                </div>
              </div>

              {/* Business Damage Slider (Blue Gradient) */}
              <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                   <label className="text-sm font-bold text-slate-700">{t.severityAssessment}</label>
                   <span className={`text-lg font-black ${
                       businessData.damagePercentage > 75 ? 'text-red-600' : 
                       businessData.damagePercentage > 40 ? 'text-blue-600' : 'text-slate-600'
                   }`}>
                     {businessData.damagePercentage}%
                   </span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100"
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #60a5fa 0%, #2563eb ${businessData.damagePercentage}%, #cbd5e1 ${businessData.damagePercentage}%)`
                  }}
                  value={businessData.damagePercentage}
                  onChange={e => setBusinessData({...businessData, damagePercentage: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
          )}

          {/* VEHICLE FORM */}
          {activeTab === DamageType.VEHICLE && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-2 gap-4">
                 <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">{t.vehicleType}</label>
                  <div className="relative">
                      <select 
                        className="w-full appearance-none bg-[#F8FAFC] border border-slate-200 rounded-lg p-4 text-sm font-bold text-slate-700 focus:border-red-500 focus:outline-none"
                        value={vehicleData.type}
                        onChange={(e) => setVehicleData({...vehicleData, type: e.target.value as VehicleType})}
                    >
                        {Object.values(VehicleType).map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">{t.quantity}</label>
                  <input 
                    type="number" 
                    min="1"
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg p-4 text-sm font-bold text-slate-800 focus:border-red-500 focus:outline-none text-center"
                    value={vehicleData.count}
                    onChange={e => setVehicleData({...vehicleData, count: parseInt(e.target.value) || 1})}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Generic Image Upload & Description */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
             <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">{t.evidencePhoto}</label>
                {!image ? (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Camera className="w-8 h-8 text-slate-400 mb-2" />
                          <p className="text-xs text-slate-500">{t.clickToUpload}</p>
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                ) : (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-slate-200">
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
             </div>

            <div>
              <textarea 
                rows={3}
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg p-4 text-sm focus:border-slate-400 focus:outline-none font-medium text-slate-700 placeholder:text-slate-400"
                placeholder={t.describeDetails}
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={!selectedLocation}
            className={`w-full text-white font-bold py-4 rounded-lg uppercase tracking-wide transition-all ${
              !selectedLocation ? 'bg-slate-300 cursor-not-allowed' :
              'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200'
            }`}
          >
            {selectedLocation ? t.submitReport : t.pickLocation}
          </button>
        </form>
      </div>
    </div>
  );
};