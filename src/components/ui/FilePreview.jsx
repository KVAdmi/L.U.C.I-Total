
import React from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import CardCristal from '@/components/ui/CardCristal';
import PillButton from '@/components/ui/PillButton';
import { useToast } from '@/components/ui/use-toast';

const FilePreview = ({ fileName, fileType, fileSize, previewUrl }) => {
  const { toast } = useToast();

  const handleAction = (action) => {
    toast({
      title: "🚧 Función en desarrollo",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <CardCristal className="p-4">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#001E21] to-[#003336] flex items-center justify-center shrink-0">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white text-sm font-medium truncate">{fileName}</h3>
          <p className="text-white/60 text-xs">{fileType} • {fileSize}</p>
          <div className="flex gap-2 mt-3">
            <PillButton size="sm" onClick={() => handleAction('preview')}>
              <Eye className="w-3 h-3" />
              Vista previa
            </PillButton>
            <PillButton size="sm" variant="secondary" onClick={() => handleAction('download')}>
              <Download className="w-3 h-3" />
            </PillButton>
          </div>
        </div>
      </div>
    </CardCristal>
  );
};

export default FilePreview;
