import React, { useMemo } from 'react';
import { DamageReport, DamageType, Language } from '../types';
import { 
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { translations } from '../translations';

interface StatsDashboardProps {
  reports: DamageReport[];
  lang: Language;
}

// Updated Palette to match "Emergency Page" Colors
const COLORS = {
  orange: '#EA580C',   // Homes (Fire/Orange)
  blue: '#2563EB',     // Business (Police/Blue)
  red: '#DC2626',      // Vehicles (Emergency/Red)
  green: '#16A34A',    // People (Ambulance/Green)
  slate: '#64748b'     // Secondary
};

// Color Palettes for Charts
const AGE_COLORS = ['#fdba74', '#fb923c', '#ea580c', '#9a3412']; // Shades of Orange
const VEHICLE_COLORS = ['#fca5a5', '#f87171', '#dc2626', '#991b1b', '#7f1d1d']; // Shades of Red
const BUSINESS_COLORS = ['#93c5fd', '#60a5fa', '#2563eb', '#1e40af']; // Shades of Blue

export const StatsDashboard: React.FC<StatsDashboardProps> = ({ reports, lang }) => {
  const t = translations[lang];

  const stats = useMemo(() => {
    const homes = reports.filter(r => r.type === DamageType.HOME);
    const businesses = reports.filter(r => r.type === DamageType.BUSINESS);
    const vehicles = reports.filter(r => r.type === DamageType.VEHICLE);
    
    const totalResidents = homes.reduce((acc, curr) => acc + (curr.homeDetails?.residents || 0), 0);
    const avgDamage = homes.length ? Math.round(homes.reduce((acc, curr) => acc + (curr.homeDetails?.damagePercentage || 0), 0) / homes.length) : 0;
    
    const ageGroups = { '0-7': 0, '7-18': 0, '18-50': 0, '50+': 0 };
    homes.forEach(h => {
      h.homeDetails?.memberAges.forEach(age => {
        if (age <= 7) ageGroups['0-7']++;
        else if (age <= 18) ageGroups['7-18']++;
        else if (age < 50) ageGroups['18-50']++;
        else ageGroups['50+']++;
      });
    });
    const ageData = Object.entries(ageGroups).map(([name, value]) => ({ name, value }));

    const businessSizes = { SMALL: 0, MEDIUM: 0, LARGE: 0 };
    businesses.forEach(b => {
      if (b.businessDetails?.size) businessSizes[b.businessDetails.size]++;
    });
    // Use translated labels for chart
    const businessSizeData = Object.entries(businessSizes).map(([name, value]) => ({ 
      name: name === 'SMALL' ? t.small : name === 'MEDIUM' ? t.medium : t.large, 
      value 
    }));

    const vehicleCounts: Record<string, number> = {};
    vehicles.forEach(v => {
      const type = v.vehicleDetails?.type || 'Other';
      vehicleCounts[type] = (vehicleCounts[type] || 0) + (v.vehicleDetails?.count || 1);
    });
    const vehicleData = Object.entries(vehicleCounts).map(([name, value]) => ({ name, value }));

    return { 
      totalResidents, 
      avgDamage, 
      ageData, 
      businessSizeData, 
      vehicleData,
      counts: { homes: homes.length, businesses: businesses.length, vehicles: vehicles.length } 
    };
  }, [reports, t]);

  return (
    <div className="space-y-8">
      {/* Metrics Grid - Flat Colors matching Emergency Page */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Vehicles - Red */}
        <div className="bg-red-50 p-8 rounded-xl border border-red-100 flex flex-col items-start justify-between min-h-[160px]">
          <div>
            <span className="text-sm font-bold text-red-600 uppercase tracking-wider">{t.vehicles}</span>
            <h3 className="text-5xl font-black text-red-600 mt-2">{stats.counts.vehicles}</h3>
          </div>
           <div className="w-full">
            <span className="text-xs font-bold text-white bg-red-500 px-3 py-1 rounded-full">{t.criticalLoss}</span>
          </div>
        </div>

        {/* Homes - Orange */}
        <div className="bg-orange-50 p-8 rounded-xl border border-orange-100 flex flex-col items-start justify-between min-h-[160px]">
          <div>
            <span className="text-sm font-bold text-orange-600 uppercase tracking-wider">{t.homes}</span>
            <h3 className="text-5xl font-black text-orange-600 mt-2">{stats.counts.homes}</h3>
          </div>
          <div className="w-full bg-orange-200 rounded-full h-1.5 mt-4 overflow-hidden">
             <div className="bg-orange-600 h-full" style={{width: `${stats.avgDamage}%`}}></div>
          </div>
          <p className="text-xs font-bold text-orange-500 mt-2">{stats.avgDamage}% {t.avgDamage}</p>
        </div>
        
        {/* People - Green */}
        <div className="bg-green-50 p-8 rounded-xl border border-green-100 flex flex-col items-start justify-between min-h-[160px]">
          <div>
             <span className="text-sm font-bold text-green-600 uppercase tracking-wider">{t.affectedPeople}</span>
             <h3 className="text-5xl font-black text-green-600 mt-2">{stats.totalResidents}</h3>
          </div>
           <div className="w-full">
            <span className="text-xs font-bold text-white bg-green-500 px-3 py-1 rounded-full">{t.displaced}</span>
          </div>
        </div>

        {/* Business - Blue */}
        <div className="bg-blue-50 p-8 rounded-xl border border-blue-100 flex flex-col items-start justify-between min-h-[160px]">
          <div>
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">{t.businesses}</span>
            <h3 className="text-5xl font-black text-blue-600 mt-2">{stats.counts.businesses}</h3>
          </div>
          <div className="w-full">
            <span className="text-xs font-bold text-white bg-blue-500 px-3 py-1 rounded-full">{t.commercial}</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Vehicle Losses - Pie Chart (Red Theme) */}
        <div className="bg-white p-8 rounded-xl border border-slate-200 flex flex-col">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-slate-800">{t.vehicleLosses}</h3>
            <p className="text-sm text-slate-400">{t.vehicleDesc}</p>
          </div>
          <div className="flex-1 min-h-[300px] flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.vehicleData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {stats.vehicleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={VEHICLE_COLORS[index % VEHICLE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: 'none' }}/>
                <Legend verticalAlign="bottom" height={36} iconType="circle"/>
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-red-500 opacity-20"><svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg></span>
            </div>
          </div>
        </div>

        {/* Demographics - Pie Chart (Orange Theme) */}
        <div className="bg-white p-8 rounded-xl border border-slate-200 flex flex-col">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-slate-800">{t.ageDemographics}</h3>
            <p className="text-sm text-slate-400">{t.ageDesc}</p>
          </div>
          <div className="flex-1 min-h-[300px] flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.ageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {stats.ageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={AGE_COLORS[index % AGE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: 'none' }}/>
                <Legend verticalAlign="bottom" height={36} iconType="circle"/>
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-orange-500 opacity-20"><svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg></span>
            </div>
          </div>
        </div>

        {/* Business Impact - Pie Chart (Blue Theme) */}
        <div className="bg-white p-8 rounded-xl border border-slate-200 flex flex-col">
           <div className="mb-4">
              <h3 className="text-xl font-bold text-slate-800">{t.businessImpactScale}</h3>
              <p className="text-sm text-slate-400">{t.businessDesc}</p>
           </div>
          <div className="flex-1 min-h-[300px] flex items-center justify-center relative">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.businessSizeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {stats.businessSizeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={BUSINESS_COLORS[index % BUSINESS_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: 'none' }}/>
                <Legend verticalAlign="bottom" height={36} iconType="circle"/>
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-blue-500 opacity-20"><svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7V3H2v18h2v20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};