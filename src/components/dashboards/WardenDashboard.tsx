'use client';

import { 
  Clock,
  CheckCircle2,
  Search
} from 'lucide-react';
import { motion } from 'motion/react';

export function WardenDashboard() {
  const stats = [
    { name: 'Upcoming Check-ins', value: '24' },
    { name: 'Vacant Units', value: '42' },
    { name: 'Active Reports', value: '3' },
    { name: 'Students In-House', value: '382' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-20 pb-32 pt-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="space-y-1">
          <h2 className="text-4xl font-light tracking-tight text-black">Console</h2>
          <p className="text-slate-400 font-medium text-lg leading-relaxed">Managing the institutional living environment.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
          <input
            type="text"
            placeholder="LOCATE STUDENT..."
            className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-xl text-[11px] font-medium tracking-[0.1em] focus:outline-none focus:border-black transition-all shadow-sm uppercase"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1, duration: 1 }}
            className="p-10 bg-white border border-slate-50 transition-all group"
          >
            <p className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em] mb-4 group-hover:text-black transition-colors">{stat.name}</p>
            <p className="text-3xl font-semibold text-black tracking-tight">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 pt-12">
        {/* Pending Approvals */}
        <div className="lg:col-span-8 space-y-12">
          <div className="flex items-center justify-between border-b border-slate-50 pb-8">
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-slate-300">Registry Queue</h3>
            <span className="text-[10px] font-semibold text-black uppercase tracking-widest bg-slate-50 px-4 py-1.5 rounded-full">5 Pending</span>
          </div>
          <div className="divide-y divide-slate-50">
            {[
              { name: 'Sarah Miller', roomType: 'Single (AC)', id: '#BR-1024' },
              { name: 'Mike Ross', roomType: 'Double', id: '#BR-1025' },
              { name: 'Harvey Specter', roomType: 'Dorm', id: '#BR-1026' },
            ].map((req, i) => (
              <div key={i} className="group py-8 flex items-center justify-between transition-all duration-500 first:pt-0">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center font-medium text-sm text-slate-300 group-hover:bg-black group-hover:text-white transition-all duration-500">
                    {req.name.charAt(0)}
                  </div>
                  <div className="ml-6">
                    <p className="text-lg font-medium text-black tracking-tight">{req.name}</p>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1">{req.roomType}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-3 bg-slate-50 rounded-lg text-slate-300 hover:bg-black hover:text-white transition-all">
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <button className="p-3 bg-slate-50 rounded-lg text-slate-300 hover:bg-black hover:text-white transition-all">
                    <Clock className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance / Issues */}
        <div className="lg:col-span-4 space-y-12">
          <div className="flex items-center justify-between border-b border-slate-50 pb-8">
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-slate-300">Incident Log</h3>
            <span className="text-[10px] font-semibold text-black uppercase tracking-widest bg-slate-50 px-4 py-1.5 rounded-full">3 Active</span>
          </div>
          <div className="space-y-8">
            {[
              { issue: 'Leaking Faucet', room: '302', priority: 'High' },
              { issue: 'AC Repair', room: '105', priority: 'Medium' },
              { issue: 'Door Lock', room: '422', priority: 'Low' },
            ].map((issue, i) => (
              <div key={i} className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-semibold tracking-widest px-3 py-1 rounded-full uppercase ${
                    issue.priority === 'High' ? 'bg-black text-white' : 
                    issue.priority === 'Medium' ? 'bg-slate-100 text-black' : 
                    'bg-slate-50 text-slate-300'
                  }`}>
                    {issue.priority}
                  </span>
                  <span className="text-[10px] font-medium text-slate-300 uppercase tracking-widest">Unit {issue.room}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-medium text-black tracking-tight">{issue.issue}</p>
                  <button className="text-[11px] font-semibold uppercase tracking-[0.1em] text-black border-b border-black pb-0.5 hover:opacity-50 transition-all">
                    DELEGATE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
