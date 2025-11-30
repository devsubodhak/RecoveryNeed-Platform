import React, { useState } from 'react';
import { DisasterMap } from './components/DisasterMap';
import { StatsDashboard } from './components/StatsDashboard';
import { ReportForm } from './components/ReportForm';
import { EmergencyPage } from './components/EmergencyPage';
import { DamageReport, DamageType, BusinessSize, VehicleType, Language } from './types';
import { Map, PieChart, Activity, Phone } from 'lucide-react';
import { translations } from './translations';

// Mock Initial Data
const INITIAL_REPORTS: DamageReport[] = [
  {
    id: '1', lat: 6.9271, lng: 79.8612, type: DamageType.HOME, timestamp: Date.now(), 
    homeDetails: { residents: 4, damagePercentage: 80, memberAges: [45, 42, 12, 8] },
    description: "Roof collapsed due to landslide."
  },
  {
    id: '2', lat: 6.9320, lng: 79.8550, type: DamageType.BUSINESS, timestamp: Date.now(), 
    businessDetails: { size: BusinessSize.MEDIUM, damagePercentage: 100 },
    description: "Grocery store flooded completely."
  },
  {
    id: '3', lat: 6.9100, lng: 79.8800, type: DamageType.VEHICLE, timestamp: Date.now(),
    vehicleDetails: { type: VehicleType.VAN, count: 2 },
    description: "Delivery vans washed away."
  },
  {
    id: '4', lat: 6.9350, lng: 79.8600, type: DamageType.HOME, timestamp: Date.now(),
    homeDetails: { residents: 2, damagePercentage: 40, memberAges: [70, 68] },
    description: "Water entered the living room."
  },
  {
    id: '5', lat: 6.9200, lng: 79.8700, type: DamageType.BUSINESS, timestamp: Date.now(),
    businessDetails: { size: BusinessSize.SMALL, damagePercentage: 75 },
    description: "Small textitle shop damaged."
  }
];

type ViewState = 'report' | 'dashboard' | 'emergency';

