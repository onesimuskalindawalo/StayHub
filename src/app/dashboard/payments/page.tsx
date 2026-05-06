'use client';

import { useState, useEffect } from 'react';
import { History, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { paymentService } from '@/services/paymentService';
import { Payment, UserRole } from '@/types';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';

export default function PaymentsPage() {
  const { user } = useAuthStore();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    setIsLoading(true);
    try {
      const data = await paymentService.getPayments(user?.role === UserRole.STUDENT ? user?.id : undefined);
      setPayments(data);
    } catch (error: any) {
      toast.error('Failed to load transaction history.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeposit = async () => {
    if (!user) return;
    setIsProcessing(true);
    try {
      await paymentService.createPayment({
        userId: user.id,
        amount: 250, // Static amount for mock
        bookingId: '1', // Static mapping for mock
        status: 'paid'
      });
      toast.success('Contribution indexed successfully.');
      loadPayments();
    } catch (error) {
      toast.error('Transaction indexing failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  const totalPaid = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-24 pb-32 pt-8">
      <header className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl font-light tracking-tight text-black">
              Financials
            </h2>
            <p className="text-slate-400 font-medium text-lg mt-2 max-w-xl">
              Transparent ledger documentation of residency contributions and institutional transaction history.
            </p>
          </div>
          {user?.role === UserRole.STUDENT && (
            <button 
              onClick={handleDeposit}
              disabled={isProcessing}
              className="px-8 py-3 bg-black text-white text-[12px] font-medium tracking-widest hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              {isProcessing ? 'PROCESSING...' : 'DEPOSIT'}
            </button>
          )}
        </div>
      </header>

      <div className="space-y-32">
        {/* Balance Section */}
        <section className="flex flex-col md:flex-row items-baseline justify-between gap-12 border-b border-slate-50 pb-20">
          <div>
            <p className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em] mb-4">Cumulative Contributions</p>
            <h3 className="text-6xl font-light text-black tracking-tighter">{formatCurrency(totalPaid)}</h3>
          </div>
          <div className="flex gap-16">
            <div className="space-y-2">
              <p className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em]">Registry</p>
              <p className="font-semibold text-sm tracking-tight text-black">CLEARANCE VERIFIED</p>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em]">Protocol</p>
              <p className="font-semibold text-sm tracking-tight text-black">AUTOPAY ACTIVE</p>
            </div>
          </div>
        </section>

        {/* History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          <div className="lg:col-span-8 space-y-12">
            <div className="flex items-center justify-between">
              <h4 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-slate-300">Transaction log</h4>
              <button className="text-[11px] font-medium text-slate-400 hover:text-black transition-colors">
                EXPORT ARCHIVE
              </button>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="w-6 h-6 animate-spin text-slate-100" />
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {payments.length === 0 ? (
                  <p className="text-center py-12 text-slate-300 text-sm">No historical data available.</p>
                ) : (
                  payments.map((tx) => (
                    <div key={tx.id} className="py-10 first:pt-0 flex items-center justify-between group">
                      <div className="flex items-center space-x-8">
                        <div className="w-10 h-10 bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-100 transition-colors">
                          <History className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium text-black text-lg">Suite Payment</p>
                          <p className="text-[10px] font-medium text-slate-300 uppercase tracking-widest mt-1.5">{tx.paymentDate || 'Recent Engagement'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-light text-black tracking-tight">{formatCurrency(tx.amount)}</p>
                        <p className={`text-[10px] font-medium uppercase tracking-widest mt-1.5 ${
                          tx.status === 'paid' ? 'text-slate-400' : 'text-amber-500'
                        }`}>
                          {tx.status}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-12">
            <div className="space-y-8">
              <h4 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-slate-300">Funding Sources</h4>
              <div className="space-y-2">
                <div className="px-6 py-6 border border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-medium text-slate-300 uppercase mb-1">CHASE •••• 4829</p>
                    <p className="text-sm font-semibold text-black italic">Preferred</p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-black" />
                </div>
                <button className="w-full py-5 border border-dashed border-slate-100 text-[11px] font-medium text-slate-300 hover:text-black hover:border-slate-300 transition-all">
                  ADD ALTERNATE SOURCE
                </button>
              </div>
            </div>

            <div className="space-y-6 pt-12 border-t border-slate-50">
              <div className="flex items-center space-x-3 text-black">
                <AlertCircle className="w-4 h-4" />
                <h4 className="text-[11px] font-semibold uppercase tracking-widest">Protocol Notice</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                All transactions are end-to-end encrypted. Institutional settlements may require up to 48 hours for final verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
