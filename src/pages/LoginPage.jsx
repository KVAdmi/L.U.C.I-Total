
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Mail, Lock, Eye, EyeOff, Sun, Moon, ScanFace, Mic } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { signIn } = useAuth();
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('alex@empresa.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = t('login.errorEmailRequired');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t('login.errorEmailInvalid');
    }
    if (!password) {
      newErrors.password = t('login.errorPasswordRequired');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    setErrors({});

    const { user, error } = await signIn({ email, password });

    if (error) {
      toast({
        title: t('login.toastErrorTitle'),
        description: t('login.toastErrorDesc'),
        variant: 'destructive',
      });
      setErrors({ form: t('login.toastErrorDesc') });
    } else {
      toast({
        title: t('login.toastSuccessTitle'),
        description: t('login.toastSuccessDesc'),
        variant: 'default',
      });
      navigate('/');
    }
    setLoading(false);
  };

  const handleBiometricLogin = (type) => {
    toast({
      title: `🚧 ${type} Login`,
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 dark:bg-[#0A0A0A] p-4 transition-colors duration-500 font-['Questrial']">
      <div className="absolute top-4 right-4 z-10">
        <motion.button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          className="p-2.5 rounded-full text-slate-600 dark:text-white/70 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </motion.button>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <div className="bg-white/50 dark:bg-white/[.07] border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-2xl shadow-black/5 dark:shadow-black/20 backdrop-blur-xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#003336] to-[#001E21] flex items-center justify-center shadow-lg shadow-[#001E21]/30 mb-4">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">L.U.C.I</h1>
            <p className="text-sm text-slate-500 dark:text-teal-400 font-medium tracking-wider">CRM UNIVERSAL</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('login.email')}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="alex@empresa.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t('login.password')}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••"
                  className="pl-10 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white/80"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" checked={rememberMe} onCheckedChange={setRememberMe} disabled={loading} />
                <Label htmlFor="remember" className="font-normal text-slate-600 dark:text-white/60">{t('login.rememberMe')}</Label>
              </div>
              <a href="#" className="font-medium text-primary hover:underline">{t('login.forgotPassword')}</a>
            </div>

            {errors.form && <p className="text-sm text-center text-red-500">{errors.form}</p>}
            
            <Button type="submit" className="w-full text-base py-6 font-bold" disabled={loading}>
              {loading ? '...' : t('login.signIn')}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white/50 dark:bg-[#1A1A1A] px-2 text-slate-500 dark:text-white/40">{t('login.orContinueWith')}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-16 flex-col gap-1" onClick={() => handleBiometricLogin('Facial Recognition')}>
              <ScanFace className="w-6 h-6 text-primary" />
              <span className="text-xs font-semibold">{t('login.facialRecognition')}</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-1" onClick={() => handleBiometricLogin('Voice Command')}>
              <Mic className="w-6 h-6 text-primary" />
              <span className="text-xs font-semibold">{t('login.voiceCommand')}</span>
            </Button>
          </div>
        </div>
        <p className="text-center text-xs text-slate-400 dark:text-white/30 mt-6">
          © {new Date().getFullYear()} L.U.C.I. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