const App: React.FC = () => {
  const [reports, setReports] = useState<DamageReport[]>(INITIAL_REPORTS);
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('report');
  const [lang, setLang] = useState<Language>('en');

  const t = translations[lang];

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
  };

  const handleSubmitReport = (reportData: Omit<DamageReport, 'id' | 'timestamp'>) => {
    const newReport: DamageReport = {
      ...reportData,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    };
    
    setReports(prev => [newReport, ...prev]);
    setSelectedLocation(null);
    alert("Report submitted successfully!");
  };

  const NavButton = ({ view, icon: Icon, label }: { view: ViewState, icon: any, label: string }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all border ${
        currentView === view 
          ? 'bg-white text-blue-700 border-white shadow-sm' 
          : 'bg-blue-700/50 text-white/80 border-transparent hover:bg-blue-700 hover:text-white'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F8FAFC] text-slate-800">
      
      {/* Navigation Header - Bright Blue Theme */}
      <header className="bg-blue-600 border-b border-blue-700 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('report')}>
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/20">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
               <h1 className="text-xl font-bold tracking-tight text-white leading-none">
                {t.appTitle}<span className="text-red-300">{t.appTitleSuffix}</span>
              </h1>
              <span className="text-[10px] font-bold text-blue-100 tracking-wider mt-0.5 uppercase opacity-80">{t.subtitle}</span>
            </div>
          </div>
          
          <nav className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center gap-3">
              <NavButton view="report" icon={Map} label={t.liveMap} />
              <NavButton view="dashboard" icon={PieChart} label={t.analytics} />
              <NavButton view="emergency" icon={Phone} label={t.emergencyNav} />
            </div>

            {/* Language Switcher - Adapted for Blue Header */}
            <div className="flex items-center bg-blue-700/50 rounded-full p-1 border border-blue-500/30">
              <button 
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'en' ? 'bg-white text-blue-700 shadow-sm' : 'text-blue-100 hover:text-white'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang('si')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'si' ? 'bg-white text-blue-700 shadow-sm' : 'text-blue-100 hover:text-white'}`}
              >
                සි
              </button>
              <button 
                onClick={() => setLang('ta')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'ta' ? 'bg-white text-blue-700 shadow-sm' : 'text-blue-100 hover:text-white'}`}
              >
                த
              </button>
            </div>
          </nav>
        </div>
        
        {/* Mobile Nav */}
        <div className="md:hidden border-t border-blue-500/50 flex justify-around p-2 bg-blue-600 text-white">
           <button
                onClick={() => setCurrentView('report')}
                className={`flex-1 flex justify-center items-center gap-2 px-4 py-3 text-xs font-bold rounded-lg ${currentView === 'report' ? 'bg-blue-700 text-white' : 'text-blue-100'}`}
              >
                <Map className="w-4 h-4" />
                {t.liveMap}
            </button>
            <button
                onClick={() => setCurrentView('dashboard')}
                className={`flex-1 flex justify-center items-center gap-2 px-4 py-3 text-xs font-bold rounded-lg ${currentView === 'dashboard' ? 'bg-blue-700 text-white' : 'text-blue-100'}`}
              >
                <PieChart className="w-4 h-4" />
                {t.analytics}
            </button>
            <button
                onClick={() => setCurrentView('emergency')}
                className={`flex-1 flex justify-center items-center gap-2 px-4 py-3 text-xs font-bold rounded-lg ${currentView === 'emergency' ? 'bg-blue-700 text-white' : 'text-blue-100'}`}
              >
                <Phone className="w-4 h-4" />
                {t.emergencyNav}
            </button>
        </div>
      </header>

      <main className="flex-1 w-full mx-auto">
        
        {currentView === 'report' && (
          <div className="animate-in fade-in duration-500">
             
             {/* Hero Section */}
             <div className="bg-white border-b border-slate-200 py-12 px-4 mb-8 text-center">
                <div className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-red-200">
                  {t.heroTag}
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                  {t.heroTitle}
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                  {t.heroDesc}
                </p>
             </div>

             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Form Column */}
                    <div className="lg:col-span-4 order-2 lg:order-1">
                      <div className="sticky top-28">
                        <ReportForm 
                            selectedLocation={selectedLocation} 
                            onSubmit={handleSubmitReport}
                            lang={lang}
                          />
                      </div>
                    </div>

                    {/* Map Column */}
                    <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
                      {/* Map Container - Clean Border */}
                      <div className="bg-white rounded-xl overflow-hidden border border-slate-200 h-[600px] shadow-sm">
                        <DisasterMap 
                          reports={reports} 
                          onLocationSelect={handleLocationSelect}
                          selectedLocation={selectedLocation}
                          lang={lang}
                        />
                      </div>

                      {/* Recent Feed - Colorful Tags */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {reports.slice(0, 4).map(r => (
                            <div key={r.id} className="bg-white p-4 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                              <div className="flex justify-between items-start mb-2">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                                  r.type === DamageType.HOME ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                  r.type === DamageType.BUSINESS ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                  'bg-red-50 text-red-600 border-red-100'
                                }`}>
                                  {r.type === DamageType.HOME ? t.home : r.type === DamageType.BUSINESS ? t.business : t.vehicle}
                                </span>
                                <span className="text-xs text-slate-400">{new Date(r.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                              </div>
                              <p className="text-sm text-slate-800 font-semibold line-clamp-2">{r.description || 'No description provided.'}</p>
                              {r.image && (
                                <img src={r.image} alt="Report" className="mt-2 w-full h-24 object-cover rounded" />
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                </div>
             </div>
          </div>
        )}

        {currentView === 'dashboard' && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            {/* Dashboard Hero */}
             <div className="bg-white border-b border-slate-200 py-10 px-4 mb-8">
                <div className="max-w-7xl mx-auto px-4">
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-2">{t.impactAnalytics}</h2>
                  <p className="text-slate-500">{t.analyticsDesc}</p>
                </div>
             </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <StatsDashboard reports={reports} lang={lang} />
            </div>
          </div>
        )}

        {currentView === 'emergency' && (
          <EmergencyPage lang={lang} />
        )}
      </main>

      {/* Simple Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 gap-4">
          <p>{t.footerInfo}</p>
          <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-blue-500"></span>
             <p className="font-semibold text-slate-700">{t.developer}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;