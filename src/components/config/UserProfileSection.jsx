
import React, { useState } from 'react';
import ConfigCard from './ConfigCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Camera, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const UserProfileSection = ({ userProfile, onUpdateProfile }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [profile, setProfile] = useState(userProfile);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSave = () => {
    onUpdateProfile(profile);
    toast({
      title: t('config.saveSuccess') || "Profile updated successfully.",
      description: "Your changes have been saved.",
    });
  };

  return (
    <ConfigCard 
      title={t('config.profile') || 'Profile'}
      description={t('config.profileDesc') || 'Update your photo and personal details.'}
      footer={
        <div className="flex justify-end">
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            {t('common.save') || 'Save Changes'}
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24">
            <img 
              src={profile.avatar} 
              alt="User Avatar"
              className="w-full h-full rounded-full object-cover border-2 border-slate-200 dark:border-white/10" 
            />
            <button className="absolute bottom-0 right-0 p-1.5 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors shadow-md">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h4 className="font-bold text-xl">{profile.name}</h4>
            <p className="text-slate-500 dark:text-white/60">{profile.title}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">{t('config.fullName') || 'Full Name'}</Label>
            <Input id="name" value={profile.name} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="title">{t('config.role') || 'Role / Specialty'}</Label>
            <Input id="title" value={profile.title} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="email">{t('config.email') || 'Email Address'}</Label>
            <Input id="email" type="email" value={profile.email} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="bio">{t('config.bio') || 'Short Bio'}</Label>
            <Input id="bio" value={profile.bio} onChange={handleChange} />
          </div>
        </div>
      </div>
    </ConfigCard>
  );
};

export default UserProfileSection;
