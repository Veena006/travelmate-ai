import { BudgetBreakdown as BudgetType } from '@/types/travel';
import { Hotel, Utensils, Car, Ticket, Wallet, PieChart, CheckCircle2, AlertCircle } from 'lucide-react';

interface BudgetBreakdownProps {
  budget: BudgetType;
}

export default function BudgetBreakdown({ budget }: BudgetBreakdownProps) {
  const items = [
    { label: 'Hotel & Stay', amount: budget.accommodation, icon: Hotel, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { label: 'Food & Dining', amount: budget.food, icon: Utensils, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { label: 'Transport', amount: budget.transport, icon: Car, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { label: 'Activities', amount: budget.activities, icon: Ticket, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { label: 'Misc & Emergency', amount: budget.miscellaneous, icon: Wallet, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
  ];

  return (
    <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
      {/* Header Row & In-Budget Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <PieChart className="w-5 h-5 text-blue-500" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Estimated Budget Breakdown</h3>
        </div>

        {/* Budget Status Badge */}
        <div className="flex items-center gap-3">
          {budget.isWithinBudget ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Within Selected Budget</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold">
              <AlertCircle className="w-4 h-4" />
              <span>Budget Notice</span>
            </div>
          )}

          <div className="text-right">
            <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Total Cost</span>
            <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
              {budget.currency} {budget.total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {budget.budgetComparison && (
        <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800 font-medium">
          💡 {budget.budgetComparison}
        </p>
      )}

      {/* Grid of Budget Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {items.map((item) => {
          const Icon = item.icon;
          const percentage = Math.round((item.amount / budget.total) * 100) || 0;
          return (
            <div
              key={item.label}
              className={`p-4 rounded-2xl bg-white dark:bg-slate-900/60 border ${item.border} space-y-2 shadow-xs`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl ${item.bg} ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{percentage}%</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block truncate">{item.label}</span>
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  {budget.currency} {item.amount.toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
