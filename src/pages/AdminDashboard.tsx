import { useState, useEffect } from 'react';
import { 
  Users, 
  Hotel, 
  DoorOpen, 
  DollarSign,
  TrendingUp,
  Activity,
  UsersRound,
  FileText,
  Loader2
} from 'lucide-react';
import { motion } from 'motion/react';
import { formatCurrency } from '../lib/utils';
import { reportService } from '../services/reportService';
import { roomService } from '../services/roomService';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { toast } from 'react-hot-toast';

const COLORS = ['#1a1a1a', '#4a4a4a', '#8a8a8a'];

export function AdminDashboard() {
  const [reportData, setReportData] = useState<any>(null);
  const [rooms, setRooms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [occupancy, revenue, roomsList] = await Promise.all([
        reportService.getOccupancyReport(),
        reportService.getRevenueReport(),
        roomService.getRooms()
      ]);
      setReportData({ occupancy, revenue });
      setRooms(roomsList);
    } catch (error: any) {
      toast.error('Failed to load system insights.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-40">
        <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
      </div>
    );
  }

  const revenueData = reportData?.revenue || [];
  const occupancyMix = [
    { name: 'Occupied', value: rooms.filter(r => r.status === 'occupied').length },
    { name: 'Available', value: rooms.filter(r => r.status === 'available').length },
    { name: 'Maintenance', value: rooms.filter(r => r.status === 'maintenance').length },
  ];

  const totalRevenue = revenueData.reduce((sum: number, item: any) => sum + (item.revenue || item.amount || 0), 0);

  const stats = [
    { name: 'Total Revenue', value: formatCurrency(totalRevenue), change: 'Global' },
    { name: 'System Rooms', value: rooms.length.toString(), change: 'Actual' },
    { name: 'Occupied', value: rooms.filter(r => r.status === 'occupied').length.toString(), change: 'Live' },
    { name: 'Available', value: rooms.filter(r => r.status === 'available').length.toString(), change: 'Ready' },
  ];

  return (
    <div className="max-w-6xl space-y-12">
      <header>
        <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">System Insights</h2>
        <p className="text-slate-500 mt-2 text-lg">Performance monitoring and resource management.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-8 bg-white dark:bg-white/[0.02] rounded-3xl border border-slate-100 dark:border-white/5 transition-all hover:bg-slate-50 dark:hover:bg-white/[0.04]"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.name}</p>
              <span className="text-[10px] font-bold text-slate-300 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-full">{stat.change}</span>
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        {/* Revenue Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-white/[0.02] p-8 rounded-3xl border border-slate-100 dark:border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Revenue Dynamics</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-slate-900 dark:bg-white" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global History</span>
            </div>
          </div>
          <div className="h-72">
            {revenueData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" opacity={0.1} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '12px', padding: '12px' }}
                    itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="revenue" fill="currentColor" className="text-slate-900 dark:text-white" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                Insufficient revenue data
              </div>
            )}
          </div>
        </div>

        {/* Occupancy Chart */}
        <div className="lg:col-span-4 bg-white dark:bg-white/[0.02] p-8 rounded-3xl border border-slate-100 dark:border-white/5 flex flex-col">
          <h3 className="text-xl font-bold mb-8">Usage Mix</h3>
          <div className="flex-1 min-h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={occupancyMix}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {occupancyMix.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
              <span className="text-3xl font-bold">{rooms.length}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total Rooms</span>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            {occupancyMix.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{item.name}</span>
                </div>
                <span className="text-sm font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickLink icon={Hotel} title="Hostels" href="/hostels" />
        <QuickLink icon={DoorOpen} title="Rooms" href="/rooms" />
        <QuickLink icon={FileText} title="Reports" href="/reports" />
      </div>
    </div>
  );
}

function QuickLink({ icon: Icon, title, href }: { icon: any, title: string, href: string }) {
  return (
    <motion.button
      whileHover={{ y: -4 }}
      className="group flex items-center justify-between p-8 bg-white dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-3xl hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-all"
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 group-hover:bg-white dark:group-hover:bg-white group-hover:text-black transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <h4 className="text-lg font-bold">{title}</h4>
      </div>
      <TrendingUp className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.button>
  );
}
