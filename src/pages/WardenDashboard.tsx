import { 
  Users, 
  DoorOpen, 
  Clock,
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  CalendarDays,
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
    <div className="max-w-7xl mx-auto space-y-20 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-10">
        <div className="space-y-1">
          <h2 className="text-6xl font-extrabold tracking-[-0.05em] text-black">Console</h2>
          <p className="text-slate-400 font-medium text-2xl tracking-tight">Managing the institutional living environment.</p>
        </div>
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
          <input
            type="text"
            placeholder="LOCATE STUDENT..."
            className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-[32px] text-[11px] font-black tracking-[0.2em] focus:outline-none focus:border-black transition-all shadow-sm uppercase"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.8 }}
            className="p-10 bg-white rounded-[40px] border border-slate-50 transition-all hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] hover:border-slate-100 group"
          >
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-6 group-hover:text-black transition-colors">{stat.name}</p>
            <p className="text-4xl font-black text-black tracking-tighter">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Pending Approvals */}
        <div className="space-y-12">
          <div className="flex items-center justify-between border-b border-slate-100 pb-8">
            <h3 className="text-[13px] font-black uppercase tracking-[0.3em] text-slate-300">REGISTRY QUEUE</h3>
            <span className="text-[10px] font-black text-black uppercase tracking-widest bg-slate-50 px-4 py-1.5 rounded-full">5 PENDING</span>
          </div>
          <div className="space-y-6">
            {[
              { name: 'Sarah Miller', roomType: 'Single (AC)', id: '#BR-1024' },
              { name: 'Mike Ross', roomType: 'Double', id: '#BR-1025' },
              { name: 'Harvey Specter', roomType: 'Dorm', id: '#BR-1026' },
            ].map((req, i) => (
              <div key={i} className="group p-8 bg-white rounded-[40px] border border-slate-50 flex items-center justify-between hover:shadow-[0_15px_30px_rgba(0,0,0,0.03)] hover:border-slate-100 transition-all duration-500">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-[24px] bg-slate-50 flex items-center justify-center font-black text-[15px] text-slate-300 group-hover:bg-black group-hover:text-white transition-all duration-500">
                    {req.name.charAt(0)}
                  </div>
                  <div className="ml-8">
                    <p className="text-xl font-black text-black tracking-tight uppercase">{req.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{req.roomType}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 hover:bg-black hover:text-white transition-all">
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                  <button className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 hover:bg-black hover:text-white transition-all">
                    <Clock className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="text-[11px] font-black text-black border-b border-black pb-0.5 hover:opacity-50 transition-all uppercase tracking-widest">
            Audit Complete Archive
          </button>
        </div>

        {/* Maintenance / Issues */}
        <div className="space-y-12">
          <div className="flex items-center justify-between border-b border-slate-100 pb-8">
            <h3 className="text-[13px] font-black uppercase tracking-[0.3em] text-slate-300">INCIDENT LOG</h3>
            <span className="text-[10px] font-black text-black uppercase tracking-widest bg-slate-50 px-4 py-1.5 rounded-full">3 ACTIVE</span>
          </div>
          <div className="space-y-6">
            {[
              { issue: 'Leaking Faucet', room: '302', priority: 'High' },
              { issue: 'AC Repair', room: '105', priority: 'Medium' },
              { issue: 'Door Lock', room: '422', priority: 'Low' },
            ].map((issue, i) => (
              <div key={i} className="p-10 bg-white rounded-[40px] border border-slate-50 hover:shadow-[0_15px_30px_rgba(0,0,0,0.03)] hover:border-slate-100 transition-all duration-500">
                <div className="flex items-center justify-between mb-8">
                  <span className={`text-[9px] font-black tracking-[0.25em] px-5 py-2 rounded-full uppercase ${
                    issue.priority === 'High' ? 'bg-black text-white' : 
                    issue.priority === 'Medium' ? 'bg-slate-100 text-black' : 
                    'bg-slate-50 text-slate-400'
                  }`}>
                    {issue.priority}
                  </span>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">UNIT {issue.room}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-black text-black tracking-tighter uppercase">{issue.issue}</p>
                  <button className="text-[11px] font-black uppercase tracking-[0.2em] text-black border-b border-black pb-0.5 hover:opacity-50 transition-all">
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
