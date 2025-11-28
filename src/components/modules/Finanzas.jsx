
import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, PieChart as PieChartIcon, 
  BarChart as BarChartIcon, Wallet, AlertTriangle, Download, 
  Calendar, Plus, ChevronDown, ArrowUpRight, ArrowDownRight,
  MoreVertical, Filter, Search, Briefcase, FileText, Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import CardCristal from '@/components/ui/CardCristal';
import Badge from '@/components/ui/Badge';
import IAActionPanel from '@/components/ui/IAActionPanel';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

// --- Components ---

const StatCard = ({ title, amount, trend, trendValue, type, icon: Icon }) => (
  <CardCristal className="p-4 relative overflow-hidden group hover:border-slate-300 dark:hover:border-white/20 transition-all">
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <Icon className="w-12 h-12" />
    </div>
    <div className="relative z-10">
      <p className="text-slate-500 dark:text-white/60 text-xs uppercase tracking-wider font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{amount}</h3>
      <div className="flex items-center gap-2">
        <span className={cn(
          "text-xs font-bold flex items-center gap-1 px-1.5 py-0.5 rounded",
          type === 'positive' ? "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-400/10" : 
          type === 'negative' ? "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-400/10" : "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-400/10"
        )}>
          {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trendValue}
        </span>
        <span className="text-[10px] text-slate-400 dark:text-white/40">vs mes anterior</span>
      </div>
    </div>
  </CardCristal>
);

const TransactionRow = ({ tx, t }) => (
  <div className="grid grid-cols-12 gap-4 items-center p-3 hover:bg-slate-100 dark:hover:bg-white/5 border-b border-slate-200 dark:border-white/5 transition-colors text-sm group">
    <div className="col-span-2 text-slate-500 dark:text-white/60 text-xs">{tx.date}</div>
    <div className="col-span-4 font-medium text-slate-900 dark:text-white truncate flex items-center gap-2">
      <div className={cn("w-1.5 h-1.5 rounded-full", tx.type === 'income' ? "bg-emerald-500" : "bg-red-500")} />
      {tx.description}
    </div>
    <div className="col-span-2 text-slate-500 dark:text-white/60 text-xs">{tx.category}</div>
    <div className="col-span-2 font-mono text-right">
      <span className={cn(tx.type === 'income' ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-white")}>
        {tx.type === 'income' ? '+' : '-'}{tx.amount}
      </span>
    </div>
    <div className="col-span-2 flex justify-end">
      <Badge variant="outline" className={cn(
        "text-[10px] border-none",
        tx.status === 'Completed' ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
      )}>
        {tx.status === 'Completed' ? t('finanzas.completed') : t('finanzas.pending')}
      </Badge>
    </div>
  </div>
);

const BudgetCard = ({ category, budget, spent, color }) => {
  const percent = Math.min((spent / budget) * 100, 100);
  const isOver = spent > budget;
  
  return (
    <div className="p-3 bg-white dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 transition-all">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-900 dark:text-white">{category}</span>
        <span className={cn("text-xs font-bold", isOver ? "text-red-500" : "text-slate-500 dark:text-white/60")}>
          {Math.round(percent)}%
        </span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden mb-2">
        <div 
          className={cn("h-full rounded-full transition-all duration-500", color)} 
          style={{ width: `${percent}%` }} 
        />
      </div>
      <div className="flex justify-between text-xs text-slate-400 dark:text-white/40">
        <span>${spent.toLocaleString('es-MX')} gastado</span>
        <span>${budget.toLocaleString('es-MX')} total</span>
      </div>
    </div>
  );
};

// --- Main Component ---

const Finanzas = ({ assistantName }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview'); 
  const [dateRange, setDateRange] = useState('Este mes');
  const { t } = useLanguage();

  // Mock Data
  const transactions = [
    { id: 1, date: '27 Nov', description: 'Consultoría TechFlow', category: 'Servicios', amount: '$2,450.00', type: 'income', status: 'Completed' },
    { id: 2, date: '26 Nov', description: 'Licencias Software', category: 'Tecnología', amount: '$129.00', type: 'expense', status: 'Completed' },
    { id: 3, date: '25 Nov', description: 'Alquiler Oficina', category: 'Operativo', amount: '$850.00', type: 'expense', status: 'Pending' },
    { id: 4, date: '24 Nov', description: 'Venta Producto A', category: 'Ventas', amount: '$1,200.00', type: 'income', status: 'Completed' },
    { id: 5, date: '22 Nov', description: 'Cena Cliente VIP', category: 'Representación', amount: '$145.50', type: 'expense', status: 'Completed' },
  ];

  const handleAction = (action) => {
    toast({
      title: t('common.action'),
      description: `${action} - Procesando solicitud...`
    });
  };

  return (
    <div className="flex h-full max-h-screen overflow-hidden bg-slate-50 dark:bg-[#0F0F0F] transition-colors duration-300">
      
      {/* LEFT COLUMN - Filters & Stats */}
      <div className="w-80 flex-shrink-0 flex flex-col border-r border-slate-200 dark:border-white/10 bg-white/50 dark:bg-[#0F0F0F] overflow-y-auto custom-scrollbar">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
             <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('finanzas.title')}</h2>
             <button onClick={() => handleAction(t('finanzas.newRecord'))} className="p-2 bg-slate-900 dark:bg-[#001E21] rounded-lg hover:bg-slate-800 dark:hover:bg-[#003336] text-white dark:text-emerald-400 transition-colors border border-transparent dark:border-white/10">
               <Plus className="w-4 h-4" />
             </button>
          </div>

          {/* Date Filter */}
          <div className="relative">
            <button className="w-full flex items-center justify-between bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-colors">
              <span className="flex items-center gap-2 text-slate-700 dark:text-white/80">
                <Calendar className="w-4 h-4 opacity-60" /> {dateRange}
              </span>
              <ChevronDown className="w-4 h-4 opacity-40" />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="space-y-3">
            <StatCard 
              title="Ingresos Totales" 
              amount="$12,450" 
              trend="up" 
              trendValue="12%" 
              type="positive"
              icon={ArrowUpRight}
            />
            <StatCard 
              title="Gastos Operativos" 
              amount="$4,230" 
              trend="down" 
              trendValue="5%" 
              type="negative"
              icon={ArrowDownRight}
            />
            <StatCard 
              title={t('finanzas.netBalance')}
              amount="$8,220" 
              trend="up" 
              trendValue="8%" 
              type="neutral"
              icon={Wallet}
            />
          </div>

          {/* Budgets Mini */}
          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-400 dark:text-white/60 uppercase tracking-wider">{t('finanzas.budgets')}</h3>
              <button className="text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300">Ver todos</button>
            </div>
            <BudgetCard category="Marketing" budget={2000} spent={1450} color="bg-blue-500" />
            <BudgetCard category="Tecnología" budget={500} spent={480} color="bg-yellow-500" />
            <BudgetCard category="Oficina" budget={1000} spent={850} color="bg-purple-500" />
          </div>
        </div>
      </div>

      {/* CENTER COLUMN - Data & Charts */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-[#0F0F0F] relative overflow-hidden">
         {/* Toolbar */}
         <div className="h-16 border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-6 shrink-0 bg-white/90 dark:bg-[#0F0F0F]/95 backdrop-blur z-10">
            <div className="flex gap-2 bg-slate-200 dark:bg-white/5 p-1 rounded-lg border border-slate-200 dark:border-white/10">
               {[t('finanzas.overview'), t('finanzas.income'), t('finanzas.expenses')].map(tab => (
                 <button
                   key={tab}
                   onClick={() => setActiveTab(tab.toLowerCase())}
                   className={cn(
                     "px-4 py-1.5 text-xs font-medium rounded transition-all",
                     activeTab === tab.toLowerCase() ? "bg-white dark:bg-[#001E21] text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white"
                   )}
                 >
                   {tab}
                 </button>
               ))}
            </div>
            
            <div className="flex gap-2">
               <button onClick={() => handleAction(t('common.export'))} className="text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white text-sm flex items-center gap-2 px-3 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                  <Download className="w-4 h-4" /> {t('common.export')}
               </button>
               <button onClick={() => handleAction(t('common.filter'))} className="text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white text-sm flex items-center gap-2 px-3 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                  <Filter className="w-4 h-4" /> {t('common.filter')}
               </button>
            </div>
         </div>

         {/* Content Area */}
         <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            {/* AI Charts Section */}
            <div className="grid grid-cols-2 gap-6">
               <CardCristal className="p-6 bg-white dark:bg-white/5 border-slate-200 dark:border-white/5 relative group">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <h3 className="text-slate-900 dark:text-white font-medium flex items-center gap-2">
                           <PieChartIcon className="w-4 h-4 text-emerald-500" /> {t('finanzas.distribution')}
                        </h3>
                        <p className="text-slate-500 dark:text-white/40 text-xs mt-1">Por fuente de ingreso</p>
                     </div>
                     <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-slate-100 dark:hover:bg-white/10"><MoreVertical className="w-4 h-4 text-slate-400 dark:text-white/60" /></button>
                  </div>
                  {/* Mock Chart Visual */}
                  <div className="h-40 flex items-center justify-center relative">
                     <div className="w-32 h-32 rounded-full border-[12px] border-emerald-500/20 border-t-emerald-500 border-r-emerald-400" />
                     <div className="absolute text-center">
                        <span className="block text-xl font-bold text-slate-900 dark:text-white">65%</span>
                        <span className="text-[10px] text-slate-400 dark:text-white/40">Servicios</span>
                     </div>
                  </div>
               </CardCristal>

               <CardCristal className="p-6 bg-white dark:bg-white/5 border-slate-200 dark:border-white/5 relative group">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <h3 className="text-slate-900 dark:text-white font-medium flex items-center gap-2">
                           <BarChartIcon className="w-4 h-4 text-blue-500" /> {t('finanzas.cashflow')}
                        </h3>
                        <p className="text-slate-500 dark:text-white/40 text-xs mt-1">Últimos 6 meses</p>
                     </div>
                     <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-slate-100 dark:hover:bg-white/10"><MoreVertical className="w-4 h-4 text-slate-400 dark:text-white/60" /></button>
                  </div>
                  {/* Mock Chart Visual */}
                  <div className="h-40 flex items-end gap-2 px-4">
                     {[40, 65, 45, 80, 55, 70].map((h, i) => (
                        <div key={i} className="flex-1 bg-slate-100 dark:bg-white/10 rounded-t hover:bg-blue-500/50 transition-colors relative group/bar">
                           <div className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t" style={{ height: `${h}%` }} />
                        </div>
                     ))}
                  </div>
               </CardCristal>
            </div>

            {/* Transactions List */}
            <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden">
               <div className="p-4 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
                  <h3 className="text-slate-900 dark:text-white font-medium">{t('finanzas.recentTransactions')}</h3>
                  <div className="relative">
                     <Search className="absolute left-3 top-2 w-3.5 h-3.5 text-slate-400 dark:text-white/40" />
                     <input type="text" placeholder={t('common.search')} className="bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-full pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500/50 w-48" />
                  </div>
               </div>
               
               <div className="grid grid-cols-12 gap-4 p-3 bg-slate-50 dark:bg-black/20 text-xs font-bold text-slate-400 dark:text-white/40 uppercase tracking-wider border-b border-slate-200 dark:border-white/5">
                  <div className="col-span-2">Fecha</div>
                  <div className="col-span-4">Descripción</div>
                  <div className="col-span-2">Categoría</div>
                  <div className="col-span-2 text-right">Monto</div>
                  <div className="col-span-2 text-right pr-2">Estado</div>
               </div>
               
               <div>
                  {transactions.map(tx => (
                     <TransactionRow key={tx.id} tx={tx} t={t} />
                  ))}
               </div>
               
               <div className="p-3 text-center border-t border-slate-200 dark:border-white/5">
                  <button className="text-xs text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white transition-colors">{t('common.viewAll')}</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Finanzas;
